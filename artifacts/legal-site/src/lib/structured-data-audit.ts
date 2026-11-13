type JsonObject = Record<string, unknown>;
export type JsonLdNode = { value: JsonObject; context: unknown; documentNode: boolean };
export type JsonLdAudit = { documents: JsonObject[]; nodes: JsonLdNode[]; errors: string[]; blockCount: number };

export function schemaTypes(node: JsonObject): string[] {
  const type = node["@type"];
  return typeof type === "string" ? [type] : Array.isArray(type) ? type.filter((value): value is string => typeof value === "string") : [];
}

/** Read SSR/Helmet scripts regardless of attribute order and retain graph context. */
export function readJsonLd(html: string): JsonLdAudit {
  const result: JsonLdAudit = { documents: [], nodes: [], errors: [], blockCount: 0 };
  function visit(value: unknown, inheritedContext: unknown, documentNode: boolean): void {
    if (Array.isArray(value)) return value.forEach(item => visit(item, inheritedContext, documentNode));
    if (!value || typeof value !== "object") return;
    const node = value as JsonObject;
    const context = node["@context"] ?? inheritedContext;
    result.nodes.push({ value: node, context, documentNode });
    for (const [key, child] of Object.entries(node)) {
      if (key !== "@context") visit(child, context, key === "@graph" && documentNode);
    }
  }
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    const type = match[1].match(/(?:^|\s)type\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    if ((type?.[1] ?? type?.[2] ?? type?.[3] ?? "").trim().toLowerCase() !== "application/ld+json") continue;
    result.blockCount++;
    try {
      const parsed: unknown = JSON.parse(match[2]);
      const roots = Array.isArray(parsed) ? parsed : [parsed];
      if (!roots.length || roots.some(root => !root || typeof root !== "object" || Array.isArray(root))) {
        result.errors.push(`JSON-LD block ${result.blockCount} must contain an object or an array of objects`);
        continue;
      }
      result.documents.push(...roots as JsonObject[]);
      visit(parsed, undefined, true);
    } catch {
      result.errors.push(`JSON-LD block ${result.blockCount} contains invalid JSON`);
    }
  }
  return result;
}

function hasSchemaContext(context: unknown): boolean {
  if (Array.isArray(context)) return context.some(hasSchemaContext);
  if (typeof context === "string") return /^https?:\/\/schema\.org\/?$/.test(context);
  return Boolean(context && typeof context === "object" && hasSchemaContext((context as JsonObject)["@vocab"]));
}

export function auditStructuredData(parsed: JsonLdAudit, canonical: string, route: string) {
  const issues: { rule: string; detail: string }[] = parsed.errors.map(detail => ({ rule: "schema-invalid-json", detail }));
  const pageTypes = new Set(["WebPage", "AboutPage", "ContactPage", "ProfilePage", "CollectionPage"]);
  const pageNodes = parsed.nodes.filter(node => node.documentNode && schemaTypes(node.value).some(type => pageTypes.has(type)));
  for (const { value, context } of pageNodes) {
    if (typeof value.url === "string" && value.url !== canonical) issues.push({ rule: "webpage-schema-canonical-mismatch", detail: `Page URL ${value.url} differs from canonical ${canonical}` });
    if (typeof value["@id"] === "string" && value["@id"].split("#")[0] !== canonical) issues.push({ rule: "webpage-id-canonical-mismatch", detail: `Page @id ${value["@id"]} differs from canonical ${canonical}` });
    if (!hasSchemaContext(context)) issues.push({ rule: "webpage-schema-context-missing", detail: "Page JSON-LD must declare or inherit the schema.org context" });
  }
  const websiteId = "https://counselo-legal.com/#website";
  const websites = parsed.nodes.filter(node => node.documentNode && schemaTypes(node.value).includes("WebSite"));
  for (const { value } of websites) {
    if (value["@id"] !== websiteId || typeof value.url !== "string" || value.url.replace(/\/$/, "") !== "https://counselo-legal.com") {
      issues.push({ rule: "website-identity-mismatch", detail: "The site has one domain-level WebSite identity; country sections are pages within it" });
    }
  }
  if ((route === "/" || route === "/ar") && websites.length !== 1) issues.push({ rule: "global-website-identity-missing", detail: "Each global homepage must declare the single root WebSite identity" });

  if (/^(?:\/ar)?\/our-work(?:\/[^/]+)?$/.test(route)) {
    const ar = route.startsWith("/ar/");
    const home = `https://counselo-legal.com${ar ? "/ar" : "/"}`;
    const index = `https://counselo-legal.com${ar ? "/ar" : ""}/our-work`;
    const expected = canonical === index ? [home, index] : [home, index, canonical];
    const breadcrumbs = parsed.nodes.filter(node => schemaTypes(node.value).includes("BreadcrumbList"));
    const correct = breadcrumbs.some(({ value }) => {
      if (!Array.isArray(value.itemListElement)) return false;
      const items = value.itemListElement as JsonObject[];
      return items.length === expected.length && items.every((item, position) => {
        const url = typeof item.item === "string" ? item.item : (item.item as JsonObject | undefined)?.["@id"];
        return item.position === position + 1 && url === expected[position];
      });
    });
    if (!correct) issues.push({ rule: "work-breadcrumb-hierarchy", detail: "Work breadcrumbs must use the locale homepage, Our Work, then the current record where applicable" });
    if (canonical === index && !pageNodes.some(({ value }) => (value.isPartOf as JsonObject | undefined)?.["@id"] === websiteId)) {
      issues.push({ rule: "work-index-parent", detail: "Our Work must be a top-level collection within the root WebSite" });
    }
  }
  if (/^\/blog(?:\/ar|\/(?:en|ar)\/[^/]+)?$/.test(route)) {
    const ar = /^\/blog\/ar(?:\/|$)/.test(route);
    const index = `https://counselo-legal.com${ar ? "/blog/ar" : "/blog"}`;
    const expected = [`https://counselo-legal.com${ar ? "/ar" : "/"}`, index, ...(canonical === index ? [] : [canonical])];
    const breadcrumbs = parsed.nodes.filter(node => schemaTypes(node.value).includes("BreadcrumbList"));
    const correct = breadcrumbs.some(({ value }) => Array.isArray(value.itemListElement)
      && value.itemListElement.length === expected.length
      && (value.itemListElement as JsonObject[]).every((item, position) => item.position === position + 1
        && (typeof item.item === "string" ? item.item : (item.item as JsonObject | undefined)?.["@id"]) === expected[position]));
    if (!correct) issues.push({ rule: "article-breadcrumb-hierarchy", detail: "Article breadcrumbs must use the locale homepage, Legal Articles, then the current article where applicable" });
    if (canonical === index && !pageNodes.some(({ value }) => (value.isPartOf as JsonObject | undefined)?.["@id"] === websiteId)) {
      issues.push({ rule: "article-index-parent", detail: "Legal Articles must be a top-level collection within the root WebSite" });
    }
    if (canonical !== index && !parsed.nodes.some(({ value }) => schemaTypes(value).includes("Article") && (value.isPartOf as JsonObject | undefined)?.["@id"] === `${index}#collection`)) {
      issues.push({ rule: "article-collection-parent", detail: "The article must identify its canonical language-specific Legal Articles collection" });
    }
  }
  return issues;
}
