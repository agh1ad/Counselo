import assert from "node:assert/strict";
import test from "node:test";
import { en } from "../translations/en";
import {
  BOE_SOURCE,
  getSaudiLegalSources,
  SAUDI_SERVICE_SOURCES,
  SAUDI_SERVICE_SLUGS,
  SAUDI_SOURCES,
} from "./saudi-legal-sources";

const expectedPrimarySourceBySlug = {
  "family-law": SAUDI_SOURCES.justice,
  "business-law": SAUDI_SOURCES.business,
  "real-estate": SAUDI_SOURCES.realEstate,
  "employment-law": SAUDI_SOURCES.labor,
  "foreign-investment": SAUDI_SOURCES.investment,
  "administrative-law": SAUDI_SOURCES.justice,
  arbitration: SAUDI_SOURCES.arbitration,
  enforcement: SAUDI_SOURCES.justice,
  "companies-law": SAUDI_SOURCES.business,
  contracts: SAUDI_SOURCES.business,
  "criminal-law": SAUDI_SOURCES.justice,
  "banking-finance": SAUDI_SOURCES.finance,
  "intellectual-property": SAUDI_SOURCES.intellectualProperty,
  "tax-zakat": SAUDI_SOURCES.tax,
  "cyber-law": SAUDI_SOURCES.data,
  "medical-malpractice": SAUDI_SOURCES.health,
  "insurance-law": SAUDI_SOURCES.insurance,
} as const;

test("every live Saudi service has an explicit source matrix entry", () => {
  const liveSlugs = en.nav.servicesList.map((service) =>
    service.href.replace(/^\/services\//, ""),
  );
  assert.deepEqual([...SAUDI_SERVICE_SLUGS].sort(), [...liveSlugs].sort());
  assert.deepEqual(
    Object.keys(SAUDI_SERVICE_SOURCES).sort(),
    [...SAUDI_SERVICE_SLUGS].sort(),
  );
});

test("each Saudi service uses only its approved primary source and BOE", () => {
  const approvedSources = new Set(
    Object.values(SAUDI_SOURCES).map((source) => source.href).concat(BOE_SOURCE.href),
  );

  for (const slug of SAUDI_SERVICE_SLUGS) {
    const sources = getSaudiLegalSources(slug);
    assert.equal(sources.length, 2, `${slug} must have exactly two sources`);
    assert.equal(sources[0]?.href, expectedPrimarySourceBySlug[slug].href);
    assert.equal(sources[1]?.href, BOE_SOURCE.href);
    for (const source of sources) {
      assert.ok(approvedSources.has(source.href), `${slug} has an unapproved source`);
    }
  }
});

test("authority matching is exact and has no substring fallback", () => {
  assert.deepEqual(
    getSaudiLegalSources("intellectual-property").map((source) => source.href),
    [SAUDI_SOURCES.intellectualProperty.href, BOE_SOURCE.href],
  );
  assert.deepEqual(
    getSaudiLegalSources("real-estate").map((source) => source.href),
    [SAUDI_SOURCES.realEstate.href, BOE_SOURCE.href],
  );
  assert.deepEqual(getSaudiLegalSources("property-intellectual"), []);
  assert.deepEqual(getSaudiLegalSources("new-service-without-map"), []);
});
