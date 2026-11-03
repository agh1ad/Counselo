import assert from "node:assert/strict";
import test from "node:test";

process.env.DATABASE_URL ||= "postgres://test:test@127.0.0.1:1/test";
const { pool } = await import("@workspace/db");
const { default: app } = await import("../app.js");
const server = app.listen(0, "127.0.0.1");
await new Promise<void>(resolve => server.once("listening", resolve));
const address = server.address();
if (!address || typeof address === "string") throw new Error("Missing test port");
const origin = `http://127.0.0.1:${address.port}`;

test("API deployment returns 410 before redirects, caches, discovery and database access", async () => {
  for (const path of ["/sa/ar/vision", "/uae/vision/", "/vision?source=search", "/ar/legal-updates", "/syr/ar/legal-updates/practice/family-law/page/2", "/sitemap-legal-updates.xml", "/api/legal-updates?path=/sa", "/api/legal-updates-sitemap", "/__pages/sa-ar-vision.html"]) {
    for (const method of ["GET", "HEAD"]) {
      const response = await fetch(`${origin}${path}`, { method, redirect: "manual" });
      assert.equal(response.status, 410, `${method} ${path}`);
      assert.equal(response.headers.get("x-robots-tag"), "noindex, follow");
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal(response.headers.get("location"), null);
      const html = await response.text();
      if (method === "GET") assert.match(html, /name="robots" content="noindex, follow"/);
      else assert.equal(html, "");
    }
  }
});

test.after(async () => {
  server.closeAllConnections();
  await new Promise<void>(resolve => server.close(() => resolve()));
  await pool.end();
});
