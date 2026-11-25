import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
import {
  ABDULLAH_PROFILE_PATHS, COOPERATING_OFFICES, COUNSELO_ENTITY_IDS, COUNSELO_FIRM_TEAM,
  ENTITY_BASE_URL, OMAR_ABDULLAH_PROFILE_PATHS,
} from "@workspace/api-zod/browser";
import { LanguageContext, type Translations } from "../contexts/LanguageContextCore";
import { RegionProvider } from "../contexts/RegionContext";
import AbdullahProfile from "../pages/abdullah-profile";
import OmarAbdullahProfile from "../pages/omar-abdullah-profile";
import { readJsonLd } from "./structured-data-audit";

const firms = [
  { page: AbdullahProfile, office: COOPERATING_OFFICES.saudi, paths: ABDULLAH_PROFILE_PATHS, personId: ENTITY_BASE_URL + ABDULLAH_PROFILE_PATHS.en + "#person", licence: "37/440" },
  { page: OmarAbdullahProfile, office: COOPERATING_OFFICES.syriaAbdullah, paths: OMAR_ABDULLAH_PROFILE_PATHS, personId: COUNSELO_ENTITY_IDS.omarAlAbdullah, licence: "4519" },
];

for (const { page, office, paths, personId, licence } of firms) {
  for (const lang of ["ar", "en"] as const) {
    test(`${paths[lang]} profiles the firm and gives the individual lawyer a separate address`, () => {
      const isRTL = lang === "ar";
      const name = isRTL ? office.alternateName : office.name;
      const pageUrl = ENTITY_BASE_URL + paths[lang];
      const html = renderToString(createElement(HelmetProvider, {},
        createElement(Router, { ssrPath: paths[lang] }, createElement(RegionProvider, {},
          createElement(LanguageContext.Provider, { value: { lang, isRTL, t: {} as Translations, toggleLang() {} } },
            createElement(page))))));
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
      assert.ok(html.includes(COUNSELO_FIRM_TEAM[lang]));
      const person = parsed.nodes.find(({ value }) => value["@type"] === "Person" && value["@id"] === personId)?.value;
      assert.ok(person);
      assert.equal(person.url, pageUrl + "#lawyer");
      assert.deepEqual(person.worksFor, { "@id": office["@id"] });
      const lawyerSection = html.match(/<section id="lawyer"[^>]*>([\s\S]*?)<\/section>/)?.[1];
      assert.ok(lawyerSection);
      assert.ok(lawyerSection.includes(`>${person.name}</h2>`));
      assert.ok(lawyerSection.includes(`>${licence}</bdi>`));
      if (office === COOPERATING_OFFICES.saudi) {
        assert.equal((person.hasCredential as Record<string, unknown>).identifier, licence);
        assert.match(lawyerSection, /eservice\.sba\.gov\.sa\/([^"]*?)lawyers\?search=37%2F440/);
      } else {
        assert.equal(person.hasCredential, undefined);
        assert.match(lawyerSection, /CounselO Legal lists|بحسب بيانات كاونسلو/);
        assert.match(lawyerSection, /syrianbar\.org\.sy\/lawyer-directory\/\?lawyer_q=/);
      }
    });
  }
}
