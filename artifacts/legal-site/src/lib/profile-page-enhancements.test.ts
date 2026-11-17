import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { COOPERATING_OFFICES } from "@workspace/api-zod/browser";
import { ABOUT_UPDATED, SAUDI_PARTNER_DIRECTORY_URL, SAUDI_PARTNER_LICENCE, aboutContent, aboutRegions, syrianPartners } from "../components/about/about-content";

const aboutSource = readFileSync(new URL("../pages/about.tsx", import.meta.url), "utf8");

test("CounselO Legal about pages expose an organization ProfilePage", () => {
  assert.match(aboutSource, /"@type": \["ProfilePage", "WebPage"\]/);
  assert.match(aboutSource, /"mainEntity": \{ "@id": COUNSELO_ENTITY_IDS\.organization \}/);
  assert.match(aboutSource, /"dateModified": ABOUT_UPDATED/);
  assert.equal(ABOUT_UPDATED, "2026-11-17");
  assert.match(aboutSource, /COOPERATING_OFFICES\.saudi/);
  assert.doesNotMatch(aboutSource, /"mainEntity": \{ "@id": COUNSELO_ENTITY_IDS\.omar \}/);
});

test("About presents the platform and keeps the Saudi licence tied to its partner", () => {
  assert.equal(SAUDI_PARTNER_LICENCE, "37440");
  assert.match(aboutSource, /region === "sa" && <p className="about-partner__licence"/);
  assert.equal(aboutRegions.sa.en.partnerTitle, "Our Saudi partner office");
  assert.equal(aboutRegions.sa.ar.partnerTitle, "مكتب شريكنا السعودي");
  assert.equal(COOPERATING_OFFICES.saudi.name, "مكتب عبدالله مغثي قاعد العنزي للمحاماة");
  assert.deepEqual(COOPERATING_OFFICES.saudi.address, {
    "@type": "PostalAddress",
    addressCountry: "SA",
  });
  assert.deepEqual(COOPERATING_OFFICES.saudi.subjectOf, {
    "@type": "WebPage",
    url: "https://eservice.sba.gov.sa/directory/855",
  });
  assert.equal(SAUDI_PARTNER_DIRECTORY_URL, "https://eservice.sba.gov.sa/directory/855");
  assert.match(aboutSource, /href={SAUDI_PARTNER_DIRECTORY_URL}/);
  assert.match(aboutSource, /<h3 lang="ar" dir="rtl">\{COOPERATING_OFFICES\.saudi\.name\}<\/h3>/);
  assert.match(aboutRegions.sa.en.partnerText, /CounselO coordinates legal preparation with the office/);
  assert.match(aboutRegions.sa.ar.partnerText, /وتنسق كاونسلو الإعداد القانوني مع المكتب/);
  assert.equal(aboutContent.en.partnerLocation, "Saudi Arabia");
  assert.equal(aboutContent.ar.partnerLocation, "المملكة العربية السعودية");
  assert.match(aboutContent.en.directoryNote, /directory record documents the partner office/);
  assert.match(aboutContent.ar.directoryNote, /يوثق هذا السجل مكتب الشريك/);
  assert.match(aboutRegions.sa.en.partnerText, /separately agreed engagement/);
  assert.doesNotMatch(aboutSource, /CounselOFeatures|a\.stats|a\.office|mapsUrl|BAGHDADI_LAW_PROFILE_URL/);
  for (const lang of ["en", "ar"] as const) {
    assert.equal(aboutContent[lang].features.length, 4);
    assert.equal(aboutContent[lang].services.length, 4);
    assert.equal(aboutContent[lang].process.length, 3);
    assert.doesNotMatch(JSON.stringify(aboutContent[lang]), /20,000|40\+|1957|guaranteed success|نضمن النجاح/);
  }
});

test("Syria About names both existing cooperating offices in English and Arabic", () => {
  assert.deepEqual(syrianPartners.en.map(partner => partner.name), ["Al-Baghdadi Law Firm", "Lawyer Omar Al-Abdullah Office"]);
  assert.deepEqual(syrianPartners.ar.map(partner => partner.name), ["مكتب البغدادي للمحاماة", "مكتب المحامي عمر العبد الله"]);
  assert.equal(syrianPartners.en[1].location, "Damascus, Syria");
  assert.equal(syrianPartners.ar[1].location, "دمشق، سوريا");
  assert.match(aboutSource, /region === "syr" && <ul className="about-partner__offices"/);
  assert.match(aboutSource, /region === "syr" \? \[COOPERATING_OFFICES.alBaghdadi, COOPERATING_OFFICES.syriaAbdullah\]/);
});
