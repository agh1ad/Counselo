import assert from "node:assert/strict";
import test from "node:test";
import { getServicesForRegion } from "@workspace/api-zod";
import { UAE_SERVICES } from "../data/uae-legal-services";
import { getLegalProblemPages } from "./legal-problem-pages";
import {
  getRegionalLegalSources,
  SYRIA_SERVICE_SLUGS,
  SYRIA_SERVICE_SOURCES,
} from "./regional-legal-sources";

test("every UAE service and legal-problem page has a topic-mapped authority", () => {
  for (const service of UAE_SERVICES) {
    const sources = getRegionalLegalSources("uae", service.slug);
    assert.equal(sources[0]?.href, service.authority.href, `${service.slug} must use its service authority`);
    assert.ok(getLegalProblemPages("uae", service.slug).length > 0, `${service.slug} must have problem pages`);
  }
});

test("every Syria service has an explicit practice source mapping", () => {
  assert.deepEqual(
    new Set(Object.keys(SYRIA_SERVICE_SOURCES)),
    new Set(SYRIA_SERVICE_SLUGS),
  );
  for (const service of getServicesForRegion("syr")) {
    const sources = getRegionalLegalSources("syr", service.slug);
    assert.equal(sources.length, 2, `${service.slug} must have two reviewed official sources`);
    assert.ok(getLegalProblemPages("syr", service.slug).length > 0, `${service.slug} must have problem pages`);
  }
});

test("practice mappings do not cross-link unrelated authorities", () => {
  const checks = [
    ["sa", "intellectual-property", "https://www.saip.gov.sa/"],
    ["sa", "employment-law", "https://www.hrsd.gov.sa/"],
    ["sa", "companies-law", "https://mc.gov.sa/"],
    ["sa", "real-estate", "https://rega.gov.sa/"],
    ["uae", "intellectual-property", "https://www.moec.gov.ae/intellectual-property"],
    ["uae", "employment-labour", "https://uaelegislation.gov.ae/en/legislations/1541"],
    ["uae", "corporate-commercial", "https://uaelegislation.gov.ae/en/legislations/1542"],
    ["uae", "real-estate-construction", "https://u.ae/en/information-and-services/housing"],
    ["syr", "intellectual-property", "https://www.parliament.gov.sy/"],
    ["syr", "employment-law", "https://www.parliament.gov.sy/"],
    ["syr", "companies-law", "https://www.parliament.gov.sy/"],
    ["syr", "real-estate", "https://www.parliament.gov.sy/"],
  ] as const;
  for (const [region, serviceSlug, expectedHref] of checks) {
    assert.equal(
      getRegionalLegalSources(region, serviceSlug)[0]?.href,
      expectedHref,
      `${region}/${serviceSlug} must use its reviewed practice authority`,
    );
  }
  assert.notEqual(
    getRegionalLegalSources("sa", "intellectual-property")[0]?.href,
    getRegionalLegalSources("sa", "real-estate")[0]?.href,
  );
});

test("every generated legal page resolves through the regional source matrix", () => {
  for (const region of ["sa", "syr", "uae"] as const) {
    for (const service of getServicesForRegion(region)) {
      assert.ok(getRegionalLegalSources(region, service.slug).length > 0, `${region}/${service.slug} needs an official source`);
    }
    for (const page of getLegalProblemPages(region)) {
      assert.ok(getRegionalLegalSources(region, page.parentServiceSlug).length > 0, `${region}/${page.parentServiceSlug}/${page.slug} needs an official source`);
    }
  }
});

test("unknown UAE services do not silently claim a topic-specific source", () => {
  assert.equal(getRegionalLegalSources("uae", "unknown-service")[0]?.href, "https://uaelegislation.gov.ae/");
});
