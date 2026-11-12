import assert from "node:assert/strict";
import test from "node:test";
import { getServicesForRegion } from "@workspace/api-zod/browser";
import { LEGAL_PROBLEM_PAGES } from "./legal-problem-pages";
import { getMatterSupport, MATTER_SUPPORT } from "./matter-support-copy";
import { experienceCountry, problemPageCopy, sentenceTopic, servicePageCopy, reviewFocus } from "./experience-page-copy";

const locales = ["en", "ar"] as const;

test("every published issue names the matter and supplies an explicit service offer in both languages", () => {
  for (const page of LEGAL_PROBLEM_PAGES) {
    const offer = getMatterSupport(page.intentBriefTitle ?? page.titleEn);
    for (const lang of locales) {
      const copy = problemPageCopy(page, lang);
      const topic = lang === "ar" ? page.titleAr : sentenceTopic(page.titleEn);
      for (const field of [copy.heading, copy.introduction, copy.invitation, copy.contactTitle]) {
        assert.ok(field.includes(topic), `${page.region}/${page.slug}/${lang}: missing matter name`);
      }
      assert.ok(copy.introduction.includes(experienceCountry(page.region, lang)));
      const overview = `${copy.introduction} ${copy.experience}`;
      for (const sentence of offer[lang].split(/(?<=[.!?؟])\s+/u)) assert.ok(overview.includes(sentence), `${page.slug}/${lang}: service work or next-stage support lost`);
      assert.doesNotMatch(overview, /support for your matter|Experienced support for your family|دعماً مهنياً أونلاين لمسألتك/);
      assert.match(copy.introduction, /CounselO[’']s.*team|فريق كاونسلو/);
      assert.doesNotMatch(copy.introduction, /Omar|عمر البغدادي|1996|30\+|20,000/);
    }
  }
  assert.throws(() => getMatterSupport("An unconfigured new issue"), /Missing matter-specific service offer/);
});

test("service introductions name their registered practice rather than inheriting a generic heading", () => {
  for (const region of ["sa", "syr", "uae"] as const) for (const service of getServicesForRegion(region)) {
    for (const lang of locales) {
      const copy = servicePageCopy(region, service.slug, lang, []);
      const name = lang === "en" ? service.titleEn : service.titleAr;
      assert.ok(copy.heading.toLowerCase().includes(name.toLowerCase()), `${region}/${service.slug}/${lang}`);
      assert.match(copy.introduction, /CounselO[’']s.*team|فريق كاونسلو/);
      assert.doesNotMatch(copy.introduction, /Omar|عمر البغدادي|1996|30\+|20,000/);
      assert.doesNotMatch(copy.introduction, /support for your matter|لمسألتك في/);
    }
  }
});

test("family issues describe their own legal work and supported progression", () => {
  const divorce = getMatterSupport("Divorce and separation");
  const custody = getMatterSupport("Child custody and visitation");
  const maintenance = getMatterSupport("Alimony and child maintenance");
  assert.match(divorce.en, /draft divorce applications, responses and supporting memoranda/);
  assert.match(divorce.en, /settlement negotiations and preparation for local proceedings/);
  assert.match(divorce.ar, /نصوغ طلبات الطلاق والردود والمذكرات/);
  assert.match(custody.en, /parenting arrangements|handovers/);
  assert.match(custody.ar, /تسليم|التسليم/);
  assert.match(maintenance.en, /income, expenses and payment records/);
  assert.match(maintenance.ar, /النفقة غير المسددة/);
});

test("distinct services preserve boundaries for safety, technical recovery and non-traffic injuries", () => {
  assert.match(getMatterSupport("Domestic-violence protection and family-safety application").en, /must not delay/);
  assert.match(getMatterSupport("Domestic-violence protection and family-safety application").ar, /دون انتظار/);
  assert.match(getMatterSupport("Compromised-account recovery and access restoration").en, /technical account recovery remains with the platform/);
  assert.match(getMatterSupport("Personal-data breach response").ar, /يتولى المختصون احتواء الحادث تقنياً/);
  assert.doesNotMatch(getMatterSupport("Personal injury compensation for a non-traffic accident").en, /traffic report|vehicle damage/);
});

test("experience is not rewritten as invented outcomes, admission or platform age", () => {
  for (const { support } of MATTER_SUPPORT) for (const lang of locales) {
    assert.doesNotMatch(support[lang], /guaranteed (?:success|recovery)|ranked #?1|24\/7|we are licensed|نضمن الفوز|نضمن النجاح|الأفضل بلا منافس|37440|4519/i);
  }
  assert.equal(sentenceTopic("VAT refund and registration dispute"), "VAT refund and registration dispute");
  assert.equal(sentenceTopic("Divorce and separation"), "divorce and separation");
});


test("preparation guidance reads as the team’s work without changing names or addressing the reader mid-sentence", () => {
  assert.equal(sentenceTopic("Dubai tenancy and Rental Disputes Center claim"), "Dubai tenancy and Rental Disputes Center claim");
  assert.equal(sentenceTopic("Syrian tax assessment and objection"), "Syrian tax assessment and objection");
  assert.equal(reviewFocus("Keep the complete notice and record how and when it arrived.", "en"), "We review the complete notice and record how and when it arrived.");
  assert.equal(reviewFocus("حدّد النص المختلف عليه وقارنه بالواقعة وتفسير المؤمن.", "ar"), "نحدد النص المختلف عليه ونقارنه بالواقعة وتفسير المؤمن.");
  assert.equal(reviewFocus("حدّد مساهمة كل طرف، ثم افصل الاتفاق عن السجلات.", "ar"), "نحدد مساهمة كل طرف، ثم نفصل الاتفاق عن السجلات.");
});
