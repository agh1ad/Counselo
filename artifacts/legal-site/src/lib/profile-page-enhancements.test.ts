import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { ABOUT_UPDATED, SAUDI_LAWYER_DIRECTORY, SAUDI_PARTNER_LICENCE, aboutContent, aboutRegions, regionalCredentialLookup, syrianPartners } from "../components/about/about-content";

const aboutSource = readFileSync(new URL("../pages/about.tsx", import.meta.url), "utf8");

test("CounselO Legal about pages expose an organization ProfilePage", () => {
  assert.match(aboutSource, /"@type": \["ProfilePage", "WebPage"\]/);
  assert.match(aboutSource, /"mainEntity": \{ "@id": COUNSELO_ENTITY_IDS\.organization \}/);
  assert.match(aboutSource, /"dateModified": ABOUT_UPDATED/);
  assert.equal(ABOUT_UPDATED, "2026-11-24");
  assert.match(aboutSource, /COOPERATING_OFFICES\.saudi/);
  assert.doesNotMatch(aboutSource, /"mainEntity": \{ "@id": COUNSELO_ENTITY_IDS\.omar \}/);
});

test("About presents one CounselO team and keeps the Saudi licence tied to its named lawyer", () => {
  assert.equal(SAUDI_PARTNER_LICENCE, "37440");
  assert.equal(SAUDI_LAWYER_DIRECTORY.en, "https://eservice.sba.gov.sa/en/lawyers");
  assert.equal(SAUDI_LAWYER_DIRECTORY.ar, "https://eservice.sba.gov.sa/lawyers");
  assert.equal(regionalCredentialLookup.sa.en.directory.url, "https://eservice.sba.gov.sa/directory/855");
  assert.equal(regionalCredentialLookup.sa.ar.directory.url, regionalCredentialLookup.sa.en.directory.url);
  assert.match(aboutSource, /region === "sa" && <div className="about-partner__licence"/);
  assert.match(aboutSource, /<a className="about-partner__licence-link" href=\{SAUDI_LAWYER_DIRECTORY\[language\]\}[^>]*><strong><bdi dir="ltr">\{SAUDI_PARTNER_LICENCE\}<\/bdi><\/strong><\/a>/);
  assert.match(aboutSource, /region === "sa"\s*\? <img className="about-partner__logo" src="\/images\/abdullah-alenezi-law-office-logo\.jpg"/);
  assert.ok(existsSync(new URL("../../public/images/abdullah-alenezi-law-office-logo.jpg", import.meta.url)));
  assert.match(aboutRegions.sa.en.partnerTitle, /Abdullah Al-Anzi/);
  assert.match(aboutRegions.sa.ar.partnerTitle, /عبدالله العنزي/);
  assert.match(aboutRegions.sa.en.partnerText, /Abdullah Al-Anzi Law Office is part of the CounselO team/);
  assert.match(aboutRegions.sa.ar.partnerText, /مكتب المحامي عبدالله العنزي جزء من فريق كاونسلو/);
  assert.doesNotMatch(aboutSource, /c\.directoryNote|about-partner__verification/);
  assert.doesNotMatch(aboutRegions.sa.en.partnerText, /separate(?:ly)? (?:agreed )?engagement/);
  assert.doesNotMatch(aboutRegions.sa.ar.partnerText, /تكليف مستقل|اتفاق منفصل/);
  assert.doesNotMatch(aboutSource, /CounselOFeatures|a\.stats|a\.office|mapsUrl|BAGHDADI_LAW_PROFILE_URL/);
  for (const lang of ["en", "ar"] as const) {
    assert.equal("directoryNote" in aboutContent[lang], false);
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
  assert.equal(regionalCredentialLookup.syr.en.directory.url, "https://syrianbar.org.sy/lawyer-directory/");
  assert.equal(regionalCredentialLookup.syr.ar.directory.url, regionalCredentialLookup.syr.en.directory.url);
});
