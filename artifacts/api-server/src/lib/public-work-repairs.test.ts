import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { buildDynamicSitemap, getServiceDefinition, WORK_CONTEXT, workModifiedAt } from "@workspace/api-zod";
import { repairPublicWorkSample } from "./public-work-repairs.js";

const samples = JSON.parse(readFileSync(new URL("./__fixtures__/legacy-work-samples.json", import.meta.url), "utf8")) as Array<Record<string, any> & { slug: string }>;
const bySlug = (slug: string) => samples.find(sample => sample.slug === slug)!;

test("restores both missing English routes and all missing English narrative fields", () => {
  for (const input of samples.filter(sample => !sample.titleEn || !sample.challengeEn)) {
    const fixed = repairPublicWorkSample(input);
    for (const field of ["titleEn", "summaryEn", "challengeEn", "approachEn", "outcomeEn", "jurisdictionEn"]) assert.ok(fixed[field]?.trim(), `${input.slug}: ${field}`);
    const xml = buildDynamicSitemap("<urlset></urlset>", [], [fixed as any]);
    assert.ok(xml.includes(`<loc>https://counselo-legal.com/our-work/${input.slug}</loc>`));
    assert.ok(xml.includes(`<loc>https://counselo-legal.com/ar/our-work/${input.slug}</loc>`));
    assert.match(xml, /hreflang="en"/);
    assert.ok(xml.includes(`<lastmod>${WORK_CONTEXT[input.slug].editorialUpdatedAt}</lastmod>`));
  }
});

test("legacy corrections are idempotent and do not overwrite later authored fields", () => {
  for (const input of samples) {
    const fixed = repairPublicWorkSample(input);
    assert.deepEqual(repairPublicWorkSample(fixed), fixed, input.slug);
    const authored = { ...input, titleEn: "A later authored title", summaryEn: "A later authored summary", outcomeEn: "A later verified outcome", approachEn: "A later authored approach" };
    const retained = repairPublicWorkSample(authored);
    for (const field of ["titleEn", "summaryEn", "outcomeEn", "approachEn"] as const) assert.equal(retained[field], authored[field as keyof typeof authored], `${input.slug}: ${field}`);
  }
});

test("missing-language backfills do not translate a subsequently changed Arabic source", () => {
  const input = samples.find(sample => !sample.titleEn)!;
  const edited: typeof input = { ...input, summaryAr: "مصدر عربي جديد يغير وقائع الدراسة" };
  assert.equal(repairPublicWorkSample(edited).titleEn, input.titleEn);
});

test("case copy preserves outcome stages and removes actual publication defects", () => {
  const lease = repairPublicWorkSample(bySlug("fskh-aqd-iyjar-tjary-bsbb-khta-byanat-mnsh-iyjar"));
  assert.match(lease.titleEn, /Ejar/);
  assert.doesNotMatch(JSON.stringify(lease), /Ejari/);
  assert.match(lease.outcomeEn, /settlement outcome, not a judgment/);
  const accounting = repairPublicWorkSample(bySlug("kyf-adart-kawnslw-mrajah-mhasbyh-hsash"));
  assert.match(accounting.outcomeEn, /could still be assessed as evidence/);
  const financial = repairPublicWorkSample(bySlug("mn-atham-maly-maqd-ila-brah-qtayh"));
  assert.doesNotMatch(financial.summaryEn, /tokens truncated/);
  const remand = repairPublicWorkSample(bySlug("drash-tan-amam-almhkmh-aladaryh-alalya"));
  assert.match(remand.outcomeEn, /did not itself determine liability/);
  assert.equal(remand.clientTypeEn, "Identity withheld");
});

test("all curated work relationships refer to retained records and valid regional services", () => {
  assert.equal(Object.keys(WORK_CONTEXT).length, 45);
  for (const [slug, context] of Object.entries(WORK_CONTEXT)) {
    assert.ok(context.titleEn.trim() && context.titleAr.trim(), slug);
    for (const service of context.relatedServiceSlugs) assert.ok(context.region && getServiceDefinition(service, context.region), `${slug}: ${service}`);
    for (const related of context.relatedWorkSlugs) assert.ok(related !== slug && WORK_CONTEXT[related], `${slug}: ${related}`);
  }
  const commission = WORK_CONTEXT["kawnslw-w-tkhfyd-mtalbh-amwlh-tjaryh-mn-348-mlywn-ryal-ila-584-alf-ryal"];
  assert.deepEqual(commission.relatedServiceSlugs, ["business-law", "contracts"]);
  assert.equal(workModifiedAt(Object.keys(WORK_CONTEXT)[0], "2035-01-01"), "2035-01-01");
});

test("work intent edits distinguish court orders, face value and reconsideration stages", () => {
  const intentSamples = JSON.parse(readFileSync(new URL("./__fixtures__/intent-work-samples.json", import.meta.url), "utf8")) as Array<Record<string, any> & { slug: string }>;
  const intentBySlug = (slug: string) => intentSamples.find(sample => sample.slug === slug)!;
  for (const input of intentSamples) {
    const fixed = repairPublicWorkSample(input);
    assert.deepEqual(repairPublicWorkSample(fixed), fixed);
    const edited = { ...input, titleEn: "Later verified title", outcomeEn: "Later verified outcome" };
    const preserved = repairPublicWorkSample(edited);
    assert.equal(preserved.titleEn, edited.titleEn);
    assert.equal(preserved.outcomeEn, edited.outcomeEn);
  }
  const notes = repairPublicWorkSample(intentBySlug("astratyjyh-kawnslw-lastrdad-sndat-lamr-bqymh-17-mlywn-ryal"));
  assert.match(notes.titleEn, /Order to Return 16/);
  assert.match(notes.titleAr, /حكم بتسليم 16/);
  assert.match(notes.summaryEn, /face value is not money recovered/);
  assert.match(notes.summaryAr, /القيمة الاسمية ليست مبلغاً محصلاً/);
  assert.match(notes.outcomeEn, /implementation of that order must be established separately/);
  assert.match(notes.outcomeAr, /ويُثبت تنفيذ الحكم بصورة مستقلة/);
  const reconsideration = repairPublicWorkSample(intentBySlug("tfkyk-mstndat-altmas-aaadh-alnzr-bnjah"));
  assert.match(reconsideration.outcomeEn, /admitted procedurally and examined on its merits/);
  assert.match(reconsideration.outcomeAr, /بعد قبول الالتماس شكلاً وفحص أسبابه موضوعاً/);
  const lease = repairPublicWorkSample(intentBySlug("fskh-aqd-iyjar-tjary-bsbb-khta-byanat-mnsh-iyjar"));
  assert.match(lease.challengeAr, /في هذه القضية/);
  const settlement = repairPublicWorkSample(intentBySlug("kyf-saadt-kawnslw-fy-astrdad-300000-ryal-abr-slh-qdayy-fy-nzaa-tjary"));
  assert.ok(settlement.seoDescriptionEn.endsWith('SAR 300,000.'));
});
