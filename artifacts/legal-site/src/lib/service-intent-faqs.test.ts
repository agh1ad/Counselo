import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getRegionalSeoServices } from "@workspace/api-zod/browser";
import { getServiceIntentFaqs } from "./service-intent-faqs.js";

test("every regional service supports bilingual topic-specific questions", () => {
  for (const region of ["sa", "syr", "uae"] as const) {
    for (const service of getRegionalSeoServices(region)) {
      for (const ar of [false, true]) {
        const title = ar ? service.titleAr : service.titleEn;
        const faqs = getServiceIntentFaqs(region, service.slug, ar, title, [ar ? "المستندات المتاحة" : "Available documents"], [title]);
        assert.ok(faqs.length >= 2, `${region}/${service.slug}`);
        assert.equal(new Set(faqs.map(faq => faq.q)).size, faqs.length);
        assert.ok(faqs.every(faq => faq.q.trim() && faq.a.trim()));
        assert.doesNotMatch(JSON.stringify(faqs), /guaranteed|near me|مجانا|نضمن/);
        if (region !== "sa") assert.doesNotMatch(JSON.stringify(faqs), /مكتب العمل|الاعتراض على الزكاة|السعودية|Saudi Arabia/);
      }
    }
  }
});

test("Saudi client wording does not mutate another region's content", () => {
  const make = (region: "sa" | "syr") => getServiceIntentFaqs(region, "employment-law", true, "العمل", [], []);
  assert.match(make("sa")[0].q, /محامي مكتب العمل/);
  assert.doesNotMatch(make("syr")[0].q, /مكتب العمل|السعودية/);
});

test("problem pages do not render keyword permutation lists or metadata", () => {
  const source = readFileSync(new URL("../pages/legal-problem-detail.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /page\.searchVariants|id="common-searches"/);
  assert.match(source, /page\.faqs/);
});

test("service answers are in server HTML and accessible without JavaScript", () => {
  const source = readFileSync(new URL("../pages/service-detail.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /openFaq|setOpenFaq/);
  assert.match(source, /<details key=\{i\}/);
  assert.match(source, /<p className="text-muted-foreground leading-relaxed">\{faq.a\}<\/p>/);
});
