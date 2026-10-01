import { createHash } from "node:crypto";
import { Client } from "@replit/object-storage";
import type { RequestHandler } from "express";
import { logger } from "./logger.js";
import { PUBLIC_CACHE_DEPLOYMENT_VERSION } from "./public-cache-version.js";
import { publicationCacheEnabled, publicationCoordinator, type PublicationCoordinator } from "./publication-cache.js";

const CACHE_PREFIX = "counselo/public-response-cache/v2/";
const PROCESS_CACHE_TTL_MS = 15_000;
const PERSISTENT_CACHE_MAX_AGE_MS = 5 * 60_000;
const PUBLICATION_CACHE_MAX_AGE_MS = 24 * 60 * 60_000;
const MAX_PROCESS_CACHE_ENTRIES = 500;
const INVALIDATION_BATCH_SIZE = 250;
const INVALIDATION_DELETE_CONCURRENCY = 8;
const MAX_INVALIDATION_BATCHES = 20;
const STORAGE_RETRY_DELAY_MS = 5 * 60_000;
const MAX_RESPONSE_BYTES = 2 * 1024 * 1024;

/** Attribution parameters do not change these public handlers' response bodies. */
export function publicResponseCacheUrl(originalUrl: string): string {
  const separator = originalUrl.indexOf("?");
  if (separator < 0) return originalUrl;
  const params = new URLSearchParams(originalUrl.slice(separator + 1));
  for (const key of [...params.keys()]) {
    if (/^utm_/i.test(key) || /^(gclid|dclid|fbclid|msclkid)$/i.test(key)) params.delete(key);
  }
  const query = params.toString();
  return originalUrl.slice(0, separator) + (query ? `?${query}` : "");
}

const SAFE_RESPONSE_HEADERS = [
  "Cache-Control",
  "Content-Disposition",
  "Content-Security-Policy",
  "Content-Type",
  "Cross-Origin-Resource-Policy",
  "X-CounselO-Page-Source",
  "Location",
] as const;

export type PublicResponseCacheEntry = {
  version: 2;
  createdAt: number;
  statusCode: number;
  body: string;
  bodyEncoding: "utf8" | "base64";
  headers: Record<string, string>;
};

type ProcessCacheEntry = PublicResponseCacheEntry & { expiresAt: number };

const processCache = new Map<string, ProcessCacheEntry>();
const pendingResponses = new Map<string, Promise<void>>();
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
  // Explicit selection avoids a failing default-bucket sidecar lookup in production.
  const bucketId = process.env["PUBLIC_RESPONSE_CACHE_BUCKET_ID"]?.trim();
  return new Client(bucketId ? { bucketId } : undefined);
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

export function publicResponseObjectName(cacheKey: string, deploymentVersion: string): string {
  const digest = createHash("sha256").update(cacheKey).digest("hex");
  return `${CACHE_PREFIX}${deploymentVersion}/${digest}.json`;
}

export function encodePublicResponseEntry(input: {
  statusCode: number;
  body: string | Buffer;
  headers: Record<string, string>;
  createdAt?: number;
}): PublicResponseCacheEntry {
  return {
    version: 2,
    createdAt: input.createdAt ?? Date.now(),
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
    entry.version === 2 &&
    typeof entry.createdAt === "number" &&
    Number.isFinite(entry.createdAt) &&
    entry.createdAt > 0 &&
    typeof entry.statusCode === "number" &&
    typeof entry.body === "string" &&
    (entry.bodyEncoding === "utf8" || entry.bodyEncoding === "base64") &&
    Boolean(entry.headers) &&
    typeof entry.headers === "object"
  );
}

async function readPersistentEntry(
  cacheKey: string,
  deploymentVersion: string | null,
  maxAge = PERSISTENT_CACHE_MAX_AGE_MS,
): Promise<PublicResponseCacheEntry | null> {
  if (!deploymentVersion) return null;
  const client = storageClient();
  if (!client) return null;
  try {
    const result = await client.downloadAsText(publicResponseObjectName(cacheKey, deploymentVersion));
    if (!result.ok) {
      if (result.error.statusCode !== 404) noteStorageFailure(result.error);
      return null;
    }
    const parsed: unknown = JSON.parse(result.value);
    if (!isPublicResponseCacheEntry(parsed)) return null;
    noteStorageSuccess();
    const age = Date.now() - parsed.createdAt;
    if (age < 0 || age >= maxAge) return null;
    return parsed;
  } catch (error) {
    noteStorageFailure(error);
    return null;
  }
}

