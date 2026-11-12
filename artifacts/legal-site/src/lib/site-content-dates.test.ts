import assert from "node:assert/strict";
import test from "node:test";
import { latestPageUpdate } from "./site-content-dates";

test("revised bilingual page families share a stable sitemap revision date", () => {
  for (const region of ["sa", "syr", "uae"]) for (const lang of ["", "/ar"]) {
    for (const page of ["", "/about", "/contact", "/services", "/services/employment-law", "/services/employment-law/unpaid-wages"]) {
      assert.equal(latestPageUpdate(`/${region}${lang}${page}`, "2026-09-07"), page.startsWith("/services/") ? "2026-11-03" : "2026-11-13");
    }
  }
  for (const route of ["/", "/ar"]) assert.equal(latestPageUpdate(route), "2026-11-13");
  for (const route of ["/our-work", "/ar/our-work", "/blog", "/blog/ar"]) assert.equal(latestPageUpdate(route), "2026-11-13");
  for (const prefix of ["", "/ar", "/sa/services", "/sa/ar/services", "/syr/services", "/syr/ar/services", "/uae/services", "/uae/ar/services"]) {
    assert.equal(latestPageUpdate(`${prefix}/urgent-legal-assistance`), "2026-11-13");
  }
  for (const route of ["/legal-library", "/ar/legal-library"]) assert.equal(latestPageUpdate(route), "2026-11-03");
});

test("sitemap revisions preserve policy and CMS dates and never downgrade a later edit", () => {
  for (const route of ["/sa/terms-of-service", "/syr/ar/privacy-policy", "/blog/en/sample", "/ar/our-work/sample"]) {
    assert.equal(latestPageUpdate(route, "2026-09-07"), "2026-09-07");
  }
  assert.equal(latestPageUpdate("https://counselo-legal.com/uae/contact", "2026-11-14"), "2026-11-14");
});
