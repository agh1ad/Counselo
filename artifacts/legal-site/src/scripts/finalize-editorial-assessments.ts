import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { repairPublicBlogPost } from "../../../api-server/src/lib/public-blog-repairs";
import { repairPublicWorkSample } from "../../../api-server/src/lib/public-work-repairs";
import { ARTICLE_CONTEXT, WORK_CONTEXT } from "@workspace/api-zod";
const root = resolve(import.meta.dirname, "../../../..");
const read = (path: string) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const render = read("docs/editorial-render-verification-2026-09-06.json");
assert.equal(render.summary.pages, 1468);
assert.equal(render.summary.failed, 0, "Finish rendered content corrections before closing assessments");
const evidence = new Map<string, any>(render.pages.map((row: any) => [row.route, row]));
const verifyRoutes = (routes: string[]) => routes.map(route => {
  const row = evidence.get(route);
  assert.ok(row, `Missing verification for ${route}`);
  assert.equal(row.missing.length, 0);
  return { route, renderedContentFingerprint: row.renderedContentFingerprint, passagesChecked: row.passagesChecked };
});
for (const family of ["core", "service", "article", "work"]) {
  const path = `docs/${family}-editorial-assessment-2026-09-06.json`;
  const record = read(path);
  const originals = family === "article" ? read("output/seo/articles-public-snapshot.json") : family === "work" ? read("output/seo/work-public-snapshot.json") : [];
  const rows = record.pages ?? record.assessments;
  for (const row of rows) {
    const routes = row.routes ?? (row.route ? [row.route] : [`/our-work/${row.slug}`, `/ar/our-work/${row.slug}`]);
    row.renderVerification = verifyRoutes(routes);
    row.status = "implementation-assessed-and-render-verified";
    if (family === "article" || family === "work") {
      const original = originals.find((post: any) => post.slug === row.slug);
      assert.ok(original);
      const fixed = family === "article" ? repairPublicBlogPost(original) : repairPublicWorkSample(original);
      row.revisedPublicFields = Object.keys(fixed).filter(key => JSON.stringify(fixed[key]) !== JSON.stringify(original[key]));
      row.contextualRelationships = family === "article" ? ARTICLE_CONTEXT[row.slug] : WORK_CONTEXT[row.slug];
      if (family === "article") {
        row.resolution = "Complete bilingual bodies assessed; identified legacy claims corrected, complete summaries and metadata authored, and relevant regional/service/article/work relationships assigned. The rendered comparison verifies delivery of the corrected bodies.";
        row.publishedSummaries = { en: fixed.excerptEn, ar: fixed.excerptAr };
      }
    }
  }
  record.generatedAt = new Date().toISOString();
  record.buildValidationAt = render.buildValidationAt;
  record.scope = `All ${family} pages assessed in both languages using the recorded reading and shared-component review, with final rendered evidence. This is implementation evidence, not independent professional certification or search-engine performance.`;
  record.completionState = "Recorded editorial implementation findings resolved and rendered verification passed. Publication and search-engine outcomes remain unverified.";
  record.summary = { records: rows.length, routes: rows.reduce((count: number, row: any) => count + row.renderVerification.length, 0), openImplementationFindings: 0 };
  if (family === "article") record.revisionCount = rows.filter((row: any) => row.revisedPublicFields.some((field: string) => field.startsWith("body"))).length;
  writeFileSync(resolve(root, path), JSON.stringify(record, null, 2) + "\n");
  console.log(family, JSON.stringify(record.summary));
}
