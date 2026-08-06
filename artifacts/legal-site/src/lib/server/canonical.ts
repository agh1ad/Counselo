import { BASE_URL } from "./routes.js";

/**
 * Normalizes a route path and returns a full canonical URL string.
 * Ensures leading slash and no trailing slash (except root '/').
 */
export function buildCanonicalUrl(path: string): string {
  if (!path || path === "/") {
    return `${BASE_URL}/`;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const trimmed = cleanPath.length > 1 && cleanPath.endsWith("/")
    ? cleanPath.slice(0, -1)
    : cleanPath;
  return `${BASE_URL}${trimmed}`;
}
