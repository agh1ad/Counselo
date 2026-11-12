import { useEffect, useRef, useState, type RefObject } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, BriefcaseBusiness, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { libraryDate, type LibraryResource } from "@/lib/library-catalog";
import { libraryContent } from "./library-content";

const PAGE_SIZE = 6;

export function LibraryCollection({ kind, items, total, lang, headingRef, loading, failed, retry, reset, filtered }: {
  kind: "article" | "work"; items: LibraryResource[]; total: number; lang: "en" | "ar";
  headingRef: RefObject<HTMLHeadingElement | null>; loading: boolean; failed: boolean;
  retry: () => void; reset: () => void; filtered: boolean;
}) {
  const c = libraryContent[lang];
  const [page, setPage] = useState(1);
  const focusHeading = useRef(false);
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PAGE_SIZE;
  const visible = items.slice(start, start + PAGE_SIZE);
  const work = kind === "work";
  const id = work ? "library-work" : "library-articles";
  const collectionHref = work ? (lang === "ar" ? "/ar/our-work" : "/our-work") : (lang === "ar" ? "/blog/ar" : "/blog");
  const Icon = work ? BriefcaseBusiness : BookOpen;
  const changePage = (next: number) => { focusHeading.current = true; setPage(next); };
  useEffect(() => {
    if (focusHeading.current) { headingRef.current?.focus(); focusHeading.current = false; }
  }, [current, headingRef]);

  return <section id={id} className={`library-collection library-collection--${kind}`} aria-labelledby={`${id}-heading`}>
    <div className="library-shell">
      <header className="library-collection__header">
        <div className="library-collection__identity"><span className="library-collection__icon"><Icon aria-hidden="true" /></span><div>
          <h2 id={`${id}-heading`} ref={headingRef} tabIndex={-1}><Link className="library-collection__title-link" href={collectionHref}>{work ? c.work : c.article}</Link></h2>
          <p>{work ? c.workDescription : c.articleDescription}</p>
        </div></div>
        <span className="library-collection__count">{c.collectionCount(items.length, total, work)}</span>
      </header>
      {failed && items.length > 0 && <div className="library-notice" role="status"><p>{c.error}</p><button type="button" onClick={retry}>{c.retry}</button></div>}
      <div className="library-resource-grid" aria-busy={loading}>
        {visible.map(item => <article key={item.id} className={`library-resource library-resource--${kind}`}>
          <div className="library-resource__top"><span>{item.context}</span><time dateTime={item.date}>{libraryDate(item.date, lang)}</time></div>
          <h3><Link href={item.href}>{item.title}</Link></h3>
          <p className="library-resource__summary">{item.summary}</p>
          <div className="library-resource__bottom"><span className="library-resource__category">{item.category || (work ? c.workSingle : c.articleSingle)}</span>
            {!work && item.readTime != null && item.readTime > 0 && <span>{item.readTime} {c.minRead}</span>}
          </div>
          <div className="library-resource__action" aria-hidden="true"><span>{work ? c.view : c.read}</span><ArrowRight className="library-arrow" /></div>
        </article>)}
      </div>
      {!visible.length && <div className="library-empty"><Search aria-hidden="true" />
        <h3>{loading ? c.loading : failed ? c.unavailable : filtered ? c.empty : c.emptyLibrary}</h3>
        {!loading && <><p>{failed ? c.error : filtered ? c.emptyText : c.emptyLibraryText}</p>
          {failed ? <button type="button" onClick={retry}>{c.retry}</button> : filtered ? <button type="button" onClick={reset}>{c.clear}</button> : <Link href={lang === "ar" ? "/ar#services" : "/#services"}>{c.services}</Link>}
        </>}
      </div>}
      {items.length > 0 && <div className="library-pagination"><p>{c.range(start + 1, start + visible.length, items.length)}</p>{pageCount > 1 && <nav aria-label={work ? c.workPages : c.articlePages}>
        <button type="button" disabled={current === 1} onClick={() => changePage(current - 1)}><ChevronLeft className="library-arrow" aria-hidden="true" />{c.previous}</button>
        <span aria-live="polite" aria-atomic="true">{c.page(current, pageCount)}</span>
        <button type="button" disabled={current === pageCount} onClick={() => changePage(current + 1)}>{c.next}<ChevronRight className="library-arrow" aria-hidden="true" /></button>
      </nav>}</div>}
    </div>
  </section>;
}
