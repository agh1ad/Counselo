import { COUNSELO_PLATFORM_POSITIONING } from "./platform-positioning";

/** Counts published library records, including works credited to other authors. */
export function countPublishedPortfolio(inventory: unknown): number | undefined {
  if (!Array.isArray(inventory)) return undefined;
  const ids = new Set<string>();
  const slugs = new Set<string>();
  let count = 0;
  for (const entry of inventory) {
    if (!entry || typeof entry !== "object" || entry.published !== true) continue;
    const id = typeof entry.id === "number" && Number.isFinite(entry.id)
      ? String(entry.id)
      : typeof entry.id === "string" ? entry.id.trim() : "";
    const slug = typeof entry.slug === "string" ? entry.slug.trim() : "";
    if (!id && !slug) continue;
    const duplicate = Boolean((id && ids.has(id)) || (slug && slugs.has(slug)));
    if (id) ids.add(id);
    if (slug) slugs.add(slug);
    if (!duplicate) count++;
  }
  return count;
}

export const COUNSELO_SERVICE_COUNTRY_COUNT = new Set(COUNSELO_PLATFORM_POSITIONING.jurisdictions).size;
export const COUNSELO_SERVICE_LANGUAGE_COUNT = new Set(COUNSELO_PLATFORM_POSITIONING.languages).size;
