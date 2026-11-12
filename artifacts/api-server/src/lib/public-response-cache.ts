import { createHash, randomUUID } from "node:crypto";
import { Client } from "@replit/object-storage";
import type { RequestHandler } from "express";
import { logger } from "./logger.js";

const CACHE_PREFIX = "counselo/public-response-cache/v3/";
export const PUBLIC_CACHE_GENERATION_OBJECT = `${CACHE_PREFIX}generation.json`;
const PROCESS_CACHE_TTL_MS = 15_000;
const PERSISTENT_CACHE_TTL_MS = 5 * 60_000;
const NOT_FOUND_CACHE_TTL_MS = 15_000;
const MAX_PROCESS_CACHE_ENTRIES = 500;
const STORAGE_RETRY_DELAY_MS = 5 * 60_000;
const SAFE_RESPONSE_HEADERS = [
  "Cache-Control", "Content-Disposition", "Content-Security-Policy", "Content-Type",
  "Cross-Origin-Resource-Policy", "X-CounselO-Page-Source", "X-Robots-Tag", "Content-Language", "Link", "Vary",
] as const;

type CacheStorage = Pick<Client, "downloadAsText" | "uploadFromText">;
export type PublicResponseCacheEntry = {
  version: 2;
  generation: string;
  createdAt: number;
  expiresAt: number;
  statusCode: number;
  body: string;
  bodyEncoding: "utf8" | "base64";
  headers: Record<string, string>;
};
type ProcessCacheEntry = { entry: PublicResponseCacheEntry; expiresAt: number };

export function publicResponseObjectName(cacheKey: string): string {
  return `${CACHE_PREFIX}${createHash("sha256").update(cacheKey).digest("hex")}.json`;
}

export function encodePublicResponseEntry(input: {
  statusCode: number;
  body: string | Buffer;
  headers: Record<string, string>;
  generation?: string;
}, createdAt = Date.now()): PublicResponseCacheEntry {
  return {
    version: 2,
    generation: input.generation ?? "local",
    createdAt,
    expiresAt: createdAt + (input.statusCode === 404 ? NOT_FOUND_CACHE_TTL_MS : PERSISTENT_CACHE_TTL_MS),
    statusCode: input.statusCode,
    body: Buffer.isBuffer(input.body) ? input.body.toString("base64") : input.body,
    bodyEncoding: Buffer.isBuffer(input.body) ? "base64" : "utf8",
    headers: input.headers,
  };
}

export function decodePublicResponseBody(entry: PublicResponseCacheEntry): string | Buffer {
  return entry.bodyEncoding === "base64" ? Buffer.from(entry.body, "base64") : entry.body;
}

function validEntry(value: unknown, generation: string, now: number): value is PublicResponseCacheEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<PublicResponseCacheEntry>;
  const ttl = entry.statusCode === 404 ? NOT_FOUND_CACHE_TTL_MS : PERSISTENT_CACHE_TTL_MS;
  return entry.version === 2 && entry.generation === generation &&
    (entry.statusCode === 200 || entry.statusCode === 404) && typeof entry.body === "string" &&
    (entry.bodyEncoding === "utf8" || entry.bodyEncoding === "base64") &&
    typeof entry.createdAt === "number" && Number.isFinite(entry.createdAt) && entry.createdAt <= now &&
    typeof entry.expiresAt === "number" && Number.isFinite(entry.expiresAt) && entry.expiresAt > now &&
    entry.expiresAt > entry.createdAt && entry.expiresAt - entry.createdAt <= ttl &&
    Boolean(entry.headers) && typeof entry.headers === "object" && !Array.isArray(entry.headers);
}

function responseHeaders(res: Parameters<RequestHandler>[1]): Record<string, string> {
  return Object.fromEntries(SAFE_RESPONSE_HEADERS.flatMap(name => {
    const value = res.getHeader(name);
    return typeof value === "string" ? [[name, value]] : [];
  }));
}

function sendCachedResponse(res: Parameters<RequestHandler>[1], entry: PublicResponseCacheEntry, source: "PROCESS" | "APP-STORAGE"): void {
  res.status(entry.statusCode);
  for (const name of SAFE_RESPONSE_HEADERS) {
    const value = entry.headers[name];
    if (typeof value === "string") res.setHeader(name, value);
  }
  res.setHeader("X-CounselO-Response-Cache", source);
  res.send(decodePublicResponseBody(entry));
}

