import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getPublicRouteInventory,
  getServicesForRegion,
} from "@workspace/api-zod";

const BASE_URL = (process.env["SITEMAP_BASE_URL"] ?? "https://counselo-legal.com").replace(/\/$/, "");
const REQUIRE_BASELINE = process.env["SITEMAP_REQUIRE_LASTMOD_BASELINE"] !== "false";
const UPDATE_BASELINE = process.argv.includes("--update-baseline");
const rootDir = resolve(fileURLToPath(new URL("../../../..", import.meta.url)));
const baselinePath = resolve(
  rootDir,
  process.env["SITEMAP_LASTMOD_BASELINE"] ?? "docs/sitemap-lastmod-baseline.json",
);

export const SITEMAP_FILES = [
  "sitemap-core.xml",
  "sitemap-uae-services.xml",
  "sitemap-sa-services.xml",
  "sitemap-syr-services.xml",
  "sitemap-blog.xml",
  "sitemap-work.xml",
] as const;

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  alternates: Record<string, string>;
};

type SitemapDocument = {
  kind: "index" | "urlset";
  children: string[];
  entries: SitemapEntry[];
};

type PageAudit = {
  status: number;
  redirected: boolean;
  body: string;
  canonical: string;
  indexable: boolean;
  alternates: Record<string, string>;
  dateModified?: string;
};

type Baseline = Record<string, { lastmod: string; contentHash: string }>;

const failures: string[] = [];
const warnings: string[] = [];
const responseCache = new Map<string, Promise<Response>>();
const pageCache = new Map<string, Promise<PageAudit>>();

function fail(message: string): void {
  failures.push(message);
}

function warn(message: string): void {
  warnings.push(message);
}

function absoluteUrl(value: string): string {
  return new URL(value, `${BASE_URL}/`).toString().replace(/\/$/, "") || `${BASE_URL}/`;
}

function decodeXml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

export function parseSitemapXml(xml: string): SitemapDocument {
  const children = [...xml.matchAll(/<sitemap>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<\/sitemap>/gi)]
    .map((match) => decodeXml(match[1].trim()));
  const entries: SitemapEntry[] = [];
  for (const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
    const block = match[1];
    const loc = block.match(/<loc>([^<]+)<\/loc>/i)?.[1];
    if (!loc) continue;
    const alternates: Record<string, string> = {};
    for (const link of block.matchAll(/<xhtml:link\s+([^>]+)>/gi)) {
      const language = link[1].match(/hreflang="([^"]+)"/i)?.[1];
      const target = link[1].match(/href="([^"]+)"/i)?.[1];
      if (language && target) alternates[language] = absoluteUrl(decodeXml(target));
    }
    entries.push({
      loc: absoluteUrl(decodeXml(loc.trim())),
      lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/i)?.[1]?.trim(),
      alternates,
    });
  }
  return { kind: children.length > 0 ? "index" : "urlset", children, entries };
}

function htmlAttribute(html: string, tag: string, attribute: string, value: string): string {
  const pattern = new RegExp(`<${tag}\\b[^>]*\\b${attribute}="${value}"[^>]*\\bcontent="([^"]*)"`, "i");
  const reversePattern = new RegExp(`<${tag}\\b[^>]*\\bcontent="([^"]*)"[^>]*\\b${attribute}="${value}"`, "i");
  return pattern.exec(html)?.[1] ?? reversePattern.exec(html)?.[1] ?? "";
}

export function parsePageAudit(status: number, redirected: boolean, body: string, httpRobots = ""): PageAudit {
  const canonical = body.match(/<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]+)"/i)?.[1]
    ?? body.match(/<link\b[^>]*\bhref="([^"]+)"[^>]*\brel="canonical"/i)?.[1]
    ?? "";
  const alternates: Record<string, string> = {};
  for (const match of body.matchAll(/<link\b([^>]+)>/gi)) {
    if (!/rel="alternate"/i.test(match[1])) continue;
    const language = match[1].match(/hreflang="([^"]+)"/i)?.[1];
    const target = match[1].match(/href="([^"]+)"/i)?.[1];
    if (language && target) alternates[language] = absoluteUrl(target);
  }
  const robots = `${htmlAttribute(body, "meta", "name", "robots")} ${htmlAttribute(body, "meta", "http-equiv", "X-Robots-Tag")}`;
  const dateModified = [...body.matchAll(/"dateModified"\s*:\s*"([^"]+)"/gi)][0]?.[1];
  return {
    status,
    redirected,
    body,
    canonical: absoluteUrl(canonical),
    indexable: !/noindex|nofollow/i.test(`${robots} ${httpRobots}`),
    alternates,
    dateModified,
  };
}

