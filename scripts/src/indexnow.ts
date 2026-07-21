/**
 * IndexNow ping script — submits all counselo-legal.com URLs to IndexNow.
 *
 * Run manually (standalone ping using existing sitemap):
 *   pnpm --filter @workspace/scripts run indexnow
 *
 * To publish a new blog post and ping in one step:
 *   pnpm --filter @workspace/scripts run publish-post
 * This regenerates the sitemap from blog-posts.ts then immediately pings IndexNow.
 *
 * IndexNow notifies Bing, Yandex, Seznam, and other compatible engines
 * immediately, so pages are crawled/indexed within minutes instead of
 * waiting for the regular crawl queue.
 *
 * The key file must be reachable at:
 *   https://counselo-legal.com/611ed21ca6ffe639fa0e476e8ea1aedb9df6601ed775825f6aa2d75da664ab5a.txt
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const INDEXNOW_KEY = "611ed21ca6ffe639fa0e476e8ea1aedb9df6601ed775825f6aa2d75da664ab5a";
const HOST = "counselo-legal.com";
const SITEMAP_PATH = resolve(__dirname, "../../artifacts/legal-site/public/sitemap.xml");
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function extractLocs(xml: string): string[] {
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((m) => m[1].trim());
}

async function pingIndexNow(urls: string[]): Promise<void> {
  const body = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  });

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });

  if (res.status === 200 || res.status === 202) {
    console.log(`[indexnow] ✓ Accepted — submitted ${urls.length} URLs (HTTP ${res.status})`);
  } else if (res.status === 202) {
    console.log(`[indexnow] ✓ Accepted — submitted ${urls.length} URLs (HTTP ${res.status})`);
  } else {
    const text = await res.text().catch(() => "");
    console.error(`[indexnow] ✗ Unexpected response HTTP ${res.status}: ${text}`);
    process.exit(1);
  }
}

const xml = readFileSync(SITEMAP_PATH, "utf-8");
const urls = extractLocs(xml);

if (urls.length === 0) {
  console.error("[indexnow] No URLs found in sitemap — aborting.");
  process.exit(1);
}

console.log(`[indexnow] Submitting ${urls.length} URLs from sitemap to IndexNow…`);
await pingIndexNow(urls);
