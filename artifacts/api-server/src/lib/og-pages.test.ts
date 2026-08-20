import assert from "node:assert/strict";
import test from "node:test";
import type { BlogPost } from "@workspace/db";
import {
  BLOG_REVIEWER_ATTRIBUTION,
  BLOG_SOCIAL_IMAGE,
  blogPath,
} from "@workspace/api-zod";

// Importing the production route module also initializes the lazy database
// pool. No connection is made by this pure renderer test, but the module still
// requires a syntactically valid URL at startup.
process.env.DATABASE_URL ??= "postgresql://test:test@127.0.0.1:5432/counselo_renderer_test";
const { buildDynamicBlogHtml } = await import("../og-pages.js");

const FUTURE_SLUG = "future-post-published-after-the-last-deployment";

const futurePost = {
  id: 999_999,
  slug: FUTURE_SLUG,
  date: "2035-01-15",
  categoryEn: "Contracts",
  categoryAr: "العقود",
  readTime: 6,
  titleEn: "A Future Contract Article Published Without a Rebuild",
  titleAr: "مقال مستقبلي عن العقود يُنشر دون إعادة بناء الموقع",
  excerptEn: "This synthetic future article proves that database publications receive complete social metadata without being part of the prerender inventory.",
  excerptAr: "يثبت هذا المقال المستقبلي التجريبي أن المنشورات الجديدة تحصل على بيانات المشاركة كاملة دون أن تكون ضمن قائمة البناء المسبق.",
  seoTitleEn: "Future Contract Article Without a Rebuild",
  seoTitleAr: "مقال عقود مستقبلي دون إعادة بناء",
  seoDescriptionEn: "A future database post must receive its canonical URL, reviewer attribution, and large social image dynamically on its first request.",
  seoDescriptionAr: "يجب أن يحصل أي مقال مستقبلي من قاعدة البيانات على رابطه الأساسي واسم المراجع وصورة المشاركة ديناميكيًا من أول طلب.",
  bodyEn: "<p>Complete English article content.</p>",
  bodyAr: "<p>محتوى المقال العربي الكامل.</p>",
  contentEn: [],
  contentAr: [],
  relatedServiceSlugs: [],
  relatedBlogSlugs: [],
  relatedWorkSlugs: [],
  contentType: "professional-commentary",
  aiLinksAssignedAt: null,
  primaryAuthorName: "CounselO Legal Team",
  primaryAuthorNameAr: "فريق كاونسلو القانوني",
  primaryAuthorUrl: "/sa/about",
  legalReviewerName: "stale value that must not control attribution",
  legalReviewerNameAr: "قيمة قديمة يجب ألا تتحكم في اسم المراجع",
  legalReviewerUrl: "/sa/about",
  jurisdiction: "sa",
  applicableLaw: "",
  applicableLawAr: "",
  sources: [],
  keyLegalUpdateNote: "",
  keyLegalUpdateNoteAr: "",
  contentMethodology: "",
  contentMethodologyAr: "",
  lastSubstantiveReviewAt: "2035-01-15",
  correctionUrl: "/sa/contact?subject=article-correction",
  published: true,
  createdAt: new Date("2035-01-15T00:00:00.000Z"),
  updatedAt: new Date("2035-01-15T00:00:00.000Z"),
} satisfies BlogPost;

const shell = "<!doctype html><html><head><!--app-head--></head><body><div id=\"root\"></div></body></html>";

for (const language of ["en", "ar"] as const) {
  test(`future ${language} posts receive reviewer and social preview metadata dynamically`, () => {
    const html = buildDynamicBlogHtml(futurePost, language, shell);
    const canonical = `https://counselo-legal.com${blogPath(FUTURE_SLUG, language)}`;
    const reviewer = BLOG_REVIEWER_ATTRIBUTION[language];

    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}">`));
    assert.match(html, new RegExp(`<meta property="og:url" content="${canonical}">`));
    assert.match(html, new RegExp(`<meta property="og:image" content="${BLOG_SOCIAL_IMAGE.url}">`));
    assert.match(html, /<meta property="og:image:width" content="1200">/);
    assert.match(html, /<meta property="og:image:height" content="630">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
    assert.ok(html.includes(`<meta name="reviewed-by" content="${reviewer}">`));
    assert.ok(html.includes(`>${reviewer}</a>`));
  });
}
