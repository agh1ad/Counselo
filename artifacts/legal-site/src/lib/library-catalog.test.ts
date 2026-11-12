import assert from "node:assert/strict";
import test from "node:test";
import { createLibraryCatalog, DEFAULT_LIBRARY_FILTERS, filterLibraryCatalog, libraryDate, libraryTopicOptions, type LibraryPost } from "./library-catalog";
import type { WorkSamplePublic } from "./work-samples";
const post = (overrides: Partial<LibraryPost> = {}): LibraryPost => ({ id: 1, slug: "saudi-contracts-test", titleEn: "Saudi contract termination", titleAr: "فسخ العَقْد السعودي", excerptEn: "Commercial contract review", excerptAr: "مراجعة العقود التجارية", categoryEn: "Contracts", categoryAr: "العقود", readTime: 4, date: "2026-09-01", published: true, relatedServiceSlugs: ["contracts"], ...overrides });
const work = (overrides: Partial<WorkSamplePublic> = {}): WorkSamplePublic => ({ id: 1, slug: "syrian-contract-test", titleEn: "Contract review", titleAr: "مراجعة عقد", summaryEn: "Commercial settlement", summaryAr: "تسوية تجارية", workTypeEn: "Agreement", workTypeAr: "اتفاقية", jurisdictionEn: "Syria", jurisdictionAr: "سوريا", date: "2026-10-01", published: true, relatedServiceSlugs: ["commercial-contracts"], ...overrides } as WorkSamplePublic);

test("catalog retains only published resources in the requested language with unique stable identities", () => {
  const posts = [post(), post(), post({ slug: "private", published: false }), post({ slug: "unavailable", bilingual: false }), post({ slug: "en-only", titleAr: "" })];
  const works = [work(), work({ slug: "ar-only", titleEn: "" }), work({ slug: "private", published: false })];
  const en = createLibraryCatalog(posts, works, "en");
  assert.equal(en.length, 3);
  assert.ok(en.some(item => item.href === "/blog/en/en-only"));
  const ar = createLibraryCatalog(posts, works, "ar");
  assert.equal(ar.length, 3);
  assert.ok(ar.some(item => item.href === "/ar/our-work/ar-only"));
  assert.ok(ar.some(item => item.href === "/blog/ar/saudi-contracts-test"));
});

test("jurisdiction filters respect editorial context and never default unknown or cross-border resources to Saudi Arabia", () => {
  const resources = createLibraryCatalog([
    post(), post({ slug: "hmayh-alamyl-mn-mswdh-alaqd-ala-altwqya" }),
    post({ slug: "multiple", titleEn: "Saudi and Syrian contracts", titleAr: "", excerptAr: "" }),
  ], [work(), work({ slug: "cross-border", jurisdictionEn: "Cross-border: Saudi Arabia and UAE", jurisdictionAr: "" }), work({ slug: "unknown", jurisdictionEn: "", jurisdictionAr: "" })], "en");
  assert.deepEqual(filterLibraryCatalog(resources, { ...DEFAULT_LIBRARY_FILTERS, region: "sa" }, "en").map(item => item.id), ["article:saudi-contracts-test"]);
  assert.equal(filterLibraryCatalog(resources, { ...DEFAULT_LIBRARY_FILTERS, region: "general" }, "en").length, 4);
  assert.equal(filterLibraryCatalog(resources, { ...DEFAULT_LIBRARY_FILTERS, region: "syr", kind: "work" }, "en").length, 1);
});

test("search combines tokens, supports Arabic marks and bilingual queries, and intersects the selected filters", () => {
  const resources = createLibraryCatalog([post(), post({ slug: "uae-test", titleEn: "UAE employment", titleAr: "العمل في الإمارات", excerptEn: "Employment advice", excerptAr: "استشارة عمالية", categoryEn: "Employment", categoryAr: "العمل", relatedServiceSlugs: ["employment-labour"] })], [work()], "en");
  assert.equal(filterLibraryCatalog(resources, { ...DEFAULT_LIBRARY_FILTERS, query: "  سعودي  العقد " }, "en").length, 1);
  assert.equal(filterLibraryCatalog(resources, { ...DEFAULT_LIBRARY_FILTERS, query: "contract SAUDI", kind: "article", region: "sa", topic: "contracts" }, "en").length, 1);
  assert.equal(filterLibraryCatalog(resources, { ...DEFAULT_LIBRARY_FILTERS, query: "contract", region: "uae" }, "en").length, 0);
  assert.equal(filterLibraryCatalog(resources, { ...DEFAULT_LIBRARY_FILTERS, topic: "contracts", kind: "work" }, "en").length, 1);
  assert.deepEqual(libraryTopicOptions(resources, "en").map(item => item.value).sort(), ["contracts", "employment-law"]);
});

test("sorting is stable, does not mutate the catalog, and handles invalid dates", () => {
  const resources = createLibraryCatalog([post(), post({ slug: "undated", date: "invalid" })], [work()], "en");
  const original = resources.map(item => item.id);
  assert.equal(filterLibraryCatalog(resources, DEFAULT_LIBRARY_FILTERS, "en")[0].kind, "work");
  assert.equal(filterLibraryCatalog(resources, { ...DEFAULT_LIBRARY_FILTERS, sort: "oldest" }, "en")[0].id, "article:undated");
  assert.deepEqual(resources.map(item => item.id), original);
  assert.equal(libraryDate("invalid", "en"), "");
  assert.equal(libraryDate("2026-09-01", "en"), "1 Sept 2026");
  assert.deepEqual(filterLibraryCatalog([], DEFAULT_LIBRARY_FILTERS, "ar"), []);
});
