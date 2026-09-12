import { getServiceDefinition } from "./region-services.js";
import {
  legalUpdatesPath,
  updateRegions,
  type LegalUpdate,
  type UpdateRegion,
} from "./legal-updates.js";
export const LEGAL_UPDATES_PAGE_SIZE = 20;
export interface LegalUpdateCard extends Omit<LegalUpdate, "draft"> {
  draft: Pick<
    LegalUpdate["draft"],
    "sourceDate" | "practiceArea" | "serviceSlugs"
  > & {
    en: Pick<LegalUpdate["draft"]["en"], "title" | "summary">;
    ar: Pick<LegalUpdate["draft"]["ar"], "title" | "summary">;
  };
}
export interface LegalUpdatesData {
  path: string;
  items: LegalUpdateCard[];
  article: LegalUpdate | null;
  hasMore: boolean;
  services: string[];
}
export function updateContext(path: string) {
  const match = path.match(
    /^\/(?:(sa|uae|syr)\/)?(ar\/)?legal-updates(?:\/practice\/([a-z0-9-]+))?(?:\/page\/([1-9]\d{0,5}))?$/,
  );
  if (match) {
    const region = match[1] as UpdateRegion | undefined;
    const service = match[3];
    if (service && (!region || !getServiceDefinition(service, region)))
      return null;
    if (match[4] === "1") return null; // page one has the hub's canonical URL
    return {
      kind: "hub" as const,
      region,
      lang: match[2] ? ("ar" as const) : ("en" as const),
      service,
      page: Number(match[4] || 1),
    };
  }
  const article = path.match(
    /^\/(sa|uae|syr)\/(ar\/)?legal-updates\/([a-z0-9-]+)$/,
  );
  if (article && !["page", "practice"].includes(article[3]))
    return {
      kind: "article" as const,
      region: article[1] as UpdateRegion,
      lang: article[2] ? ("ar" as const) : ("en" as const),
      slug: article[3],
      page: 1,
      service: undefined,
    };
  if (path.includes("legal-updates")) return null;
  const region = updateRegions.find(
    (r) => path === `/${r}` || path.startsWith(`/${r}/`),
  );
  return {
    kind: "feed" as const,
    region,
    lang: path.split("/").includes("ar") ? ("ar" as const) : ("en" as const),
    service: path.split("/services/")[1]?.split("/")[0],
    page: 1,
  };
}
export function updateArchivePath(
  region?: UpdateRegion,
  lang: "en" | "ar" = "en",
  service?: string,
  page = 1,
) {
  const base = region
    ? legalUpdatesPath(region, lang)
    : `${lang === "ar" ? "/ar" : ""}/legal-updates`;
  return `${base}${service ? `/practice/${service}` : ""}${page > 1 ? `/page/${page}` : ""}`;
}
export function emptyLegalUpdates(path: string): LegalUpdatesData {
  return { path, items: [], article: null, hasMore: false, services: [] };
}
// Legacy fixtures/prerender calls can still provide an array; live requests use bounded data.
export function legalUpdatesData(
  path: string,
  value: LegalUpdatesData | LegalUpdate[],
): LegalUpdatesData {
  if (!Array.isArray(value)) return value;
  const context = updateContext(path);
  const article =
    context?.kind === "article"
      ? value.find(
          (p) => p.slug === context.slug && p.region === context.region,
        ) || null
      : null;
  const filtered = value.filter(
    (p) =>
      (!context?.region || p.region === context.region) &&
      (!context?.service || p.draft.serviceSlugs.includes(context.service)) &&
      p.id !== article?.id,
  );
  const offset = ((context?.page || 1) - 1) * LEGAL_UPDATES_PAGE_SIZE;
  return {
    path,
    article,
    items: filtered.slice(offset, offset + LEGAL_UPDATES_PAGE_SIZE),
    hasMore: filtered.length > offset + LEGAL_UPDATES_PAGE_SIZE,
    services: [...new Set(filtered.flatMap((p) => p.draft.serviceSlugs))],
  };
}
