import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const llmsPath = resolve(process.cwd(), "public/llms.txt");

test("llms.txt documents all jurisdictions, scope, editorial links, and contact routes", () => {
  const content = readFileSync(llmsPath, "utf8");
  for (const required of [
    "Last updated: 2026-08-08",
    "United Arab Emirates",
    "Saudi Arabia",
    "Syria",
    "Arabic and English",
    "Licensing and representation scope",
    "/uae/services",
    "/sa/services",
    "/syr/services",
    "https://counselo-legal.com/blog",
    "https://counselo-legal.com/our-work",
    "/sa/about",
    "article-correction",
    "/uae/contact",
    "/sa/contact",
    "/syr/contact",
  ]) {
    assert.ok(content.includes(required), `llms.txt is missing ${required}`);
  }
});
