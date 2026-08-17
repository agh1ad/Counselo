import assert from "node:assert/strict";
import test from "node:test";
import { resolveBlogRoute } from "./blog-route-policy";

const bilingualPost = {
  slug: "contract-guide",
  titleEn: "Contract guide",
  titleAr: "دليل العقود",
  excerptEn: "English excerpt",
  excerptAr: "مقتطف عربي",
  seoTitleEn: "Contract guide",
  seoTitleAr: "دليل العقود",
  seoDescriptionEn: "English SEO description",
  seoDescriptionAr: "وصف عربي لمحركات البحث",
  bodyEn: "English body",
  bodyAr: "محتوى عربي",
};

test("serves bilingual blog language URLs used by metadata and sitemaps", () => {
  assert.deepEqual(resolveBlogRoute(bilingualPost, "en"), {
    action: "serve",
    route: "/blog/en/contract-guide",
  });
  assert.deepEqual(resolveBlogRoute(bilingualPost, "ar"), {
    action: "serve",
    route: "/blog/ar/contract-guide",
  });
});

test("redirects the old unqualified bilingual URL to its English canonical", () => {
  assert.deepEqual(resolveBlogRoute(bilingualPost), {
    action: "redirect",
    to: "/blog/en/contract-guide",
    status: 301,
  });
});

test("rejects incomplete or duplicate language variants", () => {
  const monolingualPost = { ...bilingualPost, titleAr: "", bodyAr: "" };
  assert.deepEqual(resolveBlogRoute(monolingualPost), { action: "notfound" });
  assert.deepEqual(resolveBlogRoute(monolingualPost, "ar"), { action: "notfound" });
  assert.deepEqual(resolveBlogRoute({ ...bilingualPost, bodyAr: bilingualPost.bodyEn }, "ar"), { action: "notfound" });
});

test("returns notfound when the article record is absent", () => {
  assert.deepEqual(resolveBlogRoute(null, "en"), { action: "notfound" });
});
