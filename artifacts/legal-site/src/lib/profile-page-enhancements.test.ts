import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import test from "node:test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
import { ABDULLAH_PROFILE_PATHS, COOPERATING_OFFICES, COUNSELO_ENTITY_IDS, OMAR_OFFICIAL_PROFILE_URL, OMAR_PORTRAIT, PUBLIC_BASE_URL } from "@workspace/api-zod/browser";
import { GlobalTeamDirectory } from "../components/about/global-team-directory";
import { RegionalAboutTeam } from "../components/about/regional-about-team";
import { ABOUT_UPDATED, aboutContent, aboutRegions, syrianPartners } from "../components/about/about-content";
import { LanguageContext, type Translations } from "../contexts/LanguageContextCore";
import { RegionProvider } from "../contexts/RegionContext";
import { latestPageUpdate } from "./site-content-dates";
import { readJsonLd, schemaTypes } from "./structured-data-audit";

test("Regional About retains the founder and directory redesign within the original About layout", async t => {
  // Vite handles stylesheet imports in the app. This test renders the route in Node.
  const styles = registerHooks({
    load(url, context, next) {
      return url.endsWith(".css") ? { format: "module", source: "", shortCircuit: true } : next(url, context);
    },
  });
  const { default: About } = await import("../pages/about").finally(() => styles.deregister());
  const offices = { sa: [COOPERATING_OFFICES.saudi], syr: [COOPERATING_OFFICES.alBaghdadi, COOPERATING_OFFICES.syriaAbdullah], uae: [] };
  const officeIds = Object.values(COOPERATING_OFFICES).map(office => office["@id"]);

  for (const region of ["sa", "syr", "uae"] as const) {
    for (const lang of ["en", "ar"] as const) {
      const ar = lang === "ar";
      const languagePath = ar ? "/ar" : "";
      const prefix = `/${region}${languagePath}`;
      const path = `${prefix}/about`;
      const copy = aboutContent[lang];
      await t.test(path, () => {
        const html = renderToStaticMarkup(createElement(QueryClientProvider, { client: new QueryClient() }, createElement(HelmetProvider, {},
          createElement(Router, { ssrPath: path }, createElement(RegionProvider, {},
            createElement(LanguageContext.Provider, { value: { lang, isRTL: ar, t: {} as Translations, toggleLang() {} } },
              createElement(About)))))));
        const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
        for (const section of ["about-hero", "about-features", "about-story__row", "about-process", "about-faq__answers"]) {
          assert.ok(body.includes(`class="${section}"`), `Missing original ${section} layout`);
        }
        assert.ok(body.includes(`dir="${ar ? "rtl" : "ltr"}"`));
        assert.deepEqual([...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(match => match[1]), [copy.heading]);
        assert.doesNotMatch(body, /about-legal-folio/);
        assert.ok(body.includes(`property="og:image" content="${OMAR_PORTRAIT.contentUrl}"`));
        const founder = body.match(/<section\b[^>]*class="global-founder"[^>]*>([\s\S]*?)<\/section>/)?.[1];
        assert.ok(founder);
        assert.match(founder, /<figure\b[^>]*class="global-founder__portrait"[^>]*>\s*<img\b[^>]*src="\/omar-baghdadi\.jpg"/);
        assert.ok(founder.includes(`>${copy.founderName}</h2>`));
        const team = body.match(/<section\b[^>]*\bid="team-office"[^>]*>([\s\S]*?)<\/section>/)?.[1];
        assert.ok(team?.includes('class="team-directory__register"'));
        assert.ok(body.includes('id="engagement-standards"'));
        assert.ok(body.includes(`>${copy.faqTitle}</h2>`));
        const links = [...body.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map(match => match[1]);
        for (const target of ["#team-office", `${languagePath}/about`, `${languagePath}/our-work`,
          `${prefix}/services`, `${prefix}/privacy-policy`, `${prefix}/terms-of-service`, OMAR_OFFICIAL_PROFILE_URL + languagePath]) {
          assert.ok(links.includes(target), `Missing ${target}`);
        }
        const firmLinks = links.filter(href => /^\/(?:sa|syr|uae)\/(?:ar\/)?about\//.test(href));
        assert.deepEqual(firmLinks, region === "sa" ? [ABDULLAH_PROFILE_PATHS[lang]]
          : region === "syr" ? syrianPartners[lang].map(firm => firm.profileHref) : []);

        const { documents, errors } = readJsonLd(html);
        assert.deepEqual(errors, []);
        const profile = documents.find(node => schemaTypes(node).includes("ProfilePage"));
        assert.ok(profile && schemaTypes(profile).includes("WebPage"));
        assert.equal(profile.url, PUBLIC_BASE_URL + path);
        assert.deepEqual(profile.mainEntity, { "@id": COUNSELO_ENTITY_IDS.organization });
        assert.equal(profile.dateModified, latestPageUpdate(path, ABOUT_UPDATED));
        assert.deepEqual(profile.primaryImageOfPage, OMAR_PORTRAIT);
        const renderedOffices = documents.map(node => node["@id"]).filter(id => officeIds.some(expected => id === expected));
        assert.deepEqual(renderedOffices.sort(), offices[region].map(office => office["@id"]).sort());
        const faq = documents.find(node => node["@type"] === "FAQPage");
        assert.deepEqual(faq?.mainEntity, copy.faqs.map(({ question, answer }) => {
          assert.ok(body.includes(question) && body.includes(answer));
          return { "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } };
        }));
      });
    }
  }
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
});

test("Global and Saudi listings name both offices and attribute the Bar record to Dammam", () => {
  for (const language of ["en", "ar"] as const) {
    const cities = language === "en" ? /one in Dammam and one in Jubail/ : /أحدهما في الدمام والآخر في الجبيل/;
    const barRecord = language === "en" ? /Saudi Bar Association lists the firm’s Dammam office/ : /الهيئة السعودية للمحامين مكتب الدمام في سجلّ المنشآت القانونية/;
    const global = renderToStaticMarkup(createElement(GlobalTeamDirectory, { language }));
    const regional = renderToStaticMarkup(createElement(Router, { ssrPath: language === "en" ? "/sa/about" : "/sa/ar/about" },
      createElement(RegionalAboutTeam, { region: "sa", language })));
    for (const listing of [global, regional]) {
      assert.match(listing, cities);
      assert.match(listing, barRecord);
    }
  }
});

test("Global and Syrian team listings link to each Syrian firm’s CounselO profile in the active language", () => {
  for (const language of ["en", "ar"] as const) {
    const prefix = language === "ar" ? "/syr/ar" : "/syr";
    const expected = [`${prefix}/about/baghdadi-law`, `${prefix}/about/omar-al-abdullah`];
    const global = renderToStaticMarkup(createElement(GlobalTeamDirectory, { language }));
    const syriaGroup = global.slice(global.indexOf('id="about-country-syr"')).split("</article>")[0];
    const regional = renderToStaticMarkup(createElement(RegionalAboutTeam, { region: "syr", language }));
    for (const listing of [syriaGroup, regional]) {
      assert.deepEqual(Array.from(listing.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g), match => match[1]), expected);
    }
  }
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
});
