import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { createHash } from "node:crypto";
import type { Server } from "node:http";
import express from "express";
import { Client } from "@replit/object-storage";
import { logger } from "./logger.js";
import {
  cachePublicResponses,
  decodePublicResponseBody,
  encodePublicResponseEntry,
  invalidatePublicResponseCache,
  publicResponseObjectName,
} from "./public-response-cache.js";

function fakeStorage(t: TestContext) {
  const oldEnv = { node: process.env.NODE_ENV, backend: process.env.PUBLIC_RESPONSE_CACHE_BACKEND };
  process.env.NODE_ENV = "production";
  process.env.PUBLIC_RESPONSE_CACHE_BACKEND = "object-storage";
  t.after(() => {
    if (oldEnv.node === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = oldEnv.node;
    if (oldEnv.backend === undefined) delete process.env.PUBLIC_RESPONSE_CACHE_BACKEND; else process.env.PUBLIC_RESPONSE_CACHE_BACKEND = oldEnv.backend;
  });
  const stored = new Map<string, string>();
  const stats = { lists: 0, activeDeletes: 0, maximumDeletes: 0 };
  t.mock.method(Client.prototype as unknown as { init: () => Promise<unknown> }, "init", async () => ({}));
  t.mock.method(Client.prototype, "downloadAsText", (async (name: string) => stored.has(name)
    ? { ok: true, value: stored.get(name) } : { ok: false, error: { statusCode: 404 } }) as never);
  t.mock.method(Client.prototype, "uploadFromText", (async (name: string, value: string) => {
    stored.set(name, value);
    return { ok: true };
  }) as never);
  t.mock.method(Client.prototype, "list", (async ({ prefix, maxResults }: { prefix: string; maxResults: number }) => {
    stats.lists += 1;
    return { ok: true, value: [...stored.keys()].filter(name => name.startsWith(prefix)).slice(0, maxResults).map(name => ({ name })) };
  }) as never);
  t.mock.method(Client.prototype, "delete", (async (name: string) => {
    stats.activeDeletes += 1;
    stats.maximumDeletes = Math.max(stats.maximumDeletes, stats.activeDeletes);
    await Promise.resolve();
    stored.delete(name);
    stats.activeDeletes -= 1;
    return { ok: true };
  }) as never);
  return { stored, stats };
}

test("cache invalidation selects the configured bucket without default discovery", async (t) => {
  fakeStorage(t);
  const previousBucket = process.env.PUBLIC_RESPONSE_CACHE_BUCKET_ID;
  t.after(() => {
    if (previousBucket === undefined) delete process.env.PUBLIC_RESPONSE_CACHE_BUCKET_ID;
    else process.env.PUBLIC_RESPONSE_CACHE_BUCKET_ID = previousBucket;
  });
  const buckets: (string | undefined)[] = [];
  t.mock.method(Client.prototype as unknown as { init: (bucketId?: string) => Promise<unknown> }, "init", async (bucketId?: string) => {
    buckets.push(bucketId);
    return {};
  });
  process.env.PUBLIC_RESPONSE_CACHE_BUCKET_ID = "  configured-cache-bucket  ";
  await invalidatePublicResponseCache("a".repeat(64));
  assert.deepEqual(buckets, ["configured-cache-bucket"]);
  delete process.env.PUBLIC_RESPONSE_CACHE_BUCKET_ID;
  await invalidatePublicResponseCache("a".repeat(64));
  assert.deepEqual(buckets, ["configured-cache-bucket", undefined]);
});

test("persistent cache keys are deterministic and do not expose URLs", () => {
  const key = "page:GET:/blog/en/confidential-contract-query?source=test";
  const release = "a".repeat(64);
  const first = publicResponseObjectName(key, release);
  const second = publicResponseObjectName(key, release);
  assert.equal(first, second);
  assert.match(first, /^counselo\/public-response-cache\/v2\/[a-f0-9]{64}\/[a-f0-9]{64}\.json$/);
  assert.notEqual(first, publicResponseObjectName(key, "b".repeat(64)));
  assert.doesNotMatch(first, /confidential|source=test/);
});

test("API and HTML never read prior deployment entries, retain process hits and invalidate current publications", async (t) => {
  const oldEnv = { node: process.env.NODE_ENV, backend: process.env.PUBLIC_RESPONSE_CACHE_BACKEND };
  process.env.NODE_ENV = "production";
  process.env.PUBLIC_RESPONSE_CACHE_BACKEND = "object-storage";
  const stored = new Map<string, string>();
  const reads: string[] = [];
  const lists: string[] = [];
  const firstVersion = "a".repeat(64), nextVersion = "b".repeat(64);
  const staleEntry = JSON.stringify(encodePublicResponseEntry({ statusCode: 200, body: "stale release", headers: {} }));
  for (const key of ["api:GET:/api/blog/posts", "page:GET:/blog/en/article"]) {
    stored.set(`counselo/public-response-cache/v1/${createHash("sha256").update(key).digest("hex")}.json`, staleEntry);
    stored.set(publicResponseObjectName(key, "0".repeat(64)), staleEntry);
  }
  // Prevent even the SDK constructor from attempting Replit bucket discovery.
  t.mock.method(Client.prototype as unknown as { init: () => Promise<unknown> }, "init", async () => ({}));
  t.mock.method(Client.prototype, "downloadAsText", (async (name: string) => {
    reads.push(name);
    return stored.has(name) ? { ok: true, value: stored.get(name) } : { ok: false, error: { statusCode: 404 } };
  }) as never);
  t.mock.method(Client.prototype, "uploadFromText", (async (name: string, value: string) => {
    stored.set(name, value);
    return { ok: true };
  }) as never);
  t.mock.method(Client.prototype, "list", (async ({ prefix, maxResults }: { prefix: string; maxResults: number }) => {
    lists.push(prefix);
    return { ok: true, value: [...stored.keys()].filter(name => name.startsWith(prefix)).slice(0, maxResults).map(name => ({ name })) };
  }) as never);
  t.mock.method(Client.prototype, "delete", (async (name: string) => {
    stored.delete(name);
    return { ok: true };
  }) as never);
  let apiBody = "first API", pageBody = "first HTML";
  const servers: Server[] = [];
  const makeApp = async (version: string | null) => {
    const app = express();
    app.use("/api", cachePublicResponses("api", () => true, version));
    app.get("/api/blog/posts", (_req, res) => res.send(apiBody));
    app.use(cachePublicResponses("page", () => true, version));
    app.get("/blog/en/article", (_req, res) => res.send(pageBody));
    const server = app.listen(0, "127.0.0.1");
    servers.push(server);
    await new Promise<void>(resolve => server.once("listening", resolve));
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    return `http://127.0.0.1:${address.port}`;
  };
  const request = async (origin: string, route: string, expected: string, cache: string) => {
    const response = await fetch(origin + route);
    assert.equal(await response.text(), expected);
    assert.equal(response.headers.get("x-counselo-response-cache"), cache);
  };
  try {
    const first = await makeApp(firstVersion);
    for (const [route, body] of [["/api/blog/posts", apiBody], ["/blog/en/article", pageBody]]) {
      await request(first, route, body, "MISS");
      await request(first, route, body, "PROCESS");
    }
    apiBody = "next API repair"; pageBody = "next HTML assets";
    const second = await makeApp(nextVersion);
    await request(second, "/api/blog/posts", apiBody, "MISS");
    await request(second, "/blog/en/article", pageBody, "MISS");
    assert.equal(reads.length, 4, "process cache avoids repeat persistent reads");
    assert.ok(reads.every(name => name.includes(`/v2/${firstVersion}/`) || name.includes(`/v2/${nextVersion}/`)), "v1 and prior deployment entries are never read");
    apiBody = "published API"; pageBody = "published HTML";
    await invalidatePublicResponseCache(nextVersion);
    assert.deepEqual(lists, Array(2).fill(`counselo/public-response-cache/v2/${nextVersion}/`));
    await request(second, "/api/blog/posts", apiBody, "MISS");
    await request(second, "/blog/en/article", pageBody, "MISS");
    assert.ok(stored.has(publicResponseObjectName("api:GET:/api/blog/posts", firstVersion)), "publication removes the active namespace without relying on old releases");
    const readCount = reads.length;
    const writeCount = stored.size;
    const sourceMode = await makeApp(null);
    await request(sourceMode, "/api/blog/posts", apiBody, "MISS");
    await request(sourceMode, "/api/blog/posts", apiBody, "PROCESS");
    assert.equal(reads.length, readCount, "missing build identity bypasses persistent reads");
    assert.equal(stored.size, writeCount, "missing build identity bypasses persistent writes");
  } finally {
    await Promise.all(servers.map(server => new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))));
    if (oldEnv.node === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = oldEnv.node;
    if (oldEnv.backend === undefined) delete process.env.PUBLIC_RESPONSE_CACHE_BACKEND; else process.env.PUBLIC_RESPONSE_CACHE_BACKEND = oldEnv.backend;
  }
});

