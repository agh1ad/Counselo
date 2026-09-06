import { sanitizeRichText } from "./blog-input.js";

type ArticleBody = {
  bodyEn?: string | null; bodyAr?: string | null;
  contentEn?: Array<{ heading?: string; body: string }> | null;
  contentAr?: Array<{ heading?: string; body: string }> | null;
};
const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Full published body in the first response, through the existing editor sanitizer. */
export function renderPublicBlogBody(post: ArticleBody, language: "en" | "ar"): string {
  const raw = (language === "ar" ? post.bodyAr : post.bodyEn)?.trim();
  if (raw) {
    const html = /<\/?[a-z][a-z0-9]*(?:\s[^>]*|\s*)>/i.test(raw)
      ? raw : `<p>${escape(raw).replace(/\n/g, "<br>")}</p>`;
    return sanitizeRichText(html);
  }
  const sections = (language === "ar" ? post.contentAr : post.contentEn) ?? [];
  return sanitizeRichText(sections.map(section => `${section.heading ? `<h2>${escape(section.heading)}</h2>` : ""}<p>${escape(section.body).replace(/\n/g, "<br>")}</p>`).join(""));
}
