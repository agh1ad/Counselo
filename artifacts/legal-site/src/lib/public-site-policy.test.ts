import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import {
  blogLanguageAlternates,
  blogPath,
  buildDiscoveryFeed,
  buildDynamicSitemap,
  buildHreflangLinks,
  getPublicRouteInventory,
  hasQualityBilingualBlogContent,
  PUBLIC_CACHE_POLICY,
  routeToFlatFilename,
} from "@workspace/api-zod";

const matrix = JSON.parse(
  readFileSync(resolve(import.meta.dirname, "../../../../docs/canonical-url-matrix.json"), "utf8"),
) as { pageTypes: Array<{ id: string; paths: string[] }> };

function matchesTemplate(route: string, template: string): boolean {
  if (template === "/*") return true;
  const pattern = template
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace("\\/{region}", "\\/(?:sa|syr|uae)")
    .replace("\\/{page}", "\\/[^/]+")
    .replace("\\/{serviceSlug}", "\\/[^/]+")
    .replace("\\/{slug}", "\\/[^/]+");
  return new RegExp(`^${pattern}$`).test(route);
}

test("the shared route inventory contains every region and language", () => {
  const routes = getPublicRouteInventory();
  for (const route of [
    "/sa/services/family-law",
    "/sa/ar/services/family-law",
    "/syr/services/civil-law",
    "/syr/ar/services/civil-law",
    "/uae/services/corporate-commercial",
    "/uae/ar/services/corporate-commercial",
    "/blog",
    "/blog/ar",
    "/legal-library",
    "/ar/legal-library",
    "/our-work",
    "/ar/our-work",
  ]) {
    assert.ok(routes.includes(route), `missing route ${route}`);
  }
  assert.equal(new Set(routes).size, routes.length, "route inventory contains duplicates");
});

test("shared canonical, hreflang, cache, and prerender policies are deterministic", () => {
  assert.equal(routeToFlatFilename("/uae/ar/services/corporate-commercial"), "uae-ar-services-corporate-commercial.html");
  assert.ok(buildHreflangLinks("/").some((link) => link.startsWith("en-AE|")));
  assert.ok(buildHreflangLinks("/").some((link) => link.startsWith("ar-AE|")));
  assert.ok(buildHreflangLinks("/uae/services/corporate-commercial").some((link) => link.startsWith("en-AE|")));
  assert.ok(buildHreflangLinks("/sa/services/real-estate").some((link) => link.startsWith("ar-SA|")));
  assert.equal(PUBLIC_CACHE_POLICY.redirect, "public, max-age=86400");
  assert.equal(PUBLIC_CACHE_POLICY.dynamicHtml, "no-store");
  assert.equal(PUBLIC_CACHE_POLICY.notFound, "no-store");
});

test("the checked-in canonical URL matrix covers the generated public inventory", () => {
  const requiredPageTypes = [
    "region-picker",
    "regional-home",
    "regional-static",
    "services-index",
    "service-detail",
    "blog-index",
    "blog-detail-bilingual",
    "legal-library-index",
    "work-index",
    "work-detail",
    "legacy-redirect",
    "not-found",
  ];
  assert.deepEqual(
    [...matrix.pageTypes.map((pageType) => pageType.id)].sort(),
    [...requiredPageTypes].sort(),
  );

  for (const route of getPublicRouteInventory()) {
    assert.ok(
      matrix.pageTypes.some((pageType) =>
        pageType.paths.some((template) => matchesTemplate(route, template)),
      ),
      `No canonical URL matrix entry covers ${route}`,
    );
  }
});

