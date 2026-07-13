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

test("demotes CMS H1 headings so the article template owns the only H1", () => {
  const sanitized = sanitizeRichText("<h1>Section heading</h1><p>Body</p>");
  assert.equal(sanitized, "<h2>Section heading</h2><p>Body</p>");
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

test("allows drafts but blocks publication with weak search metadata", () => {
  assert.equal(parseBlogPostInput(validPost).published, false);
  assert.throws(
    () => parseBlogPostInput({ ...validPost, published: true }),
    /SEO title must be 20–70 characters before publishing/,
  );
});

test("enforces one article language and one metadata set", () => {
  assert.throws(
    () => parseBlogPostInput({
      ...validPost,
      titleAr: "عنوان عربي",
      bodyAr: "<p>محتوى عربي مفيد</p>",
    }),
    /either English or Arabic, not both/,
  );

  const arabicPost = parseBlogPostInput({
    ...validPost,
    titleEn: "",
    bodyEn: "",
    titleAr: "عنوان عربي صالح",
    bodyAr: "<p>محتوى عربي مفيد</p>",
    seoTitleEn: "Stale English metadata must be removed",
    seoDescriptionEn: "Stale English description must also be removed from the saved article metadata.",
  });
  assert.equal(arabicPost.titleEn, "");
  assert.equal(arabicPost.seoTitleEn, "");
  assert.equal(arabicPost.seoDescriptionEn, "");
  assert.equal(arabicPost.titleAr, "عنوان عربي صالح");
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
