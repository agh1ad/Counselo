import { useEffect, useState } from "react";

type Heading = { id: string; title: string };
/** Index the rendered article, including CMS headings, without altering its text. */
export function PageContents({ isArabic, pageKey, selector = "#main-content h2" }: { isArabic: boolean; pageKey: string; selector?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  useEffect(() => {
    const next = Array.from(document.querySelectorAll<HTMLElement>(selector))
      .filter(heading => !heading.closest("aside, nav, details"))
      .map((heading, index) => {
        if (!heading.id) {
          const base = `reading-section-${index + 1}`;
          let id = base;
          let suffix = 1;
          while (document.getElementById(id)) id = `${base}-${suffix++}`;
          heading.id = id;
        }
        return { id: heading.id, title: heading.textContent?.trim() ?? "" };
      }).filter(heading => heading.title);
    setHeadings(next);
  }, [pageKey, selector, isArabic]);
  if (!headings.length) return null;
  return <details className="page-contents">
    <summary>{isArabic ? "انتقل إلى قسم" : "Jump to a section"}</summary>
    <nav aria-label={isArabic ? "محتويات الصفحة" : "Page contents"}>
      <ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol>
    </nav>
  </details>;
}
