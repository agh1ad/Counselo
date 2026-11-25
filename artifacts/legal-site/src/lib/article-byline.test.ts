import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Router } from "wouter";
import { ABDULLAH_PROFILE_PATHS, COUNSELO_ENTITY_IDS, ENTITY_BASE_URL, articleAuthorFields } from "@workspace/api-zod/browser";
import { LanguageContext, type Translations } from "../contexts/LanguageContextCore";
import { RegionProvider } from "../contexts/RegionContext";
import BlogPost from "../pages/blog-post";
import { readJsonLd } from "./structured-data-audit";

for (const [id, type, entityId, fragment] of [
  ["abdullah-al-anzi", "Person", ENTITY_BASE_URL + ABDULLAH_PROFILE_PATHS.en + "#person", "#lawyer"],
  ["abdullah-al-anzi-law-office", "LegalService", COUNSELO_ENTITY_IDS.saudiOffice, ""],
] as const) {
  test(`the article reader links the ${type} author to its localized profile in byline and metadata`, () => {
    const credit = articleAuthorFields(id);
    const post = {
      slug: "contract-records", date: "2026-05-20", readTime: 4, published: true,
      titleEn: "Contract records", titleAr: "مستندات العقد",
      excerptEn: "Preparing contract records for review.", excerptAr: "تجهيز مستندات العقد للمراجعة.",
      seoTitleEn: "Preparing contract records", seoTitleAr: "تجهيز مستندات العقد",
      seoDescriptionEn: "Documents to collect before a contract review.", seoDescriptionAr: "المستندات المطلوبة قبل مراجعة العقد.",
      bodyEn: "<p>Gather signed copies and amendments.</p>", bodyAr: "<p>اجمع نسخ العقد الموقعة وملاحقه.</p>",
      categoryEn: "Contracts", categoryAr: "العقود", ...credit,
    };
    for (const language of ["en", "ar"] as const) {
      const client = new QueryClient();
      client.setQueryData(["blog-post", post.slug], post);
      const path = ABDULLAH_PROFILE_PATHS[language] + fragment;
      const name = language === "ar" ? credit.primaryAuthorNameAr : credit.primaryAuthorName;
      const languageValue = { lang: language, isRTL: language === "ar", t: {} as Translations, toggleLang() {} };
      const route = createElement(Route, { path: "/blog/:language/:slug", component: BlogPost });
      const html = renderToString(createElement(HelmetProvider, {},
        createElement(QueryClientProvider, { client },
          createElement(Router, { ssrPath: `/blog/${language}/${post.slug}` },
            createElement(RegionProvider, {},
              createElement(LanguageContext.Provider, { value: languageValue }, route))))));
      const article = readJsonLd(html).documents.find(node => node["@type"] === "Article");
      assert.deepEqual(article?.author, { "@type": type,
        "@id": entityId, name, url: ENTITY_BASE_URL + path,
      });
      assert.ok(html.includes(`rel="author" href="${path}">${name}</a>`));
      assert.ok(html.includes(`property="article:author" content="${ENTITY_BASE_URL + path}"`));
      assert.doesNotMatch(html, /name="reviewed-by"|"reviewedBy"/);
      client.clear();
    }
  });
}