async function writePersistentEntry(
  cacheKey: string,
  entry: PublicResponseCacheEntry,
  deploymentVersion: string | null,
): Promise<void> {
  if (!deploymentVersion) return;
  const client = storageClient();
  if (!client) return;
  try {
    const result = await client.uploadFromText(
      publicResponseObjectName(cacheKey, deploymentVersion),
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

export function clearPublicResponseProcessCache(): void {
  processCache.clear();
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
  if (entry.statusCode === 301 && entry.headers.Location) {
    // Recreate Express's negotiated redirect body for this request's Accept.
    res.redirect(301, entry.headers.Location);
    return;
  }
  if (entry.headers["Content-Security-Policy"] === "frame-ancestors 'self'") {
    res.removeHeader("X-Frame-Options");
  }
  res.send(decodePublicResponseBody(entry));
}

export function cachePublicResponses(
  keyPrefix: string,
  isEligible: (path: string) => boolean,
  deploymentVersion: string | null = PUBLIC_CACHE_DEPLOYMENT_VERSION,
  coordinator: PublicationCoordinator = publicationCoordinator,
): RequestHandler {
  return async (req, res, next) => {
    if (
      (req.method !== "GET" && req.method !== "HEAD") ||
      Boolean(req.headers.authorization) ||
      !isEligible(req.path)
    ) {
      next();
      return;
    }

    // Never reuse an older process response when publication state is unknown.
    // The control check is shared for at most 15 seconds, rather than waking
    // PostgreSQL to refresh every URL every five minutes.
    let namespace = deploymentVersion;
    let maxAge = PERSISTENT_CACHE_MAX_AGE_MS;
    if (publicationCacheEnabled()) {
      const state = deploymentVersion ? await coordinator.state() : null;
      if (!state?.cacheable) {
        res.setHeader("X-CounselO-Response-Cache", "BYPASS");
        next();
        return;
      }
      namespace = `${deploymentVersion}/publication/${state.epoch}`;
      maxAge = PUBLICATION_CACHE_MAX_AGE_MS;
    }

    // Revision validation already precedes every process lookup. Keep warm
    // responses for the revision lifetime instead of re-downloading every 15s.
    const processTtl = publicationCacheEnabled() ? maxAge : PROCESS_CACHE_TTL_MS;
    const cacheMethod = req.method === "HEAD" ? "GET" : req.method;
    const cacheKey = `${keyPrefix}:${cacheMethod}:${publicResponseCacheUrl(req.originalUrl)}`;
    const processKey = `${namespace ?? "process-only"}:${cacheKey}`;
    const processEntry = processCache.get(processKey);
    if (processEntry && processEntry.expiresAt > Date.now()) {
      sendCachedResponse(res, processEntry, "PROCESS");
      return;
    }
    if (processEntry) processCache.delete(processKey);

    const pendingResponse = pendingResponses.get(processKey);
    if (pendingResponse) {
      await pendingResponse;
      const generated = processCache.get(processKey);
      if (generated && generated.expiresAt > Date.now()) {
        sendCachedResponse(res, generated, "PROCESS");
        return;
      }
    }

    // Coalesce cold readers before either App Storage or PostgreSQL is queried.
    // Release on errors, disconnects and a bounded deadline as well as success.
    if (!pendingResponses.has(processKey) && pendingResponses.size < MAX_PROCESS_CACHE_ENTRIES) {
      let release!: () => void;
      const pending = new Promise<void>(resolve => { release = resolve; });
      pendingResponses.set(processKey, pending);
      let timeout: ReturnType<typeof setTimeout>;
      const finish = () => {
        clearTimeout(timeout);
        if (pendingResponses.get(processKey) === pending) pendingResponses.delete(processKey);
        release();
      };
      timeout = setTimeout(finish, 5_000);
      timeout.unref();
      res.once("finish", finish);
      res.once("close", finish);
    }

    const persistentEntry = await readPersistentEntry(cacheKey, namespace, maxAge);
    if (persistentEntry) {
      processCache.set(processKey, {
        ...persistentEntry,
        expiresAt: Math.min(Date.now() + processTtl, persistentEntry.createdAt + maxAge),
      });
      trimProcessCache();
      sendCachedResponse(res, persistentEntry, "APP-STORAGE");
      return;
    }

    const responseStartedAt = Date.now();
    const originalSend = res.send.bind(res);
    const remember = (body: unknown) => {
      const cacheableStatus = res.statusCode === 200 || res.statusCode === 404 || res.statusCode === 301;
      if (
        cacheableStatus &&
        !res.getHeader("Set-Cookie") &&
        (typeof body === "string" || Buffer.isBuffer(body)) &&
        Buffer.byteLength(body) <= MAX_RESPONSE_BYTES
      ) {
        const entry = encodePublicResponseEntry({
          statusCode: res.statusCode,
          body,
          headers: responseHeaders(res),
          createdAt: responseStartedAt,
        });
        processCache.set(processKey, {
          ...entry,
          expiresAt: Math.min(Date.now() + processTtl, entry.createdAt + maxAge),
        });
        trimProcessCache();
        void writePersistentEntry(cacheKey, entry, namespace);
      }
    };
    res.send = ((body: unknown) => {
      remember(body);
      return originalSend(body);
    }) as typeof res.send;
    // Express redirects end the response directly rather than calling send().
    const originalEnd = res.end.bind(res);
    res.end = ((chunk: unknown, ...args: unknown[]) => {
      if (res.statusCode === 301) remember(chunk);
      return Reflect.apply(originalEnd, res, [chunk, ...args]);
    }) as typeof res.end;

    res.setHeader("X-CounselO-Response-Cache", "MISS");
    next();
  };
}

export async function invalidatePublicResponseCache(
  deploymentVersion: string | null = PUBLIC_CACHE_DEPLOYMENT_VERSION,
): Promise<{ complete: boolean; deleted: number; reason: "complete" | "unavailable" | "failed" }> {
  clearPublicResponseProcessCache();
  if (publicationCacheEnabled()) {
    try {
      const fence = await publicationCoordinator.begin();
      await publicationCoordinator.finish(fence);
      return { complete: true, deleted: 0, reason: "complete" };
    } catch (err) {
      logger.error({ err }, "Publication cache invalidation failed; fence retained when created");
      return { complete: false, deleted: 0, reason: "failed" };
    }
  }
  const client = storageClient();
  if (!client) return { complete: false, deleted: 0, reason: "unavailable" };
  let deleted = 0;
  try {
    // Source maintenance scripts have no bundled identity, so they retain
    // the ability to invalidate the whole current cache format. The SDK caps
    // total results, not one page: re-list only after deleting each full batch.
    const prefix = deploymentVersion ? `${CACHE_PREFIX}${deploymentVersion}/` : CACHE_PREFIX;
    for (let batch = 0; batch <= MAX_INVALIDATION_BATCHES; batch += 1) {
      const listed = await client.list({ prefix, maxResults: INVALIDATION_BATCH_SIZE });
      if (!listed.ok) throw listed.error;
      if (listed.value.length === 0) {
        noteStorageSuccess();
        return { complete: true, deleted, reason: "complete" };
      }
      if (batch === MAX_INVALIDATION_BATCHES) {
        throw new Error(`Public response cache purge incomplete after ${batch} batches (${deleted} deleted)`);
      }
      for (let start = 0; start < listed.value.length; start += INVALIDATION_DELETE_CONCURRENCY) {
        const outcomes = await Promise.allSettled(
          listed.value.slice(start, start + INVALIDATION_DELETE_CONCURRENCY).map(async (object) => {
            const result = await client.delete(object.name, { ignoreNotFound: true });
            if (!result.ok) throw result.error;
            deleted += 1;
          }),
        );
        const failure = outcomes.find((outcome) => outcome.status === "rejected");
        if (failure?.status === "rejected") throw failure.reason;
      }
    }
    throw new Error("Public response cache purge ended without confirming an empty namespace");
  } catch (error) {
    noteStorageFailure(error);
    return { complete: false, deleted, reason: "failed" };
  }
}
