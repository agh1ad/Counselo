import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getRegionalSeoServices } from "@workspace/api-zod/browser";
import { SEARCH_INTENT_EDITORIAL, editorialFaqs, editorialTarget } from "./search-intent-editorial";
import { getLegalProblemPages, LEGAL_PROBLEM_PAGES } from "./legal-problem-pages";

test("editorial intent targets exist in every jurisdiction and language", () => {
  assert.equal(new Set(SEARCH_INTENT_EDITORIAL.map(x => x.id)).size, SEARCH_INTENT_EDITORIAL.length);
  for (const region of ["sa", "syr", "uae"] as const) {
    const services = getRegionalSeoServices(region);
    for (const ar of [false, true]) {
      const prefix = `/${region}${ar ? "/ar" : ""}`;
      const routes = new Set([prefix, `${prefix}/contact`, ar ? "/ar/legal-library" : "/legal-library"]);
      for (const service of services) {
        routes.add(`${prefix}/services/${service.slug}`);
        for (const problem of getLegalProblemPages(region, service.slug)) routes.add(`${prefix}/services/${service.slug}/${problem.slug}`);
      }
      for (const entry of SEARCH_INTENT_EDITORIAL) {
        const route = editorialTarget(entry, region, ar);
        assert.ok(routes.has(route), `${entry.id}: ${route}`);
        const faq = entry[ar ? "ar" : "en"];
        assert.ok(faq.a.split(/\s+/).length >= 30, entry.id);
        assert.ok(editorialFaqs(route, region, ar).some(x => x.q === faq.q));
      }
      for (const route of routes) {
        const faqs = editorialFaqs(route, region, ar);
        assert.equal(new Set(faqs.map(x => x.q)).size, faqs.length, route);
      }
    }
  }
});

test("every supplied query has an explicit disposition and valid intent", () => {
  const report = JSON.parse(readFileSync(new URL("../../../../docs/search-query-targets-2026-09-06.json", import.meta.url), "utf8"));
  assert.equal(report.rows.length, 520);
  assert.equal(new Set(report.rows.map((x: any) => x.keyword)).size, 520);
  for (const row of report.rows) {
    assert.ok(row.reason);
    if (row.disposition === "excluded") { assert.equal(row.targets.length, 0); continue; }
    assert.equal(row.disposition, "mapped");
    const entry = SEARCH_INTENT_EDITORIAL.find(x => x.id === row.intent);
    assert.ok(entry, row.keyword);
    assert.ok(row.targets.length > 0);
    for (const target of row.targets) for (const ar of [false, true]) assert.equal(target[ar ? "ar" : "en"], editorialTarget(entry, target.region, ar));
  }
  const intent = (q: string) => report.rows.find((x: any) => x.keyword === q)?.intent;
  assert.equal(intent("مكتب محاماة"), "consultation");
  assert.equal(intent("المكتبة القانونية الالكترونية"), "library");
  assert.equal(intent("صحيفة دعوى إلكترونية"), "court");
  assert.equal(intent("الاحتيال الالكتروني في السعودية"), "fraud");
  assert.equal(intent("الاوراق التجارية في القانون السعودي"), "promissory");
});

test("problem schema does not duplicate the Arabic locale prefix", () => {
  const source = readFileSync(new URL("../pages/legal-problem-detail.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /\$\{regionPrefix\}\$\{isRTL\s*\?/);
});

test("global FAQ structured data shares the visible question collection", () => {
  const source = readFileSync(new URL("../components/home/global-homepage.tsx", import.meta.url), "utf8");
  assert.match(source, /mainEntity: c\.questions\.map/);
  assert.match(source, /\{c\.questions\.map/);
});

test("work audit snapshots do not override fresh production work records", () => {
  const source = readFileSync(new URL("../scripts/prerender.ts", import.meta.url), "utf8");
  assert.match(source, /resolve\(distDir, "audit-pages", routeToFlatFilename\(route\)\)/);
  assert.match(source, /ROUTES\.push\(\.\.\.workSamples\.flatMap/);
  assert.match(source, /window\.__SSR_WORK__=/);
});

test("broad words cannot assign a matter to an unrelated evidence profile", () => {
  for (const page of LEGAL_PROBLEM_PAGES) {
    const facts = page.atAGlance.en[0];
    if (facts.includes("employer's stated reason")) assert.match(page.serviceTitleEn, /employment|labour|labor/i, page.titleEn);
    if (/^Termination and cancellation$/.test(page.titleEn)) {
      assert.match(page.documentsEn.join(" "), /contract|notice/);
      assert.doesNotMatch(JSON.stringify(page.atAGlance), /HR messages|علاقة العمل/);
    }
    if (/^Medical negligence claims$/.test(page.titleEn)) assert.match(page.documentsEn.join(" "), /treatment records/);
    if (/^Trademark registration/.test(page.titleEn)) assert.match(page.documentsEn.join(" "), /mark|registry/);
    if (/^Company formation and registration/.test(page.titleEn)) assert.match(page.heroSummary.en, /company|ownership|structure/i);
    if (/^Property service-charge and maintenance/.test(page.titleEn)) assert.match(page.documentsEn.join(" "), /charge|maintenance|budget/i);
  }
});
