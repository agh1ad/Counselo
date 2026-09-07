import assert from "node:assert/strict";
import test from "node:test";
import { PUBLIC_CACHE_POLICY } from "@workspace/api-zod";
import {
  buildArabicProblemDescription,
  buildArabicProblemTitle,
  buildEnglishProblemDescription,
  buildEnglishProblemTitle,
} from "./problem-snippet.js";
import { LEGAL_PROBLEM_PAGES, OBSERVED_SEARCH_QUERY_ALIASES } from "./legal-problem-pages.js";

const examples = [
  {
    titleAr: "الأجور والمستحقات غير المدفوعة",
    serviceTitleAr: "قانون العمل والتوظيف",
    countryNameAr: "السعودية",
  },
  {
    titleAr: "تسجيل العلامات التجارية ومنازعاتها",
    serviceTitleAr: "الملكية الفكرية",
    countryNameAr: "الإمارات",
  },
  {
    titleAr: "منازعة ترخيص المستثمر الأجنبي وتسجيله",
    serviceTitleAr: "الاستثمار الأجنبي",
    countryNameAr: "سوريا",
  },
];

test("foreign VAT titles for Syrian transactions do not imply a domestic VAT procedure", () => {
  assert.equal(buildEnglishProblemTitle({ titleEn: "Foreign VAT invoice correction for a Syrian transaction", serviceTitleEn: "Tax and Zakat", countryNameEn: "Syria" }), "Foreign VAT invoice correction for a Syrian transaction | CounselO");
  assert.equal(buildArabicProblemTitle({ titleAr: "تصحيح فاتورة ضريبة قيمة مضافة أجنبية لمعاملة سورية", serviceTitleAr: "الضرائب والزكاة", countryNameAr: "سوريا" }), "تصحيح فاتورة ضريبة قيمة مضافة أجنبية لمعاملة سورية | كاونسلو");
});

test("an explicit corporate-tax matter does not repeat the full tax-service title", () => {
  const title = buildArabicProblemTitle({
    titleAr: "مشكلة التسجيل والإقرار بضريبة الشركات",
    serviceTitleAr: "ضريبة الشركات وضريبة القيمة المضافة والمنازعات الضريبية",
    countryNameAr: "الإمارات",
  });
  assert.equal(title, "مشكلة التسجيل والإقرار بضريبة الشركات في الإمارات | كاونسلو");
  assert.equal((title.match(/ضريبة الشركات/g) ?? []).length, 1);
});

test("ambiguous appeal and travel matters retain concise service context", () => {
  const appeal = buildArabicProblemTitle({ titleAr: "مشكلة ميعاد الطعن والقيد", serviceTitleAr: "أصول المحاكمات المدنية", countryNameAr: "سوريا" });
  assert.equal(appeal, "مشكلة ميعاد الطعن والقيد | الدعاوى المدنية في سوريا | كاونسلو");
  const criminal = buildArabicProblemTitle({ titleAr: "مشكلة منع السفر أو التوقيف", serviceTitleAr: "القانون الجزائي والتحقيقات والإجراءات", countryNameAr: "الإمارات" });
  assert.equal(criminal, "مشكلة منع السفر أو التوقيف | القضايا الجزائية في الإمارات | كاونسلو");
  assert.doesNotMatch(criminal, /التحقيقات والإجراءات/);
});

test("Arabic problem snippets preserve intent, jurisdiction, and safe positioning", () => {
  for (const input of examples) {
    const title = buildArabicProblemTitle(input);
    const description = buildArabicProblemDescription(input);

    assert.ok(title.includes(input.titleAr), title);
    assert.doesNotMatch(title, /…/);
    assert.ok(description.includes(input.titleAr), description);
    assert.match(title, new RegExp(input.countryNameAr));
    assert.match(title, /كاونسلو/);
    assert.match(title, /في /);
    assert.match(description, /المستندات المطلوبة/);
    assert.match(description, /بشأن حالتك/);
    assert.match(description, /أونلاين/);
    assert.match(description, /كاونسلو/);
    assert.match(description, /[.؟]$/);
    assert.doesNotMatch(`${title} ${description}`, /\s(?:أمام|أو|إلى|بين|بشأن|ضد|ضمن|على|عن|غير|في|لدى|مع|من)(?:\s*\||[.؟])$/);
    assert.doesNotMatch(`${title} ${description}`, /مضمون|نضمن|تمثيل أمام|محامي مرخص/);
  }
});

