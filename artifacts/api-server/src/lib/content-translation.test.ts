import assert from "node:assert/strict";
import test from "node:test";
import type { InsertBlogPost, InsertWorkSample } from "@workspace/db";
import {
  translateBlogForPublishing,
  translateWorkForPublishing,
} from "./content-translation.js";

const originalFetch = globalThis.fetch;
const originalKey = process.env["OPENAI_API_KEY"];

function responseWithJson(value: unknown): Response {
  return new Response(JSON.stringify({
    status: "completed",
    output: [{
      type: "message",
      content: [{ type: "output_text", text: JSON.stringify(value) }],
    }],
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env["OPENAI_API_KEY"];
  else process.env["OPENAI_API_KEY"] = originalKey;
});

test("fills missing English blog and SEO fields without replacing Arabic source", async () => {
  process.env["OPENAI_API_KEY"] = "test-key";
  globalThis.fetch = async () => responseWithJson({
    categoryEn: "Contracts",
    categoryAr: "العقود",
    titleEn: "Contract Formation Under Syrian Law",
    titleAr: "تكوين العقد في القانون السوري",
    excerptEn: "A practical overview of contract formation requirements under Syrian law.",
    excerptAr: "ملخص عربي أصلي",
    seoTitleEn: "Contract Formation in Syrian Law | CounselO",
    seoTitleAr: "تكوين العقد في القانون السوري | كاونسلو",
    seoDescriptionEn: "Learn the essential requirements for valid contract formation under Syrian law, including consent, capacity, lawful purpose, and practical evidence.",
    seoDescriptionAr: "تعرّف على المتطلبات الأساسية لتكوين العقد الصحيح في القانون السوري، بما يشمل الرضا والأهلية والمحل والسبب والإثبات العملي.",
    bodyEn: "<p>Translated legal body.</p>",
    bodyAr: "<p>النص القانوني الأصلي.</p>",
    contentEn: [],
    contentAr: [],
  });

  const values = {
    slug: "syrian-contract-formation",
    date: "2026-07-29",
    categoryEn: "",
    categoryAr: "العقود",
    readTime: 5,
    titleEn: "",
    titleAr: "تكوين العقد في القانون السوري",
    excerptEn: "",
    excerptAr: "ملخص عربي أصلي",
    seoTitleEn: "",
    seoTitleAr: "عنوان قصير",
    seoDescriptionEn: "",
    seoDescriptionAr: "تعرّف على المتطلبات الأساسية لتكوين العقد الصحيح في القانون السوري، بما يشمل الرضا والأهلية والمحل والسبب والإثبات العملي.",
    bodyEn: "",
    bodyAr: "<p>النص القانوني الأصلي.</p>",
    contentEn: [],
    contentAr: [],
    published: true,
  } satisfies InsertBlogPost;

  const patch = await translateBlogForPublishing(values);
  assert.equal(patch.titleEn, "Contract Formation Under Syrian Law");
  assert.equal(patch.bodyEn, "<p>Translated legal body.</p>");
  assert.equal(
    patch.seoTitleAr,
    "تكوين العقد في القانون السوري | كاونسلو",
    "invalid legacy SEO should be repaired",
  );
  assert.equal(patch.titleAr, undefined);
  assert.equal(patch.bodyAr, undefined);
});

test("fills missing Arabic work fields and preserves English source", async () => {
  process.env["OPENAI_API_KEY"] = "test-key";
  globalThis.fetch = async () => responseWithJson({
    titleEn: "Commercial Contract Review",
    titleAr: "مراجعة عقد تجاري",
    summaryEn: "Original English summary.",
    summaryAr: "ملخص عربي مهني لمراجعة عقد تجاري.",
    workTypeEn: "Contract review",
    workTypeAr: "مراجعة العقود",
    jurisdictionEn: "Saudi Arabia",
    jurisdictionAr: "المملكة العربية السعودية",
    clientTypeEn: "Business",
    clientTypeAr: "شركة",
    challengeEn: "Original challenge.",
    challengeAr: "التحدي القانوني المترجم.",
    approachEn: "Original approach.",
    approachAr: "منهجية العمل القانونية المترجمة.",
    outcomeEn: "Original outcome.",
    outcomeAr: "النتيجة القانونية المترجمة.",
    seoTitleEn: "Commercial Contract Review | CounselO",
    seoTitleAr: "مراجعة عقد تجاري في السعودية | كاونسلو",
    seoDescriptionEn: "Review how CounselO assessed a commercial contract, clarified risk allocation, and improved practical protections for a business client.",
    seoDescriptionAr: "اطّلع على كيفية مراجعة كاونسلو لعقد تجاري وتوضيح توزيع المخاطر وتعزيز الحماية العملية لعميل من قطاع الأعمال.",
  });

  const values = {
    slug: "commercial-contract-review",
    date: "2026-07-29",
    titleEn: "Commercial Contract Review",
    titleAr: "",
    summaryEn: "Original English summary.",
    summaryAr: "",
    workTypeEn: "Contract review",
    workTypeAr: "",
    jurisdictionEn: "Saudi Arabia",
    jurisdictionAr: "",
    clientTypeEn: "Business",
    clientTypeAr: "",
    challengeEn: "Original challenge.",
    challengeAr: "",
    approachEn: "Original approach.",
    approachAr: "",
    outcomeEn: "Original outcome.",
    outcomeAr: "",
    seoTitleEn: "Commercial Contract Review | CounselO",
    seoTitleAr: "",
    seoDescriptionEn: "Review how CounselO assessed a commercial contract, clarified risk allocation, and improved practical protections for a business client.",
    seoDescriptionAr: "",
    documentLanguage: "en",
    fileName: "sample.pdf",
    fileMimeType: "application/pdf",
    fileSize: 10,
    fileData: "JVBERi0=",
    confidentialityConfirmed: true,
    featured: false,
    published: true,
  } satisfies InsertWorkSample;

  const patch = await translateWorkForPublishing(values);
  assert.equal(patch.titleAr, "مراجعة عقد تجاري");
  assert.equal(patch.jurisdictionAr, "المملكة العربية السعودية");
  assert.equal(patch.titleEn, undefined);
  assert.equal(patch.summaryEn, undefined);
});
