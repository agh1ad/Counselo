import assert from "node:assert/strict";
import test from "node:test";
import { getConsultationPrices, getConsultationPrice, getServicesForRegion } from "@workspace/api-zod/browser";
import { getContactConsultationPrice, getContactServiceOptions, getContactServicePrefill } from "./contact-service-selection";
import { LEGAL_PROBLEM_PAGES } from "./legal-problem-pages";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ConsultationSteps } from "../components/contact/consultation-steps";

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
    assert.equal(options.some(option => option.value === unavailableCategory), false);
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

test("general legal-field selection does not turn a request into a paid consultation", () => {
  for (const region of ["sa", "syr", "uae"] as const) {
    for (const category of getConsultationPrices(region)) {
      for (const search of ["", `?service=${category.id}`, `?service=${category.id}&consultation=unknown`]) {
        assert.equal(getContactConsultationPrice(region, search, category.id), undefined, `${region}/${category.id}: ${search}`);
      }
      assert.equal(getContactConsultationPrice(region, `?consultation=${category.id}`, category.id), category);
    }
  }
  assert.equal(getContactConsultationPrice("uae", "?consultation=family-law", "family-personal-status"), undefined);
  assert.equal(getContactConsultationPrice("sa", "?service=urgent-legal-assistance&consultation=family-law", "family-law"), undefined);
  assert.equal(getContactConsultationPrice("sa", "?consultation=family-law", "urgent-legal-assistance"), undefined);
});

test("every service and issue consultation link keeps its parent fee and explicit product intent", () => {
  let serviceCount = 0;
  for (const region of ["sa", "syr", "uae"] as const) {
    for (const service of getServicesForRegion(region)) {
      const price = getConsultationPrice(region, service.slug);
      if (!price) continue;
      const search = `?service=${service.slug}&consultation=${price.id}`;
      const selected = getContactServicePrefill(region, search);
      assert.equal(getContactConsultationPrice(region, search, selected), price);
      serviceCount++;
    }
  }
  assert.equal(serviceCount, 59);
  assert.equal(LEGAL_PROBLEM_PAGES.length, 560);
  for (const page of LEGAL_PROBLEM_PAGES) {
    const price = getConsultationPrice(page.region, page.parentServiceSlug)!;
    const search = `?service=${page.parentServiceSlug}&consultation=${price.id}&problem=${page.slug}`;
    assert.equal(getContactConsultationPrice(page.region, search, getContactServicePrefill(page.region, search)), price);
  }
  for (const region of ["sa", "syr"] as const) {
    const legacySearch = "?service=family-law&consultation=wills-estates";
    assert.equal(getContactConsultationPrice(region, legacySearch, getContactServicePrefill(region, legacySearch)), getConsultationPrice(region, "family-law"));
  }
});

test("general and consultation journeys distinguish work, fees and delivery in both languages", () => {
  for (const isArabic of [false, true]) {
    const general = renderToStaticMarkup(createElement(ConsultationSteps, { isArabic }));
    const consultation = renderToStaticMarkup(createElement(ConsultationSteps, { isArabic, isConsultation: true }));
    assert.match(general, isArabic ? /صياغة أو تمثيل قانوني/ : /advice, drafting or representation/);
    assert.match(general, isArabic ? /الحضور المطلوب أمام المحاكم بأعضائه المرخصين/ : /required court attendance through its appropriately licensed members/);
    assert.match(general, isArabic ? /للاستشارات رسوم ثابتة منشورة/ : /Consultations have published fixed fees/);
    assert.doesNotMatch(general, /Your consultation in 4 steps|استشارتك في ٤ خطوات|Receive your advice|استلم الاستشارة/);
    assert.match(consultation, isArabic ? /استشارتك في ٤ خطوات/ : /Your consultation in 4 steps/);
    assert.match(consultation, isArabic ? /رسومه المنشورة/ : /published fee/);
    assert.match(consultation, isArabic ? /استشارة مهنية مكتوبة ومفصلة/ : /detailed professional written advice/);
  }
});
