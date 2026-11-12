import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import express from "express";
import { createPublicResponseCache, decodePublicResponseBody, encodePublicResponseEntry, publicResponseObjectName, PUBLIC_CACHE_GENERATION_OBJECT } from "./public-response-cache.js";

type Storage = NonNullable<ReturnType<Parameters<typeof createPublicResponseCache>[0]["storage"]>>;
function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>(done => { resolve = done; });
  return { promise, resolve };
}
function storageFixture() {
  const objects = new Map<string, string>();
  const reads: string[] = [];
  const uploads: string[] = [];
  const hooks = { beforeRead: undefined as undefined | ((key: string) => Promise<void>), beforeWrite: undefined as undefined | ((key: string, value: string) => Promise<void>) };
  const storage: Storage = {
    async downloadAsText(key) {
      reads.push(key);
      const value = objects.get(key);
      await hooks.beforeRead?.(key);
      return value === undefined ? { ok: false, error: { statusCode: 404, message: "Missing" } } : { ok: true, value };
    },
    async uploadFromText(key, value) {
      uploads.push(key);
      await hooks.beforeWrite?.(key, value);
      objects.set(key, value);
      return { ok: true, value: null };
    },
  };
  let time = 1_000_000;
  let serial = 0;
  const makeCache = (storageTimeoutMs?: number) => createPublicResponseCache({ storage: () => storage, now: () => time, token: () => `generation-${++serial}`, storageTimeoutMs });
  return { objects, reads, uploads, hooks, makeCache, now: () => time, advance: (ms: number) => { time += ms; } };
}
async function withServer(cache: ReturnType<typeof createPublicResponseCache>, handler: express.RequestHandler, run: (base: string) => Promise<void>) {
  const app = express();
  app.use(cache.middleware("page", () => true));
  app.use(handler);
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  try { await run(`http://127.0.0.1:${(server.address() as { port: number }).port}`); }
  finally { await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); }
}
const getText = async (url: string) => { const response = await fetch(url); return { response, text: await response.text() }; };
function seed(fixture: ReturnType<typeof storageFixture>, path: string, body = "stale", statusCode = 200, createdAt = fixture.now()) {
  fixture.objects.set(publicResponseObjectName(`page:GET:${path}`), JSON.stringify(encodePublicResponseEntry({ statusCode, body, generation: "initial", headers: { "Content-Type": "text/plain", ...(statusCode === 404 ? { "X-Robots-Tag": "noindex" } : {}) } }, createdAt)));
}

test("cache keys hide URLs and timestamped entries preserve Unicode and binary responses", () => {
  const key = "page:GET:/blog/en/confidential-contract-query?source=test";
  assert.equal(publicResponseObjectName(key), publicResponseObjectName(key));
  assert.match(publicResponseObjectName(key), /^counselo\/public-response-cache\/v3\/[a-f0-9]{64}\.json$/);
  assert.doesNotMatch(publicResponseObjectName(key), /confidential|source=test/);
  const text = encodePublicResponseEntry({ statusCode: 200, body: "Arabic العربية", headers: {} }, 1000);
  assert.equal(decodePublicResponseBody(text), "Arabic العربية");
  assert.equal(text.expiresAt, 301000);
  const bytes = Buffer.from([0, 1, 250, 255]);
  assert.deepEqual(decodePublicResponseBody(encodePublicResponseEntry({ statusCode: 200, body: bytes, headers: {} })), bytes);
});

test("persistent entries expire without extending their age on process-cache reloads", async () => {
  const fixture = storageFixture();
  seed(fixture, "/case", "old", 200, fixture.now() - 299000);
  const cache = fixture.makeCache();
  let calls = 0;
  await withServer(cache, (_req, res) => { calls++; res.send("current"); }, async base => {
    assert.equal((await getText(base + "/case")).text, "old");
    fixture.advance(1001);
    assert.equal((await getText(base + "/case")).text, "current");
    assert.equal(calls, 1);
    await cache.waitForPendingWrites();
    assert.equal(JSON.parse(fixture.objects.get(publicResponseObjectName("page:GET:/case"))!).createdAt, fixture.now());
  });
});

test("one generation change invalidates more than 1000 entries across active instances", async () => {
  const fixture = storageFixture();
  for (let i = 0; i < 1205; i++) seed(fixture, `/case-${i}`);
  const first = fixture.makeCache();
  const second = fixture.makeCache();
  await withServer(second, (_req, res) => { res.send("current"); }, async base => {
    assert.equal((await getText(base + "/case-1204")).text, "stale");
    await first.invalidate();
    assert.equal(fixture.uploads.filter(key => key === PUBLIC_CACHE_GENERATION_OBJECT).length, 1);
    fixture.advance(15001);
    for (const i of [0, 600, 1204]) assert.equal((await getText(base + `/case-${i}`)).text, "current");
    await second.waitForPendingWrites();
  });
});