/** Isolated state and an SDK-shaped storage dependency allow race/outage tests without external writes. */
export function createPublicResponseCache(options: {
  storage: () => CacheStorage | null;
  now?: () => number;
  token?: () => string;
  storageTimeoutMs?: number;
  onStorageFailure?: (error: unknown) => void;
}) {
  const now = options.now ?? Date.now;
  const token = options.token ?? randomUUID;
  const storageTimeoutMs = options.storageTimeoutMs ?? 3_000;
  const processCache = new Map<string, ProcessCacheEntry>();
  const writes = new Set<Promise<void>>();
  let epoch = 0;
  let invalidating = 0;
  let invalidationTail: Promise<void> = Promise.resolve();
  let needsInvalidation = false;
  let disabledUntil = 0;
  let warned = false;
  let generation: { value: string; expiresAt: number } | undefined;
  let generationRead: Promise<string | null> | undefined;

  function fail(error: unknown) {
    disabledUntil = now() + STORAGE_RETRY_DELAY_MS;
    generation = undefined;
    if (!warned) options.onStorageFailure?.(error);
    warned = true;
  }
  function success() { disabledUntil = 0; warned = false; }
  function client() { return now() < disabledUntil ? null : options.storage(); }
  async function bounded<T>(operation: Promise<T>): Promise<T> {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([operation, new Promise<never>((_resolve, reject) => {
        timeout = setTimeout(() => reject(new Error("Public cache storage timed out")), storageTimeoutMs);
      })]);
    } finally { if (timeout) clearTimeout(timeout); }
  }

  async function invalidate(): Promise<void> {
    const invalidationEpoch = ++epoch;
    invalidating++;
    processCache.clear();
    generation = undefined;
    generationRead = undefined;
    // One marker invalidates every entry, regardless of count. Data objects keep
    // stable names, so invalidations do not create a new bucket of objects.
    const operation = invalidationTail.then(async () => {
      try {
        const storage = options.storage();
        if (!storage) { needsInvalidation = false; return; }
        const value = token();
        const result = await bounded(storage.uploadFromText(PUBLIC_CACHE_GENERATION_OBJECT, JSON.stringify({ version: 1, value }), { compress: true }));
        if (!result.ok) throw result.error;
        success();
        needsInvalidation = false;
        if (epoch === invalidationEpoch) generation = { value, expiresAt: now() + PROCESS_CACHE_TTL_MS };
      } catch (error) {
        needsInvalidation = true;
        fail(error);
      } finally { invalidating--; }
    });
    invalidationTail = operation;
    await operation;
  }

  async function currentGeneration(): Promise<string | null> {
    if (invalidating) return null;
    if (needsInvalidation) {
      if (now() < disabledUntil) return null;
      await invalidate(); // Retry failed invalidation only when traffic resumes.
      return generation?.value ?? null;
    }
    if (generation && generation.expiresAt > now()) return generation.value;
    if (generationRead) return generationRead;
    const storage = client();
    if (!storage) return null;
    const readEpoch = epoch;
    const operation = (async () => {
      try {
        const result = await bounded(storage.downloadAsText(PUBLIC_CACHE_GENERATION_OBJECT));
        let value = "initial";
        if (result.ok) {
          const marker = JSON.parse(result.value);
          if (marker?.version !== 1 || typeof marker.value !== "string" || !/^[a-zA-Z0-9-]{1,100}$/.test(marker.value)) throw new Error("Invalid public cache generation");
          value = marker.value;
        } else if (result.error.statusCode !== 404) throw result.error;
        if (epoch !== readEpoch || invalidating) return null;
        success();
        generation = { value, expiresAt: now() + PROCESS_CACHE_TTL_MS };
        return value;
      } catch (error) { fail(error); return null; }
    })();
    generationRead = operation;
    try { return await operation; }
    finally { if (generationRead === operation) generationRead = undefined; }
  }

  async function readPersistent(key: string, value: string): Promise<PublicResponseCacheEntry | null> {
    const storage = client();
    if (!storage) return null;
    try {
      const result = await bounded(storage.downloadAsText(publicResponseObjectName(key)));
      if (!result.ok) {
        if (result.error.statusCode !== 404) fail(result.error);
        return null;
      }
      const entry: unknown = JSON.parse(result.value);
      if (!validEntry(entry, value, now())) return null;
      return entry;
    } catch (error) { fail(error); return null; }
  }

  function remember(key: string, entry: PublicResponseCacheEntry) {
    processCache.set(key, { entry, expiresAt: Math.min(entry.expiresAt, now() + PROCESS_CACHE_TTL_MS) });
    while (processCache.size > MAX_PROCESS_CACHE_ENTRIES) processCache.delete(processCache.keys().next().value!);
  }

  function persist(key: string, entry: PublicResponseCacheEntry, requestEpoch: number) {
    const storage = client();
    // Unknown slugs must not leave permanent objects in storage. Their short
    // negative cache stays within the bounded in-process map.
    if (!storage || entry.statusCode !== 200 || epoch !== requestEpoch || invalidating || entry.expiresAt <= now()) return;
    const operation = (async () => {
      try {
        // If this upload finishes after invalidation, its old generation cannot
        // be replayed. The same holds for late writes from another instance.
        const result = await bounded(storage.uploadFromText(publicResponseObjectName(key), JSON.stringify(entry), { compress: true }));
        if (!result.ok) fail(result.error);
      } catch (error) { fail(error); }
    })();
    writes.add(operation);
    void operation.finally(() => writes.delete(operation));
  }

  function middleware(keyPrefix: string, isEligible: (path: string) => boolean): RequestHandler {
    return async (req, res, next) => {
      // Query variants have no cache contract and must not create unbounded
      // persistent keys (or conflate filtered responses with the main route).
      if ((req.method !== "GET" && req.method !== "HEAD") || !isEligible(req.path) || /[?%]/.test(req.originalUrl) || req.headers.authorization) { next(); return; }
      const requestEpoch = epoch;
      const requestStartedAt = now();
      const value = await currentGeneration();
      if (requestEpoch !== epoch || invalidating) { next(); return; }
      const key = `${keyPrefix}:GET:${req.originalUrl}`;
      const localGeneration = value ?? `local-${epoch}`;
      const cached = processCache.get(key);
      if (cached && cached.expiresAt > now() && validEntry(cached.entry, localGeneration, now())) {
        sendCachedResponse(res, cached.entry, "PROCESS");
        return;
      }
      processCache.delete(key);
      const stored = value ? await readPersistent(key, value) : null;
      if (requestEpoch !== epoch || invalidating) { next(); return; }
      if (stored) {
        remember(key, stored);
        sendCachedResponse(res, stored, "APP-STORAGE");
        return;
      }
      const originalSend = res.send.bind(res);
      res.send = ((body: unknown) => {
        if (epoch === requestEpoch && !invalidating && (res.statusCode === 200 || res.statusCode === 404) &&
            (typeof body === "string" || Buffer.isBuffer(body)) && !res.hasHeader("Set-Cookie") &&
            !/\bprivate\b/i.test(String(res.getHeader("Cache-Control") ?? "")) &&
            !/(?:^|,)\s*(?:cookie|authorization|\*)\s*(?:,|$)/i.test(String(res.getHeader("Vary") ?? ""))) {
          // Measure age from request start: a slow response cannot extend the
          // lifetime of content read before an intervening update.
          const entry = encodePublicResponseEntry({ statusCode: res.statusCode, body, headers: responseHeaders(res), generation: localGeneration }, requestStartedAt);
          if (entry.expiresAt > now()) {
            remember(key, entry);
            if (value) persist(key, entry, requestEpoch);
          }
        }
        return originalSend(body);
      }) as typeof res.send;
      res.setHeader("X-CounselO-Response-Cache", "MISS");
      next();
    };
  }

  return { middleware, invalidate, waitForPendingWrites: async () => { await Promise.all([...writes]); } };
}

const publicCache = createPublicResponseCache({
  storage: () => process.env.NODE_ENV !== "test" && process.env.PUBLIC_RESPONSE_CACHE_BACKEND === "object-storage" ? new Client() : null,
  onStorageFailure: error => logger.warn({ err: error }, "Persistent public response cache unavailable; using database fallback"),
});
export const cachePublicResponses = publicCache.middleware;
export const invalidatePublicResponseCache = publicCache.invalidate;
