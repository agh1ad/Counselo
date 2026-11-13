type InventoryIssue = { route: string; issue: string };

/** HTML completeness is separate from the HTTP document checks in sitemap:validate. */
export function reconcileSeoLedgerInventory(sitemapRoutes: ReadonlySet<string>, renderedRoutes: ReadonlySet<string>) {
  const documentRoutes: string[] = [];
  const issues: InventoryIssue[] = [];
  for (const route of sitemapRoutes) {
    if (/^\/documents(?:\/|$)/.test(route)) {
      const slug = route.match(/^\/documents\/([a-z0-9]+(?:-[a-z0-9]+)*)\.pdf$/)?.[1];
      if (!slug) {
        issues.push({ route, issue: "Invalid canonical work document URL in sitemap" });
      } else if (!renderedRoutes.has(`/our-work/${slug}`) && !renderedRoutes.has(`/ar/our-work/${slug}`)) {
        issues.push({ route, issue: "PDF sitemap URL has no validated work page" });
      } else {
        documentRoutes.push(route);
      }
    } else if (!renderedRoutes.has(route)) {
      issues.push({ route, issue: "Sitemap URL was not validated" });
    }
  }
  for (const route of renderedRoutes) {
    if (!sitemapRoutes.has(route)) issues.push({ route, issue: "Rendered indexable route is absent from sitemaps" });
  }
  return { documentRoutes: documentRoutes.sort(), issues };
}
