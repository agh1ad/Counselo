import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "../..");

const BlogSectionSchema = z.object({
  heading: z.string().optional(),
  body: z.string().min(1, "body must not be empty"),
});

const BlogLocaleSchema = z.object({
  title: z.string().min(1, "title must not be empty"),
  excerpt: z.string().min(1, "excerpt must not be empty"),
  seoTitle: z.string().min(1, "seoTitle must not be empty"),
  seoDescription: z.string().min(1, "seoDescription must not be empty"),
  content: z
    .array(BlogSectionSchema)
    .min(1, "content must have at least one section"),
});

const BlogPostSchema = z.object({
  slug: z
    .string()
    .min(1, "slug must not be empty")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "slug must be kebab-case (a-z, 0-9, hyphens only)",
    ),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be in YYYY-MM-DD format"),
  category: z.object({
    en: z.string().min(1, "category.en must not be empty"),
    ar: z.string().min(1, "category.ar must not be empty"),
  }),
  readTime: z.number().int().positive("readTime must be a positive integer"),
  en: BlogLocaleSchema,
  ar: BlogLocaleSchema,
});

const { BASE_URL, CORE_PAGES, BLOG_BASE_PATH, WORK_BASE_PATH } =
  await import("../data/sitemap-sources.js");

const { en } = await import("../translations/en.js");
const { enSyr } = await import("../translations/en-syr.js");

// Maps old SA-worded Syria blog slugs to new Syria-specific canonical slugs.
// The sitemap only emits the new Syria slugs as canonical; the old slugs have
// canonicalOverride set in optimized-meta.ts so they are not indexed directly.
const SYRIA_SLUG_OVERRIDES: Record<string, string> = {
  "board-of-grievances-saudi-arabia": "administrative-court-disputes-syria",
  "child-custody-saudi-arabia": "child-custody-syria",
  "divorce-in-saudi-arabia": "divorce-in-syria",
  "foreign-company-registration-saudi-arabia":
    "foreign-company-registration-syria",
  "real-estate-disputes-saudi-arabia": "real-estate-disputes-syria",
  "wrongful-termination-saudi-labor-law":
    "wrongful-termination-syrian-labor-law",
};

