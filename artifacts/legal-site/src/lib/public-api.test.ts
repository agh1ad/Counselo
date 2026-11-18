import assert from "node:assert/strict";
import test from "node:test";
import { fetchPublicJson, isMissingPublicContent, publicApiUrl } from "./public-api";

test("canonical document previews stay on the page origin while public API data uses the published backend", () => {
  assert.equal(publicApiUrl("/documents/published-case.pdf", false), "/documents/published-case.pdf");
  assert.equal(publicApiUrl("/documents/published-case.pdf?download=1", true), "/documents/published-case.pdf?download=1");
  assert.equal(publicApiUrl("/documents/published-case.txt", true), "/documents/published-case.txt");
  assert.equal(publicApiUrl("/api/work", true), "https://counselo-legal.com/api/work");
});

test("public content distinguishes removed records from outages and permits a failed request to be retried", async () => {
  const originalFetch = globalThis.fetch;
  let status = 503;
  let requests = 0;
  globalThis.fetch = async () => {
    requests++;
    return new Response(JSON.stringify(status === 200 ? { slug: "recovered-case" } : { error: "Unavailable" }), {
      status, headers: { "content-type": "application/json" },
    });
  };
  try {
    for (const code of [503, 429, 404, 410]) {
      status = code;
      await assert.rejects(fetchPublicJson(`/api/work/recovery-${code}`), error => {
        assert.equal(isMissingPublicContent(error), code === 404 || code === 410);
        return true;
      });
    }
    status = 200;
    assert.deepEqual(await fetchPublicJson("/api/work/recovery-503"), { slug: "recovered-case" });
    assert.equal(requests, 5, "failed promise must not block a successful retry");
    assert.equal(isMissingPublicContent(new TypeError("Failed to fetch")), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("work JSON normalization preserves verified document edition metadata", async () => {
  const originalFetch = globalThis.fetch;
  const sample = {
    slug: "edition-client-parity", date: "2026-07-22", updatedAt: "2026-07-29T04:19:19.570Z",
    published: true, fileMimeType: "application/pdf", fileSize: 43210, documentLanguage: "ar",
    documentEdition: "2026-11-18", documentEditionPublishedAt: "2026-11-18T00:00:00.000Z",
    documentTextUrl: "/documents/edition-client-parity.txt",
  };
  globalThis.fetch = async () => new Response(JSON.stringify(sample), { headers: { "content-type": "application/json" } });
  try {
    assert.deepEqual(await fetchPublicJson(`/api/work/${sample.slug}`), sample);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
