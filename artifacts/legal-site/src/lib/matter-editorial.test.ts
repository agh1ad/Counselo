import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { MATTER_EDITORIAL, getMatterEditorial } from "./matter-editorial.js";
import { LEGAL_PROBLEM_PAGES } from "./legal-problem-pages.js";
import { getMatterIntentBrief, MATTER_INTENT_BRIEFS } from "./matter-intent-briefs/index.js";

test("each selected editorial title resolves to retained pages and is assigned only once", () => {
  const titles = MATTER_EDITORIAL.flatMap(item => item.titles);
  assert.equal(titles.length, new Set(titles).size);
  for (const title of titles) assert.ok(LEGAL_PROBLEM_PAGES.some(page => page.titleEn === title), title);
  assert.equal(getMatterEditorial("Unrelated topic about recovery"), undefined);
});

test("selected pages use topic-specific guidance and both languages retain the new answers", () => {
  for (const page of LEGAL_PROBLEM_PAGES) {
    const entry = getMatterEditorial(page.titleEn);
    if (!entry) continue;
    const brief = getMatterIntentBrief(page.titleEn);
    assert.equal(page.editorialTopic, entry.id);
    assert.equal(page.heroSummary.en, brief?.answer.en ?? entry.summaryEn);
    assert.equal(page.heroSummary.ar, brief?.answer.ar ?? entry.summaryAr);
    assert.deepEqual(page.documentsEn, [brief?.documents.en ?? entry.evidenceEn]);
    for (const lang of ["en", "ar"] as const) for (const faq of entry.faqs[lang]) assert.ok(page.faqs[lang].some(item => item.q === faq.q && item.a === faq.a));
    assert.equal(page.contentUpdatedAt, "2026-09-06");
  }
});

test("every retained matter has an explicit bilingual intent assignment with no unused brief", () => {
  for (const page of LEGAL_PROBLEM_PAGES) assert.ok(getMatterIntentBrief(page.titleEn) || getMatterEditorial(page.titleEn), `${page.region}/${page.slug}`);
  for (const item of MATTER_INTENT_BRIEFS) for (const title of item.titles) assert.ok(LEGAL_PROBLEM_PAGES.some(page => page.titleEn === title), title);
});

test("foreign Syrian VAT scope preserves existing routes and does not become Saudi domestic copy", () => {
  const syrian = LEGAL_PROBLEM_PAGES.filter(page => page.region === "syr" && /Foreign VAT/.test(page.titleEn));
  assert.equal(syrian.length, 2);
  for (const page of syrian) {
    assert.match(page.slug, /^vat-/);
    assert.match(page.heroSummary.en, /foreign/i);
    assert.match(page.heroSummary.ar, /أجنب/);
    assert.doesNotMatch(page.serviceTitleEn, /zakat/i);
  }
  assert.ok(LEGAL_PROBLEM_PAGES.some(page => page.region === "sa" && page.titleEn === "Tax and zakat assessments"));
});

test("related matters retain distinct questions and preserve earlier detailed answers", () => {
  const pairs = [
    ["Medical-record review", "Medical-record access dispute"],
    ["Foreign will recognition and probate", "Contested will and inheritance distribution dispute"],
    ["Unpaid professional fees and service invoice dispute", "Unpaid business invoices"],
    ["Frozen bank account and lifting request", "Unauthorized bank transaction"],
  ];
  for (const [a, b] of pairs) {
    const first = LEGAL_PROBLEM_PAGES.find(page => page.titleEn === a)!;
    const second = LEGAL_PROBLEM_PAGES.find(page => page.titleEn === b)!;
    assert.ok(first && second);
    for (const lang of ["en", "ar"] as const) {
      assert.notEqual(first.heroSummary[lang], second.heroSummary[lang]);
      assert.notEqual(first.faqs[lang][0].a, second.faqs[lang][0].a);
    }
  }
});

test("account, data, estate and non-traffic topics do not inherit unrelated evidence", () => {
  for (const page of LEGAL_PROBLEM_PAGES.filter(page => page.editorialTopic)) {
    const evidence = page.documentsEn.join(" ");
    if (page.editorialTopic === "account-recovery") assert.doesNotMatch(evidence, /payroll|debt|invoice/);
    if (page.editorialTopic === "personal-data-incident") assert.doesNotMatch(evidence, /signed contract|payment records/);
    if (page.editorialTopic === "non-traffic-injury") assert.doesNotMatch(evidence, /traffic|vehicle|motor/);
    if (/will|estate/.test(page.editorialTopic!)) assert.doesNotMatch(evidence, /child|care arrangements/);
  }
});

test("matter templates do not claim unrecorded professional review", () => {
  const template = readFileSync(new URL("../pages/legal-problem-detail.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(template, /"reviewedBy"\s*:/);
  assert.doesNotMatch(template, /parent\.overview/);
});

test("all matter document lists describe the same evidence as their visible issue summary", () => {
  for (const page of LEGAL_PROBLEM_PAGES) {
    assert.equal(`Evidence: ${page.documentsEn.join(" ")}`, page.atAGlance.en[1], `${page.region}/${page.slug}: conflicting English evidence lists`);
    assert.equal(`الأدلة: ${page.documentsAr.join(" ")}`, page.atAGlance.ar[1], `${page.region}/${page.slug}: conflicting Arabic evidence lists`);
  }
});

test("different visitor decisions receive different evidence and answers", () => {
  for (const region of ["sa", "syr", "uae"]) {
    const find = (title: string) => LEGAL_PROBLEM_PAGES.find(page => page.region === region && page.titleEn === title)!;
    const salary = find("Delayed or unpaid salary");
    const resignation = find("Resignation because of unpaid wages");
    const records = find("Medical-record access dispute");
    const injury = find("Treatment injury and compensation claim");
    for (const [first, second] of [[salary, resignation], [records, injury]]) {
      assert.ok(first && second);
      assert.notDeepEqual(first.documentsEn, second.documentsEn);
      assert.notEqual(first.faqs.en[0].a, second.faqs.en[0].a);
      assert.notEqual(first.faqs.ar[0].a, second.faqs.ar[0].a);
    }
    assert.match(find("Security deposit recovery").documentsEn.join(" "), /key-handover|condition photographs/);
  }
});
