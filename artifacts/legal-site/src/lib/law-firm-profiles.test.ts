import assert from "node:assert/strict";
import test from "node:test";
import { createElement, type ComponentType } from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
import {
  ABDULLAH_PROFILE_PATHS, BAGHDADI_LAW_PROFILE_PATHS, COOPERATING_OFFICES, COUNSELO_ENTITY_IDS, COUNSELO_FIRM_TEAM,
  ENTITY_BASE_URL, OMAR_ABDULLAH_PROFILE_PATHS,
} from "@workspace/api-zod/browser";
import { LanguageContext, type Translations } from "../contexts/LanguageContextCore";
import { RegionProvider } from "../contexts/RegionContext";
import AbdullahProfile from "../pages/abdullah-profile";
import BaghdadiLawProfile from "../pages/baghdadi-law-profile";
import OmarAbdullahProfile from "../pages/omar-abdullah-profile";
import { readJsonLd } from "./structured-data-audit";

const firms = [
  { page: AbdullahProfile, office: COOPERATING_OFFICES.saudi, paths: ABDULLAH_PROFILE_PATHS, personId: ENTITY_BASE_URL + ABDULLAH_PROFILE_PATHS.en + "#person", licence: "37/440" },
  { page: OmarAbdullahProfile, office: COOPERATING_OFFICES.syriaAbdullah, paths: OMAR_ABDULLAH_PROFILE_PATHS, personId: COUNSELO_ENTITY_IDS.omarAlAbdullah, licence: "4519" },
];

function renderProfile(page: ComponentType, path: string, lang: "ar" | "en") {
  return renderToString(createElement(HelmetProvider, {},
    createElement(Router, { ssrPath: path }, createElement(RegionProvider, {},
      createElement(LanguageContext.Provider, { value: { lang, isRTL: lang === "ar", t: {} as Translations, toggleLang() {} } },
        createElement(page))))));
}

