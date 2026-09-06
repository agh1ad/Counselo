import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { repairPublicBlogPost } from "../../../api-server/src/lib/public-blog-repairs";
import { repairPublicWorkSample } from "../../../api-server/src/lib/public-work-repairs";

// Read-only integration preview. Public snapshots stand in for the production
// database; the compiled standalone server renders the actual website.
// No form, admin, database or messaging writes are exposed by this harness.
const root = resolve(import.meta.dirname, "../../../..");
const posts = JSON.parse(readFileSync(resolve(root, "output/seo/articles-public-snapshot.json"), "utf8")).filter((post: any) => post.published).map(repairPublicBlogPost);
const work = JSON.parse(readFileSync(resolve(root, "output/seo/work-public-snapshot.json"), "utf8")).filter((sample: any) => sample.published).map(repairPublicWorkSample);
const port = Number(process.argv[2] ?? 24441);
const website = process.argv[3] ?? "http://127.0.0.1:24438";
createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); res.end("Read-only verification preview"); return; }
  const url = new URL(req.url ?? "/", "http://localhost");
  const send = (body: Buffer, status: number, headers: Record<string, string>) => {
    const compress = /\bgzip\b/.test(req.headers["accept-encoding"] ?? "") && body.length > 1024 && /text\/|javascript|json|svg/.test(headers["content-type"] ?? "");
    if (compress) { body = gzipSync(body); headers["content-encoding"] = "gzip"; headers.vary = "Accept-Encoding"; }
    res.writeHead(status, { ...headers, "content-length": String(body.length) });
    res.end(req.method === "HEAD" ? undefined : body);
  };
  const json = (value: unknown, status = 200) => send(Buffer.from(JSON.stringify(value)), status, { "content-type": "application/json", "cache-control": "no-store" });
  if (url.pathname === "/api/blog/posts") return json(posts);
  if (url.pathname === "/api/blog/posts/discovery") {
    // Match the production discovery route: bodies and provenance are not sent
    // to listing consumers. Keep this explicit so preview timings are useful.
    const fields = ["id", "slug", "date", "updatedAt", "categoryEn", "categoryAr", "readTime", "titleEn", "titleAr", "excerptEn", "excerptAr", "seoTitleEn", "seoTitleAr", "seoDescriptionEn", "seoDescriptionAr", "relatedServiceSlugs", "relatedBlogSlugs", "relatedWorkSlugs"];
    return json(posts.map((post: any) => ({ ...Object.fromEntries(fields.map(key => [key, post[key]])), published: true, bilingual: true })));
  }
  if (url.pathname === "/api/work") return json(work);
  const article = url.pathname.match(/^\/api\/blog\/posts\/([^/]+)$/);
  if (article) { const post = posts.find((row: any) => row.slug === decodeURIComponent(article[1])); return json(post ?? { error: "not found" }, post ? 200 : 404); }
  const sampleMatch = url.pathname.match(/^\/api\/work\/([^/]+)$/);
  if (sampleMatch) { const sample = work.find((row: any) => row.slug === decodeURIComponent(sampleMatch[1])); return json(sample ?? { error: "not found" }, sample ? 200 : 404); }
  const file = /^\/api\/work\/[^/]+\/file$/.test(url.pathname);
  if (url.pathname.startsWith("/api/") && !file) return json({ error: "Not exposed by read-only preview" }, 404);
  try {
    const response = await fetch(new URL(url.pathname + url.search, file ? "https://counselo-legal.com" : website), { redirect: "manual", signal: AbortSignal.timeout(45_000) });
    const body = Buffer.from(await response.arrayBuffer());
    const headers = Object.fromEntries([...response.headers].filter(([name]) => !["content-length", "content-encoding", "transfer-encoding", "connection"].includes(name)));
    send(body, response.status, headers);
  } catch (error) { res.writeHead(502, { "Content-Type": "text/plain" }); res.end(String(error)); }
}).listen(port, "127.0.0.1", () => console.log(`Read-only SEO preview on http://127.0.0.1:${port}; website ${website}; public snapshot API`));
