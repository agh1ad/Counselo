import assert from "node:assert/strict";
import test from "node:test";
import { compactWorkSamplesForDiscovery, type WorkSamplePublic } from "./work-samples.js";

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
