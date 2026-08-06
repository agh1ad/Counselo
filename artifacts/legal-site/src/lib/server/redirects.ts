export type RedirectResult =
  | { action: "redirect"; status: 301; to: string }
  | { action: "none" };

export interface WorkLanguageInput {
  slug: string;
  titleEn?: string;
  titleAr?: string;
}

export type WorkLanguageDecision =
  | { action: "serve" }
  | { action: "redirect"; to: string }
  | { action: "notfound" };

/**
 * Pure redirect policy resolution for legacy regional paths.
 * Returns a redirect target or "none".
 */
export function resolveRegionalRedirect(urlPath: string): RedirectResult {
  const cleanPath = urlPath.replace(/\/$/, "");

  // Legacy blog index redirects
  if (
    cleanPath === "/sa/blog" ||
    cleanPath === "/syr/blog" ||
    cleanPath === "/sa/ar/blog" ||
    cleanPath === "/syr/ar/blog"
  ) {
    return { action: "redirect", status: 301, to: "/blog" };
  }

  // Legacy blog post redirects
  const blogMatch = cleanPath.match(/^\/(?:sa|syr)(?:\/ar)?\/blog\/([^/]+)$/);
  if (blogMatch && blogMatch[1]) {
    return {
      action: "redirect",
      status: 301,
      to: `/blog/${encodeURIComponent(blogMatch[1])}`,
    };
  }

  // Legacy work index redirects
  if (cleanPath === "/sa/our-work" || cleanPath === "/syr/our-work") {
    return { action: "redirect", status: 301, to: "/our-work" };
  }
  if (cleanPath === "/sa/ar/our-work" || cleanPath === "/syr/ar/our-work") {
    return { action: "redirect", status: 301, to: "/ar/our-work" };
  }

  // Legacy work sample detail redirects
  const workEnMatch = cleanPath.match(/^\/(?:sa|syr)\/our-work\/([^/]+)$/);
  if (workEnMatch && workEnMatch[1]) {
    return {
      action: "redirect",
      status: 301,
      to: `/our-work/${encodeURIComponent(workEnMatch[1])}`,
    };
  }

  const workArMatch = cleanPath.match(/^\/(?:sa|syr)\/ar\/our-work\/([^/]+)$/);
  if (workArMatch && workArMatch[1]) {
    return {
      action: "redirect",
      status: 301,
      to: `/ar/our-work/${encodeURIComponent(workArMatch[1])}`,
    };
  }

  return { action: "none" };
}

/**
 * Pure routing decision for work sample language handling.
 * Determines whether to serve the page, redirect to the other language, or 404.
 */
export function resolveWorkLanguage(
  sample: WorkLanguageInput | null,
  language: "ar" | "en",
): WorkLanguageDecision {
  if (!sample) return { action: "notfound" };
  // Arabic URL requested but record has no Arabic title — redirect to English
  if (language === "ar" && !sample.titleAr && sample.titleEn) {
    return { action: "redirect", to: `/our-work/${encodeURIComponent(sample.slug)}` };
  }
  // English URL requested but record has no English title — redirect to Arabic
  if (language === "en" && !sample.titleEn && sample.titleAr) {
    return { action: "redirect", to: `/ar/our-work/${encodeURIComponent(sample.slug)}` };
  }
  return { action: "serve" };
}
