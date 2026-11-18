import assert from "node:assert/strict";
import test from "node:test";
import { getServicesForRegion } from "@workspace/api-zod/browser";
import { CONSULTATION_PRICES_UPDATED_AT, CONSULTATION_SCOPE, getConsultationPrice, getConsultationPrices, getConsultationRelatedPrices } from "../../../../lib/api-zod/src/regional-consultation-pricing.js";
import { SAUDI_CONSULTATION_PRICES, SAUDI_CONSULTATION_PRICES_UPDATED_AT, SAUDI_CONSULTATION_SCOPE, getSaudiConsultationPrice, getSaudiConsultationRelatedPrices } from "../../../../lib/api-zod/src/saudi-consultation-pricing.js";
import { getLegalProblemPages } from "./legal-problem-pages.js";

const regions = ["sa", "syr", "uae"] as const;

test("the regional adapter preserves all owner-approved Saudi service fees and scope", () => {
  assert.equal(CONSULTATION_PRICES_UPDATED_AT, SAUDI_CONSULTATION_PRICES_UPDATED_AT);
  assert.equal(CONSULTATION_SCOPE, SAUDI_CONSULTATION_SCOPE);
  assert.deepEqual(getConsultationPrices("sa"), SAUDI_CONSULTATION_PRICES.map(({ priceSAR, ...category }) => ({ ...category, amount: priceSAR, currency: "SAR", region: "sa" })));
  for (const page of getLegalProblemPages("sa")) {
    const current = getConsultationPrice("sa", page.parentServiceSlug, page.slug)!;
    const previous = getSaudiConsultationPrice(page.parentServiceSlug, page.slug)!;
    assert.equal(current.id, previous.id);
    assert.equal(current.amount, previous.priceSAR);
  }
  for (const service of getServicesForRegion("sa")) {
    assert.deepEqual(getConsultationRelatedPrices("sa", service.slug).map(category => category.id), getSaudiConsultationRelatedPrices(service.slug).map(category => category.id));
  }
});

test("publishes the selected complete Syrian USD and UAE AED schedules", () => {
  const syriaBuckets: Record<number, string[]> = {
    40: ["family-law", "employment-law"],
    50: ["real-estate", "enforcement", "civil-law", "civil-procedure", "immigration-residency", "consumer-ecommerce"],
    60: ["business-law", "administrative-law", "contracts", "criminal-law", "intellectual-property", "cyber-law", "insurance-law", "criminal-procedure", "wills-estates"],
    75: ["companies-law", "banking-finance", "tax-zakat"],
    100: ["foreign-investment", "arbitration", "medical-malpractice", "insolvency-restructuring", "maritime-aviation-transport"],
  };
  const uaeBuckets: Record<number, string[]> = {
    300: ["employment-labour", "family-personal-status", "immigration-residency", "consumer-ecommerce"],
    350: ["real-estate-construction", "enforcement-debt-recovery"],
    400: ["commercial-contracts", "wills-estates", "criminal-investigations", "litigation-court-disputes", "intellectual-property", "technology-data-protection", "insurance", "administrative-regulatory"],
    450: ["corporate-commercial"],
    500: ["banking-finance", "tax-vat"],
    600: ["foreign-investment-market-entry", "arbitration-mediation", "insolvency-restructuring", "healthcare-medical-liability", "maritime-aviation-transport"],
  };
  for (const [region, buckets, count, currency] of [["syr", syriaBuckets, 25, "USD"], ["uae", uaeBuckets, 22, "AED"]] as const) {
    const catalog = getConsultationPrices(region);
    assert.equal(catalog.length, count);
    assert.equal(new Set(catalog.map(category => category.id)).size, count);
    for (const [amount, ids] of Object.entries(buckets)) {
      assert.deepEqual(catalog.filter(category => category.amount === Number(amount)).map(category => category.id).sort(), [...ids].sort());
    }
    for (const category of catalog) {
      assert.equal(category.region, region);
      assert.equal(category.currency, currency);
      assert.ok(category.titleEn.trim());
      assert.match(category.titleAr, /[\u0600-\u06ff]/);
      assert.equal(getConsultationPrice(region, category.id), category);
    }
  }
  assert.equal(getConsultationPrice("syr", "tax-zakat")?.titleEn, "Tax & Customs");
  assert.equal(getConsultationPrice("syr", "tax-zakat")?.titleAr, "الضرائب والجمارك");
});

