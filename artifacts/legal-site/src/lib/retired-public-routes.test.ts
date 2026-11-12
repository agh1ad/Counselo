import assert from "node:assert/strict";
import test from "node:test";
import { getPublicRouteInventory, isRetiredPublicPath, retiredPageHtml } from "@workspace/api-zod";

test("retired pages cover all locales, descendants and old discovery endpoints", () => {
  for (const prefix of ["", "/ar", "/sa", "/sa/ar", "/syr", "/syr/ar", "/uae", "/uae/ar"]) {
    for (const page of ["vision", "legal-updates"]) {
      for (const suffix of ["", "/", "?ref=search", "/page/2", "/practice/family-law", "/old-update"]) {
        assert.ok(isRetiredPublicPath(`${prefix}/${page}${suffix}`), `${prefix}/${page}${suffix}`);
      }
    }
  }
  for (const path of ["/sitemap-legal-updates.xml", "/sitemap-legal-updates-2.xml", "/api/legal-updates?path=/sa", "/api/legal-updates-sitemap", "/__pages/sa-ar-vision.html", "/__pages/ar-legal-updates.html", "/sa/ar/%76ision"]) {
    assert.ok(isRetiredPublicPath(path), path);
  }
});

test("retirement preserves other content and protected administration", () => {
  for (const path of ["/", "/ar/legal-library", "/sa/about", "/blog/en/legal-updates", "/sa/services/vision", "/api/admin/legal-updates", "/api/internal/legal-updates/run", "/legal-updates-other"]) {
    assert.equal(isRetiredPublicPath(path), false, path);
  }
  assert.ok(getPublicRouteInventory().length > 100);
  assert.equal(getPublicRouteInventory().filter(isRetiredPublicPath).length, 0);
});

test("removal HTML is localized, noindex and contains no canonical or retired content", () => {
  const ar = retiredPageHtml("/sa/ar/vision");
  const en = retiredPageHtml("/legal-updates");
  assert.match(ar, /lang="ar" dir="rtl"/);
  assert.match(ar, /href="\/ar\/legal-library"/);
  assert.match(en, /lang="en" dir="ltr"/);
  for (const html of [ar, en]) {
    assert.match(html, /name="robots" content="noindex, follow"/);
    assert.doesNotMatch(html, /rel="canonical"|application\/ld\+json|hreflang/);
  }
});
