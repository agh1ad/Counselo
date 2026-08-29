export type BlogLanguage = "en" | "ar";

export function blogPath(slug: string, language: BlogLanguage = "en"): string {
  return `/blog/${language}/${slug}`;
}