test("all 560 regional problem pages use exactly their parent service price and currency", () => {
  const expectedServiceCounts = { sa: 17, syr: 20, uae: 22 };
  const expectedProblemCounts = { sa: 218, syr: 234, uae: 108 };
  const expectedCurrencies = { sa: "SAR", syr: "USD", uae: "AED" };
  let checked = 0;
  for (const region of regions) {
    const services = getServicesForRegion(region);
    assert.equal(services.filter(service => service.kind !== "priority-intake").length, expectedServiceCounts[region]);
    for (const service of services) {
      const category = getConsultationPrice(region, service.slug);
      if (service.kind === "priority-intake") assert.equal(category, undefined);
      else assert.equal(category?.currency, expectedCurrencies[region], `${region}/${service.slug}`);
    }
    const pages = getLegalProblemPages(region);
    assert.equal(pages.length, expectedProblemCounts[region]);
    for (const page of pages) {
      const primary = getConsultationPrice(region, page.parentServiceSlug);
      assert.ok(primary && primary.amount > 0, `${region}/${page.parentServiceSlug}`);
      assert.equal(primary.region, region);
      assert.equal(primary.currency, expectedCurrencies[region]);
      assert.equal(getConsultationPrice(region, page.parentServiceSlug, page.slug), primary, `${region}/${page.parentServiceSlug}/${page.slug}`);
      checked++;
    }
    for (const unknown of ["", "unknown-service", "urgent-legal-assistance", "constructor", "toString"]) {
      assert.equal(getConsultationPrice(region, unknown, "inheritance-and-family-settlements"), undefined);
      assert.deepEqual(getConsultationRelatedPrices(region, unknown), []);
    }
  }
  assert.equal(checked, 560);
  assert.equal(getConsultationPrice("uae", "family-law"), undefined);
  assert.equal(getConsultationPrice("syr", "family-personal-status"), undefined);
  assert.equal(getConsultationPrice("sa", "corporate-commercial"), undefined);
});

test("standalone categories retain their published prices without overriding topics within another service", () => {
  assert.equal(getConsultationPrice("sa", "family-law", "inheritance-and-family-settlements")?.amount, 250);
  assert.equal(getConsultationPrice("sa", "wills-estates")?.amount, 350);
  assert.equal(getConsultationPrice("syr", "family-law", "inheritance-and-family-settlements")?.amount, 40);
  assert.equal(getConsultationPrice("syr", "wills-estates")?.amount, 60);
  assert.equal(getConsultationPrice("syr", "business-law", "company-formation-and-registration")?.amount, 60);
  assert.equal(getConsultationPrice("syr", "companies-law")?.amount, 75);
  assert.equal(getConsultationPrice("uae", "family-personal-status", "inheritance-document-and-civil-record-correction")?.amount, 300);
  assert.equal(getConsultationPrice("uae", "wills-estates")?.amount, 400);
  assert.equal(getConsultationPrice("uae", "commercial-contracts", "consumer-refund-and-purchase-cancellation-dispute")?.amount, 400);
  assert.equal(getConsultationPrice("uae", "consumer-ecommerce")?.amount, 300);
  assert.equal(getConsultationPrice("uae", "insurance", "traffic-report-and-fault-dispute")?.id, "insurance");
});

test("all service and catalog entries expose one fee without secondary-topic pricing", () => {
  for (const region of regions) {
    for (const category of getConsultationPrices(region)) {
      assert.deepEqual(getConsultationRelatedPrices(region, category.id), []);
      assert.equal(getConsultationPrice(region, category.id, "any-topic-within-this-service"), category);
    }
  }
});
