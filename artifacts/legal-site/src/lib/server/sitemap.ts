import { escapeXml } from "./hreflang.js";
import { BASE_URL } from "./routes.js";

export interface SitemapPostItem {
  slug: string;
  date: string;
  updatedAt?: string | null;
  titleEn?: string;
  titleAr?: string;
}

export interface SitemapWorkItem {
  slug: string;
  date: string;
  updatedAt?: string | null;
  titleEn?: string;
  titleAr?: string;
}

/**
 * Builds individual XML <url> entry string.
 */
export function buildSitemapUrlEntry(
  loc: string,
  alternatesHtml: string,
  changefreq?: string,
  priority?: string,
  lastmod?: string,
): string {
  const parts = [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
  ];
  if (alternatesHtml) {
    parts.push(alternatesHtml);
  }
  if (changefreq) {
    parts.push(`    <changefreq>${changefreq}</changefreq>`);
  }
  if (priority) {
    parts.push(`    <priority>${priority}</priority>`);
  }
  if (lastmod) {
    parts.push(`    <lastmod>${escapeXml(lastmod.slice(0, 10))}</lastmod>`);
  }
  parts.push("  </url>");
  return parts.join("\n");
}

/**
 * Dynamic runtime sitemap generator that takes a base static sitemap XML string
 * and injects/updates dynamic blog posts and work samples from database/API inventory.
 */
export function generateDynamicSitemap(
  baseXml: string,
  posts: SitemapPostItem[],
  samples: SitemapWorkItem[],
): string {
  let xml = baseXml
    .replace(/\s*<url>\s*<loc>https:\/\/counselo-legal\.com\/blog\/[^<]+<\/loc>[\s\S]*?<\/url>/g, "")
    .replace(/\s*<url>\s*<loc>https:\/\/counselo-legal\.com\/(?:ar\/)?our-work\/[^<]+<\/loc>[\s\S]*?<\/url>/g, "");

  const items: string[] = [];

  for (const post of posts) {
    const url = `${BASE_URL}/blog/${post.slug}`;
    const modified = post.updatedAt || post.date;
    const alternates = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(url)}"/>`;
    items.push(buildSitemapUrlEntry(url, alternates, undefined, undefined, modified));
  }

  for (const sample of samples) {
    const enUrl = `${BASE_URL}/our-work/${sample.slug}`;
    const arUrl = `${BASE_URL}/ar/our-work/${sample.slug}`;
    const modified = sample.updatedAt || sample.date;

    if (sample.titleEn && sample.titleAr) {
      const alternates = [
        `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enUrl)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(arUrl)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(enUrl)}"/>`,
      ].join("\n");
      items.push(buildSitemapUrlEntry(enUrl, alternates, undefined, undefined, modified));
      items.push(buildSitemapUrlEntry(arUrl, alternates, undefined, undefined, modified));
    } else if (sample.titleAr) {
      const alternates = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(arUrl)}"/>`;
      items.push(buildSitemapUrlEntry(arUrl, alternates, undefined, undefined, modified));
    } else if (sample.titleEn) {
      const alternates = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(enUrl)}"/>`;
      items.push(buildSitemapUrlEntry(enUrl, alternates, undefined, undefined, modified));
    }
  }

  const latestBlog = posts.map((post) => (post.updatedAt || post.date).slice(0, 10)).sort().at(-1);
  const latestWork = samples.map((sample) => (sample.updatedAt || sample.date).slice(0, 10)).sort().at(-1);

  const addLastmod = (targetXml: string, url: string, date?: string) => {
    if (date) return targetXml.replace(`<loc>${url}</loc>`, `<loc>${url}</loc>\n    <lastmod>${date}</lastmod>`);
    return targetXml;
  };

  xml = addLastmod(xml, `${BASE_URL}/blog`, latestBlog);
  xml = addLastmod(xml, `${BASE_URL}/our-work`, latestWork);
  xml = addLastmod(xml, `${BASE_URL}/ar/our-work`, latestWork);

  return xml.replace("</urlset>", `${items.length ? `\n${items.join("\n")}\n` : ""}</urlset>`);
}
