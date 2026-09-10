import { randomUUID } from "node:crypto";
import { Client } from "@replit/object-storage";
import { Storage } from "@google-cloud/storage";
import { logger } from "./logger.js";

// Shared across deployment versions: a mutation must invalidate every instance,
// including an older instance still draining during a rolling deployment.
export const PUBLICATION_CONTROL_PREFIX = "counselo/publication-control/v1/";
export const PUBLICATION_EPOCH_OBJECT = `${PUBLICATION_CONTROL_PREFIX}epoch.json`;
export const PUBLICATION_PENDING_PREFIX = `${PUBLICATION_CONTROL_PREFIX}pending/`;
const CONTROL_TTL_MS = 15_000;

export type PublicationStorage = Pick<Client, "uploadFromText" | "list" | "delete"> & {
  epochGeneration(): Promise<string>;
};
export type PublicationState = { epoch: string; cacheable: boolean };
const BYPASS: PublicationState = { epoch: "", cacheable: false };

export function publicationCacheEnabled(): boolean {
  return process.env.PUBLIC_RESPONSE_CACHE_MODE === "publication"
    && process.env.PUBLIC_RESPONSE_CACHE_BACKEND === "object-storage";
}

export function publicationFencingEnabled(): boolean {
  return ["fenced", "publication"].includes(process.env.PUBLIC_RESPONSE_CACHE_MODE ?? "")
    && process.env.PUBLIC_RESPONSE_CACHE_BACKEND === "object-storage";
}

export function assertPublicMaintenanceCacheConfiguration(): void {
  if (!publicationFencingEnabled() || !process.env.PUBLIC_RESPONSE_CACHE_BUCKET_ID?.trim()) {
    throw new Error("Public maintenance requires PUBLIC_RESPONSE_CACHE_MODE=fenced or publication, PUBLIC_RESPONSE_CACHE_BACKEND=object-storage and PUBLIC_RESPONSE_CACHE_BUCKET_ID. No content was changed.");
  }
}

export function createPublicationStorage(
  bucketId = process.env.PUBLIC_RESPONSE_CACHE_BUCKET_ID?.trim(),
  epochObject = PUBLICATION_EPOCH_OBJECT,
): PublicationStorage {
  if (!bucketId) throw new Error("Publication cache requires an explicit cache bucket");
  const store = new Client({ bucketId });
  return {
    uploadFromText: store.uploadFromText.bind(store),
    list: store.list.bind(store),
    delete: store.delete.bind(store),
    async epochGeneration() {
      try {
        const [metadata] = await generationStorage.bucket(bucketId).file(epochObject).getMetadata();
        const generation = String(metadata.generation ?? "");
        if (!/^\d+$/.test(generation)) throw new Error("Invalid publication cache generation");
        return generation;
      } catch (err) {
        if ((err as { code?: number }).code === 404) return "initial";
        throw err;
      }
    },
  };
}

// Same sidecar credential exchange as the installed @replit/object-storage
// SDK. Metadata generations distinguish even a delayed/retried epoch overwrite;
// a previously cached revision can never be resurrected by an older writer.
const generationStorage = new Storage({
  projectId: "",
  credentials: {
    audience: "replit", subject_token_type: "access_token", type: "external_account",
    token_url: "http://127.0.0.1:1106/token",
    credential_source: { url: "http://127.0.0.1:1106/credential", format: { type: "json", subject_token_field_name: "access_token" } },
    universe_domain: "googleapis.com",
  },
});

/** Separate instances in tests model separate Autoscale processes. */
export class PublicationCoordinator {
  private cached?: { state: PublicationState; expiresAt: number };
  private reading?: Promise<PublicationState>;
  private generation = 0;

  constructor(private readonly storage: () => PublicationStorage = createPublicationStorage) {}

  clear(): void {
    this.generation++;
    this.cached = undefined;
    this.reading = undefined;
  }

  async state(): Promise<PublicationState> {
    if (this.cached && this.cached.expiresAt > Date.now()) return this.cached.state;
    if (this.reading) return this.reading;
    const startedAt = Date.now();
    const generation = this.generation;
    let timeout: ReturnType<typeof setTimeout>;
    const deadline = new Promise<never>((_resolve, reject) => {
      timeout = setTimeout(() => reject(new Error("Publication control read timed out")), 2_000);
      timeout.unref();
    });
    const reading = Promise.race([this.readState(), deadline]).catch((err) => {
      logger.warn({ err }, "Publication cache control unavailable; reading from database");
      return BYPASS;
    }).then((state) => {
      if (this.generation === generation) {
        // The original read time bounds staleness even on a slow storage call.
        this.cached = { state, expiresAt: startedAt + CONTROL_TTL_MS };
      }
      return state;
    }).finally(() => {
      clearTimeout(timeout);
      if (this.reading === reading) this.reading = undefined;
    });
    this.reading = reading;
    return reading;
  }

  private async readState(): Promise<PublicationState> {
    const store = this.storage();
    // A fence has no automatic expiry. A crash must cost extra database reads,
    // never silently restore a response containing withdrawn public content.
    const [pending, epoch] = await Promise.all([
      store.list({ prefix: PUBLICATION_PENDING_PREFIX, maxResults: 1 }),
      store.epochGeneration(),
    ]);
    if (!pending.ok) throw pending.error;
    if (pending.value.length) return BYPASS;
    // A removed or uninitialized epoch must not resurrect an initial cache.
    if (epoch === "initial") return BYPASS;
    if (!/^\d+$/.test(epoch)) throw new Error("Invalid publication cache generation");
    return { epoch, cacheable: true };
  }

  async begin(): Promise<string> {
    const fence = `${PUBLICATION_PENDING_PREFIX}${randomUUID()}.json`;
    const result = await this.storage().uploadFromText(fence, JSON.stringify({ startedAt: new Date().toISOString() }));
    if (!result.ok) throw new Error("Public content was not saved: cache safety fence unavailable", { cause: result.error });
    this.clear();
    return fence;
  }

  async finish(fence: string): Promise<void> {
    if (!fence.startsWith(PUBLICATION_PENDING_PREFIX)) throw new Error("Invalid publication fence");
    const store = this.storage();
    // A unique epoch makes late writes from old requests unreachable. Each
    // writer removes only its own fence, so overlapping publishes remain safe.
    const rotated = await store.uploadFromText(PUBLICATION_EPOCH_OBJECT, JSON.stringify({ epoch: randomUUID() }));
    if (!rotated.ok) throw rotated.error;
    const removed = await store.delete(fence, { ignoreNotFound: true });
    if (!removed.ok) throw removed.error;
    this.clear();
  }

  async mutate<T>(write: () => PromiseLike<T>, onWarning?: () => void): Promise<T> {
    const fence = await this.begin();
    try {
      return await write();
    } finally {
      try {
        // Also rotate after a failed/partially completed maintenance operation.
        await this.finish(fence);
      } catch (err) {
        this.clear();
        logger.error({ err, fence }, "Publication fence retained; cache bypass requires operator recovery");
        // Do not report a committed insert as failed and invite duplicate saves.
        onWarning?.();
      }
    }
  }
}

export const publicationCoordinator = new PublicationCoordinator();

export async function withPublicContentMutation<T>(write: () => PromiseLike<T>, onWarning?: () => void): Promise<T> {
  if (!publicationFencingEnabled()) return await write();
  return publicationCoordinator.mutate(write, onWarning);
}
