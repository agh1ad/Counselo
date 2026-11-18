import assert from "node:assert/strict";
import test from "node:test";
import { currentWorkTeamRecord } from "../../../../lib/api-zod/src/work-team-copy.js";

// Minimal excerpts of the reviewed public revisions; no CMS or network dependency.
const arbitration = {
  "slug": "kyf-sahmt-kawnslw-fy-anjah-mlf-thkymy-kaml",
  "outcomeEn": "The published account records an arbitral award in the claimant’s favour covering payments and invoices, delay, demolition, legal fees, expert fees and arbitration costs. CounselO Legal supported the claimant’s representative by organising the legal, financial and technical case. No total award amount or subsequent enforcement outcome is stated in this account.",
  "outcomeAr": "يسجل ملخص العمل صدور حكم تحكيمي لصالح المحتكم شمل الدفعات والفواتير والتأخير والهدم وأتعاب المحاماة والخبرة والتحكيم. دعمت كاونسلو للاستشارات القانونية ممثل المحتكم في تنظيم الملف قانونياً ومالياً وفنياً. ولا يحدد الملخص إجمالي المبلغ المحكوم به أو نتيجة التنفيذ اللاحق."
};

const lease = {
  "slug": "fskh-aqd-iyjar-tjary-bsbb-khta-byanat-mnsh-iyjar",
  "summaryEn": "The case concerns a commercial lease documented on the “Ejar” platform with data inconsistent with reality: the property was registered as a single unit despite comprising eight units. That prevented the tenant from fully occupying and subletting the premises. CounselO Legal reviewed the case and developed a strategy for a termination claim through the claimant’s representative while reserving financial rights. The matter concluded with termination through a binding judicial settlement, achieving the client's practical objective and preserving her financial claims.",
  "approachAr": "العمل الذي قامت به كاونسلو للاستشارات القانونية:\n\n١. استلمت الحالة وراجعت عقد الإيجار والمراسلات والمستندات المرتبطة بمنصة «إيجار».  \n٢. درست أثر الخطأ في بيانات العقار على حق المستأجرة في الانتفاع والتأجير من الباطن.  \n٣. قيّمت الحلول الودية والنظامية المتاحة قبل اللجوء إلى القضاء.  \n٤. قررت إقامة دعوى فسخ عقد الإيجار مع حفظ الحقوق المالية.  \n٥. وضعت الاستراتيجية القانونية ووجهت ممثل المدعية في المسار القضائي.  \n٦. ساهمت في الوصول إلى فسخ العقد بصلح قضائي ملزم يحقق الغاية الأساسية من الدعوى.",
  "outcomeEn": "The parties agreed to terminate the lease through a binding judicial settlement, with financial claims reserved as described in the case account. This was a settlement outcome, not a judgment determining all financial claims.",
  "outcomeAr": "انتهى النزاع بفسخ العقد بالتراضي في صلح قضائي ملزم، مع حفظ المطالبات المالية وفق ما يورده ملخص القضية. تمثل النتيجة صلحاً، لا حكماً فاصلاً في جميع المطالبات المالية."
};

const rentAssessment = {
  "slug": "alajrh-mqabl-almnfah-fy-aliyjar-altjary",
  "outcomeEn": "CounselO Legal provided an in-depth legal analysis that reframed the dispute from an apparent monetary claim to a substantive question about the extent of actual enjoyment. By reconstructing the facts and linking them to the contract, Ejar correspondence, and the usage record, the study helped establish a stronger legal basis for valuing rent in light of the proven impediment, its cause and duration, and the agreed use. The account records an appeal assessment and does not state a final rent award.",
  "outcomeAr": "قدّمت كاونسلو للاستشارات القانونية تحليلًا قانونيًا معمقًا حوّل النزاع من مطالبة مالية ظاهرية إلى مسألة جوهرية تتعلق بمدى تحقق المنفعة الفعلية. ومن خلال إعادة بناء الوقائع وربطها بالعقد ومراسلات منصة إيجار وسجل الانتفاع، ساعدت الدراسة في إبراز أساس قانوني أقوى لتقدير الأجرة في ضوء العائق المثبت وسببه ومدته والمنفعة المتفق عليها. يورد الملخص دراسة للاستئناف، ولا يحدد حكماً نهائياً بالأجرة."
};

