import assert from "node:assert/strict";
import test from "node:test";

process.env.DATABASE_URL ??= "postgresql://test:test@127.0.0.1:5432/counselo_renderer_test";
const { buildDynamicWorkHtml } = await import("../og-pages.js");
const sample = {
  slug: "render-test", titleEn: "Work example", titleAr: "نموذج عمل",
  summaryEn: "Public summary", summaryAr: "ملخص عام",
  seoTitleEn: "", seoTitleAr: "", seoDescriptionEn: "", seoDescriptionAr: "",
  challengeEn: "A <disputed> obligation", challengeAr: "التزام محل نزاع",
  approachEn: "Review of the documents", approachAr: "مراجعة المستندات",
  outcomeEn: "A written assessment", outcomeAr: "تقييم مكتوب",
  workTypeEn: "Review", workTypeAr: "مراجعة", jurisdictionEn: "Syria", jurisdictionAr: "سوريا",
  date: "2026-01-01", fileSize: 0, fileMimeType: "application/pdf",
} as Parameters<typeof buildDynamicWorkHtml>[0];

test("production work HTML includes all published narrative sections before JavaScript", () => {
  for (const lang of ["en", "ar"] as const) {
    const html = buildDynamicWorkHtml(sample, lang);
    const body = html.split("<body>")[1];
    const ar = lang === "ar";
    for (const text of ar ? ["التزام محل نزاع", "مراجعة المستندات", "تقييم مكتوب", "سوريا"] : ["A &lt;disputed&gt; obligation", "Review of the documents", "A written assessment", "Syria"]) assert.ok(body.includes(text), text);
    assert.ok(body.includes(ar ? "لا تمثل النتائج السابقة ضماناً" : "do not guarantee"));
    assert.ok(!body.includes("/api/work/render-test/file"));
    assert.ok(!html.includes('"encoding":'));
  }
});

test("production work document markup exists only when a public file exists", () => {
  const html = buildDynamicWorkHtml({ ...sample, fileSize: 123 }, "ar");
  assert.ok(html.includes('"encoding":'));
  assert.ok(html.split("<body>")[1].includes("عرض المستند المنقح"));
});
