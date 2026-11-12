import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, BriefcaseBusiness, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchPublicJson } from "@/lib/public-api";
import { type WorkSamplePublic } from "@/lib/work-samples";
import { COUNSELO_ENTITY_IDS } from "@workspace/api-zod/browser";
import { createLibraryCatalog, DEFAULT_LIBRARY_FILTERS, filterLibraryCatalog, LIBRARY_COUNTRIES, libraryTopicOptions, type LibraryFilters, type LibraryPost } from "@/lib/library-catalog";
import { libraryContent } from "@/components/library/library-content";
import { LibraryCollection } from "@/components/library/library-collection";
import "@/components/library/library.css";

export default function LegalLibrary() {
  const { lang, isRTL } = useLanguage();
  const ar = lang === "ar";
  const c = libraryContent[lang];
  const libraryPath = ar ? "/ar/legal-library" : "/legal-library";
  const [filters, setFilters] = useState<LibraryFilters>(DEFAULT_LIBRARY_FILTERS);
  const articleHeading = useRef<HTMLHeadingElement>(null);
  const workHeading = useRef<HTMLHeadingElement>(null);
  const postQuery = useQuery<LibraryPost[]>({
    queryKey: ["blog-posts"], queryFn: () => fetchPublicJson("/api/blog/posts/discovery"),
    placeholderData: () => typeof window !== "undefined" ? window.__SSR_POSTS__ : undefined,
    staleTime: 0, refetchOnMount: "always",
  });
  const workQuery = useQuery<WorkSamplePublic[]>({
    queryKey: ["work-samples"], queryFn: () => fetchPublicJson("/api/work"),
    placeholderData: () => typeof window !== "undefined" ? window.__SSR_WORK_SAMPLES__ : undefined,
    staleTime: 0, refetchOnMount: "always",
  });
  const resources = useMemo(() => createLibraryCatalog(postQuery.data ?? [], workQuery.data ?? [], lang), [postQuery.data, workQuery.data, lang]);
  const matches = useMemo(() => filterLibraryCatalog(resources, filters, lang), [resources, filters, lang]);
  const topics = useMemo(() => libraryTopicOptions(resources, lang), [resources, lang]);
  const articles = matches.filter(item => item.kind === "article");
  const works = matches.filter(item => item.kind === "work");
  const articleCount = resources.filter(item => item.kind === "article").length;
  const workCount = resources.length - articleCount;
  const filtered = filters.query !== "" || filters.region !== "all" || filters.topic !== "all";
  const refined = filters.region !== "all" || filters.topic !== "all" || filters.sort !== "newest";
  const update = (patch: Partial<LibraryFilters>) => setFilters(current => ({ ...current, ...patch }));
  const reset = () => setFilters(DEFAULT_LIBRARY_FILTERS);
  const schemas = [{
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": `https://counselo-legal.com${libraryPath}#webpage`,
    name: c.title, description: c.description, url: `https://counselo-legal.com${libraryPath}`, inLanguage: lang,
    dateModified: "2026-11-03", isPartOf: { "@id": COUNSELO_ENTITY_IDS.website }, about: { "@id": COUNSELO_ENTITY_IDS.organization },
    hasPart: [
      { "@type": "CollectionPage", name: c.article, url: `https://counselo-legal.com${libraryPath}#library-articles` },
      { "@type": "CollectionPage", name: c.work, url: `https://counselo-legal.com${libraryPath}#library-work` },
    ],
  }, {
    "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: ar ? "الرئيسية" : "Home", item: `https://counselo-legal.com${ar ? "/ar" : "/"}` },
      { "@type": "ListItem", position: 2, name: c.title, item: `https://counselo-legal.com${libraryPath}` },
    ],
  }];

  return <div className="legal-library-page library-page" dir={isRTL ? "rtl" : "ltr"}>
    <SEOHead title={ar ? "مكتبة كاونسلو القانونية | مقالات وتحليلات ونماذج أعمال" : "CounselO Legal Library | Articles, Analysis & Work Samples"}
      description={c.description} canonical={libraryPath} noRegionPrefix sharedLanguageAlternates={{ en: "/legal-library", ar: "/ar/legal-library" }} contentLanguage={lang} schema={schemas} />
    <section className="library-hero" aria-labelledby="library-title">
      <div className="library-shell">
        <div className="library-hero__intro">
          <div><h1 id="library-title">{c.title}</h1><p className="library-hero__lead">{c.intro}</p><p className="library-hero__description">{c.description}</p></div>
          <nav className="library-hero__index" aria-label={c.browse}>
            <a href="#library-articles-heading"><BookOpen aria-hidden="true" /><span><strong>{c.article}</strong><small>{c.browseArticles}</small></span><b>{articleCount}</b><ArrowRight className="library-arrow" aria-hidden="true" /></a>
            <a href="#library-work-heading"><BriefcaseBusiness aria-hidden="true" /><span><strong>{c.work}</strong><small>{c.browseWork}</small></span><b>{workCount}</b><ArrowRight className="library-arrow" aria-hidden="true" /></a>
          </nav>
        </div>
        <form role="search" className="library-search" onSubmit={event => { event.preventDefault(); (articles.length || !works.length ? articleHeading : workHeading).current?.focus(); }}>
          <label htmlFor="library-query">{c.search}</label>
          <div className="library-search__field"><Search aria-hidden="true" /><input id="library-query" type="search" value={filters.query} placeholder={c.placeholder} aria-describedby="library-search-hint" onChange={event => update({ query: event.target.value })} />
            {filters.query && <button type="button" className="library-search__clear" aria-label={c.clearSearch} onClick={() => update({ query: "" })}><X aria-hidden="true" /></button>}
            <button className="library-search__submit" type="submit">{c.search}</button>
          </div>
          <p id="library-search-hint">{c.searchHint}</p>
        </form>
      </div>
    </section>

    <div id="library-results" className="library-results">
      <div className="library-toolbar library-shell">
        <details className="library-refine">
          <summary><SlidersHorizontal aria-hidden="true" /><span>{c.refine}</span>{refined && <span className="library-refine__active">{c.filtersActive}</span>}<ChevronDown aria-hidden="true" /></summary>
          <div className="library-filters">
            <div><label htmlFor="library-country">{c.country}</label><select id="library-country" value={filters.region} onChange={event => update({ region: event.target.value as LibraryFilters["region"] })}>
              <option value="all">{c.allCountries}</option>{LIBRARY_COUNTRIES.map(item => <option key={item.key} value={item.key}>{item[lang]}</option>)}<option value="general">{c.general}</option>
            </select></div>
            <div><label htmlFor="library-topic">{c.topic}</label><select id="library-topic" value={filters.topic} onChange={event => update({ topic: event.target.value })}>
              <option value="all">{c.allTopics}</option>{topics.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select></div>
            <div><label htmlFor="library-sort">{c.sort}</label><select id="library-sort" value={filters.sort} onChange={event => update({ sort: event.target.value as LibraryFilters["sort"] })}>
              <option value="newest">{c.newest}</option><option value="oldest">{c.oldest}</option><option value="title">{c.titleSort}</option>
            </select></div>
          </div>
        </details>
        <div className="library-toolbar__status"><p role="status" aria-live="polite" aria-atomic="true">{postQuery.isLoading || workQuery.isLoading ? c.loading : c.searchResults(articles.length, works.length)}</p>{(filtered || refined) && <button type="button" className="library-reset" onClick={reset}>{c.clear}</button>}</div>
      </div>
      <LibraryCollection key={`article:${JSON.stringify(filters)}`} kind="article" items={articles} total={articleCount} lang={lang} headingRef={articleHeading}
        loading={postQuery.isLoading} failed={postQuery.isError} retry={() => { void postQuery.refetch(); }} reset={reset} filtered={filtered} />
      <LibraryCollection key={`work:${JSON.stringify(filters)}`} kind="work" items={works} total={workCount} lang={lang} headingRef={workHeading}
        loading={workQuery.isLoading} failed={workQuery.isError} retry={() => { void workQuery.refetch(); }} reset={reset} filtered={filtered} />
    </div>

    <section id="publishing-standard" className="library-standard library-shell"><h2>{c.standard}</h2><p>{c.standardText}</p></section>
  </div>;
}
