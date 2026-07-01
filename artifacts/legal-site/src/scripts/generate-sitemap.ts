import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "../..");

const { BASE_URL, TODAY, CORE_PAGES } = await import("../data/sitemap-sources.js");
const { blogPosts } = await import("../data/blog-posts.js");

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

function hreflang(path: string): string {
  const isSyr = path.startsWith("/syr");
  const isRoot = path === "";
  if (isRoot) {
    return [
      `    <xhtml:link rel="alternate" hrefLang="x-default" href="${BASE_URL}/"/>`,
      `    <xhtml:link rel="alternate" hrefLang="en-SA"     href="${BASE_URL}/sa"/>`,
      `    <xhtml:link rel="alternate" hrefLang="ar-SA"     href="${BASE_URL}/sa"/>`,
      `    <xhtml:link rel="alternate" hrefLang="en-SY"     href="${BASE_URL}/syr"/>`,
      `    <xhtml:link rel="alternate" hrefLang="ar-SY"     href="${BASE_URL}/syr"/>`,
    ].join("\n");
  }
  const counterpart = isSyr
    ? path.replace(/^\/syr/, "/sa")
    : path.replace(/^\/sa/, "/syr");
  const myLangs = isSyr ? ["en-SY", "ar-SY"] : ["en-SA", "ar-SA"];
  const otherLangs = isSyr ? ["en-SA", "ar-SA"] : ["en-SY", "ar-SY"];
  return [
    ...myLangs.map(
      (l) =>
        `    <xhtml:link rel="alternate" hrefLang="${l}"     href="${BASE_URL}${path}"/>`,
    ),
    ...otherLangs.map(
      (l) =>
        `    <xhtml:link rel="alternate" hrefLang="${l}"     href="${BASE_URL}${counterpart}"/>`,
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
}

entries.push("\n  <!-- ===== SYR SERVICE PAGES ===== -->");
for (const slug of SYR_SERVICE_SLUGS) {
  entries.push(urlEntry(`/syr/services/${slug}`, "monthly", "0.9", TODAY));
}

if (blogPosts.length > 0) {
  entries.push("\n  <!-- ===== BLOG POSTS ===== -->");
  for (const post of blogPosts) {
    entries.push(
      urlEntry(`/sa/blog/${post.slug}`, "monthly", "0.7", post.date),
    );
    entries.push(
      urlEntry(`/syr/blog/${post.slug}`, "monthly", "0.7", post.date),
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
