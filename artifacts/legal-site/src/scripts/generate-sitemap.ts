import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

import {
  BASE_URL,
  CORE_PAGES,
  BLOG_BASE_PATH,
  WORK_BASE_PATH,
  SYRIA_ONLY_SERVICE_SLUGS,
  buildHreflangSitemapLinks,
  buildHreflangUaeSitemapLinks,
  buildHreflangSyrOnlySitemapLinks,
  buildHreflangSingleUrlSitemapLink,
  buildHreflangLanguageVariantSitemapLinks,
  buildSitemapUrlEntry,
  escapeXml,
} from "../lib/server/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "../..");

const { en } = await import("../translations/en.js");
const { enSyr } = await import("../translations/en-syr.js");
const { UAE_SERVICES } = await import("../data/uae-legal-services.js");

function slugFromHref(href: string): string {
  return href.replace(/^\/services\//, "");
}

const SA_SERVICE_SLUGS: string[] = en.nav.servicesList.map((s) =>
  slugFromHref(s.href),
);
const SYR_SERVICE_SLUGS: string[] = enSyr.nav.servicesList.map((s) =>
  slugFromHref(s.href),
);

function urlEntry(
  path: string,
  changefreq: string,
  priority: string,
  lastmod?: string,
): string {
  const loc = path === "" ? `${BASE_URL}/` : `${BASE_URL}${path}`;
  const alternates = path.startsWith("/uae")
    ? buildHreflangUaeSitemapLinks(path)
    : buildHreflangSitemapLinks(path);
  return buildSitemapUrlEntry(loc, alternates, changefreq, priority, lastmod);
}

function urlEntrySyrOnly(
  path: string,
  changefreq: string,
  priority: string,
  lastmod?: string,
): string {
  const loc = `${BASE_URL}${path}`;
  const alternates = buildHreflangSyrOnlySitemapLinks(path);
  return buildSitemapUrlEntry(loc, alternates, changefreq, priority, lastmod);
}

function urlEntrySingleUrl(
  fullUrl: string,
  changefreq: string,
  priority: string,
  lastmod?: string,
): string {
  const alternates = buildHreflangSingleUrlSitemapLink(fullUrl);
  return buildSitemapUrlEntry(fullUrl, alternates, changefreq, priority, lastmod);
}

function urlEntryLanguageVariant(
  fullUrl: string,
  englishUrl: string,
  arabicUrl: string,
  changefreq: string,
  priority: string,
  lastmod?: string,
): string {
  const alternates = buildHreflangLanguageVariantSitemapLinks(englishUrl, arabicUrl);
  return buildSitemapUrlEntry(fullUrl, alternates, changefreq, priority, lastmod);
}

const entries: string[] = [];
const feedPosts: Array<{
  slug: string;
  date: string;
  title: string;
  excerpt: string;
}> = [];

entries.push("  <!-- ===== ROOT & CORE PAGES ===== -->");
for (const page of CORE_PAGES) {
  if (page.path === "/syr") {
    entries.push("\n  <!-- ===== SYR CORE PAGES ===== -->");
  }
  entries.push(urlEntry(page.path, page.changefreq, page.priority));
}

entries.push("\n  <!-- ===== SA SERVICE PAGES ===== -->");
for (const slug of SA_SERVICE_SLUGS) {
  entries.push(urlEntry(`/sa/services/${slug}`, "monthly", "0.9"));
  entries.push(urlEntry(`/sa/ar/services/${slug}`, "monthly", "0.9"));
}

entries.push("\n  <!-- ===== SYR SERVICE PAGES ===== -->");
for (const slug of SYR_SERVICE_SLUGS) {
  const fn = SYRIA_ONLY_SERVICE_SLUGS.has(slug) ? urlEntrySyrOnly : urlEntry;
  entries.push(fn(`/syr/services/${slug}`, "monthly", "0.9"));
  entries.push(fn(`/syr/ar/services/${slug}`, "monthly", "0.9"));
}

entries.push("\n  <!-- ===== UAE SERVICE PAGES ===== -->");
for (const service of UAE_SERVICES) {
  entries.push(urlEntry(`/uae/services/${service.slug}`, "monthly", "0.9"));
  entries.push(urlEntry(`/uae/ar/services/${service.slug}`, "monthly", "0.9"));
}

entries.push("\n  <!-- ===== BLOG ===== -->");
entries.push(
  urlEntrySingleUrl(`${BASE_URL}${BLOG_BASE_PATH}`, "weekly", "0.8"),
);

entries.push("\n  <!-- ===== OUR WORK ===== -->");
const workIndexEn = `${BASE_URL}${WORK_BASE_PATH}`;
const workIndexAr = `${BASE_URL}/ar${WORK_BASE_PATH}`;
entries.push(urlEntryLanguageVariant(workIndexEn, workIndexEn, workIndexAr, "weekly", "0.85"));
entries.push(urlEntryLanguageVariant(workIndexAr, workIndexEn, workIndexAr, "weekly", "0.85"));

try {
  const BlogPostRowSchema = z.object({
    slug: z.string(),
    date: z.string(),
    updatedAt: z.string().optional(),
    titleEn: z.string().optional(),
    titleAr: z.string().optional(),
    excerptEn: z.string().optional(),
    excerptAr: z.string().optional(),
  });
  const blogApiUrl =
    process.env["BLOG_API_URL"]?.trim() ||
    "https://counselo-legal.com/api/blog/posts";
  const res = await fetch(blogApiUrl, {
    signal: AbortSignal.timeout(8_000),
  });
  if (res.ok) {
    const raw = (await res.json()) as unknown[];
    const posts = raw
      .map((p) => BlogPostRowSchema.safeParse(p))
      .filter((r) => r.success)
      .map((r) => r.data);
    for (const post of posts) {
      entries.push(
        urlEntrySingleUrl(
          `${BASE_URL}${BLOG_BASE_PATH}/${post.slug}`,
          "monthly",
          "0.7",
          post.updatedAt?.slice(0, 10) || post.date,
        ),
      );
      feedPosts.push({
        slug: post.slug,
        date: post.updatedAt?.slice(0, 10) || post.date,
        title: post.titleEn?.trim() || post.titleAr?.trim() || post.slug,
        excerpt: post.excerptEn?.trim() || post.excerptAr?.trim() || "CounselO legal insight",
      });
    }
    console.log(`[sitemap] added ${posts.length} blog post(s) to sitemap`);
  } else {
    console.warn(
      `[sitemap] blog API returned HTTP ${res.status} — skipping post entries`,
    );
  }
} catch (err) {
  console.warn(
    `[sitemap] could not fetch blog posts (${(err as Error).message}) — skipping`,
  );
}

try {
  const WorkRowSchema = z.object({ slug: z.string(), date: z.string(), updatedAt: z.string().optional(), titleEn: z.string().optional(), titleAr: z.string().optional() });
  const workApiUrl = process.env["WORK_API_URL"]?.trim() || "https://counselo-legal.com/api/work";
  const res = await fetch(workApiUrl, { signal: AbortSignal.timeout(8_000) });
  if (res.ok) {
    const raw = (await res.json()) as unknown[];
    const samples = raw.map((item) => WorkRowSchema.safeParse(item)).filter((item) => item.success).map((item) => item.data);
    for (const sample of samples) {
      const enUrl = `${BASE_URL}${WORK_BASE_PATH}/${sample.slug}`;
      const arUrl = `${BASE_URL}/ar${WORK_BASE_PATH}/${sample.slug}`;
      const modified = sample.updatedAt?.slice(0, 10) || sample.date;
      if (sample.titleEn && sample.titleAr) {
        entries.push(urlEntryLanguageVariant(enUrl, enUrl, arUrl, "monthly", "0.75", modified));
        entries.push(urlEntryLanguageVariant(arUrl, enUrl, arUrl, "monthly", "0.75", modified));
      } else if (sample.titleAr) {
        entries.push(urlEntrySingleUrl(arUrl, "monthly", "0.75", modified));
      } else {
        entries.push(urlEntrySingleUrl(enUrl, "monthly", "0.75", modified));
      }
    }
    console.log(`[sitemap] added ${samples.length} work sample(s) to sitemap`);
  }
} catch (err) {
  console.warn(`[sitemap] could not fetch work samples (${(err as Error).message}) — skipping`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${entries.join("\n")}

</urlset>
`;

const outPath = resolve(rootDir, "public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");

const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>CounselO Global Legal Insights</title>
    <link>${BASE_URL}${BLOG_BASE_PATH}</link>
    <description>Legal articles and guides covering UAE, Saudi and Syrian law.</description>
    <language>en</language>
${feedPosts.map((post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}${BLOG_BASE_PATH}/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}${BLOG_BASE_PATH}/${post.slug}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`).join("\n")}
  </channel>
</rss>
`;
writeFileSync(resolve(rootDir, "public/feed.xml"), feedXml, "utf-8");
console.log(
  `[sitemap] wrote ${outPath} (${SA_SERVICE_SLUGS.length} SA services, ${SYR_SERVICE_SLUGS.length} SYR services, ${UAE_SERVICES.length} UAE services)`,
);

const shouldPing = process.env["INDEXNOW_PING"] === "true";
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].trim(),
);

if (shouldPing) {
  const INDEXNOW_KEY = "611ed21ca6ffe639fa0e476e8ea1aedb9df6601ed775825f6aa2d75da664ab5a";
  const HOST = "counselo-legal.com";
  console.log(`[sitemap] auto-pinging IndexNow with ${urlList.length} URLs…`);
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });
    if (res.status === 200 || res.status === 202) {
      console.log(`[sitemap] IndexNow accepted — HTTP ${res.status}`);
    } else {
      console.warn(
        `[sitemap] IndexNow unexpected response — HTTP ${res.status}`,
      );
    }
  } catch (err) {
    console.warn(`[sitemap] IndexNow ping failed:`, err);
  }
}
