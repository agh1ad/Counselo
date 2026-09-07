import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { MATTER_SOURCE_GUIDANCE, matterGuidanceUpdatedAt } from '../artifacts/legal-site/src/lib/matter-source-guidance.ts';
import { SOURCE_BACKED_SEARCH_GUIDANCE, serviceGuidanceUpdatedAt } from '../artifacts/legal-site/src/lib/source-backed-search-guidance.ts';
import { getLegalProblemPage } from '../artifacts/legal-site/src/lib/legal-problem-pages.ts';
import { EMPLOYMENT_SEARCH_GUIDANCE } from '../artifacts/legal-site/src/lib/employment-search-guidance.ts';
import { INTENT_EXPANSION_GUIDANCE } from '../artifacts/legal-site/src/lib/intent-expansion-guidance.ts';

const root = resolve(import.meta.dirname, '..');
const report = JSON.parse(readFileSync(resolve(root, 'artifacts/legal-site/seo-validation-report.json'), 'utf8'));
const files = new Map<string, string>(report.pages.filter((p: any) => !p.isRedirect).map((p: any) => [p.route, p.file]));
const publicRoot = resolve(root, 'artifacts/legal-site/dist/public');
const sitemap = readdirSync(publicRoot).filter(file => /^sitemap.*\.xml$/.test(file))
  .map(file => readFileSync(resolve(publicRoot, file), 'utf8')).join('\n');
const sitemapDates = new Map([...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => [
  m[1].match(/<loc>https:\/\/counselo-legal.com([^<]*)<\/loc>/)?.[1],
  m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
]));
const normalize = (s: string) => s.replace(/<[^>]*>/g, ' ')
  .replace(/&#x([0-9a-f]+);/gi, (_, v) => String.fromCodePoint(parseInt(v, 16)))
  .replace(/&#(\d+);/g, (_, v) => String.fromCodePoint(+v))
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'")
  .replace(/\s+/g, ' ').trim();
type Evidence = { route: string; answerIds: string[]; htmlSha256: string; issues: string[] };
const pages = new Map<string, Evidence>();
type Guidance = typeof SOURCE_BACKED_SEARCH_GUIDANCE[number];

function verify(route: string, item: Guidance, lang: 'en' | 'ar', modified: string) {
  const file = files.get(route);
  assert.ok(file, `Missing retained route ${route}`);
  const raw = readFileSync(resolve(root, 'artifacts/legal-site/dist/public', file), 'utf8');
  const visible = normalize(raw.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, ''));
  const nodes = [...raw.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => {
    const node = JSON.parse(m[1]);
    return Array.isArray(node) ? node : node['@graph'] ?? [node];
  });
  const faq = nodes.flatMap((n: any) => n['@type'] === 'FAQPage' ? n.mainEntity : []);
  const row = pages.get(route) ?? { route, answerIds: [], htmlSha256: createHash('sha256').update(raw).digest('hex'), issues: [] };
  row.answerIds.push(item.id);
  if (![item[lang].q, item[lang].a].every(text => visible.includes(normalize(text)))) row.issues.push(`${item.id}: missing visible question or answer`);
  if (!faq.some((q: any) => q.name === item[lang].q && q.acceptedAnswer?.text === item[lang].a)) row.issues.push(`${item.id}: FAQ schema differs from answer`);
  for (const source of item.sources) {
    if (!raw.includes(`href="${source.href.replace(/&/g, '&amp;')}"`)) row.issues.push(`${item.id}: missing source anchor ${source.href}`);
  }
  if (!nodes.some((node: any) => node['@type'] === 'WebPage' && node.dateModified === modified)) row.issues.push(`WebPage dateModified must be ${modified}`);
  if (sitemapDates.get(route) !== modified) row.issues.push(`Sitemap lastmod must be ${modified}`);
  pages.set(route, row);
}

for (const item of MATTER_SOURCE_GUIDANCE) for (const slug of item.problems) {
  const page = getLegalProblemPage(item.region, item.service, slug);
  assert.ok(page, `Missing matter ${item.region}/${item.service}/${slug}`);
  const modified = matterGuidanceUpdatedAt(item.region, item.service, slug, page.contentUpdatedAt ?? page.legalAccuracy.reviewedAt);
  for (const lang of ['en', 'ar'] as const) verify(`/${item.region}${lang === 'ar' ? '/ar' : ''}/services/${item.service}/${slug}`, item, lang, modified);
}
for (const item of SOURCE_BACKED_SEARCH_GUIDANCE) {
  const modified = serviceGuidanceUpdatedAt(item.region, item.service, '2026-09-06');
  for (const lang of ['en', 'ar'] as const) verify(`/${item.region}${lang === 'ar' ? '/ar' : ''}/services/${item.service}`, item, lang, modified);
}
const newIds = new Set(EMPLOYMENT_SEARCH_GUIDANCE.map(item => item.id));
const expandedIds = new Set(INTENT_EXPANSION_GUIDANCE.map(item => item.id));
const rows = [...pages.values()];
const result = {
  taskStatus: 'in-progress', verifiedAt: new Date().toISOString(),
  environment: 'local production HTML; no live deployment or ranking claim',
  summary: { pages: rows.length, answerDeliveries: rows.reduce((n, p) => n + p.answerIds.length, 0),
    employmentPagesChanged: rows.filter(p => p.answerIds.some(id => newIds.has(id))).length,
    expansionPagesChanged: rows.filter(p => p.answerIds.some(id => expandedIds.has(id))).length,
    failedPages: rows.filter(p => p.issues.length).length, fullIntentReviewsCompleted: 0 },
  pages: rows,
};
writeFileSync(resolve(root, 'docs/search-intent-expansion-delivery-2026-09-07.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result.summary));
if (result.summary.failedPages) { console.error(rows.filter(p => p.issues.length)); process.exitCode = 1; }
