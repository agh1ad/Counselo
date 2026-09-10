import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import type { Server } from "node:http";
import express from "express";
import { Client } from "@replit/object-storage";
import { PublicationDataCache } from "./publication-data-cache.js";
import { logger } from "./logger.js";
import { cachePublicResponses, clearPublicResponseProcessCache, publicResponseCacheUrl } from "./public-response-cache.js";
import { PublicationCoordinator, PUBLICATION_EPOCH_OBJECT, PUBLICATION_PENDING_PREFIX, type PublicationStorage } from "./publication-cache.js";

function fixture(t: TestContext) {
  const previous = { ...process.env };
  process.env.NODE_ENV = "production";
  process.env.PUBLIC_RESPONSE_CACHE_BACKEND = "object-storage";
  process.env.PUBLIC_RESPONSE_CACHE_MODE = "publication";
  t.after(() => {
    for (const key of ["NODE_ENV", "PUBLIC_RESPONSE_CACHE_BACKEND", "PUBLIC_RESPONSE_CACHE_MODE"]) {
      if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key];
    }
  });
  t.mock.method(logger, "warn", (() => undefined) as never);
  t.mock.method(logger, "error", (() => undefined) as never);
  let time = 1_800_000_000_000;
  t.mock.method(Date, "now", () => time);
  const objects = new Map<string, string>();
  let generation = 0;
  const faults = { list: false, epochRead: false, fenceWrite: false, epochWrite: false, remove: false };
  const stats = { lists: 0, epochs: 0 };
  const store: PublicationStorage = {
    async uploadFromText(name, value) {
      if ((name.startsWith(PUBLICATION_PENDING_PREFIX) && faults.fenceWrite) || (name === PUBLICATION_EPOCH_OBJECT && faults.epochWrite)) {
        return { ok: false, error: { message: "simulated write failure", statusCode: 503 } };
      }
      objects.set(name, value);
      if (name === PUBLICATION_EPOCH_OBJECT) generation++;
      return { ok: true, value: null };
    },
    async list(options) {
      stats.lists++;
      if (faults.list) return { ok: false, error: { message: "simulated list failure", statusCode: 503 } };
      return { ok: true, value: [...objects.keys()].filter(name => name.startsWith(options?.prefix ?? "")).slice(0, options?.maxResults).map(name => ({ name })) };
    },
    async delete(name) {
      if (faults.remove) return { ok: false, error: { message: "simulated delete failure", statusCode: 503 } };
      objects.delete(name);
      return { ok: true, value: null };
    },
    async epochGeneration() {
      stats.epochs++;
      if (faults.epochRead) throw new Error("simulated metadata failure");
      return objects.has(PUBLICATION_EPOCH_OBJECT) ? String(generation) : "initial";
    },
  };
  t.mock.method(Client.prototype as unknown as { init: () => Promise<unknown> }, "init", async () => ({}));
  t.mock.method(Client.prototype, "downloadAsText", (async (name: string) => objects.has(name)
    ? { ok: true, value: objects.get(name) } : { ok: false, error: { statusCode: 404 } }) as never);
  t.mock.method(Client.prototype, "uploadFromText", store.uploadFromText);
  const coordinator = () => new PublicationCoordinator(() => store);
  return { objects, store, coordinator, stats, faults, advance: (ms: number) => { time += ms; } };
}

