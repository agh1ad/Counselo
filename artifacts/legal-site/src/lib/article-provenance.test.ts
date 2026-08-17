import assert from "node:assert/strict";
import test from "node:test";
import { articleJurisdictionLabel, assignArticleProvenance, localizeArticleProvenanceUrl } from "@workspace/api-zod";

test("articles default to safe professional commentary", () => {
  const provenance = assignArticleProvenance({
    titleEn: "Real estate dispute in Saudi Arabia",
    excerptEn: "A practical guide to Saudi property disputes and official remedies.",
    categoryEn: "Real Estate Law",
    date: "2025-01-10",
  });
  assert.equal(provenance.contentType, "professional-commentary");
  assert.equal(provenance.jurisdiction, undefined);
  assert.equal(provenance.primaryAuthorName, "CounselO Legal Team");
  assert.equal(provenance.primaryAuthorNameAr, "فريق كاونسلو القانوني");
  assert.equal(provenance.legalReviewerName, "Omar Al-Baghdadi");
  assert.equal(provenance.legalReviewerNameAr, "عمر البغدادي");
  assert.equal(provenance.lastSubstantiveReviewAt, "2025-01-10");
  assert.equal(provenance.sources.length, 0);
  assert.ok(provenance.correctionUrl.includes("article-correction"));
});

test("legal guidance requires an explicit content type", () => {
  const provenance = assignArticleProvenance({
    contentType: "legal-guidance",
    titleEn: "Real estate dispute in Saudi Arabia",
    relatedServiceSlugs: ["real-estate"],
    date: "2025-01-10",
  });
  assert.equal(provenance.jurisdiction, "sa");
  assert.equal(provenance.sources[0]?.href, "https://rega.gov.sa/");
  assert.equal(provenance.legalReviewerName, "Omar Al-Baghdadi");
});

test("provenance assigns jurisdiction-specific sources and labels", () => {
  const provenance = assignArticleProvenance({
    contentType: "legal-guidance",
    titleEn: "UAE commercial contracts",
    excerptEn: "A guide to commercial contracts in Dubai and Abu Dhabi.",
    categoryEn: "Commercial Law",
    date: "2026-08-08",
  });
  assert.equal(provenance.jurisdiction, "uae");
  assert.equal(articleJurisdictionLabel(provenance.jurisdiction!, false), "United Arab Emirates");
  assert.equal(articleJurisdictionLabel(provenance.jurisdiction!, true), "الإمارات العربية المتحدة");
  assert.ok(provenance.sources.some((source) => source.href.includes("uaelegislation.gov.ae")));
});

test("Saudi topic sources are selected by exact related service slug", () => {
  const intellectualProperty = assignArticleProvenance({
    contentType: "legal-guidance",
    titleEn: "Intellectual property registration in Saudi Arabia",
    relatedServiceSlugs: ["intellectual-property"],
  });
  const realEstate = assignArticleProvenance({
    contentType: "legal-guidance",
    titleEn: "Real estate disputes in Saudi Arabia",
    relatedServiceSlugs: ["real-estate"],
  });
  assert.equal(intellectualProperty.sources[0]?.href, "https://www.saip.gov.sa/");
  assert.equal(realEstate.sources[0]?.href, "https://rega.gov.sa/");
});

test("Syria topic sources are selected by exact related service slug", () => {
  const intellectualProperty = assignArticleProvenance({
    contentType: "legal-guidance",
    titleEn: "Trademark registration in Syria",
    relatedServiceSlugs: ["intellectual-property"],
  });
  const realEstate = assignArticleProvenance({
    contentType: "legal-guidance",
    titleEn: "Property title registration in Syria",
    relatedServiceSlugs: ["real-estate"],
  });
  assert.equal(intellectualProperty.sources[0]?.href, "https://www.parliament.gov.sy/");
  assert.equal(realEstate.sources[0]?.href, "https://www.parliament.gov.sy/");
  assert.notEqual(intellectualProperty.sources[0]?.href, "https://moj.gov.sy/");
});

test("legacy provenance links follow the article jurisdiction and language", () => {
  assert.equal(localizeArticleProvenanceUrl("/about", "uae", "ar", "profile"), "/uae/ar/about");
  assert.equal(
    localizeArticleProvenanceUrl("/contact?subject=article-correction", "syr", "en", "correction"),
    "/syr/contact?subject=article-correction",
  );
  assert.equal(
    localizeArticleProvenanceUrl("https://example.com/independent-author", "sa", "ar", "profile"),
    "https://example.com/independent-author",
  );
});
