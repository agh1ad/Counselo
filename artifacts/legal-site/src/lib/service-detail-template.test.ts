import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const template = readFileSync(resolve(import.meta.dirname, "../pages/service-detail.tsx"), "utf8");

test("main service pages keep a five-choice scan-first hierarchy", () => {
  assert.equal(
    template.match(/className="service-anchor-link"/g)?.length,
    5,
    "sticky navigation should expose only five primary choices",
  );
  assert.match(template, /id="service-overview"/);
  assert.match(template, /id="service-legal-checks"/);
  assert.match(template, /id="service-contact"/);
  assert.match(template, /atAGlance\.map/);
});

test("main service pages expose immediate contact paths and safe engagement boundaries", () => {
  assert.match(template, /data-conversion-position="service-hero"/);
  assert.match(template, /data-conversion-position="service-contact"/);
  assert.match(template, /Contacting CounselO does not stop or extend a deadline/);
  assert.match(template, /contacting us alone does not create a professional engagement/);
  assert.match(template, /without guaranteeing an outcome/);
});

test("legacy outcome-oriented service narratives are not rendered by the shared template", () => {
  for (const legacyField of ["displayOverview", "displayOverview1", "displayOverview2", "displayExperienceNote", "data.process"]) {
    assert.doesNotMatch(template, new RegExp(`\\b${legacyField.replace(".", "\\.")}\\b`));
  }
  assert.match(template, /const displayFaqs = universalFaqs/);
  assert.match(template, /Source-routing verification: 18 August 2026/);
});