const propertyValuation = {
  "slug": "drash-qdyh-aqaryh-maqdh-fy-swrya",
  "outcomeEn": "The account records movement toward a real-estate expert valuation to determine the property’s value. This was a procedural development; it does not state a final judgment awarding the heir money or restoring ownership.",
  "outcomeAr": "يسجل الملخص اتجاه المحكمة إلى خبرة عقارية لتقدير قيمة العقار. يمثل ذلك تطوراً إجرائياً، ولا يورد حكماً نهائياً بمبلغ للوريث أو بإعادة الملكية."
};

test("identifies the existing representative as a team member while preserving support and award scope", () => {
  const fixed = currentWorkTeamRecord(arbitration);
  assert.equal(fixed.outcomeEn, "The published account records an arbitral award in the claimant’s favour covering payments and invoices, delay, demolition, legal fees, expert fees and arbitration costs. CounselO Legal supported the claimant’s representative within our team by organising the legal, financial and technical case.");
  assert.equal(fixed.outcomeAr, "يسجل ملخص العمل صدور حكم تحكيمي لصالح المحتكم شمل الدفعات والفواتير والتأخير والهدم وأتعاب المحاماة والخبرة والتحكيم. دعمت كاونسلو للاستشارات القانونية ممثل المحتكم ضمن فريقنا في تنظيم الملف قانونياً ومالياً وفنياً.");
});

test("preserves settlement terms, the published appeal result and the property-valuation stage", () => {
  const fixedLease = currentWorkTeamRecord(lease);
  assert.match(fixedLease.summaryEn, /claimant’s representative within our team/);
  assert.match(fixedLease.approachAr, /ممثل المدعية ضمن فريقنا/);
  assert.equal(fixedLease.outcomeEn, "The parties agreed to terminate the lease through a binding judicial settlement, with financial claims reserved as described in the case account.");
  assert.equal(fixedLease.outcomeAr, "انتهى النزاع بفسخ العقد بالتراضي في صلح قضائي ملزم، مع حفظ المطالبات المالية وفق ما يورده ملخص القضية.");
  const rent = currentWorkTeamRecord(rentAssessment);
  assert.ok(rent.outcomeEn.startsWith("The appellate court rejected the landlord’s rent claim as presented"));
  assert.ok(rent.outcomeAr.startsWith("انتهى الاستئناف إلى رد مطالبة المؤجر بالأجرة على النحو الذي طلبه"));
  const property = currentWorkTeamRecord(propertyValuation);
  assert.equal(property.outcomeEn, "The account records movement toward a real-estate expert valuation to determine the property’s value. The result at this stage was progress toward the property valuation.");
  assert.equal(property.outcomeAr, "يسجل الملخص اتجاه المحكمة إلى خبرة عقارية لتقدير قيمة العقار. تمثلت النتيجة في هذه المرحلة في تقدم الإجراءات نحو تقدير قيمة العقار.");
});

test("does not touch unknown cases, Bahrain coordination, quotations, documents or testimonials", () => {
  const unknown = { ...arbitration, slug: "future-case" };
  const bahrain = { ...arbitration, slug: "msandh-kawnslw-fy-qdyh-aabrh-llhdwd" };
  assert.equal(currentWorkTeamRecord(unknown), unknown);
  assert.equal(currentWorkTeamRecord(bahrain), bahrain);
  const withOtherContent = {
    ...arbitration,
    titleEn: arbitration.outcomeEn,
    quoteEn: arbitration.outcomeEn,
    documentText: arbitration.outcomeEn,
    testimonial: { contentEn: arbitration.outcomeEn },
  };
  const fixed = currentWorkTeamRecord(withOtherContent);
  for (const field of ["titleEn", "quoteEn", "documentText", "testimonial"] as const) {
    assert.equal(fixed[field], withOtherContent[field]);
  }
});