async function httpApp(t: TestContext, coordinator: PublicationCoordinator, handler: express.RequestHandler, version: string) {
  const app = express();
  app.use(cachePublicResponses("page", path => path.startsWith("/public"), version, coordinator));
  app.all("/{*path}", handler);
  const server: Server = app.listen(0, "127.0.0.1");
  await new Promise<void>(resolve => server.once("listening", resolve));
  t.after(() => new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  return (path = "/public", options?: RequestInit) => fetch(`http://127.0.0.1:${address.port}${path}`, options);
}

test("publication cache survives five-minute expiry and a process restart without database reads", async t => {
  const f = fixture(t), writer = f.coordinator();
  await writer.mutate(async () => {}); // bootstrap generation
  let databaseReads = 0;
  const handler: express.RequestHandler = (_req, res) => { databaseReads++; res.send("published العربية"); };
  const first = await httpApp(t, f.coordinator(), handler, "long-lived");
  assert.equal(await (await first()).text(), "published العربية");
  f.advance(6 * 60_000);
  clearPublicResponseProcessCache(); // a restarted process has no local entries
  const restarted = await httpApp(t, f.coordinator(), handler, "long-lived");
  const hit = await restarted();
  assert.equal(hit.headers.get("x-counselo-response-cache"), "APP-STORAGE");
  assert.equal(await hit.text(), "published العربية");
  assert.equal(databaseReads, 1);
  f.advance(24 * 60 * 60_000);
  await restarted();
  assert.equal(databaseReads, 2, "a bounded daily repair read remains");
});

test("edits and withdrawal invalidate another instance within the existing 15-second process bound", async t => {
  const f = fixture(t), writer = f.coordinator(), reader = f.coordinator();
  let body = "original", published = true, reads = 0;
  await writer.mutate(async () => {});
  const request = await httpApp(t, reader, (_req, res) => { reads++; res.status(published ? 200 : 404).send(published ? body : "Not found"); }, "withdrawal");
  await request();
  await writer.mutate(async () => { body = "edited"; });
  f.advance(15_001);
  assert.equal(await (await request()).text(), "edited");
  await writer.mutate(async () => { published = false; });
  f.advance(15_001);
  const withdrawn = await request();
  assert.equal(withdrawn.status, 404);
  assert.equal(await withdrawn.text(), "Not found");
  await writer.mutate(async () => { published = true; body = "republished"; });
  f.advance(15_001);
  assert.equal(await (await request()).text(), "republished", "a cached 404 cannot hide new publication");
  assert.equal(reads, 4);
});

test("overlapping mutations and crashes cannot reopen the cache while a writer remains pending", async t => {
  const f = fixture(t), a = f.coordinator(), b = f.coordinator();
  const fenceA = await a.begin(), fenceB = await b.begin();
  await a.finish(fenceA);
  assert.equal((await f.coordinator().state()).cacheable, false);
  f.advance(7 * 24 * 60 * 60_000);
  assert.equal((await f.coordinator().state()).cacheable, false, "abandoned fences never expire into stale content");
  await b.finish(fenceB);
  assert.equal((await f.coordinator().state()).cacheable, true);
});

test("late responses finishing after an edit cannot repopulate the current revision", async t => {
  const f = fixture(t), writer = f.coordinator();
  await writer.mutate(async () => {});
  let release!: () => void, started!: () => void;
  const waiting = new Promise<void>(resolve => { release = resolve; });
  const began = new Promise<void>(resolve => { started = resolve; });
  let count = 0;
  const request = await httpApp(t, f.coordinator(), async (_req, res) => {
    if (++count === 1) { started(); await waiting; res.send("old"); }
    else res.send("new");
  }, "late-writer");
  const oldRequest = request();
  await began;
  await writer.mutate(async () => {});
  release();
  assert.equal(await (await oldRequest).text(), "old");
  f.advance(15_001);
  assert.equal(await (await request()).text(), "new");
  assert.equal(await (await request()).text(), "new");
});

test("failed fences prevent writes; failed finalization retains a bypass and does not duplicate a committed save", async t => {
  const f = fixture(t), writer = f.coordinator();
  let writes = 0, warnings = 0;
  f.faults.fenceWrite = true;
  await assert.rejects(writer.mutate(async () => { writes++; }), /not saved/);
  assert.equal(writes, 0);
  f.faults.fenceWrite = false;
  f.faults.epochWrite = true;
  assert.equal(await writer.mutate(async () => { writes++; return 42; }, () => { warnings++; }), 42);
  assert.equal(writes, 1);
  assert.equal(warnings, 1);
  assert.ok([...f.objects.keys()].some(name => name.startsWith(PUBLICATION_PENDING_PREFIX)));
  assert.equal((await f.coordinator().state()).cacheable, false);
});

test("a failed database operation rotates the revision before releasing its fence", async t => {
  const f = fixture(t), writer = f.coordinator();
  await writer.mutate(async () => {});
  const before = await f.store.epochGeneration();
  await assert.rejects(writer.mutate(async () => { throw new Error("database failed"); }), /database failed/);
  assert.notEqual(await f.store.epochGeneration(), before);
  assert.equal((await f.coordinator().state()).cacheable, true);
});

test("storage errors and a missing control object bypass existing responses; late overwrites get new generations", async t => {
  const f = fixture(t), writer = f.coordinator();
  assert.equal((await writer.state()).cacheable, false, "missing state never restores an initial revision");
  await writer.mutate(async () => {});
  const reader = f.coordinator();
  const request = await httpApp(t, reader, (_req, res) => res.send("database"), "faults");
  await request();
  f.advance(15_001); f.faults.epochRead = true;
  assert.equal((await request()).headers.get("x-counselo-response-cache"), "BYPASS");
  f.faults.epochRead = false; f.faults.list = true; f.advance(15_001);
  assert.equal((await request()).headers.get("x-counselo-response-cache"), "BYPASS");
  f.faults.list = false;
  const oldPayload = f.objects.get(PUBLICATION_EPOCH_OBJECT)!;
  await writer.mutate(async () => {});
  const newer = await f.store.epochGeneration();
  await f.store.uploadFromText(PUBLICATION_EPOCH_OBJECT, oldPayload);
  assert.notEqual(await f.store.epochGeneration(), newer, "an old writer retry cannot resurrect the old cache key");
  f.objects.delete(PUBLICATION_EPOCH_OBJECT); f.advance(15_001);
  assert.equal((await request()).headers.get("x-counselo-response-cache"), "BYPASS");
});

test("cold bursts coalesce reads, preserve redirects and exclude authenticated, private and write traffic", async t => {
  const f = fixture(t), writer = f.coordinator();
  await writer.mutate(async () => {});
  let reads = 0;
  const request = await httpApp(t, f.coordinator(), async (req, res) => {
    reads++;
    await new Promise(resolve => setTimeout(resolve, 10));
    if (req.path === "/public/redirect") { res.redirect(301, "/public/destination"); return; }
    if (req.path === "/public/cookie") res.setHeader("Set-Cookie", "private=test");
    res.send("body");
  }, "burst");
  await Promise.all(Array.from({ length: 12 }, () => request()));
  assert.equal(reads, 1);
  const lists = f.stats.lists;
  await request();
  assert.equal(f.stats.lists, lists, "warm traffic avoids repeat control reads");
  for (const opts of [{ headers: { authorization: "Bearer test" } }, { method: "POST" }]) {
    const response = await request("/public", opts);
    assert.equal(response.headers.get("x-counselo-response-cache"), null);
  }
  await request("/admin"); await request("/admin");
  await request("/public/cookie");
  assert.equal((await request("/public/cookie")).headers.get("x-counselo-response-cache"), "MISS");
  await request("/public/redirect", { redirect: "manual" });
  const redirect = await request("/public/redirect", { redirect: "manual" });
  assert.equal(redirect.status, 301); assert.equal(redirect.headers.get("location"), "/public/destination");
  assert.equal(redirect.headers.get("x-counselo-response-cache"), "PROCESS");
});

test("tracking parameters share a cache entry while file disposition and unknown parameters remain distinct", () => {
  assert.equal(publicResponseCacheUrl("/api/work?utm_source=x&gclid=y"), "/api/work");
  assert.equal(publicResponseCacheUrl("/api/work/file?download=1&utm_medium=x"), "/api/work/file?download=1");
  assert.notEqual(publicResponseCacheUrl("/api/work?filter=x"), publicResponseCacheUrl("/api/work?filter=y"));
});


test("public collection snapshots coalesce distinct URLs and survive restart without sharing mutable objects", async t => {
  const f = fixture(t), writer = f.coordinator();
  await writer.mutate(async () => {});
  let reads = 0;
  let records = [{ slug: "english", title: "Original" }, { slug: "arabic", title: "العربية" }];
  const load = async () => { reads++; return records; };
  const decode = (value: unknown) => value as typeof records;
  const cache = () => new PublicationDataCache(() => new Client(), f.coordinator(), "catalog");
  const a = cache();
  const results = await Promise.all(Array.from({ length: 12 }, () => a.read("blogs", load, decode)));
  assert.equal(reads, 1);
  results[0][0].title = "caller mutation";
  assert.equal((await a.read("blogs", load, decode))[0].title, "Original");
  f.advance(6 * 60_000);
  const b = cache();
  assert.equal((await b.read("blogs", load, decode)).find(row => row.slug === "missing"), undefined);
  assert.equal(reads, 1, "a different or invalid URL uses the same published snapshot");
  await writer.mutate(async () => { records = [records[1]]; });
  f.advance(15_001);
  assert.equal((await b.read("blogs", load, decode)).find(row => row.slug === "english"), undefined);
  assert.equal(reads, 2);
  f.advance(24 * 60 * 60_000);
  await b.read("blogs", load, decode);
  assert.equal(reads, 3);
});

test("corrupt snapshots, pending writes and fenced rollback retain database reads", async t => {
  const f = fixture(t), writer = f.coordinator();
  await writer.mutate(async () => {});
  const epoch = await f.store.epochGeneration();
  f.objects.set(`counselo/public-data-cache/v1/corrupt/${epoch}/work.json`, "malformed");
  let reads = 0;
  const load = async () => { reads++; return [{ published: true }]; };
  const decode = (value: unknown) => value as Awaited<ReturnType<typeof load>>;
  const cache = new PublicationDataCache(() => new Client(), f.coordinator(), "corrupt");
  await cache.read("work", load, decode);
  assert.equal(reads, 1);
  const fence = await writer.begin();
  f.advance(15_001);
  await cache.read("work", load, decode);
  await cache.read("work", load, decode);
  assert.equal(reads, 3);
  await writer.finish(fence);
  process.env.PUBLIC_RESPONSE_CACHE_MODE = "fenced";
  await cache.read("work", load, decode);
  assert.equal(reads, 4);
});
