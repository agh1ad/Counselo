import assert from "node:assert/strict";
import test from "node:test";
import { articleJurisdictionLabel, assignArticleProvenance } from "@workspace/api-zod";

test("legacy articles receive complete provenance defaults", () => {
  const provenance = assignArticleProvenance({
    titleEn: "Real estate dispute in Saudi Arabia",
    excerptEn: "A practical guide to Saudi property disputes and official remedies.",
    categoryEn: "Real Estate Law",
    date: "2025-01-10",
  });
  assert.equal(provenance.jurisdiction, "sa");
  assert.equal(provenance.primaryAuthorName, "CounselO Legal team");
  assert.equal(provenance.legalReviewerName, "Lawyer and Legal Consultant Omar Al-Baghdadi");
  assert.equal(provenance.lastSubstantiveReviewAt, "2025-01-10");
  assert.equal(provenance.sources.length, 2);
  assert.ok(provenance.correctionUrl.includes("article-correction"));
});

test("provenance assigns jurisdiction-specific sources and labels", () => {
  const provenance = assignArticleProvenance({
    titleEn: "UAE commercial contracts",
    excerptEn: "A guide to commercial contracts in Dubai and Abu Dhabi.",
    categoryEn: "Commercial Law",
    date: "2026-08-08",
  });
  assert.equal(provenance.jurisdiction, "uae");
  assert.equal(articleJurisdictionLabel(provenance.jurisdiction), "United Arab Emirates");
  assert.equal(articleJurisdictionLabel(provenance.jurisdiction, true), "الإمارات العربية المتحدة");
  assert.ok(provenance.sources.some((source) => source.href.includes("uaelegislation.gov.ae")));
});

test("Saudi topic sources are selected by exact related service slug", () => {
  const intellectualProperty = assignArticleProvenance({
    titleEn: "Intellectual property registration in Saudi Arabia",
    relatedServiceSlugs: ["intellectual-property"],
  });
  const realEstate = assignArticleProvenance({
    titleEn: "Real estate disputes in Saudi Arabia",
    relatedServiceSlugs: ["real-estate"],
  });
  assert.equal(intellectualProperty.sources[0]?.href, "https://www.saip.gov.sa/");
  assert.equal(realEstate.sources[0]?.href, "https://rega.gov.sa/");
});
