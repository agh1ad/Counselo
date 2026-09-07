import assert from "node:assert/strict";
import test from "node:test";
import express from "express";

test("the production handler redirects the verified title alias before blog lookup and leaves unrelated Saudi errors as 404", async () => {
  process.env.NODE_ENV = "production";
  process.env.DATABASE_URL = "postgresql://test:test@127.0.0.1:1/legacy_alias_fixture";
  const { registerOgPageRoutes } = await import("../og-pages.js");
  const { db, pool } = await import("@workspace/db");
  const select = test.mock.method(db, "select", (() => { throw new Error("A retained exact alias must not need a database lookup"); }) as never);
  const app = express();
  registerOgPageRoutes(app);
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const origin = `http://127.0.0.1:${address.port}`;
  try {
    for (const method of ["GET", "HEAD"]) {
      const response = await fetch(`${origin}/blog/Termination-of-Commercial-Contracts-under-Saudi-Law`, { method, redirect: "manual" });
      assert.equal(response.status, 301);
      assert.equal(response.headers.get("location"), "/blog/en/fskh-alaqd-altjary-fy-alnzam-alsawdy");
      await response.body?.cancel();
    }
    const absent = await fetch(`${origin}/sa/services/civil-procedure/evidence-and-procedural-objections`, { redirect: "manual" });
    assert.equal(absent.status, 404);
    assert.equal(absent.headers.get("location"), null);
    assert.match(await absent.text(), /noindex/i);
    assert.equal(select.mock.callCount(), 0);
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    select.mock.restore();
    await pool.end();
  }
});
