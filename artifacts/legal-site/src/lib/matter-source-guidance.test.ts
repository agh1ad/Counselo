import assert from "node:assert/strict";
import test from "node:test";
import { getLegalProblemPage } from "./legal-problem-pages";
import { MATTER_SOURCE_GUIDANCE, matterSourceGuidance } from "./matter-source-guidance";
import { editorialFaqs } from "./search-intent-editorial";
import { SEARCH_INTENT_EDITORIAL } from "./search-intent-editorial-data";

test("matter research additions target existing matters without crossing jurisdictions", () => {
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

test("lightweight shared FAQ selection preserves every previous regional answer", () => {
  for (const region of ["sa", "syr", "uae"] as const) for (const ar of [false, true]) {
    for (const page of ["home", "contact", "library"] as const) {
      const prefix = `/${region}${ar ? "/ar" : ""}`;
      const route = page === "library" ? (ar ? "/ar/legal-library" : "/legal-library") : page === "home" ? prefix : `${prefix}/contact`;
      assert.deepEqual(SEARCH_INTENT_EDITORIAL.filter(entry => entry.shared === page).map(entry => entry[ar ? "ar" : "en"]), editorialFaqs(route, region, ar));
    }
  }
});