test("late old-generation uploads cannot repopulate cache after invalidation", async () => {
  const fixture = storageFixture();
  const oldUpload = deferred();
  const uploadStarted = deferred();
  fixture.hooks.beforeWrite = async (key, value) => {
    if (key !== PUBLIC_CACHE_GENERATION_OBJECT && JSON.parse(value).body === "old") { uploadStarted.resolve(); await oldUpload.promise; }
  };
  const cache = fixture.makeCache();
  let current = "old";
  await withServer(cache, (_req, res) => { res.send(current); }, async base => {
    assert.equal((await getText(base + "/case")).text, "old");
    await uploadStarted.promise;
    current = "new";
    await cache.invalidate();
    assert.equal((await getText(base + "/case")).text, "new");
    oldUpload.resolve();
    await cache.waitForPendingWrites();
  });
  const restarted = fixture.makeCache();
  await withServer(restarted, (_req, res) => { res.send("new"); }, async base => {
    assert.equal((await getText(base + "/case")).text, "new");
    await restarted.waitForPendingWrites();
  });
});

test("an in-flight storage read cannot serve pre-invalidation content", async () => {
  const fixture = storageFixture();
  seed(fixture, "/case");
  const started = deferred();
  const finish = deferred();
  fixture.hooks.beforeRead = async key => { if (key !== PUBLIC_CACHE_GENERATION_OBJECT) { started.resolve(); await finish.promise; } };
  const cache = fixture.makeCache();
  await withServer(cache, (_req, res) => { res.send("current"); }, async base => {
    const request = getText(base + "/case");
    await started.promise;
    await cache.invalidate();
    finish.resolve();
    assert.equal((await request).text, "current");
  });
});

test("a delayed origin response cannot be stored after an intervening update", async () => {
  const fixture = storageFixture();
  const cache = fixture.makeCache();
  const started = deferred();
  const finish = deferred();
  let current = "old";
  let calls = 0;
  await withServer(cache, async (_req, res) => {
    const snapshot = current;
    if (++calls === 1) { started.resolve(); await finish.promise; }
    res.send(snapshot);
  }, async base => {
    const request = getText(base + "/case");
    await started.promise;
    current = "new";
    await cache.invalidate();
    finish.resolve();
    assert.equal((await request).text, "old");
    assert.equal((await getText(base + "/case")).text, "new");
    await cache.waitForPendingWrites();
    assert.equal(JSON.parse(fixture.objects.get(publicResponseObjectName("page:GET:/case"))!).body, "new");
  });
});

test("overlapping invalidations serialize marker writes and prevent intermediate fills", async () => {
  const fixture = storageFixture();
  const gate = deferred();
  const started = deferred();
  let markerWrites = 0;
  fixture.hooks.beforeWrite = async key => {
    if (key === PUBLIC_CACHE_GENERATION_OBJECT && ++markerWrites === 1) { started.resolve(); await gate.promise; }
  };
  const cache = fixture.makeCache();
  const first = cache.invalidate();
  await started.promise;
  const second = cache.invalidate();
  await withServer(cache, (_req, res) => { res.send("current"); }, async base => {
    assert.equal((await getText(base + "/case")).text, "current");
    assert.equal(fixture.objects.size, 0);
    gate.resolve();
    await Promise.all([first, second]);
    assert.equal(markerWrites, 2);
    assert.equal(JSON.parse(fixture.objects.get(PUBLIC_CACHE_GENERATION_OBJECT)!).value, "generation-2");
    assert.equal((await getText(base + "/case")).text, "current");
    await cache.waitForPendingWrites();
    assert.equal(JSON.parse(fixture.objects.get(publicResponseObjectName("page:GET:/case"))!).generation, "generation-2");
  });
});

test("failed invalidation bypasses stale storage and retries on demand without polling", async () => {
  const fixture = storageFixture();
  seed(fixture, "/case");
  const cache = fixture.makeCache();
  fixture.hooks.beforeWrite = async key => { if (key === PUBLIC_CACHE_GENERATION_OBJECT) throw new Error("Storage unavailable"); };
  await cache.invalidate();
  await withServer(cache, (_req, res) => { res.send("current"); }, async base => {
    assert.equal((await getText(base + "/case")).text, "current");
    assert.equal(fixture.reads.length, 0);
    fixture.hooks.beforeWrite = undefined;
    fixture.advance(300001);
    assert.equal((await getText(base + "/case")).text, "current");
    assert.ok(fixture.objects.has(PUBLIC_CACHE_GENERATION_OBJECT));
  });
});

