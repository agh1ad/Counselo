import { COUNSELO_ENTITY_IDS } from "@workspace/api-zod/browser";

export function schemaNodes(value: unknown): Record<string, unknown>[] {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) return value.flatMap(schemaNodes);
  const node = value as Record<string, unknown>;
  return [node, ...Object.values(node).flatMap(schemaNodes)];
}

export function schemaHasType(node: Record<string, unknown>, type: string): boolean {
  const types = node["@type"];
  return types === type || (Array.isArray(types) && types.includes(type));
}

/** Site-specific identity contracts, in addition to JSON syntax validation. */
export function validateSchemaSemantics(value: unknown, route: string): Array<{ rule: string; detail: string }> {
  const nodes = schemaNodes(value);
  const issues: Array<{ rule: string; detail: string }> = [];
  for (const node of nodes) {
    const id = typeof node["@id"] === "string" ? node["@id"] : "unnamed node";
    if (id === COUNSELO_ENTITY_IDS.organization && node["@type"] && !schemaHasType(node, "Organization")) {
      issues.push({ rule: "platform-entity-type", detail: `CounselO's platform identity must remain Organization; found ${String(node["@type"])}` });
    }
    if (schemaHasType(node, "LegalService")) {
      const serviceProperties = ["provider", "serviceType", "availableChannel"].filter(key => key in node);
      if (serviceProperties.length) issues.push({ rule: "business-service-confusion", detail: `${id}: LegalService describes a legal business, not a service offering with ${serviceProperties.join(", ")}` });
      if (typeof node["@id"] === "string" && /^https:\/\/counselo-legal\.com\/#(?:sa|syr|uae)-service-/.test(node["@id"])) {
        issues.push({ rule: "service-entity-type", detail: `${id} must use Service` });
      }
    }
    if (schemaHasType(node, "Service") && typeof node["@id"] === "string" && /^https:\/\/counselo-legal\.com\/#(?:sa|syr|uae)-service-/.test(node["@id"])) {
      const provider = node.provider as Record<string, unknown> | undefined;
      if (provider?.["@id"] !== COUNSELO_ENTITY_IDS.organization) issues.push({ rule: "service-provider-identity", detail: `${id} must reference the canonical CounselO organization provider` });
    }
  }
  if (/^\/(?:sa|syr|uae)(?:\/ar)?\/services(?:\/|$)/.test(route) && !nodes.some(node => schemaHasType(node, "Service"))) {
    issues.push({ rule: "service-no-schema", detail: "A service or matter page must describe its actual Service entity" });
  }
  return issues;
}
