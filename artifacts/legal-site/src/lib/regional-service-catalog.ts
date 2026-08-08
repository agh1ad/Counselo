import {
  SERVICE_REGISTRY,
  type Region,
  type ServiceDefinition,
} from "@workspace/api-zod";

export const REGION_ORDER: readonly Region[] = ["sa", "syr", "uae"];

export type RegionalServiceCluster = {
  clusterSlug: string;
  titleEn: string;
  titleAr: string;
  services: Partial<Record<Region, ServiceDefinition>>;
};
/** Groups equivalent offerings while retaining each region's real route slug. */
export const REGIONAL_SERVICE_CLUSTERS: readonly RegionalServiceCluster[] = Array.from(
  new Set(SERVICE_REGISTRY.map((service) => service.clusterSlug)),
).map((clusterSlug) => {
  const services: Partial<Record<Region, ServiceDefinition>> = {};
  for (const service of SERVICE_REGISTRY.filter((entry) => entry.clusterSlug === clusterSlug)) {
    for (const region of service.regions) services[region] = service;
  }
  const representative = services.sa ?? services.syr ?? services.uae;
  if (!representative) throw new Error(`Regional service cluster ${clusterSlug} has no service`);
  return {
    clusterSlug,
    titleEn: representative.titleEn,
    titleAr: representative.titleAr,
    services,
  };
});
