import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  legalUpdatesPath,
  updateRegionNames,
  type LegalUpdatesData,
  type LegalUpdateCard,
  legalUpdatesData,
  type UpdateRegion,
} from "@workspace/api-zod/browser";
import { fetchPublicJson } from "@/lib/public-api";
declare global {
  interface Window {
    __SSR_LEGAL_UPDATES__?: LegalUpdatesData;
  }
}
export function useLegalUpdates() {
  const [path] = useLocation();
  return useQuery<LegalUpdatesData>({
    queryKey: ["legal-updates", path],
    queryFn: () =>
      fetchPublicJson(`/api/legal-updates?path=${encodeURIComponent(path)}`),
    placeholderData: () => {
      const snapshot =
        typeof window !== "undefined"
          ? window.__SSR_LEGAL_UPDATES__
          : undefined;
      return snapshot?.path === path
        ? legalUpdatesData(path, snapshot)
        : undefined;
    },
    staleTime: 30_000,
  });
}
export function LegalUpdatesFeed({
  region,
  isArabic,
  serviceSlug,
  limit = 3,
  items,
  related = false,
}: {
  region?: UpdateRegion;
  isArabic: boolean;
  serviceSlug?: string;
  limit?: number;
  items?: LegalUpdateCard[];
  related?: boolean;
}) {
  const { data, isError } = useLegalUpdates();
  const lang = isArabic ? "ar" : "en";
  const updates = (items || data?.items || [])
    .filter(
      (p) =>
        (!region || p.region === region) &&
        (!serviceSlug || p.draft.serviceSlugs.includes(serviceSlug)),
    )
    .slice(0, limit);
  if ((serviceSlug || related) && updates.length === 0) return null;
  return (
    <section
      className="mx-auto max-w-6xl px-6 py-14"
      dir={isArabic ? "rtl" : "ltr"}
      aria-label={isArabic ? "المستجدات القانونية" : "Legal updates"}
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary mb-2">
            {isArabic
              ? "تشريعات وتطورات قانونية"
              : "Law & regulatory developments"}
          </p>
          <h2 className="text-2xl font-serif">
            {related
              ? isArabic
                ? "مستجدات ذات صلة"
                : "Related legal updates"
              : region
                ? `${isArabic ? "المستجدات القانونية في" : "Latest legal updates in"} ${updateRegionNames[region][lang]}`
                : isArabic
                  ? "جميع المستجدات القانونية"
                  : "All legal updates"}
          </h2>
        </div>
        <Link
          className="text-primary underline underline-offset-4"
          href={
            region
              ? legalUpdatesPath(region, lang)
              : `${isArabic ? "/ar" : ""}/legal-updates`
          }
        >
          {isArabic ? "عرض جميع المستجدات ←" : "View all updates →"}
        </Link>
      </div>
      {updates.map((p) => (
        <article
          key={p.id}
          className="grid gap-3 py-5 border-b border-border md:grid-cols-[9rem_1fr] "
        >
          <time
            className="text-sm text-muted-foreground"
            dateTime={p.publishedAt}
          >
            {new Date(p.publishedAt).toLocaleDateString(
              lang === "ar" ? "ar-AE" : "en-GB",
              {
                timeZone: "UTC",
                year: "numeric",
                month: "short",
                day: "numeric",
              },
            )}
          </time>
          <div>
            {!region && (
              <p className="text-xs text-primary mb-1">
                {updateRegionNames[p.region][lang]}
              </p>
            )}
            <Link
              className="font-medium text-lg hover:text-primary"
              href={legalUpdatesPath(p.region, lang, p.slug)}
            >
              {p.draft[lang].title}
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              {p.draft[lang].summary}
            </p>
          </div>
        </article>
      ))}
      {!updates.length && (
        <p className="py-6 text-muted-foreground">
          {isError
            ? isArabic
              ? "تعذّر تحميل المستجدات حاليًا."
              : "Updates are temporarily unavailable."
            : isArabic
              ? "تظهر المستجدات هنا بعد التحقق من مصادرها ومراجعتها تحريريًا."
              : "Updates appear here after source verification and editorial review."}
        </p>
      )}
    </section>
  );
}
