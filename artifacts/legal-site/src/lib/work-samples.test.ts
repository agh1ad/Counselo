import assert from "node:assert/strict";
import test from "node:test";
import { compactWorkSamplesForDiscovery, workSamplePath, type WorkSamplePublic } from "./work-samples.js";
import { limitSeoTitle } from "./seo-title";

test("work links use an available language and title limits preserve branding", () => {
  const sample = { slug: "case", titleEn: "", titleAr: "دراسة حالة" };
  assert.equal(workSamplePath(sample, false), "/ar/our-work/case");
  assert.equal(workSamplePath(sample, true), "/ar/our-work/case");
  for (const title of ["كاونسلو و تخفيض مطالبة عمولة تجارية من 3.48 مليون ريال | أعمال كاونسلو", "كيف ساهمت كاونسلو في تخفيض مطالبة من 500 ألف ريال إلى | أعمال كاونسلو", "A detailed professional review of a complex commercial agreement and its clauses | CounselO"]) {
    const result = limitSeoTitle(title);
    assert.ok(result.length <= 68);
    assert.match(result, /(?:كاونسلو|CounselO)$/);
    assert.doesNotMatch(result, /(?:إلى|من|and|of|to)\s*\|/);
  }
});

test("work discovery payload keeps crawlable card links and removes duplicated detail prose", () => {
  const sample = {
    id: 1,
    slug: "commercial-contract-review",
    titleEn: "Commercial contract review",
    titleAr: "مراجعة عقد تجاري",
    summaryEn: "A concise public summary.",
    summaryAr: "ملخص عام موجز.",
    challengeEn: "Long confidential challenge detail",
    challengeAr: "تفاصيل طويلة للمسألة",
    approachEn: "Long approach detail",
    approachAr: "تفاصيل طويلة للعمل",
    outcomeEn: "Long outcome detail",
    outcomeAr: "تفاصيل طويلة للنتيجة",
    fileName: "private-name.pdf",
    relatedServiceSlugs: ["contracts"],
    testimonials: [],
  } as WorkSamplePublic;

  const [compact] = compactWorkSamplesForDiscovery([sample]);

  assert.equal(compact.slug, sample.slug);
  assert.equal(compact.titleAr, sample.titleAr);
  assert.deepEqual(compact.relatedServiceSlugs, ["contracts"]);
  assert.equal(compact.challengeAr, "");
  assert.equal(compact.approachEn, "");
  assert.equal(compact.outcomeEn, "");
  assert.equal(compact.fileName, "");
});
