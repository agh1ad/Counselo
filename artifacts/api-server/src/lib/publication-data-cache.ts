import { Client } from "@replit/object-storage";
import { publicationCacheEnabled, publicationCoordinator, type PublicationCoordinator } from "./publication-cache.js";
import { logger } from "./logger.js";

const MAX_BYTES = 8 * 1024 * 1024;
type DataStorage = Pick<Client, "downloadAsText" | "uploadFromText">;
async function boundedRead<T>(read: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  try {
    return await Promise.race([read, new Promise<never>((_resolve, reject) => {
      timer = setTimeout(() => reject(new Error("Public data storage read timed out")), 2_000);
      timer.unref();
    })]);
  } finally { clearTimeout(timer!); }
}
type Entry = { version: 1; createdAt: number; records: unknown };

export class PublicSnapshotUnavailableError extends Error {
  constructor(public readonly collection: string) {
    super(`Published ${collection} snapshot is unavailable`);
    this.name = "PublicSnapshotUnavailableError";
  }
}

/** Only explicitly published collections may use this cache. */
export class PublicationDataCache {
  private memory = new Map<string, string>();
  private loading = new Map<string, Promise<string>>();

  constructor(
    private readonly storage: () => DataStorage = () => new Client({ bucketId: process.env.PUBLIC_RESPONSE_CACHE_BUCKET_ID?.trim() }),
    private readonly coordinator: PublicationCoordinator = publicationCoordinator,
    private readonly enabled = publicationCacheEnabled(),
  ) {}

  async read<T>(
    collection: "blogs" | "work" | "work-summaries" | "legal-updates",
    load: () => Promise<T>,
    decode: (value: unknown) => T,
    options: { allowDatabaseFallback?: boolean; awaitPersistence?: boolean } = {},
  ): Promise<T> {
    const allowDatabaseFallback =
      options.allowDatabaseFallback ?? process.env.NODE_ENV !== "production";
    if (!this.enabled) return load();
    const state = await this.coordinator.state();
    if (!state.cacheable) {
      if (allowDatabaseFallback) return load();
      throw new PublicSnapshotUnavailableError(collection);
    }
    const key = `counselo/public-data-cache/v2/${state.epoch}/${collection}.json`;
    const decodeEntry = (source: string): T => {
      const entry = JSON.parse(source) as Entry;
      const age = Date.now() - entry.createdAt;
      if (entry.version !== 1 || !Number.isFinite(entry.createdAt) || age < 0) throw new Error("Invalid publication data");
      // Decode a separate object each time; callers cannot mutate shared data.
      return decode(entry.records);
    };
    const cached = this.memory.get(key);
    if (cached) {
      try { return decodeEntry(cached); } catch { this.memory.delete(key); }
    }
    let loading = this.loading.get(key);
    if (!loading) {
      loading = (async () => {
        const store = this.storage();
        try {
          const result = await boundedRead(store.downloadAsText(key));
          if (result.ok && Buffer.byteLength(result.value) <= MAX_BYTES) {
            decodeEntry(result.value);
            this.remember(key, result.value);
            return result.value;
          }
        } catch (err) {
          logger.warn({ err, collection }, "Public collection snapshot unavailable");
        }
        if (!allowDatabaseFallback) {
          throw new PublicSnapshotUnavailableError(collection);
        }
        const createdAt = Date.now();
        const records = await load();
        const source = JSON.stringify({ version: 1, createdAt, records });
        decodeEntry(source);
        if (Buffer.byteLength(source) <= MAX_BYTES) {
          this.remember(key, source);
          const persist = async () => {
            const written = await store.uploadFromText(key, source, { compress: true });
            if (!written.ok) throw written.error;
          };
          if (options.awaitPersistence) {
            await persist();
          } else {
            // Persistence must not delay a development response. A late upload
            // belongs only to this revision and cannot overwrite a newer one.
            void persist().catch(err => logger.warn({ err, collection }, "Public collection cache write failed"));
          }
        }
        return source;
      })();
      this.loading.set(key, loading);
      void loading.finally(() => { if (this.loading.get(key) === loading) this.loading.delete(key); }).catch(() => {});
    }
    return decodeEntry(await loading);
  }

  async prime<T>(
    collection: "blogs" | "work" | "work-summaries" | "legal-updates",
    load: () => Promise<T>,
    decode: (value: unknown) => T,
  ): Promise<T> {
    return this.read(collection, load, decode, {
      allowDatabaseFallback: true,
      awaitPersistence: true,
    });
  }

  private remember(key: string, value: string): void {
    this.memory.set(key, value);
    while (this.memory.size > 4) this.memory.delete(this.memory.keys().next().value!);
  }
}

export const publicationDataCache = new PublicationDataCache();