function slugFromHref(href: string): string {
  return href.replace(/^\/services\//, "");
}

const SA_SERVICE_SLUGS: string[] = en.nav.servicesList.map((s) =>
  slugFromHref(s.href),
);
const SYR_SERVICE_SLUGS: string[] = enSyr.nav.servicesList.map((s) =>
  slugFromHref(s.href),
);

// Arabic is a real URL segment (e.g. "/sa/ar/about"), not a client-only
// toggle, so every entry emits all 4 region x language combos pointing at
// their own real, distinct URLs, plus x-default — required for hreflang to
// actually route crawlers/users to matching-language content.
function hreflang(path: string): string {
  const isRoot = path === "";
  if (isRoot) {
    return [
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>`,
      `    <xhtml:link rel="alternate" hreflang="en-SA"     href="${BASE_URL}/sa"/>`,
      `    <xhtml:link rel="alternate" hreflang="ar-SA"     href="${BASE_URL}/sa/ar"/>`,
      `    <xhtml:link rel="alternate" hreflang="en-SY"     href="${BASE_URL}/syr"/>`,
      `    <xhtml:link rel="alternate" hreflang="ar-SY"     href="${BASE_URL}/syr/ar"/>`,
    ].join("\n");
  }

  const basePath = path.replace(/^\/(sa|syr)(\/ar)?/, "");
  const combos: Array<[string, string]> = [
    ["en-SA", `/sa${basePath}`],
    ["ar-SA", `/sa/ar${basePath}`],
    ["en-SY", `/syr${basePath}`],
    ["ar-SY", `/syr/ar${basePath}`],
  ];
  return [
    ...combos.map(
      ([l, p]) =>
        `    <xhtml:link rel="alternate" hreflang="${l}"     href="${BASE_URL}${p}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>`,
  ].join("\n");
}

function urlEntry(
  path: string,
  changefreq: string,
  priority: string,
  lastmod?: string,
): string {
  const loc = path === "" ? `${BASE_URL}/` : `${BASE_URL}${path}`;
  return `  <url>
    <loc>${loc}</loc>
${hreflang(path)}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
  </url>`;
}

function urlEntrySyrOnly(
  path: string,
  changefreq: string,
  priority: string,
  lastmod?: string,
): string {
  return `  <url>
    <loc>${BASE_URL}${path}</loc>
${hreflangSyrOnly(path)}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
  </url>`;
}

// Services that exist only in Syria — no Saudi equivalent URL exists.
// Their sitemap entries must omit en-SA / ar-SA hreflang to avoid broken targets.
const SYRIA_ONLY_SERVICE_SLUGS = new Set([
  "civil-law",
  "civil-procedure",
  "criminal-procedure",
]);

/**
 * hreflang for Syria-only services: en-SY, ar-SY, x-default only.
 */
function hreflangSyrOnly(path: string): string {
  const basePath = path.replace(/^\/(sa|syr)(\/ar)?/, "");
  const combos: Array<[string, string]> = [
    ["en-SY", `/syr${basePath}`],
    ["ar-SY", `/syr/ar${basePath}`],
  ];
  return [
    ...combos.map(
      ([l, p]) =>
        `    <xhtml:link rel="alternate" hreflang="${l}"     href="${BASE_URL}${p}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>`,
  ].join("\n");
}

/**
 * hreflang for single-URL pages (blog index, blog posts).
 * The blog lives at one URL for all regions and languages — emitting
 * per-region alternates would point to redirect URLs, which Google penalises.
 * x-default points to the page itself.
 */
function hreflangSingleUrl(fullUrl: string): string {
  return `    <xhtml:link rel="alternate" hreflang="x-default" href="${fullUrl}"/>`;
}

function urlEntrySingleUrl(
  fullUrl: string,
  changefreq: string,
  priority: string,
  lastmod?: string,
): string {
  return `  <url>
    <loc>${fullUrl}</loc>
${hreflangSingleUrl(fullUrl)}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${lastmod ? `    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`;
}

function urlEntryLanguageVariant(
  fullUrl: string,
  englishUrl: string,
  arabicUrl: string,
  changefreq: string,
  priority: string,
  lastmod?: string,
): string {
  return `  <url>
    <loc>${fullUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${englishUrl}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${arabicUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${englishUrl}"/>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${lastmod ? `    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`;
}

const entries: string[] = [];

entries.push("  <!-- ===== ROOT & CORE PAGES ===== -->");
for (const page of CORE_PAGES) {
  if (page.path === "/syr") {
    entries.push("\n  <!-- ===== SYR CORE PAGES ===== -->");
  }
  // Static pages omit lastmod unless a trustworthy content revision date is
  // available. A deployment timestamp is not a meaningful modification date.
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

// Blog index — single URL shared by all regions/languages.
entries.push("\n  <!-- ===== BLOG ===== -->");
entries.push(
  urlEntrySingleUrl(`${BASE_URL}${BLOG_BASE_PATH}`, "weekly", "0.8"),
);

entries.push("\n  <!-- ===== OUR WORK ===== -->");
const workIndexEn = `${BASE_URL}${WORK_BASE_PATH}`;
const workIndexAr = `${BASE_URL}/ar${WORK_BASE_PATH}`;
entries.push(urlEntryLanguageVariant(workIndexEn, workIndexEn, workIndexAr, "weekly", "0.85"));
entries.push(urlEntryLanguageVariant(workIndexAr, workIndexEn, workIndexAr, "weekly", "0.85"));

// Blog posts — fetch the published records from the live API by default.
// BLOG_API_URL can point builds at a preview/local API without changing config.
// If it is unreachable, posts are skipped without failing the static build.
try {
  const BlogPostRowSchema = z.object({
    slug: z.string(),
    date: z.string(),
    updatedAt: z.string().optional(),
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
console.log(
  `[sitemap] wrote ${outPath} (${SA_SERVICE_SLUGS.length} SA services, ${SYR_SERVICE_SLUGS.length} SYR services)`,
);

// Builds must be deterministic and side-effect free. Publishing workflows opt
// in explicitly after a successful deployment.
const shouldPing = process.env["INDEXNOW_PING"] === "true";

const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].trim(),
);

if (shouldPing) {
  const INDEXNOW_KEY = "fc82de857e07c9a2f89982c0e825dee1";
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
