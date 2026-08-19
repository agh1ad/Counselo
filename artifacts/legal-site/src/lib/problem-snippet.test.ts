import assert from "node:assert/strict";
import test from "node:test";
import { PUBLIC_CACHE_POLICY } from "@workspace/api-zod";
import {
  buildArabicProblemDescription,
  buildArabicProblemTitle,
  buildEnglishProblemDescription,
  buildEnglishProblemTitle,
} from "./problem-snippet.js";

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

test("Arabic problem snippets preserve intent, jurisdiction, and safe positioning", () => {
  for (const input of examples) {
    const title = buildArabicProblemTitle(input);
    const description = buildArabicProblemDescription(input);

    assert.ok([...title].length <= 68, title);
    assert.ok([...description].length <= 158, description);
    assert.match(title, new RegExp(input.countryNameAr));
    assert.match(title, /كاونسلو/);
    assert.match(title, /استشارة:/);
    assert.match(description, /هل تواجه/);
    assert.match(description, /استشارة قانونية أونلاين بالعربية/);
    assert.match(description, /أسسها المحامي والمستشار القانوني عمر البغدادي/);
    assert.match(description, /[.؟]$/);
    assert.doesNotMatch(`${title} ${description}`, /\s(?:أمام|أو|إلى|بين|بشأن|ضد|ضمن|على|عن|غير|في|لدى|مع|من)(?:\s*\||[.؟])$/);
    assert.doesNotMatch(`${title} ${description}`, /مضمون|نضمن|تمثيل أمام|محامي مرخص/);
  }
});

test("English problem snippets preserve topic, jurisdiction, founder, and brand", () => {
  const examples = [
    { titleEn: "Unpaid wages and benefits", serviceTitleEn: "Employment Law", countryNameEn: "Saudi Arabia" },
    { titleEn: "Trademark registration and opposition", serviceTitleEn: "Intellectual Property", countryNameEn: "the UAE" },
    { titleEn: "Cybercrime complaint and digital evidence problem in Syria", serviceTitleEn: "Cyber Law", countryNameEn: "Syria" },
  ];
  for (const input of examples) {
    const title = buildEnglishProblemTitle(input);
    const description = buildEnglishProblemDescription(input);
    assert.ok(title.length <= 68, title);
    assert.ok(description.length <= 158, description);
    assert.match(title, /CounselO$/);
    assert.match(title, new RegExp(input.countryNameEn));
    assert.match(description, /Online legal advice from CounselO founder/);
    assert.match(description, /Lawyer and Legal Counsel Omar Al-Baghdadi\.$/);
    assert.doesNotMatch(title, /\s(?:against|and|before|for|from|in|of|or|to|under|with)\s*\|/i);
    assert.doesNotMatch(`${title} ${description}`, /guaranteed|licensed in every|court representation/i);
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
  assert.match(description, /عمر البغدادي\.$/);
});

test("prerendered public HTML has a short shared-cache window", () => {
  assert.equal(
    PUBLIC_CACHE_POLICY.prerenderedHtml,
    "public, max-age=300, must-revalidate",
  );
});
