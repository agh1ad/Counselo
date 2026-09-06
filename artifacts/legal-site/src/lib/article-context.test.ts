import assert from "node:assert/strict";
import test from "node:test";
import { ARTICLE_CONTEXT, articleContextRegion, articleModifiedAt, getServicesForRegion, localizeArticleProvenanceUrl } from "@workspace/api-zod/browser";

test("article corrections preserve later CMS modifications and ignore invalid dates", () => {
  assert.equal(articleModifiedAt("2026-09-06", "2026-09-08T12:00:00Z", "2026-06-01"), "2026-09-08T12:00:00Z");
  assert.equal(articleModifiedAt("2026-09-06", new Date("2026-01-01"), "invalid"), "2026-09-06");
  assert.equal(articleModifiedAt(null, undefined, "invalid"), undefined);
});

test("article routing does not silently convert general or conflicting scope into Saudi law", () => {
  assert.equal(articleContextRegion({ titleEn: "Preparing a contract for signature" }), undefined);
  assert.equal(articleContextRegion({ titleEn: "Comparing Saudi and Syrian contracts" }), undefined);
  assert.equal(articleContextRegion({ titleAr: "الإثبات في القانون السوري" }), "syr");
  assert.equal(articleContextRegion({ jurisdiction: "uae", titleEn: "Commercial agreements" }), "uae");
  assert.equal(articleContextRegion({ slug: "mta-ykwn-alslh-afdl-mn-alastmrar-fy-alkhswmh", jurisdiction: "sa" }), undefined);
  assert.equal(localizeArticleProvenanceUrl("/sa/about", undefined, "ar", "profile"), "/ar#about-heading-ar");
  assert.equal(localizeArticleProvenanceUrl("/sa/contact?subject=article-correction", undefined, "en", "correction"), "/#jurisdictions-heading");
});

test("curated articles use services that exist in their actual country", () => {
  for (const [slug, context] of Object.entries(ARTICLE_CONTEXT)) if (context.region) {
    assert.ok(getServicesForRegion(context.region).some(service => service.slug === context.serviceSlug), slug);
  }
  assert.equal(ARTICLE_CONTEXT["hyn-ykwn-alaqrar-aqwa-mn-alankar"].serviceSlug, "real-estate");
  assert.equal(ARTICLE_CONTEXT["mta-ythwl-twqya-alaaml-ala-mhdr-almrajah-ala-aqrar-balmswwlyh"].serviceSlug, "employment-law");
});
