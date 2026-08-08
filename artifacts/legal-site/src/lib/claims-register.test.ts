import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { qualifyProfessionalRoleCopy } from "@/lib/professional-role-scope";
import { qualifyEeatCopy } from "@/lib/eeat-scope";

type Claim = {
  id: string;
  approvedWordingEn: string;
  approvedWordingAr: string;
  evidenceOwner: string;
  evidenceLocation: string;
  jurisdictions: string[];
  lastVerified: string;
  reviewBy: string;
  requiredDisclaimer: string;
};

const register = JSON.parse(readFileSync(resolve(process.cwd(), "../../docs/claims-register.json"), "utf8")) as { claims: Claim[] };

test("every public claim register entry has approval and evidence metadata", () => {
  assert.ok(register.claims.length >= 7);
  const ids = register.claims.map((claim) => claim.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const claim of register.claims) {
    assert.ok(claim.approvedWordingEn && claim.approvedWordingAr);
    assert.ok(claim.evidenceOwner && claim.evidenceLocation);
    assert.deepEqual(new Set(claim.jurisdictions), new Set(["uae", "sa", "syr"]));
    assert.match(claim.lastVerified, /^2026-\d{2}-\d{2}$/);
    assert.match(claim.reviewBy, /^2026-\d{2}-\d{2}$/);
    assert.ok(claim.requiredDisclaimer);
  }
});

test("known high-risk claim contradictions are absent from the public shell copy", () => {
  const files = [
    resolve(process.cwd(), "src/pages/region-picker.tsx"),
    resolve(process.cwd(), "src/pages/ar-region-picker.tsx"),
    resolve(process.cwd(), "src/translations/en.ts"),
  ];
  const copy = files.map((file) => readFileSync(file, "utf8")).join("\n");
  assert.doesNotMatch(copy, /Guaranteed Response|never shared|never share|يضمن كاونسلو|لا تُشارَك/);
});

test("confirmed Saudi legal inaccuracies are absent from every public source file", () => {
  const sourceFiles = [
    resolve(process.cwd(), "src/translations/en.ts"),
    resolve(process.cwd(), "src/translations/ar.ts"),
    resolve(process.cwd(), "src/translations/en-syr.ts"),
    resolve(process.cwd(), "src/translations/ar-syr.ts"),
    resolve(process.cwd(), "src/translations/en-uae.ts"),
    resolve(process.cwd(), "src/translations/ar-uae.ts"),
    resolve(process.cwd(), "src/data/uae-service-page-content.ts"),
    resolve(process.cwd(), "src/lib/legal-problem-pages.ts"),
  ];
  const copy = sourceFiles.map((file) => readFileSync(file, "utf8")).join("\n");

  assert.doesNotMatch(copy, /boys up to 7|girls up to 9|boys until age 7|girls until age 9/);
  assert.doesNotMatch(copy, /khul[^.]{0,180}without the husband's consent/i);
  assert.doesNotMatch(copy, /court grant khul without the husband's agreement/i);
  assert.doesNotMatch(copy, /final settlement[^.]{0,180}within 5 days/i);
  assert.doesNotMatch(copy, /EOSB within 5 days/i);
  assert.doesNotMatch(copy, /absolute confidentiality|complete confidentiality.*maintained/i);
});

test("professional-role labels stay aligned across shared identity and provenance surfaces", () => {
  const files = [
    resolve(process.cwd(), "src/pages/region-picker.tsx"),
    resolve(process.cwd(), "src/pages/ar-region-picker.tsx"),
    resolve(process.cwd(), "src/pages/about.tsx"),
    resolve(process.cwd(), "src/lib/article-provenance.test.ts"),
    resolve(process.cwd(), "../../lib/api-zod/src/article-provenance.ts"),
    resolve(process.cwd(), "../../lib/api-zod/src/entity-architecture.ts"),
  ];
  const copy = files.map((file) => readFileSync(file, "utf8")).join("\n");

  assert.doesNotMatch(copy, /Licensed Legal Counsel · UAE · Saudi Arabia · Syria/);
  assert.doesNotMatch(copy, /licensed lawyers across three jurisdictions/i);
  assert.doesNotMatch(copy, /Legal Consultant Omar Al-Baghdadi/);
  assert.match(copy, /Lawyer and Legal Counsel Omar Al-Baghdadi/);
});

test("unverified testimonial outcomes and unsupported personal licence numbers stay out of public source copy", () => {
  const sourceFiles = [
    resolve(process.cwd(), "src/pages/home.tsx"),
    resolve(process.cwd(), "src/pages/region-picker.tsx"),
    resolve(process.cwd(), "src/pages/ar-region-picker.tsx"),
    resolve(process.cwd(), "src/translations/en.ts"),
    resolve(process.cwd(), "src/translations/ar.ts"),
    resolve(process.cwd(), "src/translations/en-syr.ts"),
    resolve(process.cwd(), "src/translations/ar-syr.ts"),
    resolve(process.cwd(), "src/translations/en-uae.ts"),
    resolve(process.cwd(), "src/translations/ar-uae.ts"),
  ];
  const copy = sourceFiles.map((file) => readFileSync(file, "utf8")).join("\n");
  assert.doesNotMatch(copy, /Client Reviews|Trusted Across Saudi Arabia|عميل.*تقييم|آراء العملاء/);
  assert.doesNotMatch(copy, /License No\. 289|رقم الترخيص 289/);
  assert.match(copy, /Published work samples are redacted and illustrative|نماذج الأعمال المنشورة منقحة وتوضيحية/);
});

test("professional-role boundary qualifies legacy representation wording", () => {
  const qualified = qualifyProfessionalRoleCopy({
    en: "At CounselO, we represent clients before courts. We manage the full appeal process.",
    ar: "نحن نمثل العملاء أمام المحاكم ونقدم تمثيل كامل.",
  });
  assert.match(qualified.en, /separately engaged, appropriately licensed practitioner/i);
  assert.match(qualified.en, /separate filing or representation engagement/i);
  assert.match(qualified.ar, /بشكل منفصل عبر مهني مرخص مناسب/);
  assert.match(qualified.ar, /بموجب تكليف مستقل/);
});

test("EEAT boundary qualifies legacy outcome, timing and online-service claims", () => {
  const qualified = qualifyEeatCopy("CounselO recovered hundreds of millions of Saudi riyals and provides complete online consultation within 24 hours. No office visit required.");
  assert.match(qualified, /substantial sums \(a stated experience figure, not an audited result\)/);
  assert.match(qualified, /initial online consultation/);
  assert.match(qualified, /target 24-hour response window/);
  assert.match(qualified, /initial consultation may begin without an office visit/);
});