test("publication drains more than 1000 SDK-capped objects with bounded delete concurrency", async (t) => {
  const { stored, stats } = fakeStorage(t);
  const release = "c".repeat(64);
  for (let index = 0; index < 1001; index += 1) {
    stored.set(publicResponseObjectName(`page:GET:/article-${index}`, release), "cached");
  }
  const otherRelease = publicResponseObjectName("page:GET:/other", "d".repeat(64));
  stored.set(otherRelease, "other deployment");
  const result = await invalidatePublicResponseCache(release);
  assert.deepEqual(result, { complete: true, deleted: 1001, reason: "complete" });
  assert.deepEqual([...stored.keys()], [otherRelease]);
  assert.ok(stats.lists > 4, "a capped list is reissued until the namespace is confirmed empty");
  assert.ok(stats.maximumDeletes > 1 && stats.maximumDeletes <= 8);
});

test("persistent age rejects legacy, invalid and future entries and bounds promotion and late stale writes", async (t) => {
  const { stored } = fakeStorage(t);
  let clock = 1_800_000_000_000;
  t.mock.method(Date, "now", () => clock);
  const release = "e".repeat(64);
  const objectName = (route: string) => publicResponseObjectName(`api:GET:/api/blog/posts/${route}`, release);
  const entry = encodePublicResponseEntry({ statusCode: 200, body: "cached response", headers: {}, createdAt: clock - 1000 });
  stored.set(objectName("fresh"), JSON.stringify(entry));
  stored.set(objectName("expired"), JSON.stringify({ ...entry, createdAt: clock - 5 * 60_000 }));
  stored.set(objectName("future"), JSON.stringify({ ...entry, createdAt: clock + 60_000 }));
  stored.set(objectName("invalid"), JSON.stringify({ ...entry, createdAt: "yesterday" }));
  stored.set(objectName("legacy"), JSON.stringify({ ...entry, version: 1, createdAt: undefined }));
  stored.set(objectName("missing"), JSON.stringify({ ...entry, createdAt: undefined }));
  stored.set(objectName("nearly-expired"), JSON.stringify({ ...entry, createdAt: clock - 5 * 60_000 + 100 }));
  const app = express();
  app.use("/api", cachePublicResponses("api", () => true, release));
  app.get("/api/blog/posts/:variant", (req, res) => res.send(`generated ${req.params.variant}`));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>(resolve => server.once("listening", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const request = async (variant: string, body: string, cache: string) => {
    const response = await fetch(`http://127.0.0.1:${address.port}/api/blog/posts/${variant}`);
    assert.equal(await response.text(), body);
    assert.equal(response.headers.get("x-counselo-response-cache"), cache);
  };
  try {
    await request("fresh", "cached response", "APP-STORAGE");
    for (const variant of ["expired", "future", "invalid", "legacy", "missing"]) {
      await request(variant, `generated ${variant}`, "MISS");
    }
    await request("nearly-expired", "cached response", "APP-STORAGE");
    clock += 101;
    await request("nearly-expired", "generated nearly-expired", "MISS");
    await invalidatePublicResponseCache(release);
    // A request that began before publication may finish its storage write
    // after the purge. Its original age must still bound the stale response.
    stored.set(objectName("late"), JSON.stringify(entry));
    clock = entry.createdAt + 5 * 60_000;
    await request("late", "generated late", "MISS");
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});

test("a cache namespace that never drains reports incomplete invalidation and enables failure cooldown", async (t) => {
  const { stats } = fakeStorage(t);
  const warn = t.mock.method(logger, "warn", (() => undefined) as never);
  t.mock.method(Client.prototype, "list", (async ({ prefix, maxResults }: { prefix: string; maxResults: number }) => {
    stats.lists += 1;
    return { ok: true, value: Array.from({ length: maxResults }, (_, index) => ({ name: `${prefix}${index}.json` })) };
  }) as never);
  const result = await invalidatePublicResponseCache("f".repeat(64));
  assert.equal(result.complete, false);
  assert.equal(result.reason, "failed");
  assert.ok(result.deleted >= 1001 && result.deleted <= 5000);
  assert.ok(stats.lists <= 21, "continuously repopulated listings cannot loop forever");
  assert.equal(warn.mock.callCount(), 1);
  assert.match(String((warn.mock.calls[0]!.arguments[0] as { err: Error }).err), /purge incomplete/);
  const skipped = await invalidatePublicResponseCache("f".repeat(64));
  assert.deepEqual(skipped, { complete: false, deleted: 0, reason: "unavailable" });
});

test("persistent cache entries preserve text and binary responses", () => {
  const text = encodePublicResponseEntry({
    statusCode: 200,
    body: "<html>Arabic العربية</html>",
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
  assert.equal(decodePublicResponseBody(text), "<html>Arabic العربية</html>");

  const binaryBody = Buffer.from([0, 1, 2, 250, 255]);
  const binary = encodePublicResponseEntry({
    statusCode: 200,
    body: binaryBody,
    headers: { "Content-Type": "application/pdf" },
  });
  assert.deepEqual(decodePublicResponseBody(binary), binaryBody);
});
