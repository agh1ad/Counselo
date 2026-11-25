import assert from "node:assert/strict";
import test from "node:test";
import { latestPageUpdate } from "./site-content-dates";

test("revised bilingual page families share a stable sitemap revision date", () => {
  for (const region of ["sa", "syr", "uae"]) for (const lang of ["", "/ar"]) {
    for (const page of ["", "/about", "/contact", "/services", "/services/employment-law", "/services/employment-law/unpaid-wages"]) {
      const revised = page === "/about" || (region !== "sa" && page === "/contact");
      const expected = revised ? "2026-11-26" : page === "" || page === "/about" ? "2026-11-24" : "2026-11-18";
      assert.equal(latestPageUpdate(`/${region}${lang}${page}`, "2026-09-07"), expected);
    }
  }
  for (const route of ["/sa/services/contracts/contract-drafting-and-review", "/sa/ar/services/contracts/contract-drafting-and-review"]) {
    assert.equal(latestPageUpdate(route), "2026-11-24");
  }
  for (const route of ["", "/", "/ar", "/about", "/ar/about", "/sa/about/abdullah-al-anzi", "/sa/ar/about/abdullah-al-anzi", "/syr/about/omar-al-abdullah", "/syr/ar/about/omar-al-abdullah", "/uae-syria-legal-consultation", "/ar/uae-syria-legal-consultation"]) assert.equal(latestPageUpdate(route), "2026-11-26");
  for (const route of ["/our-work", "/ar/our-work"]) assert.equal(latestPageUpdate(route), "2026-11-18");
  for (const route of ["/blog", "/blog/ar"]) assert.equal(latestPageUpdate(route), "2026-11-13");
  for (const prefix of ["", "/ar", "/sa/services", "/sa/ar/services", "/syr/services", "/syr/ar/services", "/uae/services", "/uae/ar/services"]) {
    assert.equal(latestPageUpdate(`${prefix}/urgent-legal-assistance`), "2026-11-18");
  }
  for (const route of ["/legal-library", "/ar/legal-library"]) assert.equal(latestPageUpdate(route), "2026-11-03");
});

test("sitemap revisions cover revised policies and preserve CMS dates and never downgrade a later edit", () => {
  for (const route of ["/blog/en/sample", "/ar/our-work/sample"]) {
    assert.equal(latestPageUpdate(route, "2026-09-07"), "2026-09-07");
  }
  for (const route of ["/sa/terms-of-service", "/syr/ar/privacy-policy"]) assert.equal(latestPageUpdate(route), "2026-11-18");
  assert.equal(latestPageUpdate("https://counselo-legal.com/uae/contact", "2026-11-27"), "2026-11-27");
});
