import assert from "node:assert/strict";
import test from "node:test";
import { LEGAL_PROBLEM_PAGES } from "./legal-problem-pages.js";
import { getMatterAnswer } from "./matter-answer.js";
import { MATTER_ANSWER_ADDITIONS } from "./matter-answer-additions.js";
import { matterSourceGuidance } from "./matter-source-guidance.js";

test("every canonical matter has a bilingual answer and a complete, distinct snippet", () => {
  const answers = LEGAL_PROBLEM_PAGES.map(page => {
    const answer = getMatterAnswer(page.region, page.parentServiceSlug, page.slug);
    assert.ok(answer, `${page.region}/${page.parentServiceSlug}/${page.slug}`);
    for (const lang of ["en", "ar"] as const) {
      assert.ok(answer.answer[lang].length > 120);
      assert.ok(answer.question[lang].length > 15);
      assert.match(answer.description[lang], /[.!?؟]$/);
      assert.ok(answer.description[lang].length <= 190, answer.description[lang]);
      assert.doesNotMatch(answer.description[lang], /…|documents to prepare\. Request|تعرّف على ما يلزم مراجعته/);
    }
    assert.equal(answer.updatedAt, "2026-09-07");
    assert.equal("reviewedAt" in answer, false);
    return answer;
  });
  for (const lang of ["en", "ar"] as const) {
    assert.equal(new Set(answers.map(item => item.description[lang])).size, answers.length, `Duplicate ${lang} descriptions`);
    assert.equal(new Set(answers.map(item => item.answer[lang])).size, answers.length, `Duplicate ${lang} answers`);
  }
});

test("explicit evidence assignments cannot silently miss a renamed or non-existent topic", () => {
  assert.equal(new Set(MATTER_ANSWER_ADDITIONS.map(item => item.id)).size, MATTER_ANSWER_ADDITIONS.length);
  for (const item of MATTER_ANSWER_ADDITIONS) {
    assert.ok(item.sources.length, item.id);
    for (const problem of item.problems) {
      assert.ok(LEGAL_PROBLEM_PAGES.some(page => page.region === item.region && page.parentServiceSlug === item.service && page.slug === problem), `${item.id}: ${problem}`);
    }
    for (const source of item.sources) assert.equal(new URL(source.href).protocol, "https:");
  }
});

test("missing current visitation procedure remains an explicit evidence exception", () => {
  const unresolved = LEGAL_PROBLEM_PAGES.filter(page => getMatterAnswer(page.region, page.parentServiceSlug, page.slug)?.evidenceStatus === "source-routing-only");
  assert.deepEqual(unresolved.map(page => `${page.region}/${page.parentServiceSlug}/${page.slug}`), ["syr/family-law/visitation-order-enforcement"]);
  const answer = getMatterAnswer("syr", "family-law", "visitation-order-enforcement")!;
  assert.deepEqual(answer.evidenceIds, []);
  assert.match(answer.sourceLimitation!, /permitted coercive measures.*remain unverified/);
  assert.doesNotMatch(answer.answer.en, /within \d+ days|automatically|guaranteed/i);
  assert.equal(getMatterAnswer("syr", "family-law", "non-existent"), undefined);
});

test("new legal frameworks preserve their jurisdiction, scope and current-text limits", () => {
  const data = getMatterAnswer("syr", "cyber-law", "personal-data-access-correction-or-deletion-request")!;
  assert.match(data.answer.en, /12\/2024/);
  assert.ok(data.sources.some(source => source.href.includes("thawra.sy")));
  const appeal = getMatterAnswer("syr", "criminal-procedure", "criminal-appeal-deadline")!;
  assert.match(appeal.sourceLimitation!, /period.*not been verified/);
  assert.doesNotMatch(appeal.answer.en, /\b\d+ days\b/);
  const freeze = getMatterAnswer("sa", "banking-finance", "frozen-bank-account-and-lifting-request")!;
  assert.match(freeze.answer.en, /does not|should not/);
  assert.ok(freeze.sources.every(source => source.href.includes("sama.gov.sa")));
});

test("a source-specific no answers its own question, never an unrelated preparation question", () => {
  const source = matterSourceGuidance("sa", "employment-law", "sick-leave-and-annual-leave-entitlement-dispute")[0];
  const answer = getMatterAnswer("sa", "employment-law", "sick-leave-and-annual-leave-entitlement-dispute")!;
  assert.equal(answer.question.en, "Are Saudi annual leave and sick leave paid on the same basis?");
  assert.match(answer.answer.en, /^No\./);
  assert.equal(answer.question.ar, source.ar.q);
  assert.ok(answer.answer.ar.startsWith(source.ar.a));
  for (const page of LEGAL_PROBLEM_PAGES) {
    const record = getMatterAnswer(page.region, page.parentServiceSlug, page.slug)!;
    const selected = MATTER_ANSWER_ADDITIONS.find(item => item.region === page.region && item.service === page.parentServiceSlug && item.problems.includes(page.slug))
      ?? matterSourceGuidance(page.region, page.parentServiceSlug, page.slug)[0];
    if (selected) {
      assert.equal(record.question.en, selected.en.q);
      assert.equal(record.question.ar, selected.ar.q);
      assert.ok(record.answer.en.startsWith(selected.en.a));
      assert.ok(record.answer.ar.startsWith(selected.ar.a));
    }
  }
});
