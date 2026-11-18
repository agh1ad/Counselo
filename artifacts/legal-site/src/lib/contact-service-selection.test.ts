import assert from "node:assert/strict";
import test from "node:test";
import { getConsultationPrices, getConsultationPrice, getServicesForRegion } from "@workspace/api-zod/browser";
import { getContactServiceOptions, getContactServicePrefill } from "./contact-service-selection";
import { createContactFormSchema } from "../components/contact/contact-form-schema";

test("regional intake offers every published category and urgent assistance in both languages", () => {
  for (const region of ["sa", "syr", "uae"] as const) for (const isArabic of [false, true]) {
    const options = getContactServiceOptions(region, isArabic);
    const categories = getConsultationPrices(region);
    assert.equal(options.length, categories.length + 1);
    assert.equal(new Set(options.map(option => option.value)).size, options.length);
    for (const category of categories) {
      assert.equal(options.find(option => option.value === category.id)?.label, isArabic ? category.titleAr : category.titleEn);
      assert.equal(getContactServicePrefill(region, `?consultation=${category.id}`), category.id);
    }
    for (const service of getServicesForRegion(region)) assert.ok(options.some(option => option.value === service.slug));
  }
});

test("service links keep their parent fee even when older links name a differently priced topic", () => {
  for (const search of [
    "?service=family-law&consultation=wills-estates",
    "?service=family-law&problem=inheritance-and-family-settlements",
  ]) {
    const selected = getContactServicePrefill("sa", search);
    assert.equal(selected, "family-law");
    assert.equal(getConsultationPrice("sa", selected)?.amount, 250);
  }
  assert.equal(getContactServicePrefill("sa", "?consultation=insolvency-restructuring"), "insolvency-restructuring");
  assert.equal(getContactServicePrefill("sa", "?service=urgent-legal-assistance&consultation=family-law"), "urgent-legal-assistance");
});

test("regional choices reject unknown and cross-region category identifiers", () => {
  for (const [region, unavailableCategory] of [["uae", "civil-procedure"], ["syr", "corporate-commercial"], ["sa", "corporate-commercial"]] as const) {
    const options = getContactServiceOptions(region, false);
    assert.equal(getContactServicePrefill(region, `?consultation=${unavailableCategory}`), "");
    assert.equal(getContactServicePrefill(region, `?service=${unavailableCategory}`), "");
    const schema = createContactFormSchema(false, options.map(option => option.value));
    assert.equal(schema.safeParse({ name: "Test Client", email: "test@example.com", phone: "+966550001234", service: unavailableCategory, message: "Please advise on this legal matter." }).success, false);
  }
  assert.equal(getContactServicePrefill("sa", "?consultation=unknown&service=corporate-commercial"), "");
  assert.equal(getContactServicePrefill("sa", "?consultation=unknown&service=family-law"), "family-law");
  assert.equal(getContactServicePrefill("uae", "?service=consumer-ecommerce&consultation=family-law"), "consumer-ecommerce");
  assert.equal(getContactServicePrefill("uae", "?consultation=consumer-ecommerce"), "consumer-ecommerce");
});

test("shared category identifiers retain the current country's price and currency", () => {
  const cases = [
    ["sa", "?consultation=wills-estates", "wills-estates", 350, "SAR"],
    ["syr", "?consultation=wills-estates", "wills-estates", 60, "USD"],
    ["uae", "?consultation=wills-estates", "wills-estates", 400, "AED"],
    ["uae", "?service=commercial-contracts&consultation=consumer-ecommerce", "commercial-contracts", 400, "AED"],
    ["syr", "?service=family-law&consultation=wills-estates", "family-law", 40, "USD"],
    ["uae", "?service=family-personal-status&consultation=wills-estates", "family-personal-status", 300, "AED"],
  ] as const;
  for (const [region, search, category, amount, currency] of cases) {
    const selected = getContactServicePrefill(region, search);
    assert.equal(selected, category);
    assert.equal(getConsultationPrice(region, selected)?.amount, amount);
    assert.equal(getConsultationPrice(region, selected)?.currency, currency);
  }
});
