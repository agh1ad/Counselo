import {
  blogPath,
  hasQualityBilingualBlogContent,
  type BlogLanguage,
  type BilingualBlogContent,
} from "@workspace/api-zod";

type BlogRoutePost = BilingualBlogContent & { slug: string };

export type BlogRouteDecision =
  | { action: "notfound" }
  | { action: "redirect"; to: string; status: 301 | 302 }
  | { action: "serve"; route: string };

/**
 * Keep the production SSR routes aligned with the canonical URLs emitted by
 * the blog UI, sitemap, Open Graph tags, and hreflang metadata.
 */
export function resolveBlogRoute(
  post: BlogRoutePost | null,
  requestedLanguage?: BlogLanguage,
): BlogRouteDecision {
  if (!post) return { action: "notfound" };

  const bilingual = hasQualityBilingualBlogContent(post);
  if (requestedLanguage) {
    if (!bilingual) {
      return {
        action: "redirect",
        to: blogPath(post.slug),
        status: 302,
      };
    }
    return {
      action: "serve",
      route: blogPath(post.slug, requestedLanguage),
    };
  }

  if (bilingual) {
    return {
      action: "redirect",
      to: blogPath(post.slug, "en"),
      status: 301,
    };
  }

  return { action: "serve", route: blogPath(post.slug) };
}
