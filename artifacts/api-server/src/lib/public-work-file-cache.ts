import { createHash } from "node:crypto";
import { Client } from "@replit/object-storage";
import { publicationCacheEnabled, publicationCoordinator } from "./publication-cache.js";
import { logger } from "./logger.js";

const MAX_BYTES = 32 * 1024 * 1024;
const PREFIX = "counselo/public-work-files/v1/";

export type PublicWorkFile = {
  slug: string;
  fileName: string;
  fileMimeType: string;
  fileData: string;
  fileSize: number;
  published: true;
  confidentialityConfirmed: true;
  updatedAt: Date | string | null;
};

export class PublicWorkFileUnavailableError extends Error {
  constructor() {
    super("Published work file snapshot is unavailable");
    this.name = "PublicWorkFileUnavailableError";
  }
}

type Entry = { version: 1; createdAt: number; file: PublicWorkFile };
type DataStorage = Pick<Client, "downloadAsText" | "uploadFromText">;

function key(epoch: string, slug: string): string {
  const digest = createHash("sha256").update(slug).digest("hex");
  return `${PREFIX}${epoch}/${digest}.json`;
}

async function boundedRead<T>(read: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  try {
    return await Promise.race([read, new Promise<never>((_resolve, reject) => {
      timer = setTimeout(() => reject(new Error("Public work file read timed out")), 2_000);
      timer.unref();
    })]);
  } finally {
    clearTimeout(timer!);
  }
}

function decode(source: string): PublicWorkFile {
  const entry = JSON.parse(source) as Entry;
  if (
    entry.version !== 1 ||
    !entry.file ||
    entry.file.published !== true ||
    entry.file.confidentialityConfirmed !== true ||
    typeof entry.file.slug !== "string" ||
    typeof entry.file.fileData !== "string" ||
    typeof entry.file.fileSize !== "number" ||
    entry.file.fileSize <= 0
  ) {
    throw new Error("Invalid public work file snapshot");
  }
  return entry.file;
}

export class PublicWorkFileCache {
  private memory = new Map<string, string>();

  constructor(
    private readonly storage: () => DataStorage = () => new Client({ bucketId: process.env.PUBLIC_RESPONSE_CACHE_BUCKET_ID?.trim() }),
    private readonly coordinator = publicationCoordinator,
    private readonly enabled = publicationCacheEnabled(),
  ) {}

  async read(
    slug: string,
    load: () => Promise<PublicWorkFile | undefined>,
    options: { allowDatabaseFallback?: boolean } = {},
  ): Promise<PublicWorkFile | undefined> {
    const allowDatabaseFallback =
      options.allowDatabaseFallback ?? process.env.NODE_ENV !== "production";
    if (!this.enabled) return load();
    const state = await this.coordinator.state();
    if (!state.cacheable) {
      if (allowDatabaseFallback) return load();
      throw new PublicWorkFileUnavailableError();
    }
    const objectKey = key(state.epoch, slug);
    const cached = this.memory.get(objectKey);
    if (cached) {
      try {
        return decode(cached);
      } catch {
        this.memory.delete(objectKey);
      }
    }
    try {
      const result = await boundedRead(this.storage().downloadAsText(objectKey));
      if (result.ok && Buffer.byteLength(result.value) <= MAX_BYTES) {
        const file = decode(result.value);
        this.memory.set(objectKey, result.value);
        return file;
      }
    } catch (error) {
      logger.warn({ err: error, slug }, "Public work file snapshot unavailable");
    }
    if (!allowDatabaseFallback) throw new PublicWorkFileUnavailableError();
    return load();
  }

  async prime(files: PublicWorkFile[]): Promise<void> {
    if (!this.enabled) return;
    const state = await this.coordinator.state();
    if (!state.cacheable) throw new PublicWorkFileUnavailableError();
    const store = this.storage();
    await Promise.all(files.map(async (file) => {
      const source = JSON.stringify({ version: 1, createdAt: Date.now(), file });
      if (Buffer.byteLength(source) > MAX_BYTES) {
        throw new Error(`Public work file ${file.slug} exceeds snapshot limit`);
      }
      decode(source);
      const written = await store.uploadFromText(key(state.epoch, file.slug), source, { compress: true });
      if (!written.ok) throw written.error;
      this.memory.set(key(state.epoch, file.slug), source);
    }));
  }
}

export const publicWorkFileCache = new PublicWorkFileCache();