test("blog language URLs require complete independent translations", () => {
  const complete = {
    titleEn: "English title",
    titleAr: "عنوان عربي",
    excerptEn: "English excerpt",
    excerptAr: "ملخص عربي",
    seoTitleEn: "English SEO title",
    seoTitleAr: "عنوان محرك البحث العربي",
    seoDescriptionEn: "A complete English description for this published article.",
    seoDescriptionAr: "وصف عربي كامل لهذا المقال المنشور.",
    bodyEn: "English article body",
    bodyAr: "محتوى المقال العربي",
  };
  assert.equal(hasQualityBilingualBlogContent(complete), true);
  assert.equal(hasQualityBilingualBlogContent({ ...complete, bodyAr: "" }), false);
  assert.equal(hasQualityBilingualBlogContent({ ...complete, seoTitleAr: complete.seoTitleEn }), false);
  assert.equal(hasQualityBilingualBlogContent({ ...complete, bodyAr: complete.bodyEn }), false);
  assert.equal(blogPath("contract-guide"), "/blog/en/contract-guide");
  assert.equal(blogPath("contract-guide", "en"), "/blog/en/contract-guide");
  assert.equal(blogPath("contract-guide", "ar"), "/blog/ar/contract-guide");
  assert.deepEqual(blogLanguageAlternates("contract-guide").map(([lang]) => lang), ["en", "ar", "x-default"]);
});

test("dynamic discovery emits both language canonicals and preserves both blog hubs", () => {
  const post = {
    slug: "contract-guide",
    date: "2026-08-17",
    titleEn: "English title",
    titleAr: "عنوان عربي",
    excerptEn: "English excerpt",
    excerptAr: "ملخص عربي",
    seoTitleEn: "English SEO title",
    seoTitleAr: "عنوان محرك البحث العربي",
    seoDescriptionEn: "A complete English description for this published article.",
    seoDescriptionAr: "وصف عربي كامل لهذا المقال المنشور.",
    bodyEn: "English article body",
    bodyAr: "محتوى المقال العربي",
  };
  const base = `<?xml version="1.0"?><urlset><url><loc>https://counselo-legal.com/blog</loc></url><url><loc>https://counselo-legal.com/blog/ar</loc></url><url><loc>https://counselo-legal.com/blog/legacy</loc></url></urlset>`;
  const sitemap = buildDynamicSitemap(base, [post], []);
  assert.match(sitemap, /<loc>https:\/\/counselo-legal\.com\/blog<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/counselo-legal\.com\/blog\/ar<\/loc>/);
  assert.match(sitemap, /\/blog\/en\/contract-guide/);
  assert.match(sitemap, /\/blog\/ar\/contract-guide/);
  assert.doesNotMatch(sitemap, /\/blog\/legacy/);
  const feed = buildDiscoveryFeed([post], []);
  assert.match(feed, /\/blog\/en\/contract-guide/);
  assert.match(feed, /\/blog\/ar\/contract-guide/);
});

test("checked-in sitemap index and child files are purpose-separated", () => {
  const publicDir = resolve(import.meta.dirname, "../../public");
  const childFiles = [
    "sitemap-core.xml",
    "sitemap-uae-services.xml",
    "sitemap-sa-services.xml",
    "sitemap-syr-services.xml",
    "sitemap-blog.xml",
    "sitemap-work.xml",
  ];
  const index = readFileSync(resolve(publicDir, "sitemap.xml"), "utf8");
  for (const filename of childFiles) {
    assert.ok(index.includes(`/${filename}`), `sitemap index missing ${filename}`);
    const xml = readFileSync(resolve(publicDir, filename), "utf8");
    assert.match(xml, /<urlset[\s>]/);
    assert.match(xml, /<loc>https:\/\/counselo-legal\.com\//);
  }
  assert.doesNotMatch(readFileSync(resolve(publicDir, "sitemap-core.xml"), "utf8"), /\/services\//);
  assert.doesNotMatch(readFileSync(resolve(publicDir, "sitemap-core.xml"), "utf8"), /\/blog(?:\/|<)/);
  assert.match(readFileSync(resolve(publicDir, "sitemap-uae-services.xml"), "utf8"), /\/uae\/(?:ar\/)?services\//);
  assert.doesNotMatch(readFileSync(resolve(publicDir, "sitemap-uae-services.xml"), "utf8"), /\/sa\/(?:ar\/)?services\//);
  assert.match(readFileSync(resolve(publicDir, "sitemap-blog.xml"), "utf8"), /\/blog(?:\/|<)/);
  assert.match(readFileSync(resolve(publicDir, "sitemap-work.xml"), "utf8"), /\/(?:ar\/)?our-work(?:\/|<)/);
});
