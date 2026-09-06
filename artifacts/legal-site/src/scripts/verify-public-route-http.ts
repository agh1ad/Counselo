import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";


const root = resolve(import.meta.dirname, "../../../..");
const origin = process.argv[2] ?? "http://127.0.0.1:24439";
const input = JSON.parse(readFileSync(resolve(root, "docs/page-seo-ledger-2026-09-06.json"), "utf8"));
const results: { route: string; status?: number; bytes?: number; canonical?: string; issues: string[] }[] = [];
let cursor = 0;
async function worker() {
  while (cursor < input.pages.length) {
    const page = input.pages[cursor++];
    try {
      const response = await fetch(new URL(page.route, origin), { redirect: "manual", signal: AbortSignal.timeout(45_000) });
      const html = await response.text();
      const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1] ?? "";
      const language = html.match(/<html\b[^>]*lang="([^"]+)"/i)?.[1];
      const issues: string[] = [];
      if (response.status !== 200) issues.push(`Expected 200, received ${response.status}`);
      if (canonical !== page.canonical) issues.push(`Canonical mismatch: ${canonical}`);
      if (language !== page.language) issues.push(`Language mismatch: ${language}`);
      if (/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html) || /noindex/i.test(response.headers.get("x-robots-tag") ?? "")) issues.push("Indexable route returned noindex");
      if (!/<h1\b/i.test(html)) issues.push("Missing initial H1");
      if (/data-ssr="true"/.test(html) && page.family === "article" && !/window\.__SSR_POST__=/.test(html)) issues.push("Hydrated article is missing full detail bootstrap");
      if (/data-ssr="true"/.test(html) && page.family === "work example" && !/window\.__SSR_WORK__=/.test(html)) issues.push("Hydrated work page is missing full detail bootstrap");
      results.push({ route: page.route, status: response.status, bytes: Buffer.byteLength(html), canonical, issues });
    } catch (error) { results.push({ route: page.route, issues: [String(error)] }); }
    if (results.length % 200 === 0) console.log(`HTTP checked ${results.length}/${input.pages.length}`);
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
const redirectResults = [];
const buildReport = JSON.parse(readFileSync(resolve(root, "artifacts/legal-site/seo-validation-report.json"), "utf8"));
for (const redirect of buildReport.pages.filter((page: { isRedirect: boolean }) => page.isRedirect)) {
  const route = String(redirect.route);
  const destination = new URL(String(redirect.redirectTo), "https://counselo-legal.com").pathname;
  const issues: string[] = [];
  try {
    const response = await fetch(new URL(route, origin), { redirect: "manual", signal: AbortSignal.timeout(15_000) });
    if (![301, 308].includes(response.status)) issues.push(`Expected permanent redirect, received ${response.status}`);
    if (new URL(response.headers.get("location") ?? "", origin).pathname !== destination) issues.push(`Incorrect destination: ${response.headers.get("location")}`);
    if (!input.pages.some((page: { route: string }) => page.route === destination)) issues.push("Destination absent from verified active inventory");
    await response.body?.cancel();
  } catch (error) { issues.push(String(error)); }
  redirectResults.push({ route, destination, issues });
}
results.sort((a, b) => a.route.localeCompare(b.route));
const failed = results.filter(r => r.issues.length);
const redirectFailures = redirectResults.filter(item => item.issues.length);
const result = { generatedAt: new Date().toISOString(), origin, scope: "HTTP delivery from the tested origin, not production publication or search-engine indexing", summary: { checked: results.length, passed: results.length - failed.length, failed: failed.length, redirectsChecked: redirectResults.length, redirectsFailed: redirectFailures.length }, pages: results, redirects: redirectResults };
writeFileSync(resolve(root, "docs/http-seo-verification-2026-09-06.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result.summary));
if (failed.length) { console.error(JSON.stringify(failed.slice(0, 20), null, 2)); process.exitCode = 1; }
if (redirectFailures.length) { console.error(JSON.stringify(redirectFailures.slice(0, 20), null, 2)); process.exitCode = 1; }