test("expired cache during an origin outage returns the outage and never stores 503", async () => {
  const fixture = storageFixture();
  seed(fixture, "/case", "stale", 200, fixture.now() - 300001);
  const cache = fixture.makeCache();
  let calls = 0;
  await withServer(cache, (_req, res) => { calls++; res.status(503).send("Temporarily unavailable"); }, async base => {
    for (let i = 0; i < 2; i++) {
      const result = await getText(base + "/case");
      assert.equal(result.response.status, 503);
      assert.equal(result.text, "Temporarily unavailable");
    }
    assert.equal(calls, 2);
    assert.equal(fixture.uploads.length, 0);
  });
});

test("unresponsive object storage cannot hold the public page open indefinitely", async () => {
  const fixture = storageFixture();
  const stalled = deferred();
  fixture.hooks.beforeRead = async () => stalled.promise;
  const cache = fixture.makeCache(20);
  await withServer(cache, (_req, res) => { res.send("Database response"); }, async base => {
    const result = await getText(base + "/case");
    assert.equal(result.response.status, 200);
    assert.equal(result.text, "Database response");
    stalled.resolve();
  });
});

test("cached HEAD requests preserve entity headers without sending a body", async () => {
  const fixture = storageFixture();
  const cache = fixture.makeCache();
  let calls = 0;
  await withServer(cache, (_req, res) => { calls++; res.type("text/plain").send("العربية"); }, async base => {
    assert.equal((await getText(base + "/case")).text, "العربية");
    const head = await fetch(base + "/case", { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.equal(head.headers.get("content-length"), String(Buffer.byteLength("العربية")));
    assert.equal(await head.text(), "");
    assert.equal(calls, 1);
  });
});

test("404 headers survive caching and a new page is not hidden by a long negative cache", async () => {
  const fixture = storageFixture();
  const cache = fixture.makeCache();
  let missing = true;
  await withServer(cache, (_req, res) => { if (missing) res.status(404).set("X-Robots-Tag", "noindex").send("Missing"); else res.send("Published"); }, async base => {
    assert.equal((await getText(base + "/case")).response.status, 404);
    assert.equal((await getText(base + "/case")).response.headers.get("x-robots-tag"), "noindex");
    missing = false;
    fixture.advance(15001);
    assert.equal((await getText(base + "/case")).text, "Published");
  });
});

test("many unknown paths create no persistent objects and encoded variants bypass persistence", async () => {
  const fixture = storageFixture();
  const cache = fixture.makeCache();
  await withServer(cache, (req, res) => { if (req.path.startsWith("/known")) res.send("Published"); else res.status(404).send("Missing"); }, async base => {
    for (let i = 0; i < 30; i++) assert.equal((await getText(base + `/missing-${i}`)).response.status, 404);
    assert.equal((await getText(base + "/known-%61")).response.status, 200);
    await cache.waitForPendingWrites();
    assert.equal(fixture.objects.size, 0);
    assert.equal(fixture.uploads.length, 0);
    assert.equal((await getText(base + "/known-canonical")).response.status, 200);
    await cache.waitForPendingWrites();
    assert.equal(fixture.objects.size, 1);
  });
});

test("query variants, private responses and cookies do not enter shared caches", async () => {
  const fixture = storageFixture();
  const cache = fixture.makeCache();
  let calls = 0;
  await withServer(cache, (req, res) => {
    if (req.path === "/private") res.set("Cache-Control", "private, no-store");
    if (req.path === "/cookie") res.set("Set-Cookie", "example=private");
    if (req.path === "/vary") res.set("Vary", "Accept-Encoding, Cookie");
    res.send(String(++calls));
  }, async base => {
    for (const path of ["/query?filter=one", "/private", "/cookie", "/vary"]) {
      assert.notEqual((await getText(base + path)).text, (await getText(base + path)).text);
    }
    for (let i = 0; i < 2; i++) {
      const response = await fetch(base + "/authenticated", { headers: { Authorization: "Bearer test-only" } });
      await response.arrayBuffer();
    }
    await cache.waitForPendingWrites();
    assert.equal(fixture.objects.size, 0);
  });
});
