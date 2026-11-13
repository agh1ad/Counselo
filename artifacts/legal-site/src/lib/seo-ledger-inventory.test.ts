import assert from "node:assert/strict";
import test from "node:test";
import { reconcileSeoLedgerInventory } from "./seo-ledger-inventory";

test("PDFs with a validated work page are counted separately from rendered HTML", () => {
  const rendered = new Set(["/our-work/published-work", "/ar/our-work/arabic-work"]);
  const sitemap = new Set([...rendered, "/documents/published-work.pdf", "/documents/arabic-work.pdf"]);
  const result = reconcileSeoLedgerInventory(sitemap, rendered);
  assert.deepEqual(result.issues, []);
  assert.deepEqual(result.documentRoutes, ["/documents/arabic-work.pdf", "/documents/published-work.pdf"]);
});

test("document classification retains malformed, orphaned and missing HTML inventory errors", () => {
  const rendered = new Set(["/our-work/published-work", "/missing-from-sitemap"]);
  const invalidDocuments = ["/documents", "/documents/published-work", "/documents/published-work.PDF", "/documents/published-work.pdf?download=1", "/documents/nested/published-work.pdf", "/documents/unknown-work.pdf"];
  const result = reconcileSeoLedgerInventory(new Set(["/our-work/published-work", "/documents/published-work.pdf", "/unvalidated-page", ...invalidDocuments]), rendered);
  assert.deepEqual(result.documentRoutes, ["/documents/published-work.pdf"]);
  for (const route of [...invalidDocuments, "/unvalidated-page", "/missing-from-sitemap"]) assert.ok(result.issues.some(issue => issue.route === route), route);
  assert.equal(result.issues.length, invalidDocuments.length + 2);
});
