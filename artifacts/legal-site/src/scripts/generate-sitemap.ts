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
  content: z.array(BlogSectionSchema).min(1, "content must have at least one section"),
});

const BlogPostSchema = z.object({
  slug: z
    .string()
    .min(1, "slug must not be empty")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case (a-z, 0-9, hyphens only)"),
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

const { BASE_URL, TODAY, CORE_PAGES } = await import("../data/sitemap-sources.js");
const { blogPosts } = await import("../data/blog-posts.js");

if (blogPosts.length > 0) {
  const errors: string[] = [];
  for (let i = 0; i < blogPosts.length; i++) {
    const result = BlogPostSchema.safeParse(blogPosts[i]);
    if (!result.success) {
      const slug = (blogPosts[i] as { slug?: unknown }).slug ?? `(index ${i})`;
      for (const issue of result.error.issues) {
        errors.push(`  [${slug}] ${issue.path.join(".")}: ${issue.message}`);
      }
    }
  }
  if (errors.length > 0) {
    console.error(
      `[sitemap] ERROR: ${errors.length} validation error(s) found in blog-posts.ts. Fix them before the sitemap is written:\n${errors.join("\n")}`,
    );
    process.exit(1);
  }
}

const { en } = await import("../translations/en.js");
const { enSyr } = await import("../translations/en-syr.js");

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
      `    <xhtml:link rel="alternate" hrefLang="x-default" href="${BASE_URL}/"/>`,
      `    <xhtml:link rel="alternate" hrefLang="en-SA"     href="${BASE_URL}/sa"/>`,
      `    <xhtml:link rel="alternate" hrefLang="ar-SA"     href="${BASE_URL}/sa/ar"/>`,
      `    <xhtml:link rel="alternate" hrefLang="en-SY"     href="${BASE_URL}/syr"/>`,
      `    <xhtml:link rel="alternate" hrefLang="ar-SY"     href="${BASE_URL}/syr/ar"/>`,
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
        `    <xhtml:link rel="alternate" hrefLang="${l}"     href="${BASE_URL}${p}"/>`,
    ),
    `    <xhtml:link rel="alternate" hrefLang="x-default" href="${BASE_URL}/"/>`,
  ].join("\n");
}

function urlEntry(
  path: string,
  changefreq: string,
  priority: string,
  lastmod: string,
): string {
  const loc = path === "" ? `${BASE_URL}/` : `${BASE_URL}${path}`;
  return `  <url>
    <loc>${loc}</loc>
${hreflang(path)}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`;
}

const entries: string[] = [];

entries.push("  <!-- ===== ROOT & CORE PAGES ===== -->");
for (const page of CORE_PAGES) {
  if (page.path === "/syr") {
    entries.push("\n  <!-- ===== SYR CORE PAGES ===== -->");
  }
  entries.push(urlEntry(page.path, page.changefreq, page.priority, TODAY));
}

entries.push("\n  <!-- ===== SA SERVICE PAGES ===== -->");
for (const slug of SA_SERVICE_SLUGS) {
  entries.push(urlEntry(`/sa/services/${slug}`, "monthly", "0.9", TODAY));
  entries.push(urlEntry(`/sa/ar/services/${slug}`, "monthly", "0.9", TODAY));
}

entries.push("\n  <!-- ===== SYR SERVICE PAGES ===== -->");
for (const slug of SYR_SERVICE_SLUGS) {
  entries.push(urlEntry(`/syr/services/${slug}`, "monthly", "0.9", TODAY));
  entries.push(urlEntry(`/syr/ar/services/${slug}`, "monthly", "0.9", TODAY));
}

if (blogPosts.length > 0) {
  entries.push("\n  <!-- ===== BLOG POSTS ===== -->");
  for (const post of blogPosts) {
    entries.push(
      urlEntry(`/sa/blog/${post.slug}`, "monthly", "0.7", post.date),
    );
    entries.push(
      urlEntry(`/sa/ar/blog/${post.slug}`, "monthly", "0.7", post.date),
    );
    entries.push(
      urlEntry(`/syr/blog/${post.slug}`, "monthly", "0.7", post.date),
    );
    entries.push(
      urlEntry(`/syr/ar/blog/${post.slug}`, "monthly", "0.7", post.date),
    );
  }
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
  `[sitemap] wrote ${outPath} (${SA_SERVICE_SLUGS.length} SA services, ${SYR_SERVICE_SLUGS.length} SYR services, ${blogPosts.length} blog posts)`,
);

const shouldPing =
  process.env["NODE_ENV"] === "production" ||
  process.env["INDEXNOW_PING"] === "true";

if (shouldPing) {
  const INDEXNOW_KEY = "fc82de857e07c9a2f89982c0e825dee1";
  const HOST = "counselo-legal.com";
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].trim(),
  );
  console.log(
    `[sitemap] auto-pinging IndexNow with ${urlList.length} URLs…`,
  );
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
      console.log(
        `[sitemap] IndexNow accepted — HTTP ${res.status}`,
      );
    } else {
      console.warn(
        `[sitemap] IndexNow unexpected response — HTTP ${res.status}`,
      );
    }
  } catch (err) {
    console.warn(`[sitemap] IndexNow ping failed:`, err);
  }
}
