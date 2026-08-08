import assert from "node:assert/strict";
import test from "node:test";
import { getServiceDefinition } from "@workspace/api-zod";
import { REGIONAL_SERVICE_CLUSTERS, REGION_ORDER } from "./regional-service-catalog.js";

test("global service discovery only emits valid regional service routes", () => {
  assert.ok(REGIONAL_SERVICE_CLUSTERS.length >= 22);
  for (const cluster of REGIONAL_SERVICE_CLUSTERS) {
    for (const region of REGION_ORDER) {
      const service = cluster.services[region];
      if (!service) continue;
      assert.equal(service.clusterSlug, cluster.clusterSlug);
      assert.equal(getServiceDefinition(service.slug, region)?.slug, service.slug);
      assert.match(`/${region}/services/${service.slug}`, new RegExp(`^/${region}/services/[a-z0-9-]+$`));
}
  }
});

test("UAE discovery uses UAE-specific slugs instead of shared Saudi/Syria slugs", () => {
  const uaeLinks = REGIONAL_SERVICE_CLUSTERS
    .map((cluster) => cluster.services.uae?.slug)
    .filter((slug): slug is string => Boolean(slug));
  assert.equal(new Set(uaeLinks).size, uaeLinks.length);
  assert.ok(uaeLinks.includes("commercial-contracts"));
  assert.ok(!uaeLinks.includes("family-law"));
});
