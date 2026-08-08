import assert from "node:assert/strict";
import test from "node:test";
import { getLegalProblemPages, getLegalProblemPaths, legalProblemPath } from "./legal-problem-pages.js";
import { getServicesForRegion } from "@workspace/api-zod";

test("problem-page registry covers every served region and language", () => {
  for (const region of ["sa", "syr", "uae"] as const) {
    const pages = getLegalProblemPages(region);
    assert.ok(pages.length > 0, `${region} has no legal problem pages`);
    assert.ok(pages.every((page) => page.titleEn && page.titleAr && page.documentsEn.length > 0 && page.documentsAr.length > 0));
    assert.ok(pages.every((page) => page.overview.en.length > 120 && page.overview.ar.length > 120));
    assert.ok(pages.every((page) => page.keyQuestions.en.length >= 5 && page.keyQuestions.ar.length >= 5));
    assert.ok(pages.every((page) => page.deliverables.en.length >= 5 && page.process.en.length === 4 && page.process.ar.length === 4));
    assert.ok(pages.every((page) => page.experience.en.length > 120 && page.faqs.en.length >= 5 && page.faqs.ar.length >= 5));
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

test("problem-page paths are unique and bilingual", () => {
  const paths = getLegalProblemPaths();
  assert.equal(new Set(paths).size, paths.length);
  assert.ok(paths.some((path) => path.startsWith("/uae/services/")));
  assert.ok(paths.some((path) => path.startsWith("/uae/ar/services/")));
  assert.ok(paths.some((path) => path.startsWith("/sa/services/")));
  assert.ok(paths.some((path) => path.startsWith("/syr/ar/services/")));
});

test("problem inventories do not contain duplicate slugs or duplicate search targets", () => {
  for (const region of ["sa", "syr", "uae"] as const) {
    for (const service of getServicesForRegion(region)) {
      const pages = getLegalProblemPages(region, service.slug);
      assert.ok(pages.length >= 7, `${region}/${service.slug} should expose at least seven focused problem targets`);
      assert.equal(new Set(pages.map((page) => page.slug)).size, pages.length, `${region}/${service.slug} has duplicate slugs`);
      const normalizedTitles = pages.map((page) => page.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim());
      assert.equal(new Set(normalizedTitles).size, normalizedTitles.length, `${region}/${service.slug} has duplicate English problem targets`);
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
