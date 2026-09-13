import assert from "node:assert/strict";
import test from "node:test";
import { blogPostUrls, workSampleUrls } from "./google-indexing.js";

test("submits both blog language canonicals and both collection pages", () => {
  const urls = blogPostUrls("contract-guide");
  assert.ok(urls.includes("https://counselo-legal.com/blog/en/contract-guide"));
  assert.ok(urls.includes("https://counselo-legal.com/blog/ar/contract-guide"));
  assert.ok(urls.includes("https://counselo-legal.com/blog"));
  assert.ok(urls.includes("https://counselo-legal.com/blog/ar"));
  assert.ok(urls.includes("https://counselo-legal.com/legal-library"));
  assert.ok(urls.includes("https://counselo-legal.com/ar/legal-library"));
  assert.ok(urls.includes("https://counselo-legal.com/uae"));
  assert.ok(urls.includes("https://counselo-legal.com/uae/ar"));
  assert.ok(!urls.includes("https://counselo-legal.com/blog/contract-guide"));
});

test("submits work samples with their collection and Legal Library pages", () => {
  const urls = workSampleUrls("redacted-contract");
  assert.ok(urls.includes("https://counselo-legal.com/our-work/redacted-contract"));
  assert.ok(urls.includes("https://counselo-legal.com/ar/our-work/redacted-contract"));
  assert.ok(urls.includes("https://counselo-legal.com/legal-library"));
  assert.ok(urls.includes("https://counselo-legal.com/ar/legal-library"));
});

test("supports the Google Search Console sitemap submission path", async () => {
  const source = await import("node:fs/promises").then((fs) =>
    fs.readFile(new URL("./google-indexing.ts", import.meta.url), "utf8"),
  );
  assert.match(source, /www\.googleapis\.com\/webmasters\/v3/);
  assert.match(source, /sitemaps/);
  assert.match(source, /GOOGLE_INDEXING_SA_KEY/);
  assert.match(source, /GOOGLE_SEARCH_CONSOLE_SITE_URL/);
  assert.match(source, /GOOGLE_SITEMAP_MIN_INTERVAL_MS/);
});
