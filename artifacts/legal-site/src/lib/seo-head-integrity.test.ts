import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
import { RegionProvider } from "../contexts/RegionContext";
import { LanguageContext, type Translations } from "../contexts/LanguageContextCore";
import { SEOHead } from "../components/seo/SEOHead";

function sharedHead(region: "sa" | "syr" | "uae", schema: object, language: "en" | "ar" = "en") {
  return renderToString(createElement(HelmetProvider, {},
    createElement(Router, { ssrPath: `/${region}` },
      createElement(RegionProvider, {},
        createElement(LanguageContext.Provider, { value: { lang: language, isRTL: language === "ar", t: {} as Translations, toggleLang() {} } },
          createElement(SEOHead, {
            title: "Saudi Arabia employment evidence",
            description: "Documents for Saudi courts and Saudi law, with cross-border facts.",
            keywords: "Saudi law, Saudi courts",
            canonical: "/blog/en/employment-evidence",
            noRegionPrefix: true,
            schema,
          }))))));
}

test("shared legal metadata keeps the article's jurisdiction across service-region preferences", () => {
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: "Saudi Arabia employment evidence", about: "Saudi law", contentLocation: { "@type": "Place", address: { addressCountry: "SA", addressLocality: "Jubail" } } };
  const sa = sharedHead("sa", schema);
  const syr = sharedHead("syr", schema);
  const uae = sharedHead("uae", schema);
  for (const html of [sa, syr, uae]) {
    assert.match(html, /Saudi Arabia employment evidence/);
    assert.match(html, /Documents for Saudi courts and Saudi law/);
    assert.match(html, /"addressCountry":"SA"/);
    assert.doesNotMatch(html, /Syria employment|Syrian courts|Syrian law|Damascus/);
    assert.match(html, /rel="canonical" href="https:\/\/counselo-legal\.com\/blog\/en\/employment-evidence"/);
  }
});

test("JSON-LD cannot close its script element through editorial text", () => {
  const payload = "A </ScRiPt ><img src=x onerror=alert(1)> B <!-- C <script> D";
  const html = sharedHead("sa", { "@context": "https://schema.org", "@type": "BlogPosting", headline: payload });
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(blocks.length, 1);
  assert.equal(JSON.parse(blocks[0][1]).headline, payload);
  assert.doesNotMatch(blocks[0][1], /</);
  assert.doesNotMatch(html, /<img src=x/);
});
