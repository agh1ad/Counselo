import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const llmsPath = resolve(process.cwd(), "public/llms.txt");

test("llms.txt documents all jurisdictions, scope, editorial links, and contact routes", () => {
  const content = readFileSync(llmsPath, "utf8");
  for (const required of [
    "United Arab Emirates",
    "Saudi Arabia",
    "Syria",
    "Arabic and English",
    "Local partners and representation scope",
    "/our-work/mnhj-kawnslw-fy-mrajah-alaqwd-altjaryh",
    "/our-work/msandh-kawnslw-fy-qdyh-aabrh-llhdwd",
    "https://counselo-legal.com/sitemap-work.xml",
    "https://counselo-legal.com/documents/{work-slug}.pdf",
    "/documents/mnhj-kawnslw-fy-mrajah-alaqwd-altjaryh.pdf",
    "/documents/kawnslw-w-tkhfyd-mtalbh-amwlh-tjaryh-mn-348-mlywn-ryal-ila-584-alf-ryal.pdf",
    "/documents/msandh-kawnslw-fy-qdyh-aabrh-llhdwd.pdf",
    "/documents/kyf-sahmt-kawnslw-fy-anjah-mlf-thkymy-kaml.pdf",
    "/uae/services",
    "/sa/services",
    "/syr/services",
    "https://counselo-legal.com/blog",
    "https://counselo-legal.com/legal-library",
    "https://counselo-legal.com/ar/legal-library",
    "https://counselo-legal.com/our-work",
    "/sa/about",
    "article-correction",
    "/uae/contact",
    "/sa/contact",
    "/syr/contact",
  ]) {
    assert.ok(content.includes(required), `llms.txt is missing ${required}`);
  }
  assert.match(content, /Last updated: \d{4}-\d{2}-\d{2}/);
});
