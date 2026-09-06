import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { repairPublicBlogPost } from "../../../api-server/src/lib/public-blog-repairs";
import { repairPublicWorkSample } from "../../../api-server/src/lib/public-work-repairs";
import { SERVICE_INTAKE_CONTENT, BILINGUAL_SERVICE_COVERAGE } from "../lib/service-intake-content";
import { LEGAL_PROBLEM_PAGES, legalProblemPath } from "../lib/legal-problem-pages";
import { getRegionalLegalSources } from "../lib/regional-legal-sources";
import { getServicesForRegion } from "@workspace/api-zod";
const root = resolve(import.meta.dirname, "../../../..");
const report = JSON.parse(readFileSync(resolve(root, "artifacts/legal-site/seo-validation-report.json"), "utf8"));
const files = new Map<string, string>(report.pages.filter((p: any) => !p.isRedirect).map((p: any) => [p.route, p.file]));
const normalize = (value: string) => value.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const readPage = (route: string) => {
  const file = files.get(route);
  assert.ok(file, `Missing page ${route}`);
  const html = readFileSync(resolve(root, "artifacts/legal-site/dist/public", file), "utf8");
  return normalize(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html);
};
const results: any[] = [];
const verify = (route: string, family: string, passages: string[], revision: unknown) => {
  const actual = readPage(route);
  const missing = passages.map(normalize).filter(text => text.length > 20 && !actual.includes(text));
  results.push({ route, family, passagesChecked: passages.length, missing, renderedContentFingerprint: createHash("sha256").update(actual).digest("hex"), sourceFingerprint: createHash("sha256").update(JSON.stringify(revision)).digest("hex") });
};
const articles = JSON.parse(readFileSync(resolve(root, "output/seo/articles-public-snapshot.json"), "utf8"));
for (const source of articles) {
  const fixed = repairPublicBlogPost(source);
  assert.deepEqual(repairPublicBlogPost(fixed), fixed, `Article repair not idempotent: ${source.slug}`);
  for (const lang of ["en", "ar"] as const) {
    const key = lang === "en" ? "En" : "Ar";
    const body = fixed[`body${key}`] ?? "";
    const paragraphs = [...body.matchAll(/<(?:p|li)\b[^>]*>([\s\S]*?)<\/(?:p|li)>/gi)].map(match => match[1]);
    verify(`/blog/${lang}/${fixed.slug}`, "article", [fixed[`title${key}`], ...paragraphs], fixed);
  }
}
const works = JSON.parse(readFileSync(resolve(root, "output/seo/work-public-snapshot.json"), "utf8"));
for (const source of works) {
  const fixed = repairPublicWorkSample(source);
  assert.deepEqual(repairPublicWorkSample(fixed), fixed, `Work repair not idempotent: ${source.slug}`);
  for (const lang of ["en", "ar"] as const) {
    const key = lang === "en" ? "En" : "Ar";
    const passages = ["title", "summary", "challenge", "approach", "outcome"].flatMap(field => String(fixed[`${field}${key}`] ?? "").split(/\n+/));
    verify(`${lang === "ar" ? "/ar" : ""}/our-work/${fixed.slug}`, "work example", passages, fixed);
  }
}
for (const region of ["sa", "syr", "uae"] as const) for (const service of getServicesForRegion(region)) {
  const intake = SERVICE_INTAKE_CONTENT[service.slug];
  assert.ok(intake, `Missing service intake: ${region}/${service.slug}`);
  for (const lang of ["en", "ar"] as const) verify(`/${region}${lang === "ar" ? "/ar" : ""}/services/${service.slug}`, "service", [intake.summary[lang], ...intake.documents[lang], ...(region !== "uae" ? BILINGUAL_SERVICE_COVERAGE[service.slug]?.[lang] ?? [] : [])], intake);
}
for (const page of LEGAL_PROBLEM_PAGES) for (const lang of ["en", "ar"] as const) {
  const sources = getRegionalLegalSources(page.region, page.parentServiceSlug);
  assert.ok(sources.length, `Missing matter source routing: ${page.region}/${page.parentServiceSlug}`);
  const passages = [lang === "ar" ? page.titleAr : page.titleEn, page.heroSummary[lang], page.overview[lang], ...page.atAGlance[lang], ...page.keyQuestions[lang], ...(lang === "ar" ? page.documentsAr : page.documentsEn), ...page.deliverables[lang], ...page.process[lang].flatMap(step => [step.title, step.desc]), ...page.faqs[lang].flatMap(faq => [faq.q, faq.a]), page.legalAccuracy.engagementWarning[lang], page.legalAccuracy.urgentWarning[lang], ...page.legalAccuracy.checks[lang], ...page.legalAccuracy.intakeChecklist[lang], ...sources.map(source => source[lang])];
  verify(legalProblemPath(page.region, lang, page.parentServiceSlug, page.slug), "legal matter", passages, { page, sources });
}
const core = JSON.parse(readFileSync(resolve(root, "docs/core-editorial-assessment-2026-09-06.json"), "utf8"));
for (const row of core.pages ?? core.rows ?? core) {
  const actual = readPage(row.route);
  assert.ok(actual.length > 100, `Empty core page: ${row.route}`);
  verify(row.route, "shared or regional page", [], { route: row.route, renderedText: actual });
}
const failed = results.filter(row => row.missing.length);
const output = { generatedAt: new Date().toISOString(), buildValidationAt: report.generatedAt, scope: "Complete article paragraphs and work narratives against repaired public source records; service intake and bilingual coverage against authored source; every matter content section and source labels against assembled authored components; core-page content fingerprints tied to the page assessments. Core fingerprints record the reviewed build and are not automated semantic checks. This is rendering evidence, not independent legal review or ranking evidence.", summary: { pages: results.length, passed: results.length - failed.length, failed: failed.length }, pages: results };
writeFileSync(resolve(root, "docs/editorial-render-verification-2026-09-06.json"), JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify(output.summary));
if (failed.length) { console.error(JSON.stringify(failed.map(row => ({ route: row.route, missing: row.missing.slice(0, 3) })), null, 2)); process.exitCode = 1; }
