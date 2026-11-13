import { currentBrandRecord } from "@workspace/api-zod/browser";

const PRODUCTION_ORIGIN = "https://counselo-legal.com";
const PUBLIC_JSON_REUSE_MS = 15_000;
const MAX_PUBLIC_JSON_CACHE_ENTRIES = 100;

type PublicJsonCacheEntry = {
  expiresAt: number;
  promise: Promise<unknown>;
};

const publicJsonCache = new Map<string, PublicJsonCacheEntry>();

export class PublicContentError extends Error {
  constructor(public readonly status: number) {
    super(`Unable to load published content (${status})`);
    this.name = "PublicContentError";
  }
}

export function isMissingPublicContent(error: unknown): boolean {
  return error instanceof PublicContentError && (error.status === 404 || error.status === 410);
}

function trimPublicJsonCache(): void {
  while (publicJsonCache.size > MAX_PUBLIC_JSON_CACHE_ENTRIES) {
    const oldestKey = publicJsonCache.keys().next().value as string | undefined;
    if (!oldestKey) return;
    publicJsonCache.delete(oldestKey);
  }
}

/**
 * Public content is served by the production API. In local Vite development
 * there is no `/api` proxy, so same-origin requests would receive index.html.
 */
export function publicApiUrl(path: string, development = import.meta.env?.DEV ?? false): string {
  if (!development) return path;
  // Vite previews documents using read-only public data,
  // keeping PDF frames on this origin while the backend changes await deployment.
  if (path.startsWith("/documents/")) return path;
  return `${PRODUCTION_ORIGIN}${path}`;
}

export async function fetchPublicJson<T>(path: string): Promise<T> {
  const now = Date.now();
  const cached = publicJsonCache.get(path);
  if (cached && cached.expiresAt > now) {
    return cached.promise as Promise<T>;
  }
  if (cached) publicJsonCache.delete(path);

  // Multiple public components can request the same blog/work inventory on
  // mount, focus, or interval refresh. Share both concurrent requests and the
  // same 15-second freshness window already enforced by the server so those
  // components do not generate duplicate origin traffic.
  const promise = (async () => {
    const response = await fetch(publicApiUrl(path), {
      // Let the response Cache-Control policy decide reuse. Public API responses
      // keep max-age=0 for browsers, so freshness/revalidation behavior is
      // preserved while shared caches can honor s-maxage.
      cache: "default",
      headers: { Accept: "application/json" },
    });
    const contentType = response.headers.get("content-type") ?? "";

    if (!response.ok) {
      throw new PublicContentError(response.status);
    }
    if (!contentType.toLowerCase().includes("application/json")) {
      throw new Error(`Published content returned ${contentType || "an unknown content type"} instead of JSON`);
    }

    const data = await response.json();
    // Keep rolling deployments and older cached public records consistent with SSR.
    if (/^\/api\/(?:blog\/posts|work)(?:[/?]|$)/.test(path)) {
      return (Array.isArray(data) ? data.map(currentBrandRecord) : data && typeof data === "object" ? currentBrandRecord(data) : data) as T;
    }
    return data as T;
  })();

  publicJsonCache.set(path, {
    expiresAt: now + PUBLIC_JSON_REUSE_MS,
    promise,
  });
  trimPublicJsonCache();

  try {
    return await promise;
  } catch (error) {
    if (publicJsonCache.get(path)?.promise === promise) {
      publicJsonCache.delete(path);
    }
    throw error;
  }
}
