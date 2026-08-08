import assert from "node:assert/strict";
import test from "node:test";
import { UAE_SERVICES } from "../data/uae-legal-services";
import { getLegalProblemPages } from "./legal-problem-pages";
import { getRegionalLegalSources, SYRIA_PRIMARY_SOURCES } from "./regional-legal-sources";

test("every UAE service and legal-problem page has a topic-mapped authority", () => {
  for (const service of UAE_SERVICES) {
    const sources = getRegionalLegalSources("uae", service.slug);
    assert.equal(sources[0]?.href, service.authority.href, `${service.slug} must use its service authority`);
    assert.ok(getLegalProblemPages("uae", service.slug).length > 0, `${service.slug} must have problem pages`);
  }
});

test("every Syria service and legal-problem page carries both primary authority starting points", () => {
  for (const page of getLegalProblemPages("syr")) {
    assert.deepEqual(getRegionalLegalSources("syr", page.parentServiceSlug), SYRIA_PRIMARY_SOURCES);
  }
});

test("unknown UAE services do not silently claim a topic-specific source", () => {
  assert.equal(getRegionalLegalSources("uae", "unknown-service")[0]?.href, "https://uaelegislation.gov.ae/");
});
