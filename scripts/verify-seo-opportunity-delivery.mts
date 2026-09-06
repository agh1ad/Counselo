import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SOURCE_BACKED_SEARCH_GUIDANCE } from '../artifacts/legal-site/src/lib/source-backed-search-guidance.ts';
import { LIBRARY_READING_PATHS } from '../artifacts/legal-site/src/lib/library-reading-paths.ts';

const root = resolve(import.meta.dirname, '..');
const origin = process.argv[2];
const reportPath = process.argv[3] ?? 'docs/seo-opportunity-delivery-local-2026-09-06.json';
const build = JSON.parse(readFileSync(resolve(root, 'artifacts/legal-site/seo-validation-report.json'), 'utf8'));
const inventory = new Map<string, {file: string}>(build.pages.filter((p: any) => !p.isRedirect).map((p: any) => [p.route, p]));
const normalize = (s: string) => s.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/&#x([0-9a-f]+);/gi, (_,x)=>String.fromCodePoint(parseInt(x,16))).replace(/&#(\d+);/g,(_,x)=>String.fromCodePoint(Number(x))).replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/\s+/g,' ').trim();
const routes = new Set<string>();
for (const item of SOURCE_BACKED_SEARCH_GUIDANCE) for (const lang of ['en','ar']) routes.add(`/${item.region}${lang==='ar'?'/ar':''}/services/${item.service}`);
for (const route of inventory.keys()) if (/\/(contact|about)$/.test(route) || route.endsWith('/legal-library')) routes.add(route);
const rows = [];
for (const route of routes) {
  let html: string;
  const issues: string[] = [];
  if (origin) {
    const response = await fetch(new URL(route,origin),{signal:AbortSignal.timeout(30000)});
    if(response.status!==200) issues.push(`HTTP ${response.status}`);
    html=await response.text();
  } else html=readFileSync(resolve(root,'artifacts/legal-site/dist/public',inventory.get(route)!.file),'utf8');
  const body=normalize(html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1]??html);
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map(m=>m[1].replace(/&amp;/g,'&'));
  let answers=0, topicLinks=0;
  for(const item of SOURCE_BACKED_SEARCH_GUIDANCE) for(const lang of ['en','ar'] as const) {
    if(route!==`/${item.region}${lang==='ar'?'/ar':''}/services/${item.service}`) continue;
    for(const passage of [item[lang].q,item[lang].a]) if(!body.includes(normalize(passage))) issues.push(`Missing visible ${item.id} passage`);
    for(const source of item.sources) if(!links.includes(source.href)) issues.push(`Missing visible source ${source.href}`);
    answers++;
  }
  if(route.endsWith('/contact')) for(const suffix of ['privacy-policy','terms-of-service']) if(!links.includes(route.replace(/contact$/,suffix))) issues.push(`Missing ${suffix} link`);
  if(route.endsWith('/about')&&!links.includes(route.replace(/about$/,'vision'))) issues.push('Missing vision link');
  if(route.endsWith('/legal-library')) {
    const language=route.startsWith('/ar/')?'ar':'en';
    const section=html.match(/<section\b[^>]*id="reading-by-question"[^>]*>([\s\S]*?)<\/section>/)?.[1]??'';
    for(const group of LIBRARY_READING_PATHS) for(const slug of group.slugs) {
      const target=`/blog/${language}/${slug}`;
      if(!section.includes(`href="${target}"`)) issues.push(`Missing reading-topic link ${target}`);else topicLinks++;
    }
  }
  rows.push({route,answers,topicLinks,issues});
}
const result={generatedAt:new Date().toISOString(),origin:origin??'local-initial-html',scope:'All routes affected by the new source-backed answers, article reading paths, contact policy links and about-to-vision links. Shared hydration and full-inventory checks are separate.',summary:{pages:rows.length,failed:rows.filter(r=>r.issues.length).length,visibleAnswers:rows.reduce((n,r)=>n+r.answers,0),topicArticleLinks:rows.reduce((n,r)=>n+r.topicLinks,0)},pages:rows};
writeFileSync(resolve(root,reportPath),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result.summary));
if(result.summary.failed){console.error(JSON.stringify(rows.filter(r=>r.issues.length)));process.exitCode=1;}
