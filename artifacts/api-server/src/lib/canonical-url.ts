import type { NextFunction, Request, Response } from "express";

export const CANONICAL_HOST = "counselo-legal.com";

interface CanonicalRequest {
  method: string;
  hostname: string;
  originalUrl: string;
}

/**
 * Return the canonical destination for public page requests.
 *
 * - The www hostname permanently consolidates into the apex hostname.
 * - Public GET/HEAD paths use the site's established slashless URL format.
 * - API and non-idempotent requests are never rewritten.
 */
export function canonicalDestination(req: CanonicalRequest): string | null {
  const method = req.method.toUpperCase();
  if (method !== "GET" && method !== "HEAD") return null;

  const queryStart = req.originalUrl.indexOf("?");
  const pathAndMaybeQuery =
    queryStart === -1 ? req.originalUrl : req.originalUrl.slice(0, queryStart);
  const query =
    queryStart === -1 ? undefined : req.originalUrl.slice(queryStart + 1);
  const isApi = pathAndMaybeQuery === "/api" || pathAndMaybeQuery.startsWith("/api/");
  const slashlessPath =
    !isApi && pathAndMaybeQuery.length > 1
      ? pathAndMaybeQuery.replace(/\/+$/, "")
      : pathAndMaybeQuery;
  const normalizedUrl = `${slashlessPath}${query === undefined ? "" : `?${query}`}`;

  if (req.hostname.toLowerCase() === `www.${CANONICAL_HOST}`) {
    return `https://${CANONICAL_HOST}${normalizedUrl}`;
  }

  return normalizedUrl !== req.originalUrl ? normalizedUrl : null;
}

export function enforceCanonicalUrl(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const destination = canonicalDestination(req);
  if (!destination) {
    next();
    return;
  }

  res.setHeader("Cache-Control", "public, max-age=86400");
  res.redirect(301, destination);
}
