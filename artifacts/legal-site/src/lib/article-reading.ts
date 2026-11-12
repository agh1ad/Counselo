/** Remove presentation-only repetition, leaving authored analysis and citations intact.
 * This is not an HTML sanitizer; published HTML follows the existing CMS boundary.
 * Identical on server and client, with no DOM dependency.
 */
export function prepareArticleHtml(html: string | undefined, title: string): string {
  if (!html) return "";
  const text = (value: string) => value.replace(/<[^>]*>/g, "").replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  const withoutEmptyParagraphs = html.replace(/<p\b[^>]*>(?:\s|&nbsp;|&#160;|<br\s*\/?\s*>)*<\/p>/gi, "");
  const cleaned = withoutEmptyParagraphs.replace(/^\s*<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/i, (heading, _level, inner) => text(inner) === text(title) ? "" : heading);
  // IDs belong in the HTML itself: React Query refreshes can replace innerHTML
  // and remove IDs added later by a table-of-contents effect.
  const usedIds = new Set([...cleaned.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]));
  let index = 0;
  return cleaned.replace(/<h([23])\b([^>]*)>/gi, (heading, level, attributes) => {
    if (/\bid\s*=/.test(attributes)) return heading;
    let id: string;
    do { id = `article-section-${++index}`; } while (usedIds.has(id));
    usedIds.add(id);
    return `<h${level}${attributes} id="${id}">`;
  });
}

/** Search is forgiving of Arabic vowel marks and common letter variants. */
export function readingSearchKey(text: string): string {
  return text.normalize("NFKD").replace(/[\u064B-\u065F\u0670\u0640]/g, "").replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").toLocaleLowerCase().trim();
}
