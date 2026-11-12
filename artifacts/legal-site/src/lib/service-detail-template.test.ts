import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getServicesForRegion } from "@workspace/api-zod/browser";
import { LEGAL_PROBLEM_PAGES } from "./legal-problem-pages";
import { getMatterIntentBrief } from "./matter-intent-briefs";
import { serviceExperience } from "./service-experience-content";
import { problemPageCopy, sentenceTopic, servicePageCopy } from "./experience-page-copy";
import { detailedServiceCoverage } from "./service-coverage-details";
import { BILINGUAL_SERVICE_COVERAGE } from "./service-intake-content";
import { getUaeService } from "../data/uae-legal-services";
import { serviceLegalOverview } from "./service-legal-overviews";
import { saudiFamilyServiceCopy } from "../components/legal/saudi-family-service-content";
import { saudiUrgentCopy } from "./urgent-legal-assistance";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const component = read("../components/legal/service-experience.tsx");
const templates = ["service-detail", "legal-problem-detail", "urgent-legal-assistance"].map(name => read(`../pages/${name}.tsx`));

test("every service template uses introduction, coverage, CounselO features and contact", () => {
  for (const template of templates) {
    assert.match(template, /<ServiceExperience/);
    assert.match(template, /<ServiceContact/);
    assert.doesNotMatch(template, /ReadingNavigation|ServiceProcess|ServiceCosts|FAQPage|<ReadingDetails/);
  }
  const order = ['id="service-overview"', 'id="service-covers-heading"', '<CounselOFeatures', 'className="legal-experience-problems"'].map(value => component.indexOf(value));
  assert.ok(order.every((n, index) => n >= 0 && (index === 0 || n > order[index - 1])));
  assert.doesNotMatch(component, /<details|Meet our legal team/);
});

test("every registered practice has explicit bilingual experience copy", () => {
  for (const region of ["sa", "syr", "uae"] as const) {
    for (const service of getServicesForRegion(region)) {
      for (const lang of ["en", "ar"] as const) {
        const copy = serviceExperience(region, service.slug, lang);
        assert.ok(copy.hero.length > 65, `${region}/${service.slug}/${lang}`);
        assert.ok(copy.approach.length > 90, `${region}/${service.slug}/${lang}`);
        assert.doesNotMatch(JSON.stringify(copy), /guaranteed success|ranked #?1|24\/7|37440|4519/i);
      }
    }
  }
});

test("every service has explanatory coverage in both languages, with no bare labels or repeated cards", () => {
  for (const region of ["sa", "syr", "uae"] as const) {
    for (const service of getServicesForRegion(region)) {
      const counts: number[] = [];
      for (const lang of ["en", "ar"] as const) {
        const source = region === "uae" ? getUaeService(service.slug)?.covers : BILINGUAL_SERVICE_COVERAGE[service.slug];
        const copy = servicePageCopy(region, service.slug, lang, source?.[lang] ?? [], serviceLegalOverview(region, service.slug, lang));
        const coverage = service.kind === "priority-intake"
          ? saudiUrgentCopy[lang].services.map(([title, text]) => ({ title, text }))
          : copy.coverage;
        counts.push(coverage.length);
        assert.ok(coverage.length >= (service.kind === "priority-intake" ? 3 : 5), `${region}/${service.slug}/${lang}: thin coverage`);
        assert.equal(new Set(coverage.map(item => item.text)).size, coverage.length, `${region}/${service.slug}/${lang}: repeated descriptions`);
        for (const item of coverage) {
          assert.ok(item.title && item.text && item.text.length >= 60, `${region}/${service.slug}/${lang}: missing explanation for ${item.title}`);
          assert.doesNotMatch(item.text!, /undefined|\[object Object\]|guaranteed success|you will win/i);
          if (lang === "ar") assert.match(item.text!, /[\u0600-\u06ff]/);
        }
        if (region !== "sa") assert.doesNotMatch(JSON.stringify(coverage), /ZATCA|Zakat|زكاة|زكوي|Saudi|السعودية/);
      }
      assert.equal(counts[0], counts[1], `${region}/${service.slug}: language coverage differs`);
    }
  }
});

test("family law stays the approved benchmark and unmapped service topics cannot fall back to filler", () => {
  for (const lang of ["en", "ar"] as const) {
    assert.equal(servicePageCopy("sa", "family-law", lang, []), saudiFamilyServiceCopy[lang]);
  }
  assert.throws(() => detailedServiceCoverage("sa", "real-estate", "en", ["New topic without editorial copy"]), /Missing detailed service coverage/);
  assert.throws(() => detailedServiceCoverage("sa", "unknown", "en", []), /Missing service coverage source/);
  const syriaTax = detailedServiceCoverage("syr", "tax-zakat", "en", []);
  assert.ok(syriaTax.some(item => item.title.includes("commercial contracts")));
  assert.ok(syriaTax.some(item => item.title.includes("cross-border")));
  assert.doesNotMatch(JSON.stringify(syriaTax), /ZATCA|Zakat|VAT|FTA/);
});

test("every issue displays its evidence, central question and complete answer in both languages", () => {
  for (const page of LEGAL_PROBLEM_PAGES) {
    const brief = getMatterIntentBrief(page.intentBriefTitle ?? page.titleEn);
    for (const lang of ["en", "ar"] as const) {
      const copy = problemPageCopy(page, lang);
      assert.match(copy.introduction, /CounselO[’']s.*team|فريق كاونسلو/);
      assert.doesNotMatch(copy.introduction, /Omar|عمر البغدادي|1996|30\+|20,000/);
      assert.ok(copy.hero.includes(lang === "en" ? sentenceTopic(page.titleEn) : page.titleAr));
      const coverage = copy.coverage.map(item => `${item.title} ${item.text}`).join(" ");
      if (brief) {
        assert.ok(coverage.includes(brief.documents[lang]), `${page.slug}: evidence lost`);
        assert.ok(coverage.includes(brief.question[lang]), `${page.slug}: topic question lost`);
        assert.ok(coverage.includes(brief.answer[lang]), `${page.slug}: complete answer lost`);
      }
      assert.doesNotMatch(JSON.stringify(copy), /\bwe guarantee\b|you will win|guaranteed success|undefined|\[object Object\]/i);
    }
  }
});

test("contact and issue links retain jurisdiction, language and service context", () => {
  assert.match(component, /legalProblemPath\(region, isArabic \? "ar" : "en", service, problem.slug\)/);
  assert.match(component, /data-conversion-position="service-contact"/);
  assert.match(component, /data-region=\{region\}/);
  for (const template of templates) assert.match(template, /contact\?service=/);
});
