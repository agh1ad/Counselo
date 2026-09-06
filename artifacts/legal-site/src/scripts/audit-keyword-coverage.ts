/** Read-only input audit. No keyword is automatically published or treated as a ranking. */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, basename } from "node:path";

const inputs = process.argv.slice(2);
if (!inputs.length) throw new Error("Pass Keyword Planner export paths as arguments");
const normalize = (s: string) => s.normalize("NFKC").replace(/[\u064B-\u065F\u0670\u0640]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/\s+/g, " ").trim().toLowerCase();
function parseTsv(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = [], value = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') { if (quoted && text[i + 1] === '"') { value += '"'; i++; } else quoted = !quoted; }
    else if (!quoted && (c === "\t" || c === "\n")) { row.push(value.replace(/\r$/, "")); value = ""; if (c === "\n") { rows.push(row); row = []; } }
    else value += c;
  }
  if (quoted) throw new Error("Unclosed quoted field");
  if (value || row.length) { row.push(value.replace(/\r$/, "")); rows.push(row); }
  return rows;
}
const keywords = new Map<string, { keyword: string; monthlySearches: number | null; sources: string[] }>();
const sources: { file: string; period: string; rows: number }[] = [];
for (const file of inputs) {
  const buffer = readFileSync(file);
  const rows = parseTsv(buffer.toString(buffer[0] === 255 && buffer[1] === 254 ? "utf16le" : "utf8").replace(/^\uFEFF/, ""));
  const header = rows.findIndex(row => row[0] === "Keyword");
  if (header < 0) throw new Error(`Missing Keyword header in ${basename(file)}`);
  const volumeColumn = rows[header].indexOf("Avg. monthly searches");
  if (volumeColumn < 0) throw new Error("Missing volume column");
  const data = rows.slice(header + 1).filter(row => row[0]?.trim());
  sources.push({ file: basename(file), period: rows[1]?.[0] ?? "unknown", rows: data.length });
  for (const row of data) {
    const keyword = row[0].trim();
    const monthlySearches = row[volumeColumn]?.trim() ? Number(row[volumeColumn].replace(/,/g, "")) : null;
    if (monthlySearches !== null && !Number.isFinite(monthlySearches)) throw new Error(`Invalid volume: ${keyword}`);
    const existing = keywords.get(keyword);
    if (existing && existing.monthlySearches !== monthlySearches) throw new Error(`Conflicting duplicate volume: ${keyword}`);
    keywords.set(keyword, { keyword, monthlySearches, sources: [...(existing?.sources ?? []), basename(file)] });
  }
}
const pagesDir = resolve(import.meta.dirname, "../../dist/public/__pages");
const pageFiles = [...readdirSync(pagesDir).filter(file => file.endsWith(".html")).map(file => resolve(pagesDir, file)), resolve(pagesDir, "../index.html")];
const pages = pageFiles.flatMap(file => {
  const html = readFileSync(file, "utf8");
  if (/content="[^"]*noindex/.test(html)) return [];
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  if (!canonical) return [];
  const text = (html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "")
    .replace(/<(script|style|nav|header|footer)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (_, hex, decimal) => String.fromCodePoint(parseInt(hex ?? decimal, hex ? 16 : 10))).replace(/\s+/g, " ");
  return [{ canonical, text, normalized: normalize(text) }];
});
const rows = [...keywords.values()].map(item => {
  const exactUrls = pages.filter(page => page.text.includes(item.keyword)).map(page => page.canonical);
  const normalizedUrls = pages.filter(page => page.normalized.includes(normalize(item.keyword))).map(page => page.canonical);
  const reviewReason = /مجانا|مجاني|العراق|وظائف|دورات|دورة|زي المحامي|هيئة المحامين|وزارة العدل|^منصة العقد$|^المحكمة التنفيذ$|^محكمة الاستئناف$/.test(item.keyword)
    ? "Check free-service claims, geographic relevance, or non-client/navigational intent before targeting"
    : normalizedUrls.length ? "Check intent and Search Console landing page before selecting a primary URL" : "Editorial review needed; absence of literal wording is not proof of a ranking gap";
  return { ...item, exactUrls, normalizedUrls, reviewReason };
});
const result = {
  generatedAt: new Date().toISOString(), sources,
  scope: "Local generated HTML text, excluding scripts, styles and navigation; not a live index or ranking audit. Visibility is approximated from HTML, not computed CSS.",
  limitations: "Location/network settings are absent. Rounded volumes include close variants and must not be summed as separate audiences. These Google reports do not establish Bing demand.",
  summary: { sourceRows: sources.reduce((sum, source) => sum + source.rows, 0), uniqueKeywords: rows.length, pagesChecked: pages.length, exactPhrasePresent: rows.filter(row => row.exactUrls.length).length, normalizedPhrasePresent: rows.filter(row => row.normalizedUrls.length).length },
  rows,
};
const output = resolve(import.meta.dirname, "../../../../output/seo/keyword-coverage-2026-09-06.json");
mkdirSync(resolve(output, ".."), { recursive: true });
writeFileSync(output, JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ ...result.summary, output }));
