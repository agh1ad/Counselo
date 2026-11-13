import { useId } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { COUNSELO_PLATFORM_POSITIONING } from "@workspace/api-zod/browser";
import { fetchPublicJson } from "@/lib/public-api";
import type { WorkSamplePublic } from "@/lib/work-samples";
import { countPublishedPortfolio, COUNSELO_SERVICE_COUNTRY_COUNT, COUNSELO_SERVICE_LANGUAGE_COUNT } from "@/lib/portfolio-facts";
import "./platform-facts.css";

const countryNamesAr: Record<string, string> = {
  "Saudi Arabia": "السعودية",
  "Syria": "سوريا",
  "United Arab Emirates": "الإمارات",
};
const languageNamesAr: Record<string, string> = { Arabic: "العربية", English: "الإنجليزية" };

export function PlatformFacts({ isArabic, embedded = false, className = "" }: {
  isArabic: boolean;
  embedded?: boolean;
  className?: string;
}) {
  const headingId = useId();
  const initialWork = typeof window !== "undefined" ? window.__SSR_WORK_SAMPLES__ : undefined;
  const localPreview = typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const { data: workSamples } = useQuery<WorkSamplePublic[]>({
    queryKey: ["work-samples"],
    queryFn: () => fetchPublicJson<WorkSamplePublic[]>("/api/work"),
    initialData: initialWork,
    enabled: !localPreview || !initialWork?.length,
    staleTime: 0,
    refetchOnMount: "always",
    refetchInterval: 60_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: "always",
  });
  // SSR uses App's preloaded query cache. On a failed refresh, React Query
  // retains that inventory; unavailable data must never become a zero claim.
  const publishedCount = countPublishedPortfolio(workSamples);
  const hasPublishedCount = publishedCount !== undefined && publishedCount > 0;
  const locale = isArabic ? "ar" : "en";
  const Heading = embedded ? "h3" : "h2";
  const countries = COUNSELO_PLATFORM_POSITIONING.jurisdictions.map(name => isArabic ? countryNamesAr[name] ?? name : name).join(" · ");
  const languages = COUNSELO_PLATFORM_POSITIONING.languages.map(name => isArabic ? languageNamesAr[name] ?? name : name).join(" · ");

  return <section className={`platform-facts${embedded ? " platform-facts--embedded" : ""} ${className}`} dir={isArabic ? "rtl" : "ltr"} aria-labelledby={headingId}>
    <Heading id={headingId} className="platform-facts__heading">{isArabic ? "أعمال منشورة ونطاق خدمة إقليمي" : "Published work and regional service"}</Heading>
    <dl className="platform-facts__grid">
      <div className="platform-facts__item">
        <dt>{isArabic ? "نماذج أعمال في مكتبة المنصة" : "Work samples in our public library"}</dt>
        <dd className={`platform-facts__value${hasPublishedCount ? "" : " platform-facts__value--link"}`}>
          <Link href={isArabic ? "/ar/our-work" : "/our-work"}>{hasPublishedCount ? publishedCount.toLocaleString(locale) : (isArabic ? "استعرض الأعمال" : "Explore Our Work")}</Link>
        </dd>
        <dd className="platform-facts__detail">{isArabic ? "دراسات وملفات منشورة مع بيان أصحابها" : "Published studies and documents with author credits"}</dd>
      </div>
      <div className="platform-facts__item">
        <dt>{isArabic ? "دول ضمن نطاق خدماتنا" : "Countries served"}</dt>
        <dd className="platform-facts__value">{COUNSELO_SERVICE_COUNTRY_COUNT.toLocaleString(locale)}</dd>
        <dd className="platform-facts__detail">{countries}</dd>
      </div>
      <div className="platform-facts__item">
        <dt>{isArabic ? "لغتان لتقديم الخدمة" : "Service languages"}</dt>
        <dd className="platform-facts__value">{COUNSELO_SERVICE_LANGUAGE_COUNT.toLocaleString(locale)}</dd>
        <dd className="platform-facts__detail">{languages}</dd>
      </div>
    </dl>
  </section>;
}
