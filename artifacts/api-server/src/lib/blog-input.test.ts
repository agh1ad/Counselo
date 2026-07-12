import assert from "node:assert/strict";
import test from "node:test";
import {
  BlogInputError,
  parseBlogPostInput,
  parsePositiveId,
  sanitizeRichText,
} from "./blog-input.js";

const validPost = {
  slug: "valid-article-slug",
  date: "2026-07-12",
  readTime: 5,
  titleEn: "A valid title",
  titleAr: "",
  bodyEn: "<p>Useful content</p>",
  bodyAr: "",
  contentEn: [],
  contentAr: [],
};

test("sanitizes executable HTML while preserving editor formatting", () => {
  const sanitized = sanitizeRichText(
    '<p style="text-align: center; position: fixed">Safe <strong>text</strong></p>' +
      '<script>alert(1)</script><a href="javascript:alert(1)">bad</a>',
  );

  assert.match(sanitized, /<strong>text<\/strong>/);
  assert.match(sanitized, /text-align:\s*center/);
  assert.doesNotMatch(sanitized, /<script|javascript:|position:/i);
});

test("rejects malformed slugs, dates, and reading times", () => {
  assert.throws(
    () => parseBlogPostInput({ ...validPost, slug: "Bad Slug" }),
    BlogInputError,
  );
  assert.throws(
    () => parseBlogPostInput({ ...validPost, date: "2026-02-30" }),
    BlogInputError,
  );
  assert.throws(
    () => parseBlogPostInput({ ...validPost, readTime: Number.NaN }),
    BlogInputError,
  );
});

test("permits an unchanged legacy slug during an update", () => {
  const legacySlug = "Legacy-Article";
  const parsed = parseBlogPostInput(
    { ...validPost, slug: legacySlug },
    { existingSlug: legacySlug },
  );
  assert.equal(parsed.slug, legacySlug);
});

test("validates numeric route identifiers", () => {
  assert.equal(parsePositiveId("42"), 42);
  assert.throws(() => parsePositiveId("not-a-number"), BlogInputError);
  assert.throws(() => parsePositiveId("0"), BlogInputError);
});
