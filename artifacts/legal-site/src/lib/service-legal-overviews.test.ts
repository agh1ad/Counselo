import assert from "node:assert/strict";
import test from "node:test";
import { SAUDI_SERVICE_SLUGS } from "./saudi-legal-sources";
import { SYRIA_SERVICE_SLUGS } from "./regional-legal-sources";
import { UAE_SERVICES } from "../data/uae-legal-services";
import { serviceFrameworkCopy } from "./service-framework-copy";
import { serviceFrameworkSources } from "./service-framework-sources";
import { serviceLegalOverview } from "./service-legal-overviews";
import { sourceBackedSearchGuidance } from "./source-backed-search-guidance";
import type { Region } from "@workspace/api-zod/browser";

const inventories: [Region, readonly string[]][] = [
  ["sa", SAUDI_SERVICE_SLUGS], ["syr", SYRIA_SERVICE_SLUGS], ["uae", UAE_SERVICES.map(item => item.slug)],
];
for (const [region, services] of inventories) {
  test(`${region}: every practice area has a distinct bilingual legal core and cited answer`, () => {
    for (const lang of ["en", "ar"] as const) {
      const paragraphs = new Set<string>();
      for (const service of services) {
        const framework = serviceFrameworkCopy(region, service, lang);
        assert.ok(framework && framework.length > 100, `${region}/${service}: missing framework`);
        assert.ok(serviceFrameworkSources(region, service).length > 0, `${region}/${service}: missing framework references`);
        const overview = serviceLegalOverview(region, service, lang);
        assert.ok(overview && overview.length > 100, `${region}/${service}/${lang}: missing overview`);
        assert.ok(!paragraphs.has(overview), `${region}/${service}: repeated overview`);
        assert.notEqual(framework, overview);
        paragraphs.add(overview);
        const answers = sourceBackedSearchGuidance(region, service);
        assert.ok(answers.length > 0, `${region}/${service}: missing substantive answer`);
        for (const answer of answers) {
          assert.ok(answer[lang].a.length > 100);
          assert.ok(answer.sources.length > 0);
          assert.ok(answer.sources.every(source => source.href.startsWith("https://")));
        }
      }
    }
  });
}
test("unknown services cannot silently receive generic legal copy", () => {
  assert.equal(serviceLegalOverview("sa", "unknown", "en"), undefined);
});
