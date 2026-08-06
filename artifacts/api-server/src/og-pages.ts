/**
 * DEMOTED & REMOVED:
 * HTML rendering, OG tags, sitemap, feed, and page redirects have been demoted
 * and removed from api-server in favor of legal-site ssr-server, which is the single
 * authoritative production web serving entry point.
 */
import type { Express } from "express";

export function registerOgPageRoutes(_app: Express): void {
  // Intentionally empty. API server is strictly for /api/* routes.
}
