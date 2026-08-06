import { escapeXml } from "./hreflang.js";
import { BASE_URL } from "./routes.js";

export interface RssPostItem {
  titleEn?: string;
  titleAr?: string;
  excerptEn?: string;
  excerptAr?: string;
  slug: string;
  date: string;
  updatedAt?: string | null;
}

export interface RssWorkItem {
  titleEn?: string;
  titleAr?: string;
  summaryEn?: string;
  summaryAr?: string;
  slug: string;
  date: string;
  updatedAt?: string | null;
}

export function generateDiscoveryRssFeed(
  posts: RssPostItem[],
  samples: RssWorkItem[],
  maxItems = 50,
): string {
  const items: Array<{ title: string; description: string; url: string; modified: string }> = [
    ...posts.map((post) => ({
      title: post.titleEn || post.titleAr || post.slug,
      description: post.excerptEn || post.excerptAr || "CounselO legal article.",
      url: `${BASE_URL}/blog/${post.slug}`,
      modified: post.updatedAt || post.date,
    })),
    ...samples.flatMap((sample) => {
      const modified = sample.updatedAt || sample.date;
      return [
        ...(sample.titleEn
          ? [{
              title: sample.titleEn,
              description: sample.summaryEn || "CounselO legal work sample.",
              url: `${BASE_URL}/our-work/${sample.slug}`,
              modified,
            }]
          : []),
        ...(sample.titleAr
          ? [{
              title: sample.titleAr,
              description: sample.summaryAr || "نموذج عمل قانوني من كاونسلو.",
              url: `${BASE_URL}/ar/our-work/${sample.slug}`,
              modified,
            }]
          : []),
      ];
    }),
  ]
    .sort((a, b) => Date.parse(b.modified) - Date.parse(a.modified))
    .slice(0, maxItems);

  const built = items[0]
    ? new Date(items[0].modified).toUTCString()
    : new Date(0).toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>CounselO Legal Articles and Work</title>
    <link>${BASE_URL}/</link>
    <description>Recently published legal articles and redacted professional work from CounselO.</description>
    <language>en</language>
    <lastBuildDate>${escapeXml(built)}</lastBuildDate>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${escapeXml(new Date(item.modified).toUTCString())}</pubDate>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>`;
}
