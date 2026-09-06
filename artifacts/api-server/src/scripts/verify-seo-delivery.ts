import assert from "node:assert/strict";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import express from "express";
import { LEGACY_BLOG_REDIRECTS, LEGACY_SEARCH_REDIRECTS } from "@workspace/api-zod";
import { prerenderedRedirect } from "../lib/prerendered-redirect.js";
import { repairPublicBlogPost } from "../lib/public-blog-repairs.js";
import { repairPublicWorkSample } from "../lib/public-work-repairs.js";
import { renderPublicBlogBody } from "../lib/public-blog-body.js";

// Isolated route harness: no production database connection or mutations.
process.env.NODE_ENV = "production";
process.env.DATABASE_URL = "postgresql://test:test@127.0.0.1:5432/counselo_renderer_test";
const { registerOgPageRoutes, buildDynamicWorkHtml, buildDynamicBlogHtml } = await import("../og-pages.js");
const root = resolve(import.meta.dirname, "../../../..");
const directory = resolve(root, "artifacts/legal-site/dist/public/__pages");
const redirects = readdirSync(directory).filter(file => file.startsWith("uae-") && file.endsWith(".html")).flatMap(file => {
  const html = readFileSync(resolve(directory, file), "utf8");
  const source = html.match(/name="x-source-route" content="([^"]+)"/)?.[1];
  const target = source ? prerenderedRedirect(html, source) : undefined;
  return source && target && !LEGACY_SEARCH_REDIRECTS[source] ? [{ source, target }] : [];
});
assert.equal(redirects.length, 264, "Rebuild the site before verifying all consolidation redirects");
const app = express();
registerOgPageRoutes(app);
const server = app.listen(0, "127.0.0.1");
await new Promise<void>(resolve => server.once("listening", resolve));
const address = server.address();
assert.ok(address && typeof address !== "string");
const origin = `http://127.0.0.1:${address.port}`;
const issues: string[] = [];
let workPages = 0;
let articlePages = 0;
try {
  for (const { source, target } of [...redirects, ...Object.entries({ ...LEGACY_BLOG_REDIRECTS, ...LEGACY_SEARCH_REDIRECTS }).map(([source, target]) => ({ source, target }))]) {
    const response = await fetch(`${origin}${source}`, { redirect: "manual", signal: AbortSignal.timeout(15000) });
    if (response.status !== 301 || response.headers.get("location") !== target) issues.push(`Redirect failed: ${source}`);
    await response.body?.cancel();
  }
  for (const target of new Set(redirects.map(item => item.target))) {
    const response = await fetch(`${origin}${target}`, { redirect: "manual", signal: AbortSignal.timeout(15000) });
    const html = await response.text();
    if (response.status !== 200 || !html.includes(`href="https://counselo-legal.com${target}"`)) issues.push(`Target failed: ${target}`);
  }
  // Published, public records only; render them through the actual API-server renderer.
  const response = await fetch("https://counselo-legal.com/api/work", { signal: AbortSignal.timeout(30000) });
  assert.ok(response.ok, "Public work corpus unavailable");
  const samples = (await response.json() as Parameters<typeof buildDynamicWorkHtml>[0][]).map(repairPublicWorkSample);
  const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  for (const sample of samples) for (const language of ["en", "ar"] as const) {
    if (!(language === "en" ? sample.titleEn : sample.titleAr)) continue;
    const html = buildDynamicWorkHtml(sample, language);
    const body = html.split("<body>")[1] ?? "";
    for (const [en, ar] of [[sample.challengeEn, sample.challengeAr], [sample.approachEn, sample.approachAr], [sample.outcomeEn, sample.outcomeAr]]) {
      const value = language === "ar" ? ar || en : en || ar;
      if (value && !body.includes(escape(value))) issues.push(`Missing production narrative: ${language}/${sample.slug}`);
    }
    workPages++;
  }
  const articlesResponse = await fetch("https://counselo-legal.com/api/blog/posts", { signal: AbortSignal.timeout(30000) });
  assert.ok(articlesResponse.ok, "Public article corpus unavailable");
  const articles = (await articlesResponse.json() as Parameters<typeof buildDynamicBlogHtml>[0][]).map(repairPublicBlogPost);
  for (const post of articles) for (const language of ["en", "ar"] as const) {
    if (!(language === "en" ? post.titleEn : post.titleAr)) continue;
    const html = buildDynamicBlogHtml(post, language);
    const expected = renderPublicBlogBody(post, language);
    const body = html.split("<body>")[1]?.replace(/<script\b[\s\S]*?<\/script>/gi, "") ?? "";
    if (!expected || !body.includes(`<div id="article-content">${expected}</div>`)) issues.push(`Missing production article body: ${language}/${post.slug}`);
    if ((body.match(/<h1\b/g) ?? []).length !== 1) issues.push(`Article heading count: ${language}/${post.slug}`);
    articlePages++;
  }
} finally {
  await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
}
const report = { generatedAt: new Date().toISOString(), scope: "Isolated production API route handler and renderer; public work and article records; no deployment or indexing assertion", redirectsChecked: redirects.length + Object.keys(LEGACY_BLOG_REDIRECTS).length + Object.keys(LEGACY_SEARCH_REDIRECTS).length, targetsChecked: new Set(redirects.map(item => item.target)).size, workPagesChecked: workPages, articlePagesChecked: articlePages, issues };
writeFileSync(resolve(root, "docs/production-handler-seo-verification-2026-09-06.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report));
if (issues.length) process.exitCode = 1;
