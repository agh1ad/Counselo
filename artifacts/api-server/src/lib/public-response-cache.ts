import { createHash } from "node:crypto";
import { Client } from "@replit/object-storage";
import type { RequestHandler } from "express";
import { logger } from "./logger.js";

const CACHE_PREFIX = "counselo/public-response-cache/v1/";
const PROCESS_CACHE_TTL_MS = 15_000;
const MAX_PROCESS_CACHE_ENTRIES = 500;
const MAX_PERSISTENT_ENTRIES = 1_000;
const STORAGE_RETRY_DELAY_MS = 5 * 60_000;

const SAFE_RESPONSE_HEADERS = [
  "Cache-Control",
  "Content-Disposition",
  "Content-Security-Policy",
  "Content-Type",
  "Cross-Origin-Resource-Policy",
  "X-CounselO-Page-Source",
] as const;

export type PublicResponseCacheEntry = {
  version: 1;
  statusCode: number;
  body: string;
  bodyEncoding: "utf8" | "base64";
  headers: Record<string, string>;
};

type ProcessCacheEntry = PublicResponseCacheEntry & { expiresAt: number };

const processCache = new Map<string, ProcessCacheEntry>();
let storageDisabledUntil = 0;
let storageWarningLogged = false;

function objectStorageEnabled(): boolean {
  return (
    process.env.NODE_ENV !== "test" &&
    process.env["PUBLIC_RESPONSE_CACHE_BACKEND"] === "object-storage"
  );
}

function storageClient(): Client | null {
  if (!objectStorageEnabled() || Date.now() < storageDisabledUntil) return null;
  return new Client();
}

function noteStorageFailure(error: unknown): void {
  storageDisabledUntil = Date.now() + STORAGE_RETRY_DELAY_MS;
  if (storageWarningLogged) return;
  storageWarningLogged = true;
  logger.warn(
    { err: error },
    "Persistent public response cache unavailable; using database fallback",
  );
}

function noteStorageSuccess(): void {
  storageDisabledUntil = 0;
  storageWarningLogged = false;
}

export function publicResponseObjectName(cacheKey: string): string {
  const digest = createHash("sha256").update(cacheKey).digest("hex");
  return `${CACHE_PREFIX}${digest}.json`;
}

export function encodePublicResponseEntry(input: {
  statusCode: number;
  body: string | Buffer;
  headers: Record<string, string>;
}): PublicResponseCacheEntry {
  return {
    version: 1,
    statusCode: input.statusCode,
    body: Buffer.isBuffer(input.body)
      ? input.body.toString("base64")
      : input.body,
    bodyEncoding: Buffer.isBuffer(input.body) ? "base64" : "utf8",
    headers: input.headers,
  };
}

export function decodePublicResponseBody(
  entry: PublicResponseCacheEntry,
): string | Buffer {
  return entry.bodyEncoding === "base64"
    ? Buffer.from(entry.body, "base64")
    : entry.body;
}

function isPublicResponseCacheEntry(
  value: unknown,
): value is PublicResponseCacheEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<PublicResponseCacheEntry>;
  return (
    entry.version === 1 &&
    typeof entry.statusCode === "number" &&
    typeof entry.body === "string" &&
    (entry.bodyEncoding === "utf8" || entry.bodyEncoding === "base64") &&
    Boolean(entry.headers) &&
    typeof entry.headers === "object"
  );
}

async function readPersistentEntry(
  cacheKey: string,
): Promise<PublicResponseCacheEntry | null> {
  const client = storageClient();
  if (!client) return null;
  try {
    const result = await client.downloadAsText(publicResponseObjectName(cacheKey));
    if (!result.ok) {
      if (result.error.statusCode !== 404) noteStorageFailure(result.error);
      return null;
    }
    const parsed: unknown = JSON.parse(result.value);
    if (!isPublicResponseCacheEntry(parsed)) return null;
    noteStorageSuccess();
    return parsed;
  } catch (error) {
    noteStorageFailure(error);
    return null;
  }
}

