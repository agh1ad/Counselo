import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { ABDULLAH_PROFILE_PATHS, COOPERATING_OFFICES, PUBLIC_BASE_URL } from "@workspace/api-zod/browser";
import { RegionalAboutTeam } from "../components/about/regional-about-team";
import { ABOUT_UPDATED, aboutContent, aboutRegions, syrianPartners } from "../components/about/about-content";

const aboutSource = readFileSync(new URL("../pages/about.tsx", import.meta.url), "utf8");

test("CounselO Legal about pages expose an organization ProfilePage", () => {
  assert.match(aboutSource, /"@type": \["ProfilePage", "WebPage"\]/);
  assert.match(aboutSource, /"mainEntity": \{ "@id": COUNSELO_ENTITY_IDS\.organization \}/);
  assert.match(aboutSource, /"dateModified": ABOUT_UPDATED/);
  assert.equal(ABOUT_UPDATED, "2026-11-24");
  assert.match(aboutSource, /COOPERATING_OFFICES\.saudi/);
  assert.doesNotMatch(aboutSource, /"mainEntity": \{ "@id": COUNSELO_ENTITY_IDS\.omar \}/);
});

test("Regional About gives each named firm one profile link and no contact links", () => {
  for (const language of ["en", "ar"] as const) {
    for (const region of ["sa", "syr", "uae"] as const) {
      const prefix = `/${region}${language === "ar" ? "/ar" : ""}`;
      const html = renderToStaticMarkup(createElement(Router, { ssrPath: `${prefix}/about` },
        createElement(RegionalAboutTeam, { region, language })));
      const links = Array.from(html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g), m => m[1]);
      const expected = region === "sa" ? [ABDULLAH_PROFILE_PATHS[language]]
        : region === "syr" ? syrianPartners[language].map(partner => partner.profileHref)
        : [];
      assert.deepEqual(links, expected, `${prefix} team actions`);
      assert.ok(html.includes(aboutRegions[region][language].partnerTitle));
      assert.doesNotMatch(html, /37\/440|4519/);
      if (region === "syr") {
        for (const partner of syrianPartners[language]) {
          assert.ok(html.includes(partner.name));
          assert.ok(html.includes(partner.description));
          assert.ok(html.includes(partner.logo));
        }
      } else {
        assert.ok(html.includes(aboutRegions[region][language].partnerText));
      }
    }
    assert.equal(aboutContent[language].features.length, 4);
    assert.equal(aboutContent[language].services.length, 4);
    assert.equal(aboutContent[language].process.length, 3);
    assert.doesNotMatch(JSON.stringify(aboutContent[language]), /20,000|40\+|1957|guaranteed success|نضمن النجاح/);
  }
  assert.equal(aboutRegions.sa.en.partnerTitle, COOPERATING_OFFICES.saudi.name);
  assert.equal(aboutRegions.sa.ar.partnerTitle, COOPERATING_OFFICES.saudi.alternateName);
  assert.match(aboutRegions.sa.en.partnerText, /Dammam.*Saudi Bar Association.*Abdullah Moghthi/);
  assert.match(aboutRegions.sa.ar.partnerText, /الدمام.*الهيئة السعودية للمحامين.*عبدالله مغثي/);
});

test("Syria About names both existing cooperating offices in English and Arabic", () => {
  assert.deepEqual(syrianPartners.en.map(partner => partner.name), ["Al-Baghdadi Law Firm", "Omar Al-Abdullah Law Office"]);
  assert.deepEqual(syrianPartners.ar.map(partner => partner.name), ["مكتب البغدادي للمحاماة", "مكتب المحامي عمر العبد الله"]);
  assert.deepEqual(syrianPartners.en.map(partner => partner.profileLabel), ["Firm profile", "Firm profile"]);
  assert.deepEqual(syrianPartners.ar.map(partner => partner.profileLabel), ["ملف المكتب", "ملف المكتب"]);
  assert.match(syrianPartners.en[1].licenceLabel, /Omar Al-Abdullah’s lawyer licence.*CounselO Legal/);
  assert.match(syrianPartners.ar[1].licenceLabel, /رخصة المحامي عمر العبد الله.*كاونسلو/);
  assert.match(syrianPartners.en[0].description, /1957.*Mosef and Omar.*regional firm/);
  assert.match(syrianPartners.en[1].description, /Damascus.*lawyers licensed in Syria/);
  assert.match(syrianPartners.ar[0].description, /1957.*مسعف وعمر.*الجيل الثاني/);
  assert.match(syrianPartners.ar[1].description, /دمشق.*المحامين المرخّصين في سوريا/);
  const logoPath = "/images/omar-al-abdullah-law-office.webp";
  assert.equal(syrianPartners.en[1].logo, logoPath);
  assert.equal(syrianPartners.ar[1].logo, logoPath);
  assert.equal(COOPERATING_OFFICES.syriaAbdullah.logo, PUBLIC_BASE_URL + logoPath);
  assert.ok(existsSync(new URL(`../../public${logoPath}`, import.meta.url)));
  assert.equal(syrianPartners.en[1].location, "Damascus, Syria");
  assert.equal(syrianPartners.ar[1].location, "دمشق، سوريا");
  assert.match(aboutSource, /region === "syr" \? \[COOPERATING_OFFICES.alBaghdadi, COOPERATING_OFFICES.syriaAbdullah\]/);
});
