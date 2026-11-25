import assert from "node:assert/strict";
import test from "node:test";
import { articleAuthorFields, assignArticleProvenance, ORIGINAL_FIRM_ARTICLE_CREDIT, storedArticleAuthor } from "@workspace/api-zod";
import {
  BlogInputError,
  parseBlogLegalReviewDate,
  resolveBlogAuthorFields,
  parseBlogPostInput,
  parsePositiveId,
  sanitizeRichText,
  sanitizeBlogPost,
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

const publishableBilingualPost = {
  ...validPost,
  titleEn: "A practical guide to commercial contract disputes",
  titleAr: "دليل عملي لمنازعات العقود التجارية",
  bodyEn: "<p>Complete English guidance written independently for English readers.</p>",
  bodyAr: "<p>إرشادات عربية كاملة مكتوبة بصورة مستقلة للقارئ العربي.</p>",
  excerptEn: "A practical English overview of commercial contract disputes and the steps parties should consider before acting.",
  excerptAr: "نظرة عربية عملية إلى منازعات العقود التجارية والخطوات التي ينبغي للأطراف دراستها قبل اتخاذ أي إجراء.",
  seoTitleEn: "Commercial Contract Disputes: A Practical Guide",
  seoTitleAr: "منازعات العقود التجارية: دليل عملي شامل",
  seoDescriptionEn: "Understand common commercial contract disputes, the evidence to preserve, and the practical legal steps to assess before taking action.",
  seoDescriptionAr: "تعرّف على منازعات العقود التجارية الشائعة والأدلة الواجب حفظها والخطوات القانونية العملية التي ينبغي تقييمها قبل اتخاذ الإجراء.",
};

test("legal review dates must be deliberate, valid calendar dates", () => {
  assert.equal(parseBlogLegalReviewDate({}), undefined);
  assert.equal(parseBlogLegalReviewDate({ legalReviewedAt: "" }), "");
  assert.equal(parseBlogLegalReviewDate({ legalReviewedAt: "2024-02-29" }), "2024-02-29");
  assert.throws(() => parseBlogLegalReviewDate({ legalReviewedAt: "2025-02-29" }), BlogInputError);
  assert.throws(() => parseBlogLegalReviewDate({ legalReviewedAt: "2099-01-01" }), BlogInputError);
});

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

test("allows incomplete drafts but requires both languages before publication", () => {
  assert.equal(parseBlogPostInput(validPost).published, false);
  assert.throws(
    () => parseBlogPostInput({ ...validPost, published: true }),
    /require complete, independently readable English and Arabic articles/,
  );
  assert.throws(
    () => parseBlogPostInput({
      ...publishableBilingualPost,
      seoTitleEn: "Weak title",
      published: true,
    }),
    /SEO title must be 20–70 characters before publishing/,
  );
});

test("publishes only distinct bilingual content and metadata", () => {
  const post = parseBlogPostInput({ ...publishableBilingualPost, published: true });
  assert.equal(post.published, true);
  assert.equal(post.titleEn, publishableBilingualPost.titleEn);
  assert.equal(post.titleAr, publishableBilingualPost.titleAr);

  assert.throws(
    () => parseBlogPostInput({
      ...publishableBilingualPost,
      seoTitleAr: publishableBilingualPost.seoTitleEn,
      published: true,
    }),
    /SEO titles must contain distinct localized text/,
  );
  assert.throws(
    () => parseBlogPostInput({
      ...publishableBilingualPost,
      bodyAr: publishableBilingualPost.bodyEn,
      published: true,
    }),
    /article bodies must contain distinct localized content/,
  );
  assert.throws(
    () => parseBlogPostInput({
      ...publishableBilingualPost,
      bodyEn: "<p>English legal text. English legal text.</p>",
      published: true,
    }),
    /cannot contain placeholder text/,
  );
  assert.throws(
    () => parseBlogPostInput({
      ...publishableBilingualPost,
      seoTitleEn: "/blog/not-a-title",
      published: true,
    }),
    /must be a descriptive title, not a URL or route/,
  );
});

test("accepts bilingual articles while clearing metadata for absent languages", () => {
  const bilingualPost = parseBlogPostInput({
    ...validPost,
    titleAr: "عنوان عربي",
    bodyAr: "<p>محتوى عربي مفيد</p>",
  });
  assert.equal(bilingualPost.titleEn, "A valid title");
  assert.equal(bilingualPost.titleAr, "عنوان عربي");

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

test("commentary posts do not expose legal provenance fields", () => {
  const post = sanitizeBlogPost({
    ...validPost,
    id: 1,
    categoryEn: "Commentary",
    categoryAr: "",
    excerptEn: "A sufficiently complete article excerpt.",
    excerptAr: "",
    seoTitleEn: "A valid article title for testing",
    seoTitleAr: "",
    seoDescriptionEn: "A sufficiently complete description for a commentary article used in this test.",
    seoDescriptionAr: "",
    contentAr: [],
    relatedServiceSlugs: [],
    relatedBlogSlugs: [],
    relatedWorkSlugs: [],
    published: true,
    contentType: "professional-commentary",
    primaryAuthorName: "CounselO Legal team",
    primaryAuthorNameAr: "فريق كاونسلو للاستشارات القانونية",
    primaryAuthorUrl: "/about",
    legalReviewerName: "Lawyer and Legal Consultant Omar Al-Baghdadi",
    legalReviewerNameAr: "المحامي والمستشار القانوني عمر البغدادي",
    legalReviewerUrl: "/about",
    jurisdiction: "sa",
    applicableLaw: "Saudi law",
    applicableLawAr: "القانون السعودي",
    sources: [{ titleEn: "Old source", titleAr: "مصدر قديم", href: "https://example.com" }],
    keyLegalUpdateNote: "Old note",
    keyLegalUpdateNoteAr: "ملاحظة قديمة",
    contentMethodology: "Editorial analysis",
    contentMethodologyAr: "تحليل تحريري",
    lastSubstantiveReviewAt: "2026-08-08",
    correctionUrl: "/contact?subject=article-correction",
    createdAt: new Date(),
    updatedAt: new Date(),
    aiLinksAssignedAt: null,
  });
  assert.equal(post.jurisdiction, "");
  assert.equal(post.applicableLaw, "");
  assert.deepEqual(post.sources, []);
  assert.equal(post.legalReviewerName, "Lawyer and Legal Consultant Omar Al-Baghdadi");
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


test("article author selection survives drafts, bilingual publication and older clients, and can be cleared", () => {
  const draft = parseBlogPostInput(validPost);
  const credit = resolveBlogAuthorFields("abdullah-al-anzi", draft);
  assert.equal(storedArticleAuthor(credit)?.id, "abdullah-al-anzi");
  const published = parseBlogPostInput({ ...publishableBilingualPost, published: true });
  assert.deepEqual(resolveBlogAuthorFields(undefined, published, credit), credit);
  assert.deepEqual(resolveBlogAuthorFields("omar-al-baghdadi", published, credit), articleAuthorFields("omar-al-baghdadi"));
  assert.deepEqual(resolveBlogAuthorFields("", published, credit), articleAuthorFields(""));
  assert.equal(assignArticleProvenance({ ...published, ...credit }, "ar").primaryAuthorUrl, "/sa/ar/about/abdullah-al-anzi#lawyer");
  assert.equal(assignArticleProvenance({ ...published, ...credit }).lastSubstantiveReviewAt, "");
  const syrian = resolveBlogAuthorFields("omar-al-abdullah", published, credit);
  assert.equal(storedArticleAuthor(syrian)?.id, "omar-al-abdullah");
  assert.equal(assignArticleProvenance({ ...published, ...syrian }, "ar").primaryAuthorUrl, "/syr/ar/about/omar-al-abdullah#lawyer");
});

test("an article can only credit a listed person explicitly, and retains the original firm's credit", () => {
  const original = { ...validPost, titleEn: "Hidden Defects in Contracts and Their Legal Effect", bodyEn: "<p>Prepared by Al-Baghdadi Law Firm and published on baghdadilaw.co</p>" };
  assert.deepEqual(resolveBlogAuthorFields("", original), ORIGINAL_FIRM_ARTICLE_CREDIT);
  assert.deepEqual(resolveBlogAuthorFields(undefined, validPost, ORIGINAL_FIRM_ARTICLE_CREDIT), ORIGINAL_FIRM_ARTICLE_CREDIT);
  assert.throws(() => resolveBlogAuthorFields("omar-al-baghdadi", original), BlogInputError);
  assert.throws(() => resolveBlogAuthorFields("https://example.com/author", validPost), BlogInputError);
  const rawInput = parseBlogPostInput({ ...validPost, ...articleAuthorFields("omar-al-baghdadi") });
  assert.deepEqual(resolveBlogAuthorFields(undefined, rawInput), articleAuthorFields(""));
  assert.equal(storedArticleAuthor({ primaryAuthorName: "Omar Al-Baghdadi" }), undefined);
});


test("older personal credits sharing a law office URL continue to resolve to the individual", () => {
  for (const [personId, firmId] of [
    ["abdullah-al-anzi", "abdullah-al-anzi-law-office"],
    ["omar-al-abdullah", "omar-al-abdullah-law-office"],
  ] as const) {
    const firm = resolveBlogAuthorFields(firmId, validPost);
    const lawyer = resolveBlogAuthorFields(personId, validPost);
    const oldLawyer = { ...lawyer, primaryAuthorUrl: firm.primaryAuthorUrl };
    assert.equal(storedArticleAuthor(firm)?.id, firmId);
    assert.equal(storedArticleAuthor(oldLawyer)?.id, personId);
    assert.equal(assignArticleProvenance({ ...validPost, ...oldLawyer }).primaryAuthorType, "Person");
    assert.deepEqual(resolveBlogAuthorFields(undefined, validPost, oldLawyer), lawyer);
    assert.deepEqual(resolveBlogAuthorFields(firmId, validPost, oldLawyer), firm);
    assert.deepEqual(resolveBlogAuthorFields(undefined, validPost, firm), firm);
    assert.deepEqual(resolveBlogAuthorFields("", validPost, firm), articleAuthorFields(""));
  }
});
