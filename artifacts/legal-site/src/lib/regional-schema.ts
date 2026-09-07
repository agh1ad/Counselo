// Entity facts and already-localized answers must not be rewritten by a page's
// legacy country substitution. This also applies when nested in an @graph.
const PRESERVED_TYPES = new Set(["Organization", "Person", "WebSite", "FAQPage", "Question", "Answer"]);

export function localizeLegacySyriaSchema(value: unknown, localizeText: (text: string) => string): unknown {
  if (typeof value === "string") return localizeText(value);
  if (Array.isArray(value)) return value.map(item => localizeLegacySyriaSchema(item, localizeText));
  if (value !== null && typeof value === "object") {
    const node = value as Record<string, unknown>;
    const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
    if (types.some(type => typeof type === "string" && PRESERVED_TYPES.has(type))) return node;
    return Object.fromEntries(Object.entries(node).map(([key, item]) => {
      if (key === "addressCountry" && item === "SA") return [key, "SY"];
      if (key === "addressLocality" && item === "Jubail") return [key, "Damascus"];
      if (key === "addressRegion" && item === "Eastern Province") return [key, "Damascus Governorate"];
      return [key, localizeLegacySyriaSchema(item, localizeText)];
    }));
  }
  return value;
}
