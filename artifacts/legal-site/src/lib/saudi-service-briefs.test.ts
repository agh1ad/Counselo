import assert from "node:assert/strict";
import test from "node:test";
import { getServicesForRegion } from "@workspace/api-zod/browser";
import { getLegalProblemPages } from "./legal-problem-pages";
import { saudiServiceBrief } from "./saudi-service-briefs";

test("every registered Saudi practice has equivalent bilingual review guidance", () => {
  for (const service of getServicesForRegion("sa").filter(item => item.kind !== "priority-intake")) {
    const ar = saudiServiceBrief("sa", service.slug, "ar");
    const en = saudiServiceBrief("sa", service.slug, "en");
    assert.ok(ar && en, `Missing Saudi practice: ${service.slug}`);
    assert.deepEqual(ar.choices.map(item => item.path), en.choices.map(item => item.path), service.slug);
  }
});

test("Saudi review choices resolve to registered service or problem owners", () => {
  const services = getServicesForRegion("sa");
  const owners = new Set([
    ...services.map(service => service.slug),
    ...getLegalProblemPages("sa").map(problem => `${problem.parentServiceSlug}/${problem.slug}`),
  ]);
  for (const service of services) for (const language of ["ar", "en"] as const) {
    for (const choice of saudiServiceBrief("sa", service.slug, language)?.choices ?? []) {
      assert.ok(owners.has(choice.path), `Unregistered choice: ${choice.path}`);
    }
  }
});

test("Saudi briefs do not appear on another jurisdiction or replace urgent intake", () => {
  for (const service of getServicesForRegion("sa")) {
    assert.equal(saudiServiceBrief("syr", service.slug, "ar"), undefined);
    assert.equal(saudiServiceBrief("uae", service.slug, "en"), undefined);
  }
  assert.equal(saudiServiceBrief("sa", "urgent-legal-assistance", "en"), undefined);
});
