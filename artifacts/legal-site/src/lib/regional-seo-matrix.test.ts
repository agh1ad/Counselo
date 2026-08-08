import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import {
  getRegionalSeoMatrix,
  getRegionalSeoMatrixSummary,
} from "./regional-seo-matrix.js";
import {
  getRegionalSeoRegion,
  getRegionalSeoServices,
  REGIONAL_SEO_INTENTS,
  REGIONAL_SEO_REGISTRY,
} from "@workspace/api-zod";

const checkedInMatrix = JSON.parse(
  readFileSync(resolve(import.meta.dirname, "../../../../docs/regional-seo-keyword-content-matrix.json"), "utf8"),
) as { summary: ReturnType<typeof getRegionalSeoMatrixSummary>; rows: unknown[] };

test("every live region has a complete registry contract", () => {
  assert.deepEqual(
    REGIONAL_SEO_REGISTRY.map((entry) => entry.region).sort(),
    ["sa", "syr", "uae"],
  );
  for (const entry of REGIONAL_SEO_REGISTRY) {
    assert.deepEqual(entry.languages, ["en", "ar"]);
    assert.ok(entry.serviceSlugs.length > 0);
    assert.equal(entry.indexablePageTypes.length, 5);
    assert.deepEqual(entry.conversionPageTypes, ["conversion"]);
    assert.equal(getRegionalSeoRegion(entry.region).pathPrefix, entry.pathPrefix);
  }
  assert.equal(REGIONAL_SEO_INTENTS.length, 6);
});

test("keyword/content matrix covers every service, problem, language, and conversion route", () => {
  const matrix = getRegionalSeoMatrix();
  const summary = getRegionalSeoMatrixSummary();
  assert.deepEqual(checkedInMatrix.summary, summary);
  assert.equal(checkedInMatrix.rows.length, matrix.length);
  assert.equal(summary.regions.length, 3);
  assert.equal(summary.englishUrls, summary.arabicUrls);
  assert.ok(summary.serviceRows > 0);
  assert.ok(summary.problemRows > 0);
  assert.equal(summary.conversionRows, summary.serviceRows);
  assert.equal(new Set(matrix.map((row) => `${row.region}:${row.intent}:${row.pathEn}`)).size, matrix.length);

  for (const region of ["sa", "syr", "uae"] as const) {
    const serviceSlugs = getRegionalSeoServices(region).map((service) => service.slug);
    const rows = matrix.filter((row) => row.region === region);
    for (const slug of serviceSlugs) {
      assert.ok(rows.some((row) => row.intent === "service" && row.serviceSlug === slug));
      assert.ok(rows.some((row) => row.intent === "conversion" && row.serviceSlug === slug));
    }
    for (const row of rows) {
      assert.match(row.pathEn, new RegExp(`^/${region}/`));
      assert.match(row.pathAr, new RegExp(`^/${region}/ar/`));
      assert.ok(row.keywordEn.trim());
      assert.ok(row.keywordAr.trim());
      assert.ok(row.keywordVariantsEn.length >= (row.intent === "problem" ? 12 : 2));
      assert.ok(row.keywordVariantsAr.length >= (row.intent === "problem" ? 12 : 2));
      assert.ok(row.contentBrief.trim());
    }
  }
});
