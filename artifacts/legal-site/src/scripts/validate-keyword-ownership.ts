import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getServicesForRegion } from "@workspace/api-zod/browser";
import { getLegalProblemPaths } from "../lib/legal-problem-pages.js";
import { validateKeywordOwnership, type OwnershipRow, type OwnershipPolicy } from "../lib/keyword-ownership.js";

const read = (file: string) => JSON.parse(readFileSync(fileURLToPath(new URL(`../../../../docs/keyword-ownership/${file}`, import.meta.url)), "utf8"));
const matrix = read("matrix.json") as { rows: OwnershipRow[] };
const policy = read("policy.json") as OwnershipPolicy;
const paths = getLegalProblemPaths();
for (const country of ["sa", "syr", "uae"] as const) for (const lang of ["ar", "en"] as const) {
  const prefix = `/${country}${lang === "ar" ? "/ar" : ""}`;
  paths.push(prefix, ...getServicesForRegion(country).map(service => `${prefix}/services/${service.slug}`));
}
const errors = validateKeywordOwnership(matrix.rows, policy, new Set(paths.map(path => `https://counselo-legal.com${path}`)));
const evidence = read("search-evidence.json") as Array<{ id: string; query: string; selected_competitor_url: string | null; returned_urls: string[] }>;
for (const row of matrix.rows as Array<OwnershipRow & { competitor_url: string | null }>) {
  const source = evidence.find(item => item.id === row.id);
  if (!source || source.query !== row.query || source.selected_competitor_url !== row.competitor_url || (row.competitor_url && !source.returned_urls.includes(row.competitor_url))) errors.push(`Missing or mismatched search evidence: ${row.id}`);
  if (row.competitor_url && /counselo-legal\.com|baghdadilaw\.co|omarbaghdadi\.com/.test(new URL(row.competitor_url).hostname)) errors.push(`Related site marked independent competitor: ${row.id}`);
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`Keyword ownership PASS: ${matrix.rows.length} queries, ${policy.owners.length} country/language/intent owners, ${policy.supporting_routes.length} supporting-route restrictions; current route and search-evidence checks passed.`);
