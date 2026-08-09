import assert from "node:assert/strict";
import test from "node:test";
import type { InsertBlogPost, InsertWorkSample } from "@workspace/db";
import {
  ContentTranslationError,
  translateBlogForPublishing,
  translateWorkForPublishing,
} from "./content-translation.js";

const originalFetch = globalThis.fetch;
const originalKey = process.env["OPENAI_API_KEY"];
const originalModel = process.env["OPENAI_TRANSLATION_MODEL"];

function responseWithJson(value: unknown): Response {
  return new Response(
    JSON.stringify({
      status: "completed",
      output: [
        {
          type: "message",
          content: [{ type: "output_text", text: JSON.stringify(value) }],
        },
      ],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env["OPENAI_API_KEY"];
  else process.env["OPENAI_API_KEY"] = originalKey;
  if (originalModel === undefined)
    delete process.env["OPENAI_TRANSLATION_MODEL"];
  else process.env["OPENAI_TRANSLATION_MODEL"] = originalModel;
});

test("fills missing English blog, repairs SEO, and requests strict structured output", async () => {
  process.env["OPENAI_API_KEY"] = "test-key";
  let requestBody: Record<string, any> | undefined;
  globalThis.fetch = async (_input, init) => {
    requestBody = JSON.parse(String(init?.body));
    return responseWithJson({
      categoryEn: "Contracts",
      categoryAr: "العقود",
      titleEn: "Contract Formation Under Syrian Law",
      titleAr: "تكوين العقد في القانون السوري",
      excerptEn:
        "A practical overview of contract formation requirements under Syrian law.",
      excerptAr: "ملخص عربي أصلي",
      seoTitleEn: "Contract Formation in Syrian Law | CounselO",
      seoTitleAr: "تكوين العقد في القانون السوري | كاونسلو",
      seoDescriptionEn:
        "Learn the requirements for valid contract formation under Syrian law, including consent, capacity, lawful purpose, and practical evidence.",
      seoDescriptionAr:
        "تعرّف على المتطلبات الأساسية لتكوين العقد الصحيح في القانون السوري، بما يشمل الرضا والأهلية والمحل والسبب والإثبات العملي.",
      bodyEn: '<p style="text-align: right">Translated legal body.</p>',
      bodyAr: "<p>النص القانوني الأصلي.</p>",
      contentEn: [],
      contentAr: [],
    });
  };

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
    seoDescriptionAr:
      "تعرّف على المتطلبات الأساسية لتكوين العقد الصحيح في القانون السوري، بما يشمل الرضا والأهلية والمحل والسبب والإثبات العملي.",
    bodyEn: "",
    bodyAr: "<p>النص القانوني الأصلي.</p>",
    contentEn: [],
    contentAr: [],
    published: false,
  } satisfies InsertBlogPost;

  const patch = await translateBlogForPublishing(values);
  assert.equal(patch.titleEn, "Contract Formation Under Syrian Law");
  assert.equal(
    patch.bodyEn,
    '<p style="text-align:left">Translated legal body.</p>',
  );
  assert.equal(patch.seoTitleAr, "تكوين العقد في القانون السوري | كاونسلو");
  assert.equal(patch.titleAr, undefined, "Arabic source must be preserved");
  assert.equal(requestBody?.model, "gpt-5.6-sol");
  assert.deepEqual(requestBody?.reasoning, { effort: "low" });
  assert.equal(requestBody?.text?.format?.strict, true);
  assert.equal(requestBody?.text?.format?.schema?.additionalProperties, false);
});

test("fills missing Arabic work fields and preserves English source", async () => {
  process.env["OPENAI_API_KEY"] = "test-key";
  globalThis.fetch = async () =>
    responseWithJson({
      titleEn: "Commercial Contract Review",
      titleAr: "مراجعة عقد تجاري",
      summaryEn: "Original English summary.",
      summaryAr: "ملخص عربي مهني لمراجعة عقد تجاري.",
      workTypeEn: "Contract review",
      workTypeAr: "مراجعة العقود",
      jurisdictionEn: "Saudi Arabia",
      jurisdictionAr: "المملكة العربية السعودية",
      clientTypeEn: "",
      clientTypeAr: "",
      challengeEn: "Original challenge.",
      challengeAr: "التحدي القانوني المترجم.",
      approachEn: "Original approach.",
      approachAr: "منهجية العمل القانونية المترجمة.",
      outcomeEn: "",
      outcomeAr: "",
      seoTitleEn: "Commercial Contract Review | CounselO",
      seoTitleAr: "مراجعة عقد تجاري في السعودية | كاونسلو",
      seoDescriptionEn:
        "Review how CounselO assessed a commercial contract, clarified risk allocation, and improved practical protections for a business client.",
      seoDescriptionAr:
        "اطّلع على كيفية مراجعة كاونسلو لعقد تجاري وتوضيح توزيع المخاطر وتعزيز الحماية العملية لعميل من قطاع الأعمال.",
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
    clientTypeEn: "",
    clientTypeAr: "",
    challengeEn: "Original challenge.",
    challengeAr: "",
    approachEn: "Original approach.",
    approachAr: "",
    outcomeEn: "",
    outcomeAr: "",
    seoTitleEn: "Commercial Contract Review | CounselO",
    seoTitleAr: "",
    seoDescriptionEn:
      "Review how CounselO assessed a commercial contract, clarified risk allocation, and improved practical protections for a business client.",
    seoDescriptionAr: "",
    documentLanguage: "en",
    fileName: "sample.pdf",
    fileMimeType: "application/pdf",
    fileSize: 10,
    fileData: "JVBERi0=",
    confidentialityConfirmed: true,
    featured: false,
    published: false,
  } satisfies InsertWorkSample;

  const patch = await translateWorkForPublishing(values);
  assert.equal(patch.titleAr, "مراجعة عقد تجاري");
  assert.equal(patch.jurisdictionAr, "المملكة العربية السعودية");
  assert.equal(patch.titleEn, undefined);
  assert.equal(patch.summaryEn, undefined);
  assert.equal(patch.clientTypeAr, undefined);
  assert.equal(patch.outcomeAr, undefined);
});

test("complete bilingual work does not require optional client or outcome fields", async () => {
  process.env["OPENAI_API_KEY"] = "test-key";
  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    throw new Error("must not fetch");
  };
  const values = {
    slug: "complete-work",
    date: "2026-07-29",
    titleEn: "Commercial Contract Review",
    titleAr: "مراجعة عقد تجاري",
    summaryEn: "A complete English summary.",
    summaryAr: "ملخص عربي كامل.",
    workTypeEn: "Contract review",
    workTypeAr: "مراجعة العقود",
    jurisdictionEn: "Saudi Arabia",
    jurisdictionAr: "المملكة العربية السعودية",
    clientTypeEn: "",
    clientTypeAr: "",
    challengeEn: "English challenge.",
    challengeAr: "التحدي بالعربية.",
    approachEn: "English approach.",
    approachAr: "منهجية العمل بالعربية.",
    outcomeEn: "",
    outcomeAr: "",
    seoTitleEn: "Commercial Contract Review | CounselO",
    seoTitleAr: "مراجعة عقد تجاري في السعودية | كاونسلو",
    seoDescriptionEn:
      "Review how CounselO assessed a commercial contract, clarified risk allocation, and improved practical protections for a business client.",
    seoDescriptionAr:
      "اطّلع على كيفية مراجعة كاونسلو لعقد تجاري وتوضيح توزيع المخاطر وتعزيز الحماية العملية لعميل من قطاع الأعمال.",
    documentLanguage: "bilingual",
    fileName: "sample.pdf",
    fileMimeType: "application/pdf",
    fileSize: 10,
    fileData: "JVBERi0=",
    confidentialityConfirmed: true,
    featured: false,
    published: false,
  } satisfies InsertWorkSample;

  assert.deepEqual(await translateWorkForPublishing(values), {});
  assert.equal(fetchCalled, false);
});

test("missing API key prevents incomplete bilingual publication", async () => {
  delete process.env["OPENAI_API_KEY"];
  const incomplete = {
    slug: "arabic-only",
    date: "2026-07-29",
    categoryEn: "",
    categoryAr: "قانون",
    readTime: 5,
    titleEn: "",
    titleAr: "مقال قانوني",
    excerptEn: "",
    excerptAr: "ملخص المقال",
    seoTitleEn: "",
    seoTitleAr: "",
    seoDescriptionEn: "",
    seoDescriptionAr: "",
    bodyEn: "",
    bodyAr: "<p>المحتوى</p>",
    contentEn: [],
    contentAr: [],
    published: false,
  } satisfies InsertBlogPost;

  await assert.rejects(
    translateBlogForPublishing(incomplete),
    ContentTranslationError,
  );
});

test("exposes OpenAI billing-limit details for HTTP 429 responses", async () => {
  process.env["OPENAI_API_KEY"] = "test-key";
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        error: {
          code: "project_spend_limit_exceeded",
          message: "Project spend limit reached",
          type: "insufficient_quota",
        },
      }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );

  const incomplete = {
    slug: "arabic-only-work",
    date: "2026-07-29",
    titleEn: "",
    titleAr: "مراجعة عقد",
    summaryEn: "",
    summaryAr: "ملخص عربي",
    workTypeEn: "",
    workTypeAr: "مراجعة العقود",
    jurisdictionEn: "",
    jurisdictionAr: "المملكة العربية السعودية",
    clientTypeEn: "",
    clientTypeAr: "",
    challengeEn: "",
    challengeAr: "التحدي القانوني",
    approachEn: "",
    approachAr: "منهجية العمل",
    outcomeEn: "",
    outcomeAr: "",
    seoTitleEn: "",
    seoTitleAr: "",
    seoDescriptionEn: "",
    seoDescriptionAr: "",
    published: false,
  } satisfies InsertWorkSample;

  await assert.rejects(
    translateWorkForPublishing(incomplete),
    (error: unknown) =>
      error instanceof ContentTranslationError &&
      error.message.includes("Project spend limit reached"),
  );
});
