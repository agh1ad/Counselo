import assert from "node:assert/strict";
import test from "node:test";
import { getLegalProblemPage } from "./legal-problem-pages";
import { MATTER_SOURCE_GUIDANCE, matterGuidanceUpdatedAt, matterSourceGuidance } from "./matter-source-guidance";
import { serviceGuidanceUpdatedAt, sourceBackedSearchGuidance } from "./source-backed-search-guidance";
import { editorialFaqs } from "./search-intent-editorial";
import { SEARCH_INTENT_EDITORIAL } from "./search-intent-editorial-data";

test("matter research additions target existing matters without crossing jurisdictions", () => {
  assert.equal(new Set(MATTER_SOURCE_GUIDANCE.map(item => item.id)).size, MATTER_SOURCE_GUIDANCE.length);
  for (const item of MATTER_SOURCE_GUIDANCE) {
    for (const problem of item.problems) {
      assert.ok(getLegalProblemPage(item.region, item.service, problem), `${item.region}/${item.service}/${problem}`);
      assert.ok(matterSourceGuidance(item.region, item.service, problem).includes(item));
      for (const region of ["sa", "syr", "uae"] as const) {
        if (region !== item.region) assert.ok(!matterSourceGuidance(region, item.service, problem).includes(item));
      }
    }
    assert.ok(item.en.q && item.en.a && item.ar.q && item.ar.a);
    assert.ok(item.sources.length > 0);
  }
});

test("employment additions keep Saudi execution eligibility out of other regimes and unrelated claims", () => {
  const hasExecution = (region: "sa" | "syr" | "uae", service: string, problem: string) =>
    matterSourceGuidance(region, service, problem).some(item => item.id === "sa-executable-wage-contract");
  assert.ok(hasExecution("sa", "employment-law", "delayed-or-unpaid-salary"));
  assert.ok(!hasExecution("sa", "employment-law", "commission-and-bonus-payment-dispute"));
  assert.ok(!hasExecution("syr", "employment-law", "delayed-or-unpaid-salary"));
  assert.ok(!hasExecution("uae", "employment-labour", "delayed-or-unpaid-salary"));
  assert.ok(sourceBackedSearchGuidance("sa", "employment-law").some(item => item.id === "sa-executable-wage-contract"));
  assert.ok(!sourceBackedSearchGuidance("syr", "employment-law").some(item => item.id === "sa-executable-wage-contract"));
});

test("guidance dates update affected content without refreshing untouched pages or using build time", () => {
  assert.equal(matterGuidanceUpdatedAt("sa", "employment-law", "delayed-or-unpaid-salary", "2026-09-06"), "2026-09-07");
  assert.equal(matterGuidanceUpdatedAt("syr", "employment-law", "sponsorship-transfer-dispute", "2026-09-06"), "2026-09-11");
  assert.equal(matterGuidanceUpdatedAt("syr", "employment-law", "no-source-guidance-entry", "2026-09-06"), "2026-09-06");
  assert.equal(matterGuidanceUpdatedAt("sa", "employment-law", "delayed-or-unpaid-salary", "2026-10-01"), "2026-10-01");
  assert.equal(serviceGuidanceUpdatedAt("uae", "employment-labour", "2026-09-06"), "2026-09-07");
  assert.equal(serviceGuidanceUpdatedAt("sa", "medical-malpractice", "2026-09-06"), "2026-09-07");
  assert.equal(serviceGuidanceUpdatedAt("sa", "no-source-guidance-entry", "2026-09-06"), "2026-09-06");
});

test("lightweight shared FAQ selection preserves every previous regional answer", () => {
  for (const region of ["sa", "syr", "uae"] as const) for (const ar of [false, true]) {
    for (const page of ["home", "contact", "library"] as const) {
      const prefix = `/${region}${ar ? "/ar" : ""}`;
      const route = page === "library" ? (ar ? "/ar/legal-library" : "/legal-library") : page === "home" ? prefix : `${prefix}/contact`;
      assert.deepEqual(SEARCH_INTENT_EDITORIAL.filter(entry => entry.shared === page).map(entry => entry[ar ? "ar" : "en"]), editorialFaqs(route, region, ar));
    }
  }
});
