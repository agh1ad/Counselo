import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";

process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??= "postgresql://test:test@127.0.0.1:1/test";
const { default: app } = await import("../app.js");
const { publicationDataCache } = await import("./publication-data-cache.js");
const { publicWorkFileCache } = await import("./public-work-file-cache.js");

test("the actual API app serves canonical and proxy transport document paths through the same publication checks", async t => {
  const bytes = Buffer.from("%PDF-1.7\nSynthetic API routing fixture\n%%EOF");
  const metadata = { slug: "api-routed-file", published: true, fileMimeType: "application/pdf", fileSize: bytes.length, updatedAt: "2026-11-13T00:00:00.000Z" };
  let visible = true;
  t.mock.method(publicationDataCache, "read", (async () => visible ? [metadata] : []) as never);
  t.mock.method(publicWorkFileCache, "read", (async () => ({ ...metadata, fileName: "File.pdf", confidentialityConfirmed: false, fileData: bytes.toString("base64") })) as never);
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address(); assert.ok(address && typeof address !== "string");
  const origin = `http://127.0.0.1:${address.port}`;
  try {
    for (const prefix of ["/documents", "/api/documents"]) {
      for (const method of ["GET", "HEAD"]) {
        const response = await fetch(`${origin}${prefix}/api-routed-file.pdf?download=1`, { method });
        assert.equal(response.status, 200);
        assert.equal(response.headers.get("content-type"), "application/pdf");
        assert.equal(response.headers.get("x-robots-tag"), null);
        assert.equal(response.headers.get("x-frame-options"), null);
        assert.match(response.headers.get("content-disposition")!, /^attachment;/);
        assert.equal(response.headers.get("link"), '<https://counselo-legal.com/documents/api-routed-file.pdf>; rel="canonical"');
        assert.deepEqual(Buffer.from(await response.arrayBuffer()), method === "GET" ? bytes : Buffer.alloc(0));
      }
    }
    visible = false;
    for (const prefix of ["/documents", "/api/documents"]) {
      const response = await fetch(`${origin}${prefix}/api-routed-file.pdf`);
      assert.equal(response.status, 404);
      assert.match(response.headers.get("x-robots-tag")!, /noindex/);
      assert.doesNotMatch(await response.text(), /<html|<script/i);
    }
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
