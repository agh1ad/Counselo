const LEGAL_UPDATE_PAGE_PATH =
  /^\/(?:ar\/)?legal-updates(?:\/.*)?$|^\/(?:sa|uae|syr)(?:\/ar)?\/legal-updates(?:\/.*)?$|^\/(?:sa|uae|syr)(?:\/ar)?(?:\/services\/[^/]+(?:\/[^/]+)?)?$/;

export function isDiscoveryPath(path: string): boolean {
  return (
    path === "/sitemap.xml" ||
    path === "/sitemap-blog.xml" ||
    path === "/sitemap-work.xml" ||
    path === "/feed.xml" ||
    path === "/legal-updates-sitemap" ||
    /^\/sitemap-legal-updates(?:-[1-9]\d*)?\.xml$/.test(path)
  );
}

export function publicCacheControl(path: string): string {
  return isDiscoveryPath(path)
    ? "public, max-age=0, s-maxage=300, stale-while-revalidate=600, must-revalidate"
    : "public, max-age=0, s-maxage=15, stale-while-revalidate=30, must-revalidate";
}

export function isDatabaseBackedPublicApiPath(path: string): boolean {
  return (
    path === "/blog/posts" ||
    path === "/blog/posts/discovery" ||
    path.startsWith("/blog/posts/") ||
    path === "/work" ||
    /^\/work\/[^/]+$/.test(path) ||
    /^\/work\/[^/]+\/file$/.test(path) ||
    path === "/legal-updates" ||
    path === "/legal-updates-sitemap"
  );
}

export function isCacheablePublicDocumentPath(path: string): boolean {
  return /^\/documents\/[^/]+\.pdf$/.test(path);
}

export function isCacheablePublicPagePath(path: string): boolean {
  return (
    path === "/blog" ||
    path === "/blog/ar" ||
    /^\/blog\/[^/]+$/.test(path) ||
    /^\/(?:(?:sa|syr|uae)\/(?:ar\/)?blog|ar\/blog)\/[^/]+$/.test(path) ||
    path.startsWith("/blog/en/") ||
    path.startsWith("/blog/ar/") ||
    path === "/our-work" ||
    path === "/ar/our-work" ||
    path.startsWith("/our-work/") ||
    path.startsWith("/ar/our-work/") ||
    LEGAL_UPDATE_PAGE_PATH.test(path) ||
    isDiscoveryPath(path)
  );
}