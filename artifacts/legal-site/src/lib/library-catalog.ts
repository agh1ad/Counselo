import { ARTICLE_CONTEXT, articleContextRegion, blogPath, SERVICE_REGISTRY } from "@workspace/api-zod/browser";
import { readingSearchKey } from "./article-reading";
import { REGIONAL_SERVICE_CLUSTERS } from "./regional-service-catalog";
import { workSamplePath, type WorkSamplePublic } from "./work-samples";
import { workJurisdictionRegion } from "./work-jurisdiction";

export type LibraryPost = NonNullable<Window["__SSR_POSTS__"]>[number] & { jurisdiction?: string | null; bilingual?: boolean };
export type LibraryKind = "all" | "article" | "work";
export type LibraryRegion = "all" | "sa" | "syr" | "uae" | "general";
export type LibraryFilters = { query: string; kind: LibraryKind; region: LibraryRegion; topic: string; sort: "newest" | "oldest" | "title" };
export const DEFAULT_LIBRARY_FILTERS: LibraryFilters = { query: "", kind: "all", region: "all", topic: "all", sort: "newest" };
export const LIBRARY_PAGE_SIZE = 9;
export const LIBRARY_COUNTRIES = [
  { key: "sa", en: "Saudi Arabia", ar: "السعودية" },
  { key: "syr", en: "Syria", ar: "سوريا" },
  { key: "uae", en: "United Arab Emirates", ar: "الإمارات" },
] as const;

export type LibraryResource = {
  id: string; kind: Exclude<LibraryKind, "all">; title: string; summary: string; href: string;
  date: string; readTime?: number; region: Exclude<LibraryRegion, "all">;
  context: string; category: string; topics: string[]; searchKey: string;
};

const topicSlugs = (slugs: readonly string[] = []) => [...new Set(slugs.flatMap(slug => {
  const service = SERVICE_REGISTRY.find(item => item.slug === slug);
  return service ? [service.clusterSlug] : [];
}))];

function searchKey(values: Array<string | null | undefined>, topics: string[]) {
  const labels = REGIONAL_SERVICE_CLUSTERS.filter(item => topics.includes(item.clusterSlug)).flatMap(item => [item.titleEn, item.titleAr]);
  return readingSearchKey([...values, ...labels].filter(Boolean).join(" "));
}

export function createLibraryCatalog(posts: LibraryPost[], samples: WorkSamplePublic[], lang: "en" | "ar"): LibraryResource[] {
  const ar = lang === "ar";
  const regionLabel = (region: LibraryRegion) => {
    const country = LIBRARY_COUNTRIES.find(item => item.key === region);
    return country ? country[lang] : ar ? "سياق عام" : "General context";
  };
  const articles: LibraryResource[] = posts
    .filter(post => post.published !== false && post.bilingual !== false && (ar ? post.titleAr : post.titleEn)?.trim())
    .map(post => {
      const context = ARTICLE_CONTEXT[post.slug];
      const region = articleContextRegion(post) ?? "general";
      const topics = topicSlugs(context ? [context.serviceSlug] : post.relatedServiceSlugs);
      return {
        id: `article:${post.slug}`, kind: "article", title: ar ? post.titleAr : post.titleEn,
        summary: (ar ? post.excerptAr : post.excerptEn) || "", href: blogPath(post.slug, lang),
        date: post.date, readTime: post.readTime, region, context: regionLabel(region),
        category: (ar ? context?.categoryAr ?? post.categoryAr : context?.categoryEn ?? post.categoryEn) || "", topics,
        searchKey: searchKey([post.titleEn, post.titleAr, post.excerptEn, post.excerptAr, post.categoryEn, post.categoryAr,
          LIBRARY_COUNTRIES.find(item => item.key === region)?.en, LIBRARY_COUNTRIES.find(item => item.key === region)?.ar], topics),
      };
    });
  const work: LibraryResource[] = samples
    .filter(sample => sample.published !== false && (ar ? sample.titleAr : sample.titleEn)?.trim())
    .map(sample => {
      const region = workJurisdictionRegion(sample.jurisdictionEn, sample.jurisdictionAr) ?? "general";
      const topics = topicSlugs(sample.relatedServiceSlugs);
      return {
        id: `work:${sample.slug}`, kind: "work", title: ar ? sample.titleAr : sample.titleEn,
        summary: (ar ? sample.summaryAr : sample.summaryEn) || "", href: workSamplePath(sample, ar), date: sample.date,
        region, context: (ar ? sample.jurisdictionAr : sample.jurisdictionEn) || regionLabel(region),
        category: (ar ? sample.workTypeAr : sample.workTypeEn) || "", topics,
        searchKey: searchKey([sample.titleEn, sample.titleAr, sample.summaryEn, sample.summaryAr, sample.workTypeEn,
          sample.workTypeAr, sample.jurisdictionEn, sample.jurisdictionAr], topics),
      };
    });
  // Stable unique keys also prevent duplicated records from inflating result counts.
  return [...new Map([...articles, ...work].map(item => [item.id, item])).values()];
}

export function filterLibraryCatalog(resources: LibraryResource[], filters: LibraryFilters, lang: "en" | "ar") {
  const tokens = readingSearchKey(filters.query).split(/\s+/).filter(Boolean);
  const dateValue = (date: string) => Number.isFinite(Date.parse(date)) ? Date.parse(date) : 0;
  return resources.filter(item => (filters.kind === "all" || item.kind === filters.kind)
    && (filters.region === "all" || item.region === filters.region)
    && (filters.topic === "all" || item.topics.includes(filters.topic))
    && tokens.every(token => item.searchKey.includes(token)))
    .sort((a, b) => (filters.sort === "title" ? a.title.localeCompare(b.title, lang)
      : (dateValue(b.date) - dateValue(a.date)) * (filters.sort === "oldest" ? -1 : 1)) || a.id.localeCompare(b.id));
}

export function libraryTopicOptions(resources: LibraryResource[], lang: "en" | "ar") {
  return REGIONAL_SERVICE_CLUSTERS.filter(topic => resources.some(item => item.topics.includes(topic.clusterSlug)))
    .map(topic => ({ value: topic.clusterSlug, label: lang === "ar" ? topic.titleAr : topic.titleEn }))
    .sort((a, b) => a.label.localeCompare(b.label, lang));
}

export function libraryDate(date: string, lang: "en" | "ar") {
  const parsed = new Date(date);
  return Number.isFinite(parsed.getTime()) ? new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(parsed) : "";
}
