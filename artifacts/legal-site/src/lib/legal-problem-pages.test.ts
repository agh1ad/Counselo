import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  getLegalProblemLanguageAlternates,
  getLegalProblemPages,
  getLegalProblemPaths,
  getRelatedLegalProblemPages,
  legalProblemPath,
} from "./legal-problem-pages.js";
import { getServicesForRegion } from "@workspace/api-zod";

test("problem-page registry covers every served region and language", () => {
  for (const region of ["sa", "syr", "uae"] as const) {
    const pages = getLegalProblemPages(region);
    assert.ok(pages.length > 0, `${region} has no legal problem pages`);
    assert.ok(pages.every((page) => page.titleEn && page.titleAr && page.documentsEn.length > 0 && page.documentsAr.length > 0));
    assert.ok(pages.every((page) => page.overview.en.length > 120 && page.overview.ar.length > 120));
    assert.ok(pages.every((page) => page.heroSummary.en.length >= 80 && page.heroSummary.en.length <= 320));
    assert.ok(pages.every((page) => page.heroSummary.ar.length >= 70 && page.heroSummary.ar.length <= 320));
    assert.ok(pages.every((page) => page.atAGlance.en.length === 3 && page.atAGlance.ar.length === 3));
    assert.ok(pages.every((page) => page.keyQuestions.en.length >= 5 && page.keyQuestions.ar.length >= 5));
    assert.ok(pages.every((page) => page.deliverables.en.length >= 5 && page.process.en.length === 4 && page.process.ar.length === 4));
    assert.ok(pages.every((page) => page.experience.en.length > 120 && page.faqs.en.length >= 5 && page.faqs.ar.length >= 5));
    assert.ok(pages.every((page) => page.searchVariantsEn.length >= 12 && page.searchVariantsAr.length >= 12));
    assert.ok(pages.every((page) => page.legalAccuracy.reviewedAt === "2026-08-18"));
    assert.ok(pages.every((page) => page.legalAccuracy.status === "framework-verified-matter-review-required"));
    assert.ok(pages.every((page) => page.legalAccuracy.checks.en.length === 3 && page.legalAccuracy.checks.ar.length === 3));
    assert.ok(pages.every((page) => page.legalAccuracy.intakeChecklist.en.length === 4 && page.legalAccuracy.intakeChecklist.ar.length === 4));
    assert.deepEqual(
      new Set(pages.map((page) => page.parentServiceSlug)),
      new Set(getServicesForRegion(region).map((service) => service.slug)),
      `${region} service catalogue is missing problem pages`,
    );
    for (const page of pages) {
      assert.equal(
        legalProblemPath(region, "en", page.parentServiceSlug, page.slug),
        `/${region}/services/${page.parentServiceSlug}/${page.slug}`,
      );
      assert.equal(
        legalProblemPath(region, "ar", page.parentServiceSlug, page.slug),
        `/${region}/ar/services/${page.parentServiceSlug}/${page.slug}`,
      );
    }
  }
});

test("problem template keeps the scan-first hierarchy concise", () => {
  const template = readFileSync(new URL("../pages/legal-problem-detail.tsx", import.meta.url), "utf8");
  assert.equal(template.match(/className="service-anchor-link"/g)?.length, 5, "sticky navigation should expose only five primary choices");
  assert.match(template, /page\.heroSummary/);
  assert.match(template, /problem-at-a-glance-heading/);
  assert.match(template, /<details id="problem-context"/);
  assert.match(template, /<details id="problem-questions"/);
  assert.match(template, /<details id="problem-process"/);
  assert.match(template, /<details id="consultation-package"/);
  assert.match(template, /<details id="problem-sources"/);
  assert.doesNotMatch(template, /id="problem-experience"/, "experience should be consolidated into the trust strip");
});