for (const { page, office, paths, personId, licence } of firms) {
  for (const lang of ["ar", "en"] as const) {
    test(`${paths[lang]} profiles the firm and gives the individual lawyer a separate address`, () => {
      const isRTL = lang === "ar";
      const name = isRTL ? office.alternateName : office.name;
      const pageUrl = ENTITY_BASE_URL + paths[lang];
      const html = renderProfile(page, paths[lang], lang);
      const parsed = readJsonLd(html);
      assert.deepEqual(parsed.errors, []);
      const profile = parsed.documents.find(node => node["@type"] === "ProfilePage");
      assert.equal(profile?.url, pageUrl);
      assert.ok(html.match(/<title[^>]*>(.*?)<\/title>/)?.[1].includes(name));
      assert.ok(html.includes(`rel="canonical" href="${pageUrl}"`));
      const main = profile?.mainEntity as Record<string, unknown>;
      assert.equal(main["@type"], "LegalService");
      assert.equal(main["@id"], office["@id"]);
      assert.equal(main.name, name);
      assert.equal(main.url, pageUrl);
      assert.equal(main.logo, office.logo);
      assert.equal(main.hasCredential, undefined);
      assert.ok(html.includes(`src="${new URL(office.logo).pathname}"`));
      assert.equal(html.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1], name);
      const person = parsed.nodes.find(({ value }) => value["@type"] === "Person" && value["@id"] === personId)?.value;
      assert.ok(person);
      assert.equal(person.url, pageUrl + "#lawyer");
      assert.deepEqual(person.worksFor, { "@id": office["@id"] });
      assert.equal([...html.matchAll(/\bid="lawyer"/g)].length, 1);
      const header = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1];
      assert.ok(header);
      const licenceLine = [...header.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/g)]
        .map(match => match[0]).find(paragraph => paragraph.includes(`<bdi dir="ltr">${licence}</bdi>`));
      assert.ok(licenceLine);
      const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
      assert.equal(text.split(licence).length - 1, 1);
      assert.ok(!text.includes(isRTL ? "محامٍ في المكتب" : "Lawyer at the firm"));
      assert.ok(text.includes(COUNSELO_FIRM_TEAM[lang]));
      const editorial = html.match(/<div class="firm-profile__editorial">([\s\S]*?)<\/div>/)?.[1];
      assert.ok(editorial);
      const headings = [...editorial.matchAll(/<h2>(.*?)<\/h2>/g)].map(match => match[1]);
      if (office === COOPERATING_OFFICES.saudi) {
        const location = header.match(/<p class="firm-profile__location">([^<]+)<\/p>/)?.[1];
        const introduction = header.match(/<p class="firm-profile__lead">([^<]+)<\/p>/)?.[1];
        const description = html.match(/<meta\b[^>]*name="description"[^>]*content="([^"]+)"/)?.[1];
        assert.match(introduction ?? "", isRTL ? /مقرّان/ : /two offices/i);
        for (const city of isRTL ? ["الدمام", "الجبيل"] : ["Dammam", "Jubail"]) {
          assert.ok(location?.includes(city), `Location line should name ${city}`);
          assert.ok(introduction?.includes(city), `Introduction should name ${city}`);
          assert.ok(description?.includes(city), `Search description should name ${city}`);
        }
        const licenceLabel = isRTL ? "رخصة المحامي عبدالله العنزي" : "Abdullah Al-Anzi’s Saudi lawyer licence";
        assert.ok(licenceLine.includes(licenceLabel));
        const lawyerSection = html.match(/<section id="lawyer"[^>]*>([\s\S]*?)<\/section>/)?.[1];
        assert.ok(lawyerSection);
        assert.ok(lawyerSection.includes(`>${person.name}</h2>`));
        assert.deepEqual(headings, [isRTL ? "هوية المكتب في السجل المهني" : "The Saudi Bar Association record"]);
        const directory = "https://eservice.sba.gov.sa" + (isRTL ? "" : "/en");
        const lawyerUrl = directory + "/lawyers?search=37%2F440";
        assert.ok(lawyerSection.includes(`href="${directory}/directory/855"`));
        assert.ok(lawyerSection.includes(`href="${lawyerUrl}"`));
        const credential = person.hasCredential as Record<string, unknown>;
        assert.equal(credential.identifier, licence);
        assert.equal(credential.url, lawyerUrl);
      } else {
        assert.equal(person.hasCredential, undefined);
        assert.match(licenceLine, /<p\b[^>]*\bid="lawyer"/);
        assert.ok(licenceLine.includes(String(person.name)));
        assert.match(licenceLine, isRTL ? /(?:سجلات|بيانات) كاونسلو/ : /CounselO(?: Legal)?(?:’s|'s)? (?:records|lists)/i);
        assert.deepEqual(headings, [isRTL ? "مكتب دمشقي ضمن فريق كاونسلو" : "A Damascus firm within CounselO"]);
        const baghdadi = COOPERATING_OFFICES.alBaghdadi;
        assert.ok(!text.includes(isRTL ? baghdadi.alternateName : baghdadi.name));
        assert.doesNotMatch(html, /id="lawyer-name"|<details\b|href="https:\/\/syrianbar\.org\.sy/);
      }
    });
  }
}

for (const lang of ["ar", "en"] as const) {
  test(`${BAGHDADI_LAW_PROFILE_PATHS[lang]} presents the history and licensed team of Al-Baghdadi Law Firm`, () => {
    const path = BAGHDADI_LAW_PROFILE_PATHS[lang];
    const office = COOPERATING_OFFICES.alBaghdadi;
    const name = lang === "ar" ? office.alternateName : office.name;
    const logo = `/images/baghdadi-law-logo-${lang}.webp`;
    const html = renderProfile(BaghdadiLawProfile, path, lang);
    const parsed = readJsonLd(html);
    assert.deepEqual(parsed.errors, []);
    const profile = parsed.documents.find(node => node["@type"] === "ProfilePage");
    assert.equal(profile?.url, ENTITY_BASE_URL + path);
    const firm = profile?.mainEntity as Record<string, unknown>;
    assert.equal(firm["@type"], "LegalService");
    assert.equal(firm["@id"], office["@id"]);
    assert.equal(firm.name, name);
    assert.equal(firm.logo, ENTITY_BASE_URL + logo);

    const content = html.slice(html.indexOf("<header"));
    assert.equal(content.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1], name);
    assert.ok(content.includes(`src="${logo}"`));
    assert.ok(content.includes(COUNSELO_FIRM_TEAM[lang]));
    assert.ok(content.includes("1957"));
    assert.ok(content.includes(lang === "ar" ? "مسعف" : "Mosef"));
    assert.doesNotMatch(content, /id="lawyer(?:-name)?"|<details\b|<form\b/);
    assert.doesNotMatch(content, /href="[^"]*(?:\/contact\b|wa\.me\/|whatsapp\.com\/)/i);
  });
}
