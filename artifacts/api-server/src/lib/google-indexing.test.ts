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
