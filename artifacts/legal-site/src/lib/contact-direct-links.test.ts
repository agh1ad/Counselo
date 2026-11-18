import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getConsultationPrice, getConsultationPrices } from "@workspace/api-zod/browser";
import { getDirectContactDetails } from "./contact-direct-links";
import { LEGAL_PROBLEM_PAGES } from "./legal-problem-pages";

test("the contact page offers direct channels at the existing anchor without a form or submission lifecycle", () => {
  const page = readFileSync(new URL("../pages/contact.tsx", import.meta.url), "utf8");
  assert.match(page, /<section id="consultation-request"[^>]+aria-labelledby="consultation-request-heading"/);
  for (const channel of ["whatsapp", "email", "phone"]) {
    assert.match(page, new RegExp(`href=\\{details\\.${channel}Url\\}`));
    assert.match(page, new RegExp(`data-cta="${channel}" data-conversion-position="contact-direct"`));
  }
  assert.doesNotMatch(page, /<form\b|<input\b|<textarea\b|<select\b|<Form\b|<Select\b|useForm|FileReader|onSubmit|\/api\/contact|setWasSent|uploadLabel|generate_lead/);
  assert.match(page, /hydrated \? search : ""/, "query context must not conflict with query-free prerendered HTML");
  assert.match(page, /contactType": "legal services"/);
});

test("every published consultation category retains its amount in direct WhatsApp and email drafts", () => {
  for (const region of ["sa", "syr", "uae"] as const) for (const isArabic of [false, true]) {
    for (const price of getConsultationPrices(region)) {
      const details = getDirectContactDetails(region, `?consultation=${price.id}`, isArabic);
      assert.equal(details.consultationPrice, price);
      assert.ok(details.message.includes(isArabic ? price.titleAr : price.titleEn));
      assert.ok(details.message.includes(String(price.amount)));
      assert.equal(new URL(details.whatsappUrl).searchParams.get("text"), details.message);
      assert.equal(new URL(details.emailUrl).searchParams.get("body"), details.message);
      assert.equal(new URL(details.emailUrl).pathname, "info@counselo-legal.com");
      assert.equal(details.phoneUrl, "tel:+966594850247");
    }
  }
});

test("all 560 valid topics survive direct drafts in both languages with the parent fee authoritative", () => {
  assert.equal(LEGAL_PROBLEM_PAGES.length, 560);
  for (const page of LEGAL_PROBLEM_PAGES) for (const isArabic of [false, true]) {
    const base = `?service=${page.parentServiceSlug}&problem=${page.slug}`;
    const title = isArabic ? page.titleAr : page.titleEn;
    const general = getDirectContactDetails(page.region, base, isArabic);
    const consultation = getDirectContactDetails(page.region, `${base}&consultation=${page.parentServiceSlug}`, isArabic);
    for (const details of [general, consultation]) {
      assert.equal(details.topicTitle, title);
      assert.ok(details.message.includes(title));
      assert.ok(details.message.includes(details.selectedField!));
      assert.ok(new URL(details.emailUrl).searchParams.get("subject")!.includes(title));
      assert.equal(new URL(details.emailUrl).searchParams.get("body"), details.message);
    }
    assert.equal(general.consultationPrice, undefined);
    assert.equal(general.priceLabel, undefined);
    assert.doesNotMatch(general.message, /I would like a written online legal consultation|أود طلب استشارة قانونية مكتوبة/);
    assert.equal(consultation.consultationPrice, getConsultationPrice(page.region, page.parentServiceSlug));
  }
  const legacy = getDirectContactDetails("sa", "?service=family-law&consultation=wills-estates&problem=inheritance-and-family-settlements", false);
  assert.equal(legacy.consultationPrice?.amount, 250);
  assert.match(legacy.message, /SAR 250/);
  assert.doesNotMatch(legacy.message, /SAR 350/);
});

test("untrusted, cross-parent and cross-region topic names cannot enter prepared messages", () => {
  for (const search of [
    "?service=administrative-law&problem=inheritance-and-family-settlements",
    "?service=administrative-law&problem=%3Cscript%3Ealert(1)%3C/script%3E",
    "?service=unknown&consultation=unknown&problem=unknown",
  ]) {
    const details = getDirectContactDetails("sa", search, false);
    assert.equal(details.topicTitle, undefined);
    assert.doesNotMatch(details.message, /<script>|alert\(1\)|unknown|Inheritance and family settlements/);
  }
  assert.equal(getDirectContactDetails("uae", "?service=family-law&problem=inheritance-and-family-settlements", false).selectedService, "");
});

test("urgent contact requests stay quoted and generic requests do not select a paid consultation", () => {
  for (const region of ["sa", "syr", "uae"] as const) for (const isArabic of [false, true]) {
    const general = getDirectContactDetails(region, "", isArabic);
    assert.equal(general.selectedService, "");
    assert.equal(general.consultationPrice, undefined);
    assert.match(general.message, isArabic ? /أحتاج إلى دعم قانوني/ : /I need legal support/);
    const urgent = getDirectContactDetails(region, "?service=urgent-legal-assistance&consultation=family-law", isArabic);
    assert.equal(urgent.urgentSelected, true);
    assert.equal(urgent.consultationPrice, undefined);
    assert.match(urgent.message, isArabic ? /التوافر والأتعاب.*الموعد/ : /availability and fees.*deadline/);
    assert.doesNotMatch(urgent.message, /SAR|AED|USD|ريال سعودي|درهم إماراتي|دولار أمريكي/);
  }
});
