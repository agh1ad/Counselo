import { z } from "zod";
export const legalUpdatesDefaultReviewer = {
  en: "Lawyer and Legal Counsel Omar Baghdadi",
  ar: "المحامي والمستشار القانوني عمر البغدادي",
};
export const updateRegions = ["sa", "uae", "syr"] as const;
export type UpdateRegion = (typeof updateRegions)[number];
export const updateRegionNames = {
  sa: { en: "Saudi Arabia", ar: "السعودية" },
  uae: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
  syr: { en: "Syria", ar: "سوريا" },
};
export const updateSections = [
  "changed",
  "effective",
  "affected",
  "requirements",
  "practical",
  "actions",
  "limitations",
] as const;
export const updateSectionLabels = {
  en: [
    "What changed",
    "Effective date",
    "Who is affected",
    "Key requirements",
    "What this means in practice",
    "Recommended actions",
    "Scope and uncertainties",
  ],
  ar: [
    "ما الذي تغيّر؟",
    "تاريخ النفاذ",
    "الفئات المعنية",
    "المتطلبات الأساسية",
    "الأثر العملي",
    "الإجراءات المقترحة",
    "النطاق والمسائل غير المحسومة",
  ],
};
const paragraph = z.string().trim().min(1).max(6000);
const localized = z.object({
  title: z.string().trim().min(10).max(180),
  summary: z.string().trim().min(30).max(500),
  changed: paragraph,
  effective: paragraph,
  affected: paragraph,
  requirements: paragraph,
  practical: paragraph,
  actions: paragraph,
  limitations: paragraph,
});
export const updateDraftSchema = z
  .object({
    relevant: z.boolean(),
    reason: paragraph,
    instrument: paragraph,
    sourceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    effectiveDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .nullable(),
    practiceArea: z.string().min(2).max(100),
    serviceSlugs: z.array(z.string().regex(/^[a-z0-9-]+$/)).max(5),
    evidence: z
      .array(
        z.object({ claim: paragraph, quote: z.string().min(15).max(1500) }),
      )
      .min(1)
      .max(15),
    en: localized,
    ar: localized,
  })
  .strict();
export type UpdateDraft = z.infer<typeof updateDraftSchema>;
export interface LegalUpdate {
  id: string;
  slug: string;
  region: UpdateRegion;
  sourceUrl: string;
  sourceName: string;
  draft: UpdateDraft;
  publishedAt: string;
  modifiedAt: string;
  reviewer: string;
  editorial?: UpdateEditorial;
  corrections?: Array<{ date: string; en: string; ar: string }>;
  sourceCheckedAt?: string;
  sourceCheckStatus?: "unchanged" | "changed" | "unavailable";
}
export function legalUpdatesPath(
  region: UpdateRegion,
  lang: "en" | "ar",
  slug?: string,
) {
  return `/${region}${lang === "ar" ? "/ar" : ""}/legal-updates${slug ? `/${slug}` : ""}`;
}

const xml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
export function updatesSitemap(
  updates: Array<
    Pick<LegalUpdate, "slug" | "region" | "modifiedAt"> & {
      services?: string[];
    }
  >,
) {
  const origin = "https://counselo-legal.com";
  const entries = updates.flatMap((p) =>
    (["en", "ar"] as const).map(
      (lang) =>
        `<url><loc>${origin}${legalUpdatesPath(p.region, lang, p.slug)}</loc><lastmod>${xml(p.modifiedAt)}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${origin}${legalUpdatesPath(p.region, "en", p.slug)}"/><xhtml:link rel="alternate" hreflang="ar" href="${origin}${legalUpdatesPath(p.region, "ar", p.slug)}"/></url>`,
    ),
  );
  const practiceHubs = new Set<string>();
  for (const p of updates)
    for (const service of p.services || [])
      for (const lang of ["en", "ar"] as const)
        practiceHubs.add(
          `${legalUpdatesPath(p.region, lang)}/practice/${service}`,
        );
  for (const path of practiceHubs)
    entries.push(`<url><loc>${origin}${xml(path)}</loc></url>`);
  for (const r of updateRegions)
    for (const lang of ["en", "ar"] as const)
      entries.push(
        `<url><loc>${origin}${legalUpdatesPath(r, lang)}</loc></url>`,
      );
  for (const p of ["/legal-updates", "/ar/legal-updates"])
    entries.push(`<url><loc>${origin}${p}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>`;
}

export const updateEditorialSchema = z
  .object({
    status: z.enum(["current", "superseded"]).default("current"),
    successorSlug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .nullable()
      .default(null),
    correctionEn: z.string().trim().max(2000).default(""),
    correctionAr: z.string().trim().max(2000).default(""),
    relatedMatterPaths: z
      .array(
        z.string().regex(/^\/(sa|uae|syr)\/services\/[a-z0-9-]+\/[a-z0-9-]+$/),
      )
      .max(5)
      .default([]),
    imageUrl: z.string().url().startsWith("https://").nullable().default(null),
    imageAltEn: z.string().trim().max(200).default(""),
    imageAltAr: z.string().trim().max(200).default(""),
  })
  .strict();
export type UpdateEditorial = z.infer<typeof updateEditorialSchema>;

export const LEGAL_UPDATES_SITEMAP_CHUNK = 10000;
export function legalUpdatesSitemapDocument(
  rows: Parameters<typeof updatesSitemap>[0],
  part?: number,
): string | null {
  if (part !== undefined) {
    if (
      !Number.isInteger(part) ||
      part < 1 ||
      part > Math.ceil(rows.length / LEGAL_UPDATES_SITEMAP_CHUNK)
    )
      return null;
    return updatesSitemap(
      rows.slice(
        (part - 1) * LEGAL_UPDATES_SITEMAP_CHUNK,
        part * LEGAL_UPDATES_SITEMAP_CHUNK,
      ),
    );
  }
  if (rows.length <= LEGAL_UPDATES_SITEMAP_CHUNK) return updatesSitemap(rows);
  const entries = Array.from(
    { length: Math.ceil(rows.length / LEGAL_UPDATES_SITEMAP_CHUNK) },
    (_, i) =>
      `<sitemap><loc>https://counselo-legal.com/sitemap-legal-updates-${i + 1}.xml</loc></sitemap>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</sitemapindex>`;
}
