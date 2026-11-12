import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
import { RegionProvider } from "../contexts/RegionContext";
import { LanguageContext, type Translations } from "../contexts/LanguageContextCore";
import { SEOHead } from "../components/seo/SEOHead";
import { siteSectionMeta } from "./site-section-meta";
import { searchIntentMeta } from "./search-intent-copy";

test("all 24 regional section heads use distinct, locale-correct section identities", () => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const region of ["sa", "syr", "uae"] as const) for (const lang of ["en", "ar"] as const) for (const section of ["", "/services", "/contact", "/about"]) {
    const route = `/${region}${lang === "ar" ? "/ar" : ""}${section}`;
    const expected = siteSectionMeta(route)!;
    assert.ok(expected);
    assert.equal(searchIntentMeta(route)?.title, expected.title);
    titles.add(expected.title);
    descriptions.add(expected.description);
    const html = renderToString(createElement(HelmetProvider, {}, createElement(Router, { ssrPath: route }, createElement(RegionProvider, {},
      createElement(LanguageContext.Provider, { value: { lang, isRTL: lang === "ar", t: {} as Translations, toggleLang() {} } },
        createElement(SEOHead, { title: "Unused fallback", description: "Unused fallback description", canonical: section || "/" }))))));
    const title = html.match(/<title[^>]*>(.*?)<\/title>/)?.[1]?.replace(/&amp;/g, "&");
    assert.equal(title, expected.title, route);
    assert.ok(html.includes(`rel="canonical" href="https://counselo-legal.com${route}"`), route);
    const alternates = new Map([...html.matchAll(/<link\b[^>]*hrefLang="([^"]*)"[^>]*href="([^"]*)"[^>]*>/gi)].map(match => [match[1], match[2]]));
    const countryCode = { sa: "SA", syr: "SY", uae: "AE" }[region];
    assert.equal(alternates.get(`ar-${countryCode}`), `https://counselo-legal.com/${region}/ar${section}`, route);
    assert.equal(alternates.get(`en-${countryCode}`), `https://counselo-legal.com/${region}${section}`, route);
  }
  assert.equal(titles.size, 24);
  assert.equal(descriptions.size, 24);
});

test("core metadata leaves service, shared and unknown routes to their own sources", () => {
  for (const path of ["/", "/ar", "/our-work", "/sa/services/contracts", "/syr/ar/services/contracts/contract-review", "/uae/unknown"]) assert.equal(siteSectionMeta(path), undefined);
});
