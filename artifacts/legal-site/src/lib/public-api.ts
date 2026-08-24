const PRODUCTION_ORIGIN = "https://counselo-legal.com";

/**
 * Public content is served by the production API. In local Vite development
 * there is no `/api` proxy, so same-origin requests would receive index.html.
 */
export function publicApiUrl(path: string): string {
  return import.meta.env?.DEV ? `${PRODUCTION_ORIGIN}${path}` : path;
}

export async function fetchPublicJson<T>(path: string): Promise<T> {
  const response = await fetch(publicApiUrl(path), {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    throw new Error(`Unable to load published content (${response.status})`);
  }
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error(`Published content returned ${contentType || "an unknown content type"} instead of JSON`);
  }

  return response.json() as Promise<T>;
}