async function response(url: string): Promise<Response> {
  const normalized = absoluteUrl(url);
  let cached = responseCache.get(normalized);
  if (!cached) {
    cached = fetch(normalized, { redirect: "manual", signal: AbortSignal.timeout(20_000) });
    responseCache.set(normalized, cached);
  }
  return cached;
}

async function fetchXml(url: string): Promise<SitemapDocument | null> {
  const res = await response(url);
  if (res.status !== 200) {
    fail(`${url} returned HTTP ${res.status}`);
    return null;
  }
  return parseSitemapXml(await res.text());
}

async function fetchPage(url: string): Promise<PageAudit> {
  const normalized = absoluteUrl(url);
  let cached = pageCache.get(normalized);
  if (!cached) {
    cached = response(normalized).then(async (res) =>
      parsePageAudit(
        res.status,
        res.status >= 300 && res.status < 400,
        await res.text(),
        res.headers.get("x-robots-tag") ?? "",
      ),
    );
    pageCache.set(normalized, cached);
  }
  return cached;
}

function contentHash(html: string): string {
  const stable = html
    .replace(/"dateModified"\s*:\s*"[^"]+"/g, '"dateModified":"<volatile>"')
    .replace(/\s+/g, " ")
    .trim();
  return createHash("sha256").update(stable).digest("hex");
}

function loadBaseline(): Baseline {
  if (!existsSync(baselinePath)) return {};
  return JSON.parse(readFileSync(baselinePath, "utf8")) as Baseline;
}

function expectedUrls(blogPosts: Array<Record<string, unknown>>, workSamples: Array<Record<string, unknown>>): Set<string> {
  const expected = new Set(getPublicRouteInventory().map((route) => absoluteUrl(route)));
  for (const post of blogPosts) {
    const slug = String(post.slug);
    expected.add(absoluteUrl(`/blog/en/${slug}`));
    expected.add(absoluteUrl(`/blog/ar/${slug}`));
  }
  for (const sample of workSamples) {
    const slug = String(sample.slug);
    if (sample.titleEn && sample.titleAr) {
      expected.add(absoluteUrl(`/our-work/${slug}`));
      expected.add(absoluteUrl(`/ar/our-work/${slug}`));
    } else {
      expected.add(absoluteUrl(sample.titleAr ? `/ar/our-work/${slug}` : `/our-work/${slug}`));
    }
  }
  return expected;
}

async function publishedRecords(pathname: string): Promise<Array<Record<string, unknown>>> {
  const url = `${BASE_URL}${pathname}`;
  const res = await response(url);
  if (res.status !== 200) {
    fail(`${url} returned HTTP ${res.status}`);
    return [];
  }
  const data = await res.json() as unknown;
  if (!Array.isArray(data)) {
    fail(`${url} did not return an array`);
    return [];
  }
  return data.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"));
}

