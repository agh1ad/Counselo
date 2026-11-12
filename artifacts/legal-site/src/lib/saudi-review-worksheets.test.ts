import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getServicesForRegion } from "@workspace/api-zod/browser";
import { SAUDI_REVIEW_WORKSHEETS, saudiWorksheetPath } from "./saudi-review-worksheets";
import { renderSaudiWorksheetText } from "./saudi-worksheet-text";

test("every registered Saudi service has a preparation worksheet in both languages", () => {
  const services = getServicesForRegion("sa").map(service => service.slug).sort();
  assert.deepEqual(Object.keys(SAUDI_REVIEW_WORKSHEETS).sort(), services);
  for (const service of services) {
    const { ar, en } = SAUDI_REVIEW_WORKSHEETS[service];
    assert.equal(ar.records.length, en.records.length, service);
    assert.equal(ar.outputs.length, en.outputs.length, service);
    assert.ok(ar.boundary && en.boundary && ar.feeFactors && en.feeFactors, service);
  }
});

test("linked downloads exist and remain synchronized with the displayed guidance", () => {
  for (const service of getServicesForRegion("sa")) for (const language of ["ar", "en"] as const) {
    const path = saudiWorksheetPath(service.slug, language);
    const file = new URL(`../../public${path}`, import.meta.url);
    assert.equal(readFileSync(file, "utf8"), renderSaudiWorksheetText(service.slug, language), path);
    assert.ok(readFileSync(file, "utf8").includes(`/sa${language === "ar" ? "/ar" : ""}/services/${service.slug}`));
  }
  assert.equal(renderSaudiWorksheetText("unregistered-service", "en"), undefined);
});