test("every problem page preserves the legal-accuracy and engagement boundary", () => {
  const unsafeOutcomeClaims = /\b(?:we guarantee|guaranteed success|you will win|you are entitled to|will definitely recover)\b/i;
  for (const region of ["sa", "syr", "uae"] as const) {
    for (const page of getLegalProblemPages(region)) {
      const publicCopy = [
        page.overview.en,
        page.overview.ar,
        ...page.keyQuestions.en,
        ...page.keyQuestions.ar,
        ...page.deliverables.en,
        ...page.deliverables.ar,
        ...page.process.en.flatMap((step) => [step.title, step.desc]),
        ...page.process.ar.flatMap((step) => [step.title, step.desc]),
        ...page.faqs.en.flatMap((faq) => [faq.q, faq.a]),
        ...page.faqs.ar.flatMap((faq) => [faq.q, faq.a]),
        page.legalAccuracy.urgentWarning.en,
        page.legalAccuracy.urgentWarning.ar,
        page.legalAccuracy.engagementWarning.en,
        page.legalAccuracy.engagementWarning.ar,
      ].join(" ");
      assert.doesNotMatch(publicCopy, unsafeOutcomeClaims, `${region}/${page.parentServiceSlug}/${page.slug} contains an outcome guarantee`);
      assert.match(page.legalAccuracy.urgentWarning.en, /does not suspend or extend a deadline/i);
      assert.match(page.legalAccuracy.engagementWarning.en, /does not determine entitlement, liability, forum, deadline or outcome/i);
      assert.match(page.legalAccuracy.engagementWarning.en, /does not by itself create an engagement/i);
      assert.ok(page.deliverables.en.some((item) => /potentially applicable framework/i.test(item)));
      assert.ok(page.deliverables.en.some((item) => /within the agreed scope/i.test(item)));
    }
  }
});

test("legal-accuracy checks distinguish Saudi, Syrian and UAE jurisdiction risks", () => {
  const sa = getLegalProblemPages("sa")[0]?.legalAccuracy.checks.en.join(" ") ?? "";
  const syr = getLegalProblemPages("syr")[0]?.legalAccuracy.checks.en.join(" ") ?? "";
  const uae = getLegalProblemPages("uae")[0]?.legalAccuracy.checks.en.join(" ") ?? "";
  assert.match(sa, /nationality, residency, sector/i);
  assert.match(syr, /official publication/i);
  assert.match(uae, /DIFC or ADGM/i);
});

test("problem-page paths are unique and bilingual", () => {
  const paths = getLegalProblemPaths();
  assert.equal(new Set(paths).size, paths.length);
  assert.ok(paths.some((path) => path.startsWith("/uae/services/")));
  assert.ok(paths.some((path) => path.startsWith("/uae/ar/services/")));
  assert.ok(paths.some((path) => path.startsWith("/sa/services/")));
  assert.ok(paths.some((path) => path.startsWith("/syr/ar/services/")));
});

test("search-target refinements preserve published canonical problem paths", () => {
  const cases = [
    ["sa", "administrative-law", "Bid exclusion and tender-award challenge", "public-procurement-dispute"],
    ["sa", "contracts", "Power-of-attorney misuse, rejection or scope dispute", "power-of-attorney-drafting-and-authority-problem"],
    ["syr", "employment-law", "Correction of a work permit or labour record", "work-permit-or-employment-status-problem"],
    ["syr", "insurance-law", "Personal injury compensation for a non-traffic accident", "personal-injury-compensation-after-an-accident"],
  ] as const;
  for (const [region, service, title, slug] of cases) {
    const page = getLegalProblemPages(region, service).find((candidate) => candidate.titleEn === title);
    assert.equal(page?.slug, slug, `${region}/${service} changed the published slug for ${title}`);
  }
});

test("problem hreflang alternates only reference real reciprocal routes", () => {
  const paths = new Set(getLegalProblemPaths().map((path) => `https://counselo-legal.com${path}`));
  for (const region of ["sa", "syr", "uae"] as const) {
    for (const page of getLegalProblemPages(region)) {
      const alternates = getLegalProblemLanguageAlternates(page);
      assert.equal(new Set(alternates.map((alternate) => alternate.hrefLang)).size, alternates.length);
      assert.ok(alternates.some((alternate) => alternate.hrefLang === (region === "uae" ? "en-AE" : region === "sa" ? "en-SA" : "en-SY")));
      assert.ok(alternates.some((alternate) => alternate.hrefLang === (region === "uae" ? "ar-AE" : region === "sa" ? "ar-SA" : "ar-SY")));
      for (const alternate of alternates) {
        assert.ok(paths.has(alternate.href), `${page.region}/${page.slug} emits missing hreflang ${alternate.href}`);
      }
    }
  }
});

