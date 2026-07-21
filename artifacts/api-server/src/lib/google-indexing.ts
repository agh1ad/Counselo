import { logger } from "./logger.js";

const BASE = "https://counselo-legal.com";
const INDEXNOW_KEY = "611ed21ca6ffe639fa0e476e8ea1aedb9df6601ed775825f6aa2d75da664ab5a";
const INDEXNOW_URL = "https://api.indexnow.org/indexnow";

/**
 * Ping IndexNow with the given URLs so Bing, Yandex, and other participating
 * engines can discover changes quickly. Google does not participate in
 * IndexNow; Google discovery is handled by crawlable links and fresh sitemaps.
 */
async function pingIndexNow(urls: string[]): Promise<void> {
  try {
    const res = await fetch(INDEXNOW_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "counselo-legal.com",
        key: INDEXNOW_KEY,
        keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    if (res.status === 200 || res.status === 202) {
      logger.info({ count: urls.length }, "[indexnow] accepted");
    } else {
      logger.warn({ status: res.status }, "[indexnow] unexpected response");
    }
  } catch (err) {
    logger.warn({ err }, "[indexnow] ping failed — non-fatal");
  }
}

/**
 * Returns the canonical URLs to notify when a blog post is published.
 * Includes the post page itself and the blog index (which now lists the post).
 * Only the single canonical URL is used — region-prefixed variants redirect
 * and must not be submitted directly to indexing APIs.
 */
export function blogPostUrls(slug: string): string[] {
  return [
    `${BASE}/blog/${slug}`,
    `${BASE}/blog`,
  ];
}

/**
 * Fire-and-forget: notifies IndexNow immediately when a post is published.
 * Google discovers the update through the database-backed sitemap and RSS feed.
 */
export function notifyPublished(slug: string): void {
  const urls = blogPostUrls(slug);
  void pingIndexNow(urls);
}

/** Ask participating engines to recrawl a removed/unpublished article so its
 * new 404 state is discovered promptly. The live sitemap drops it instantly. */
export function notifyRemoved(slug: string): void {
  void pingIndexNow(blogPostUrls(slug));
}

export function workSampleUrls(slug: string): string[] {
  return [
    `${BASE}/our-work/${slug}`,
    `${BASE}/ar/our-work/${slug}`,
    `${BASE}/our-work`,
    `${BASE}/ar/our-work`,
  ];
}

export function notifyWorkPublished(slug: string): void {
  const urls = workSampleUrls(slug);
  void pingIndexNow(urls);
}

export function notifyWorkRemoved(slug: string): void {
  void pingIndexNow(workSampleUrls(slug));
}
