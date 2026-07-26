import type { NextFunction, Request, Response } from "express";

/**
 * Permanently redirect www.counselo-legal.com → https://counselo-legal.com.
 * Preserves the full path and query string. Must run before any route handler
 * so crawlers and browsers always land on the apex hostname.
 */
export function redirectWww(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.hostname === "www.counselo-legal.com") {
    const qs = req.url.slice(req.path.length); // query string, may be ""
    res.redirect(301, `https://counselo-legal.com${req.path}${qs}`);
    return;
  }
  next();
}

/**
 * Permanently redirect trailing-slash GET/HEAD public URLs to their slashless
 * canonical (e.g. /blog/ → /blog, /our-work/slug/ → /our-work/slug).
 *
 * Leaves untouched:
 *   - The root "/" (already slashless by definition)
 *   - /api/* routes (changing those would break REST clients)
 *   - Non-idempotent methods (POST, PUT, PATCH, DELETE) — the redirect would
 *     silently drop the request body and change semantics
 */
export function redirectTrailingSlash(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (
    (req.method === "GET" || req.method === "HEAD") &&
    req.path.length > 1 &&
    req.path.endsWith("/") &&
    !req.path.startsWith("/api/")
  ) {
    const qs = req.url.slice(req.path.length);
    res.redirect(301, `${req.path.slice(0, -1)}${qs}`);
    return;
  }
  next();
}