test("related-problem clusters distribute contextual inbound links across every sibling", () => {
  for (const region of ["sa", "syr", "uae"] as const) {
    for (const service of getServicesForRegion(region)) {
      const pages = getLegalProblemPages(region, service.slug);
      const inbound = new Map(pages.map((page) => [page.slug, 0]));
      for (const page of pages) {
        const related = getRelatedLegalProblemPages(page);
        assert.equal(related.length, Math.min(6, pages.length - 1));
        assert.equal(new Set(related.map((item) => item.slug)).size, related.length);
        assert.ok(related.every((item) => item.parentServiceSlug === service.slug && item.slug !== page.slug));
        for (const item of related) inbound.set(item.slug, (inbound.get(item.slug) ?? 0) + 1);
      }
      assert.ok([...inbound.values()].every((count) => count >= Math.min(4, pages.length - 1)), `${region}/${service.slug} has an under-linked problem page`);
    }
  }
});

test("problem inventories do not contain duplicate slugs or duplicate search targets", () => {
  for (const region of ["sa", "syr", "uae"] as const) {
    for (const service of getServicesForRegion(region)) {
      const pages = getLegalProblemPages(region, service.slug);
      assert.ok(pages.length >= 7, `${region}/${service.slug} should expose at least seven focused problem targets`);
      assert.equal(new Set(pages.map((page) => page.slug)).size, pages.length, `${region}/${service.slug} has duplicate slugs`);
      const normalizedTitles = pages.map((page) => page.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim());
      assert.equal(new Set(normalizedTitles).size, normalizedTitles.length, `${region}/${service.slug} has duplicate English problem targets`);
      assert.ok(pages.every((page) => page.searchVariantsEn.some((variant) => variant.includes("lawyer"))), `${region}/${service.slug} is missing lawyer-intent variants`);
      assert.ok(pages.every((page) => page.searchVariantsEn.some((variant) => variant.includes("documents"))), `${region}/${service.slug} is missing document-intent variants`);
      assert.ok(pages.every((page) => page.searchVariantsEn.some((variant) => variant.includes("urgent"))), `${region}/${service.slug} is missing urgent-intent variants`);
    }
  }
});

test("Syria has jurisdiction-specific additions instead of an unchanged Saudi inventory", () => {
  const sa = new Set(getLegalProblemPages("sa").map((page) => `${page.parentServiceSlug}/${page.slug}`));
  const syria = getLegalProblemPages("syr").map((page) => `${page.parentServiceSlug}/${page.slug}`);
  assert.ok(syria.some((key) => !sa.has(key)), "Syria should include Syria-specific problem targets");
});

test("UAE problem titles stay tied to the service instead of using bare generic labels", () => {
  const generic = /^(A missed notice, filing, objection or appeal deadline|Unclear allocation between federal|The need to preserve evidence)/i;
  for (const page of getLegalProblemPages("uae")) {
    assert.ok(!generic.test(page.titleEn) || page.titleEn.includes(page.serviceTitleEn), `Generic UAE title leaked into ${page.parentServiceSlug}: ${page.titleEn}`);
    assert.ok(page.overview.en.includes("UAE") || page.overview.en.includes("the UAE"), `${page.slug} is missing UAE context`);
  }
});

test("every region carries the cross-region lead-gap coverage set", () => {
  const requiredByRegion: Record<"sa" | "syr" | "uae", RegExp[]> = {
    sa: [
      /Legal notice and demand letter/i,
      /Power-of-attorney/i,
      /Document attestation/i,
      /Consumer refund/i,
      /Defective product/i,
      /Employment settlement/i,
      /residency or employment-status/i,
      /Bounced-cheque defence/i,
      /Traffic accident compensation/i,
      /Personal injury compensation/i,
      /Corporate-tax registration/i,
      /VAT invoice/i,
    ],
    syr: [
      /Legal notice and demand letter/i,
      /Power-of-attorney/i,
      /Document attestation/i,
      /Consumer refund/i,
      /Defective product/i,
      /Employment settlement/i,
      /residency or employment-status/i,
      /Bounced-cheque defence/i,
      /Traffic accident compensation/i,
      /Personal injury compensation/i,
      /Corporate-tax registration/i,
      /VAT invoice/i,
    ],
    uae: [
      /Divorce filing/i,
      /Child custody/i,
      /Alimony/i,
      /Dubai tenancy/i,
      /Wrongful termination/i,
      /End-of-service/i,
      /Bounced-cheque defence/i,
      /Corporate-tax registration/i,
      /Emirates ID/i,
      /Visa overstay/i,
    ],
  };
  for (const region of ["sa", "syr", "uae"] as const) {
    const titles = getLegalProblemPages(region).map((page) => page.titleEn);
    for (const pattern of requiredByRegion[region]) {
      assert.ok(titles.some((title) => pattern.test(title)), `${region} is missing lead-gap coverage: ${pattern}`);
    }
  }
});