test("English problem snippets preserve topic, jurisdiction, action, and brand", () => {
  const examples = [
    { titleEn: "Unpaid wages and benefits", serviceTitleEn: "Employment Law", countryNameEn: "Saudi Arabia" },
    { titleEn: "Trademark registration and opposition", serviceTitleEn: "Intellectual Property", countryNameEn: "the UAE" },
    { titleEn: "Cybercrime complaint and digital evidence problem in Syria", serviceTitleEn: "Cyber Law", countryNameEn: "Syria" },
  ];
  for (const input of examples) {
    const title = buildEnglishProblemTitle(input);
    const description = buildEnglishProblemDescription(input);
    assert.ok(title.startsWith(input.titleEn.replace(/ in Syria$/, "")), title);
    assert.doesNotMatch(title, /…/);
    assert.ok(description.startsWith(input.titleEn.replace(/ in Syria$/, "")), description);
    assert.match(title, /CounselO$/);
    assert.match(title, new RegExp(input.countryNameEn));
    assert.match(description, /documents to prepare/);
    assert.match(description, /CounselO/);
    assert.match(description, /about your case\.$/);
    assert.doesNotMatch(title, /\s(?:a|about|against|an|and|at|before|by|for|from|in|into|of|on|or|to|under|with)\s*\|/i);
    assert.doesNotMatch(`${title} ${description}`, /guaranteed|licensed in every|court representation/i);
  }
});

test("every canonical problem page has unique bilingual search snippets", () => {
  const english = LEGAL_PROBLEM_PAGES.map((page) => buildEnglishProblemTitle({
    titleEn: page.titleEn,
    serviceTitleEn: page.serviceTitleEn,
    countryNameEn: page.region === "uae" ? "the UAE" : page.region === "syr" ? "Syria" : "Saudi Arabia",
  }));
  const arabic = LEGAL_PROBLEM_PAGES.map((page) => buildArabicProblemTitle({
    titleAr: page.titleAr,
    serviceTitleAr: page.serviceTitleAr,
    countryNameAr: page.region === "uae" ? "الإمارات" : page.region === "syr" ? "سوريا" : "السعودية",
  }));
  assert.equal(new Set(english.map((title) => title.toLocaleLowerCase("en"))).size, english.length, "English problem titles must be unique");
  assert.equal(new Set(arabic.map((title) => title.toLocaleLowerCase("ar"))).size, arabic.length, "Arabic problem titles must be unique");
});

test("title shortening retains the leading legal subject", () => {
  const title = buildEnglishProblemTitle({ titleEn: "Trademark registration and disputes", serviceTitleEn: "Intellectual Property", countryNameEn: "Saudi Arabia" });
  assert.match(title, /^Trademark registration/);
  assert.match(title, /Saudi Arabia \| CounselO$/);
});

test("internal keyword research candidates remain unique and bilingual", () => {
  for (const page of LEGAL_PROBLEM_PAGES) {
    assert.ok(page.searchVariantsEn.length >= 30, `${page.titleEn}: expected at least 30 English variants`);
    assert.ok(page.searchVariantsAr.length >= 30, `${page.titleAr}: expected at least 30 Arabic variants`);
    assert.equal(new Set(page.searchVariantsEn.map((value) => value.toLocaleLowerCase("en"))).size, page.searchVariantsEn.length);
    assert.equal(new Set(page.searchVariantsAr.map((value) => value.toLocaleLowerCase("ar"))).size, page.searchVariantsAr.length);
    assert.ok(page.searchVariantsEn.some((value) => /lawyer|attorney|legal consultant/i.test(value)));
    assert.ok(page.searchVariantsEn.some((value) => /cost|fees/i.test(value)));
    assert.ok(page.searchVariantsAr.some((value) => /محامي|مستشار قانوني/.test(value)));
    assert.ok(page.searchVariantsAr.some((value) => /تكلفة|أتعاب/.test(value)));
  }
});

test("stored research aliases have one problem-registry assignment, not a ranking guarantee", () => {
  const problemKeys = new Set(LEGAL_PROBLEM_PAGES.map((page) => `${page.region}:${page.titleEn}`));
  for (const [key, aliases] of Object.entries(OBSERVED_SEARCH_QUERY_ALIASES)) {
    assert.ok(problemKeys.has(key), `Observed-query route does not exist: ${key}`);
    for (const alias of [...aliases.en, ...aliases.ar]) {
      const matches = LEGAL_PROBLEM_PAGES.filter((page) => [...page.searchVariantsEn, ...page.searchVariantsAr].includes(alias));
      assert.equal(matches.length, 1, `Observed query must have one principal canonical: ${alias}`);
    }
  }
});

test("Arabic snippets remove repeated countries and never truncate into fragments", () => {
  const input = {
    titleAr: "الشكوى في الجريمة الإلكترونية ومشكلة الدليل الرقمي في سوريا",
    serviceTitleAr: "القانون السيبراني",
    countryNameAr: "سوريا",
  };
  const title = buildArabicProblemTitle(input);
  const description = buildArabicProblemDescription(input);

  assert.equal((description.match(/في سوريا/g) ?? []).length, 1);
  assert.doesNotMatch(title, /\s(?:من|في|إلى|على|أو|غير)\s*\|/);
  assert.match(description, /بشأن حالتك\.$/);
});

test("prerendered public HTML has a short shared-cache window", () => {
  assert.equal(
    PUBLIC_CACHE_POLICY.prerenderedHtml,
    "public, max-age=300, must-revalidate",
  );
});
