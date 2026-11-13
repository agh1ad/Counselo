import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import express from "express";
import { createAdminLoginHandler, createAdminLoginLimiter } from "./admin-login.js";
import { createAdminGuard } from "./auth.js";

async function withLogin(options: Parameters<typeof createAdminLoginLimiter>[0], run: (base: string) => Promise<void>, configured = true) {
  const app = express();
  app.set("trust proxy", 1);
  const limiter = createAdminLoginLimiter(options);
  // Match production order: cap before body parsing, then the same idempotent
  // limiter on the route so mounting the route alone remains protected.
  app.post("/api/admin/auth", limiter, express.json({ limit: "4kb", type: () => true }));
  app.use(express.json({ limit: "12mb" }));
  app.use(express.urlencoded({ extended: true, limit: "12mb" }));
  app.post("/api/admin/auth", limiter, createAdminLoginHandler(() => configured ? "test-only-admin-secret" : undefined, limiter.release));
  app.get("/api/admin/protected", createAdminGuard(() => "test-only-admin-secret", limiter), (_req, res) => { res.json({ protected: true }); });
  app.use((error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => { res.status(error.status ?? 500).json({ error: "Invalid request" }); });
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  try { await run(`http://127.0.0.1:${(server.address() as { port: number }).port}`); }
  finally { await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); }
}
async function login(base: string, body: unknown, ip = "198.51.100.1") {
  const response = await fetch(base + "/api/admin/auth", { method: "POST", headers: { "Content-Type": "application/json", "X-Forwarded-For": ip }, body: JSON.stringify(body) });
  return { response, body: await response.json() };
}

test("admin login requires the timing-safe matching credential and never sets an authentication cookie", async () => {
  await withLogin({}, async base => {
    for (const body of [{}, { password: 123 }, { password: ["test-only-admin-secret"] }, { password: "wrong" }]) {
      const result = await login(base, body);
      assert.equal(result.response.status, 401);
      assert.ok(!JSON.stringify(result.body).includes("test-only-admin-secret"));
    }
    const valid = await login(base, { password: "test-only-admin-secret" });
    assert.equal(valid.response.status, 200);
    assert.deepEqual(valid.body, { token: "test-only-admin-secret" });
    assert.equal(valid.response.headers.get("set-cookie"), null);
    assert.equal(valid.response.headers.get("cache-control"), "no-store");
  });
  await withLogin({}, async base => { assert.equal((await login(base, { password: "test-only-admin-secret" })).response.status, 500); }, false);
});

test("rolling failed-attempt limits do not double-count or punish valid CMS traffic and recover after Retry-After", async () => {
  let time = 1000;
  await withLogin({ now: () => time, windowMs: 10000, perIp: 2, global: 10 }, async base => {
    assert.equal((await login(base, { password: "wrong" })).response.status, 401);
    assert.equal((await login(base, { password: "test-only-admin-secret" })).response.status, 200);
    assert.equal((await login(base, { password: "wrong" })).response.status, 401);
    const limited = await login(base, { password: "test-only-admin-secret" });
    assert.equal(limited.response.status, 429);
    assert.equal(limited.response.headers.get("retry-after"), "10");
    assert.match(limited.response.headers.get("x-robots-tag")!, /noindex/);
    time += 10001;
    assert.equal((await login(base, { password: "test-only-admin-secret" })).response.status, 200);
  });
});

test("protected endpoints share the login limit so Bearer guessing cannot bypass it", async () => {
  await withLogin({ perIp: 2, global: 10 }, async base => {
    for (let i = 0; i < 5; i++) {
      const authenticated = await fetch(base + "/api/admin/protected", { headers: { Authorization: "Bearer test-only-admin-secret", "X-Forwarded-For": "198.51.100.1" } });
      assert.equal(authenticated.status, 200);
      await authenticated.arrayBuffer();
    }
    assert.equal((await login(base, { password: "wrong" })).response.status, 401);
    const denied = await fetch(base + "/api/admin/protected", { headers: { Authorization: "Bearer wrong", "X-Forwarded-For": "198.51.100.1" } });
    assert.equal(denied.status, 401);
    await denied.arrayBuffer();
    for (const credential of ["wrong", "test-only-admin-secret"]) {
      const blocked = await fetch(base + "/api/admin/protected", { headers: { Authorization: `Bearer ${credential}`, "X-Forwarded-For": "198.51.100.1" } });
      assert.equal(blocked.status, 429);
      await blocked.arrayBuffer();
    }
    assert.equal((await login(base, { password: "test-only-admin-secret" })).response.status, 429);
  });
});

test("process-wide limits stop rotating IPs and identity storage is bounded", async () => {
  await withLogin({ perIp: 10, global: 2 }, async base => {
    assert.equal((await login(base, {}, "198.51.100.1")).response.status, 401);
    assert.equal((await login(base, {}, "198.51.100.2")).response.status, 401);
    assert.equal((await login(base, {}, "198.51.100.3")).response.status, 429);
  });
  await withLogin({ perIp: 10, global: 10, maxIdentities: 2 }, async base => {
    assert.equal((await login(base, {}, "198.51.100.1")).response.status, 401);
    assert.equal((await login(base, {}, "198.51.100.2")).response.status, 401);
    assert.equal((await login(base, {}, "198.51.100.3")).response.status, 429);
    assert.equal((await login(base, {}, "198.51.100.1")).response.status, 401);
  });
});

test("identity uses Express trust proxy one rather than the untrusted first forwarded address", async () => {
  await withLogin({ perIp: 1, global: 10 }, async base => {
    assert.equal((await login(base, {}, "198.51.100.1, 203.0.113.8")).response.status, 401);
    assert.equal((await login(base, {}, "198.51.100.2, 203.0.113.8")).response.status, 429);
    assert.equal((await login(base, {}, "198.51.100.1, 203.0.113.9")).response.status, 401);
  });
});

test("oversized or malformed sign-in bodies are bounded before general parsing and still consume attempts", async () => {
  await withLogin({ perIp: 2, global: 10 }, async base => {
    const oversized = await login(base, { password: "x".repeat(5000) });
    assert.equal(oversized.response.status, 413);
    const malformed = await fetch(base + "/api/admin/auth", { method: "POST", headers: { "Content-Type": "text/plain", "X-Forwarded-For": "198.51.100.1" }, body: "not-json" });
    assert.equal(malformed.status, 400);
    await malformed.arrayBuffer();
    const limited = await login(base, { password: "x".repeat(5000) });
    assert.equal(limited.response.status, 429);
  });
});