async function writePersistentEntry(
  cacheKey: string,
  entry: PublicResponseCacheEntry,
): Promise<void> {
  const client = storageClient();
  if (!client) return;
  try {
    const result = await client.uploadFromText(
      publicResponseObjectName(cacheKey),
      JSON.stringify(entry),
      { compress: true },
    );
    if (!result.ok) {
      noteStorageFailure(result.error);
      return;
    }
    noteStorageSuccess();
  } catch (error) {
    noteStorageFailure(error);
  }
}

function trimProcessCache(): void {
  while (processCache.size > MAX_PROCESS_CACHE_ENTRIES) {
    const oldestKey = processCache.keys().next().value as string | undefined;
    if (!oldestKey) return;
    processCache.delete(oldestKey);
  }
}

function responseHeaders(res: Parameters<RequestHandler>[1]): Record<string, string> {
  const headers: Record<string, string> = {};
  for (const name of SAFE_RESPONSE_HEADERS) {
    const value = res.getHeader(name);
    if (typeof value === "string") headers[name] = value;
  }
  return headers;
}

function sendCachedResponse(
  res: Parameters<RequestHandler>[1],
  entry: PublicResponseCacheEntry,
  source: "PROCESS" | "APP-STORAGE",
): void {
  res.status(entry.statusCode);
  for (const [name, value] of Object.entries(entry.headers)) {
    res.setHeader(name, value);
  }
  res.setHeader("X-CounselO-Response-Cache", source);
  res.send(decodePublicResponseBody(entry));
}

export function cachePublicResponses(
  keyPrefix: string,
  isEligible: (path: string) => boolean,
): RequestHandler {
  return async (req, res, next) => {
    if (
      (req.method !== "GET" && req.method !== "HEAD") ||
      !isEligible(req.path)
    ) {
      next();
      return;
    }

    const cacheMethod = req.method === "HEAD" ? "GET" : req.method;
    const cacheKey = `${keyPrefix}:${cacheMethod}:${req.originalUrl}`;
    const processEntry = processCache.get(cacheKey);
    if (processEntry && processEntry.expiresAt > Date.now()) {
      sendCachedResponse(res, processEntry, "PROCESS");
      return;
    }
    if (processEntry) processCache.delete(cacheKey);

    const persistentEntry = await readPersistentEntry(cacheKey);
    if (persistentEntry) {
      processCache.set(cacheKey, {
        ...persistentEntry,
        expiresAt: Date.now() + PROCESS_CACHE_TTL_MS,
      });
      trimProcessCache();
      sendCachedResponse(res, persistentEntry, "APP-STORAGE");
      return;
    }

    const originalSend = res.send.bind(res);
    res.send = ((body: unknown) => {
      const cacheableStatus = res.statusCode === 200 || res.statusCode === 404;
      if (
        cacheableStatus &&
        (typeof body === "string" || Buffer.isBuffer(body))
      ) {
        const entry = encodePublicResponseEntry({
          statusCode: res.statusCode,
          body,
          headers: responseHeaders(res),
        });
        processCache.set(cacheKey, {
          ...entry,
          expiresAt: Date.now() + PROCESS_CACHE_TTL_MS,
        });
        trimProcessCache();
        void writePersistentEntry(cacheKey, entry);
      }
      return originalSend(body);
    }) as typeof res.send;

    res.setHeader("X-CounselO-Response-Cache", "MISS");
    next();
  };
}

export async function invalidatePublicResponseCache(): Promise<void> {
  processCache.clear();
  const client = storageClient();
  if (!client) return;
  try {
    const listed = await client.list({
      prefix: CACHE_PREFIX,
      maxResults: MAX_PERSISTENT_ENTRIES,
    });
    if (!listed.ok) {
      noteStorageFailure(listed.error);
      return;
    }
    await Promise.all(
      listed.value.map(async (object) => {
        const result = await client.delete(object.name, { ignoreNotFound: true });
        if (!result.ok) throw result.error;
      }),
    );
    noteStorageSuccess();
  } catch (error) {
    noteStorageFailure(error);
  }
}