async function validate(): Promise<void> {
  const index = await fetchXml(`${BASE_URL}/sitemap.xml`);
  if (!index || index.kind !== "index") {
    fail(`${BASE_URL}/sitemap.xml is not a sitemap index`);
    return;
  }
  const expectedChildren = SITEMAP_FILES.map((filename) => `${BASE_URL}/${filename}`);
  for (const child of expectedChildren) if (!index.children.includes(child)) fail(`Sitemap index missing ${child}`);
  for (const child of index.children) if (!expectedChildren.includes(child)) fail(`Sitemap index contains unexpected child ${child}`);

  const documents = await Promise.all(index.children.map(async (child) => ({ child, document: await fetchXml(child) })));
  const entries = documents.flatMap(({ child, document }) => (document?.entries ?? []).map((entry) => ({ ...entry, child })));
  const byUrl = new Map(entries.map((entry) => [entry.loc, entry]));
  const [blogPosts, workSamples] = await Promise.all([
    publishedRecords("/api/blog/posts/discovery"),
    publishedRecords("/api/work"),
  ]);
  const expected = expectedUrls(blogPosts, workSamples);
  for (const url of expected) if (!byUrl.has(url)) fail(`Expected URL missing from sitemap: ${url}`);
  for (const url of byUrl.keys()) if (!expected.has(url)) fail(`Unexpected/private/draft URL submitted: ${url}`);

  for (const service of getServicesForRegion("uae")) {
    for (const route of [`/uae/services/${service.slug}`, `/uae/ar/services/${service.slug}`]) {
      if (!byUrl.has(absoluteUrl(route))) fail(`UAE service missing from sitemap inventory: ${route}`);
    }
  }

  const baseline = loadBaseline();
  const nextBaseline: Baseline = {};
  for (const entry of entries) {
    const page = await fetchPage(entry.loc);
    if (page.status !== 200) fail(`${entry.loc} returned HTTP ${page.status}`);
    if (page.redirected) fail(`${entry.loc} is a redirect URL submitted to the sitemap`);
    if (page.canonical !== entry.loc) fail(`${entry.loc} canonical is ${page.canonical}`);
    if (!page.indexable) fail(`${entry.loc} is noindex or nofollow`);

    for (const [language, target] of Object.entries(entry.alternates)) {
      const targetPage = await fetchPage(target);
      if (targetPage.status !== 200 || targetPage.redirected) fail(`${entry.loc} hreflang ${language} target is not a direct 200: ${target}`);
      const reciprocal = Object.values(targetPage.alternates).includes(entry.loc);
      if (!reciprocal && target !== entry.loc) fail(`${entry.loc} hreflang ${language} target is not reciprocal: ${target}`);
    }
    for (const [language, target] of Object.entries(page.alternates)) {
      const targetPage = await fetchPage(target);
      if (targetPage.status !== 200 || targetPage.redirected) fail(`${entry.loc} page hreflang ${language} target is not a direct 200: ${target}`);
      if (target !== entry.loc && !Object.values(targetPage.alternates).includes(entry.loc)) fail(`${entry.loc} page hreflang ${language} is not reciprocal: ${target}`);
    }

    if (entry.lastmod) {
      if (page.dateModified && page.dateModified.slice(0, 10) !== entry.lastmod.slice(0, 10)) fail(`${entry.loc} lastmod ${entry.lastmod} differs from dateModified ${page.dateModified}`);
      const fingerprint = contentHash(page.body);
      nextBaseline[entry.loc] = { lastmod: entry.lastmod, contentHash: fingerprint };
      const previous = baseline[entry.loc];
      if (previous && previous.lastmod !== entry.lastmod && previous.contentHash === fingerprint) fail(`${entry.loc} lastmod changed without substantive content change`);
      if (previous && previous.lastmod === entry.lastmod && previous.contentHash !== fingerprint) fail(`${entry.loc} content changed without a lastmod change`);
    }
  }

  if (REQUIRE_BASELINE && Object.keys(baseline).length === 0 && entries.some((entry) => entry.lastmod)) {
    fail(`Missing lastmod baseline at ${baselinePath}; run sitemap:validate -- --update-baseline after review`);
  }
  if (UPDATE_BASELINE) {
    const serialized = `${JSON.stringify(nextBaseline, null, 2)}\n`;
    const { writeFileSync } = await import("node:fs");
    writeFileSync(baselinePath, serialized, "utf8");
    console.log(`Updated ${baselinePath}`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  await validate();
  for (const warning of warnings) console.warn(`WARN ${warning}`);
  if (failures.length) {
    for (const failure of failures) console.error(`FAIL ${failure}`);
    console.error(`Sitemap live validation failed with ${failures.length} error(s).`);
    process.exitCode = 1;
  } else {
    console.log(`Sitemap live validation passed: ${SITEMAP_FILES.length} child sitemaps, ${responseCache.size} HTTP resources checked.`);
  }
}