test("preserves later CMS text even when it still contains an old phrase or refers to an opponent", () => {
  const updated = {
    ...arbitration,
    outcomeEn: `Editorial update: ${arbitration.outcomeEn} The representative now acts for the opposing party.`,
  };
  const fixed = currentWorkTeamRecord(updated);
  assert.equal(fixed.outcomeEn, updated.outcomeEn);
  assert.notEqual(fixed.outcomeAr, updated.outcomeAr);
  const whollyUpdated = { ...updated, outcomeAr: `تحديث تحريري: ${arbitration.outcomeAr}` };
  assert.equal(currentWorkTeamRecord(whollyUpdated), whollyUpdated);
});

test("is immutable, idempotent and tolerates missing fields", () => {
  for (const source of [arbitration, lease, rentAssessment, propertyValuation]) {
    const original = structuredClone(source);
    Object.freeze(source);
    const fixed = currentWorkTeamRecord(source);
    assert.deepEqual(source, original);
    assert.equal(currentWorkTeamRecord(fixed), fixed);
  }
  const empty = { slug: arbitration.slug };
  assert.equal(currentWorkTeamRecord(empty), empty);
  assert.deepEqual(currentWorkTeamRecord({ slug: null }), { slug: null });
});

test("preserves published approximation qualifiers in reviewed case titles and descriptions without changing later writing", () => {
  const source = {
    slug: "hq-khas-rfd-mtalbh-malyh-dkhmh-wtayyd-alhkm-astynafya",
    titleEn: "Private Right: SAR 750,000 Claim Dismissed",
    seoTitleEn: "SAR 750,000 Private Right Claim Dismissed",
    seoDescriptionEn: "CounselO Legal defended an employee against a SAR 750,000 claim, securing full dismissal at first instance and affirmance on appeal.",
    titleAr: "حق خاص رفض مطالبة مالية ضخمه وتأييد الحكم استئنافيًا",
  };
  const fixed = currentWorkTeamRecord(source);
  assert.equal(fixed.titleEn, "Private Claim Dismissed and Judgment Affirmed on Appeal");
  assert.equal(fixed.seoTitleEn, fixed.titleEn);
  assert.match(fixed.seoDescriptionEn, /claim for approximately SAR 750,000/);
  assert.equal(fixed.titleAr, source.titleAr);
  assert.equal(currentWorkTeamRecord(fixed), fixed);
  const newer = { ...source, titleEn: `${source.titleEn} — updated`, seoTitleEn: "New case title", seoDescriptionEn: "New editorial description" };
  assert.equal(currentWorkTeamRecord(newer), newer);
  assert.equal(currentWorkTeamRecord({ ...source, slug: "another-case" }).titleEn, source.titleEn);
  const property = currentWorkTeamRecord({
    slug: "nzaa-aqary-hyn-ykwn-dbt-ntaq-alaltzam-aqwa-mn-alinkar",
    seoDescriptionEn: "A case study on a 48,000 m² plot within a 195,000 m² parent property, buyer rights, incomplete subdivision, and an enforcement restriction.",
  });
  assert.match(property.seoDescriptionEn, /approximately 48,000 m².*approximately 195,000 m²/);
  const director = currentWorkTeamRecord({
    slug: "ilgha-mtalbh-malyh-dd-mdyr-shrkh",
    seoDescriptionEn: "CounselO Legal overturned a SAR 225,000 personal claim against a company director by proving the transfer did not establish personal debt.",
  });
  assert.match(director.seoDescriptionEn, /personal claim for approximately SAR 225,000/);
});
