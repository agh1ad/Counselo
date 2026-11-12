import assert from "node:assert/strict";
import test from "node:test";
import { countPublishedPortfolio } from "./portfolio-facts";

test("portfolio count excludes drafts and deduplicates published records by identity or route", () => {
  assert.equal(countPublishedPortfolio([
    { id: 1, slug: "commercial-contract", published: true },
    { id: "1", slug: "commercial-contract", published: true },
    { id: 1, slug: "renamed-contract", published: true },
    { id: 2, slug: "commercial-contract", published: true },
    { id: 3, slug: "unpublished-draft", published: false },
    { id: 4, slug: "status-not-supplied" },
    { id: 5, slug: "credited-partner-study", published: true, creator: "baghdadi-law" },
    { slug: "legacy-published-study", published: true },
    null,
    { published: true },
  ]), 3);
});

test("unknown or failed inventory is distinct from a successfully loaded empty library", () => {
  assert.equal(countPublishedPortfolio(undefined), undefined);
  assert.equal(countPublishedPortfolio(null), undefined);
  assert.equal(countPublishedPortfolio({ error: "Service unavailable" }), undefined);
  assert.equal(countPublishedPortfolio([]), 0);
  assert.equal(countPublishedPortfolio([{ id: 1, published: false }, { id: 1, published: true }]), 1);
});
