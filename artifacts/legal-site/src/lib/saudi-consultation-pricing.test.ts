import assert from "node:assert/strict";
import test from "node:test";
import { getServicesForRegion } from "@workspace/api-zod/browser";
import { SAUDI_CONSULTATION_PRICES, SAUDI_CONSULTATION_SCOPE, getSaudiConsultationPrice, getSaudiConsultationRelatedPrices } from "../../../../lib/api-zod/src/saudi-consultation-pricing.js";
import { getLegalProblemPages } from "./legal-problem-pages.js";
import { SUB_SERVICE_MAP } from "./sub-service-map.js";

test("publishes the 25 approved Saudi consultation fees with Arabic and English category labels", () => {
  assert.equal(SAUDI_CONSULTATION_PRICES.length, 25);
  assert.equal(new Set(SAUDI_CONSULTATION_PRICES.map(category => category.id)).size, 25);
  const expectedBuckets: Record<number, string[]> = {
    250: ["family-law", "employment-law"],
    300: ["real-estate", "enforcement", "civil-law", "civil-procedure", "immigration-residency", "consumer-ecommerce"],
    350: ["business-law", "administrative-law", "contracts", "criminal-law", "intellectual-property", "cyber-law", "insurance-law", "criminal-procedure", "wills-estates"],
    400: ["companies-law", "banking-finance", "tax-zakat"],
    500: ["foreign-investment", "arbitration", "medical-malpractice", "insolvency-restructuring", "maritime-aviation-transport"],
  };
  for (const [price, categoryIds] of Object.entries(expectedBuckets)) {
    assert.deepEqual(SAUDI_CONSULTATION_PRICES.filter(category => category.priceSAR === Number(price)).map(category => category.id).sort(), categoryIds.sort());
  }
  for (const category of SAUDI_CONSULTATION_PRICES) {
    assert.ok(category.titleEn.trim());
    assert.match(category.titleAr, /[\u0600-\u06ff]/);
    assert.equal(getSaudiConsultationPrice(category.id), category);
  }
});

test("all current Saudi problems use their parent service fee and urgent work has no consultation fee", () => {
  const services = getServicesForRegion("sa");
  assert.equal(services.filter(service => service.kind !== "priority-intake").length, 17);
  for (const service of services) {
    const price = getSaudiConsultationPrice(service.slug);
    if (service.kind === "priority-intake") assert.equal(price, undefined);
    else assert.ok(price, service.slug);
    assert.deepEqual(getSaudiConsultationRelatedPrices(service.slug), []);
  }
  const pages = getLegalProblemPages("sa");
  assert.equal(pages.length, 218);
  for (const page of pages) {
    const primary = getSaudiConsultationPrice(page.parentServiceSlug);
    assert.ok(primary, page.parentServiceSlug);
    assert.equal(getSaudiConsultationPrice(page.parentServiceSlug, page.slug), primary, page.slug);
  }
  for (const unknown of ["", "urgent-legal-assistance", "unknown-service", "corporate-commercial", "tax-vat", "family-personal-status", "constructor", "toString"]) {
    assert.equal(getSaudiConsultationPrice(unknown, "inheritance-and-family-settlements"), undefined);
  }
});

test("legacy Saudi subtopics inherit one service fee while standalone categories keep their own rates", () => {
  for (const service of getServicesForRegion("sa")) {
    const primary = getSaudiConsultationPrice(service.slug);
    for (const subtopic of SUB_SERVICE_MAP[service.slug] ?? []) {
      assert.equal(getSaudiConsultationPrice(service.slug, subtopic.id), primary, `${service.slug}/${subtopic.id}`);
    }
  }
  assert.equal(getSaudiConsultationPrice("family-law", "inheritance-disputes")?.priceSAR, 250);
  assert.equal(getSaudiConsultationPrice("wills-estates")?.priceSAR, 350);
  assert.equal(getSaudiConsultationPrice("business-law", "bankruptcy-liquidation")?.priceSAR, 350);
  assert.equal(getSaudiConsultationPrice("insolvency-restructuring")?.priceSAR, 500);
  assert.equal(getSaudiConsultationPrice("cyber-law", "ecommerce-disputes")?.priceSAR, 350);
  assert.equal(getSaudiConsultationPrice("consumer-ecommerce")?.priceSAR, 300);
  for (const category of SAUDI_CONSULTATION_PRICES) {
    assert.deepEqual(getSaudiConsultationRelatedPrices(category.id), []);
    assert.equal(getSaudiConsultationPrice(category.id, "any-topic-within-this-service"), category);
  }
});

test("shared scope covers written online advice and same-topic questions while keeping representation within the team", () => {
  assert.match(SAUDI_CONSULTATION_SCOPE.en, /written legal advice online/);
  assert.match(SAUDI_CONSULTATION_SCOPE.en, /discussion.*questions.*same consultation topic/);
  assert.match(SAUDI_CONSULTATION_SCOPE.en, /same CounselO team.*representation.*separate fees agreed/);
  assert.match(SAUDI_CONSULTATION_SCOPE.ar, /مكتوبة ومفصلة عبر الإنترنت/);
  assert.match(SAUDI_CONSULTATION_SCOPE.ar, /مناقشة.*أسئلتك.*موضوعها نفسه/);
  assert.match(SAUDI_CONSULTATION_SCOPE.ar, /فريق كاونسلو نفسه.*التمثيل القانوني.*أتعاب منفصلة/);
  assert.doesNotMatch(Object.values(SAUDI_CONSULTATION_SCOPE).join(" "), /VAT|tax included|24.hour|unlimited|ضريبة|ساعة|غير محدود/i);
});
