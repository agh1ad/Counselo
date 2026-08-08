import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const BASE_URL = (process.env["LIVE_LINK_BASE_URL"] ?? "https://counselo-legal.com").replace(/\/$/, "");
const MAX_URLS = Number(process.env["LIVE_LINK_MAX_URLS"] ?? "3000");
const CONCURRENCY = Number(process.env["LIVE_LINK_CONCURRENCY"] ?? "12");
const TIMEOUT_MS = Number(process.env["LIVE_LINK_TIMEOUT_MS"] ?? "15000");

function absoluteUrl(value: string, base = `${BASE_URL}/`): string {
  return new URL(value, base).toString().replace(/#.*$/, "").replace(/\/$/, "") || `${BASE_URL}/`;
}
function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

async function fetchPage(url: string): Promise<Response> {
  return fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { accept: "text/html, application/xml;q=0.9, */*;q=0.1" },
  });
}

function sitemapLocations(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => absoluteUrl(decodeHtml(match[1].trim())));
}

function internalLinks(html: string, source: string): string[] {
  const links = new Set<string>();
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
    const raw = decodeHtml(match[1].trim());
    if (!raw || /^(?:#|mailto:|tel:|javascript:|data:)/i.test(raw)) continue;
    let target: URL;
    try {
      target = new URL(raw, source);
    } catch {
      continue;
    }
    if (target.origin !== new URL(BASE_URL).origin) continue;
    if (/^\/(?:api|counselo-admin)(?:\/|$)/i.test(target.pathname)) continue;
    if (/\.(?:css|js|json|jpg|jpeg|png|gif|svg|webp|ico|pdf|xml|txt|woff2?)(?:$|\?)/i.test(target.pathname)) continue;
    target.hash = "";
    links.add(absoluteUrl(target.toString()));
  }
  return [...links];
}

async function checkUrls(urls: string[]): Promise<{ failures: string[]; redirects: string[] }> {
  const failures: string[] = [];
  const redirects: string[] = [];
  let cursor = 0;
  async function worker(): Promise<void> {
    while (true) {
      const index = cursor++;
      if (index >= urls.length) return;
      const url = urls[index];
      try {
        const response = await fetchPage(url);
        if (response.redirected) redirects.push(`${url} -> ${response.url}`);
        if (response.status >= 400) failures.push(`${url} returned HTTP ${response.status}`);
      } catch (error) {
        failures.push(`${url} failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, () => worker()));
  return { failures, redirects };
}

async function main(): Promise<void> {
  const indexUrl = `${BASE_URL}/sitemap.xml`;
  const indexResponse = await fetchPage(indexUrl);
  if (!indexResponse.ok) throw new Error(`${indexUrl} returned HTTP ${indexResponse.status}`);
  const childSitemaps = sitemapLocations(await indexResponse.text());
  if (childSitemaps.length === 0) throw new Error(`${indexUrl} contained no child sitemaps`);

  const sitemapResponses = await Promise.all(childSitemaps.map(async (url) => {
    const response = await fetchPage(url);
    if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
    return response.text();
  }));
  const sitemapUrls = [...new Set(sitemapResponses.flatMap(sitemapLocations))].slice(0, MAX_URLS);
  const failures: string[] = [];
  const discoveredLinks = new Set<string>();

  let cursor = 0;
  async function inspectWorker(): Promise<void> {
    while (true) {
      const index = cursor++;
      if (index >= sitemapUrls.length) return;
      const url = sitemapUrls[index];
      try {
        const response = await fetchPage(url);
        if (response.status >= 400) {
          failures.push(`${url} returned HTTP ${response.status}`);
          continue;
        }
        const contentType = response.headers.get("content-type") ?? "";
        if (contentType.includes("html") || contentType === "") {
          for (const link of internalLinks(await response.text(), response.url || url)) discoveredLinks.add(link);
        }
      } catch (error) {
        failures.push(`${url} failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, sitemapUrls.length) }, () => inspectWorker()));

  const targets = [...new Set([...sitemapUrls, ...discoveredLinks])].slice(0, MAX_URLS);
  const result = await checkUrls(targets);
  failures.push(...result.failures);
  const uniqueFailures = [...new Set(failures)];
  console.log(`[live-links] checked ${targets.length} URLs from ${childSitemaps.length} child sitemaps; discovered ${discoveredLinks.size} internal links`);
  if (result.redirects.length) console.warn(`[live-links] followed ${result.redirects.length} redirect(s)`);
  if (uniqueFailures.length) {
    for (const failure of uniqueFailures) console.error(`FAIL ${failure}`);
    process.exitCode = 1;
    return;
  }
  console.log("[live-links] passed: no broken same-origin links found");
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  await main();
}
