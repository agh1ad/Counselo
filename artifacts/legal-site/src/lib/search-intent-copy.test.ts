import assert from "node:assert/strict";
import test from "node:test";
import { getServicesForRegion } from "@workspace/api-zod/browser";
import { alignSearchIntentCopy, searchIntentMeta, serviceSearchCopy } from "./search-intent-copy.js";
import { en } from "../translations/en.js";
import { ar } from "../translations/ar.js";
import { enSyr } from "../translations/en-syr.js";
import { arSyr } from "../translations/ar-syr.js";
import { enUae } from "../translations/en-uae.js";
import { arUae } from "../translations/ar-uae.js";
import { limitSeoTitle } from "./seo-title.js";

test("every regional service has consistent bilingual discovery, intake and page subjects", () => {
  for (const [region, locales] of Object.entries({sa: {en, ar}, syr: {en: enSyr, ar: arSyr}, uae: {en: enUae, ar: arUae}})) {
    const r = region as "sa" | "syr" | "uae";
    for (const lang of ["ar", "en"] as const) {
      const original = JSON.stringify(locales[lang]);
      const translated = alignSearchIntentCopy(locales[lang] as typeof en, r, lang);
      assert.equal(JSON.stringify(locales[lang]), original, "Must not mutate cached translations");
      for (const service of getServicesForRegion(r)) {
        const copy = serviceSearchCopy(service.slug, r, lang);
        assert.ok(copy, `${region}/${lang}/${service.slug}`);
        assert.ok(copy.summary, `Missing specific service summary: ${service.slug}`);
        assert.equal(translated.services.items.find(item => item.id === service.slug)?.title, copy.label);
        assert.equal(translated.nav.servicesList.find(item => item.href === `/services/${service.slug}`)?.name, copy.label);
        assert.equal(searchIntentMeta(`/${region}${lang === "ar" ? "/ar" : ""}/services/${service.slug}`)?.title, copy.title);
        assert.doesNotMatch(copy.title, /…|\.\.\./);
      }
    }
  }
});
test("jurisdiction-specific subjects and unrelated routes remain distinct", () => {
  assert.doesNotMatch(serviceSearchCopy("tax-zakat", "syr", "ar")!.title, /زكا/);
  assert.match(serviceSearchCopy("corporate-commercial", "uae", "en")!.title, /Company formation/);
  assert.match(serviceSearchCopy("real-estate-construction", "uae", "en")!.title, /construction/);
  assert.equal(searchIntentMeta("/uae/ar/services/employment-labour/unpaid-wages"), undefined);
  assert.equal(searchIntentMeta("/blog/ar/a-post"), undefined);
});
test("complete long legal subjects survive final title rendering", () => {
  const title = "Challenging the enforcement of a foreign arbitral award in Saudi Arabia | CounselO";
  assert.equal(limitSeoTitle(title), title);
});

test("regional core pages have distinct titles and descriptions", () => {
  const entries = ["sa", "syr", "uae"].flatMap(region => ["", "/ar"].flatMap(locale =>
    ["", "/about", "/services", "/contact", "/vision"].map(page => {
      const meta = searchIntentMeta(`/${region}${locale}${page}`);
      assert.ok(meta);
      return meta;
    })
  ));
  assert.equal(new Set(entries.map(entry => entry.title)).size, entries.length);
  assert.equal(new Set(entries.map(entry => entry.description)).size, entries.length);
});
