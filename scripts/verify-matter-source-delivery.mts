import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { MATTER_SOURCE_GUIDANCE } from '../artifacts/legal-site/src/lib/matter-source-guidance.ts';
const root=resolve(import.meta.dirname,'..');
const report=JSON.parse(readFileSync(resolve(root,'artifacts/legal-site/seo-validation-report.json'),'utf8'));
const files=new Map(report.pages.filter((p:any)=>!p.isRedirect).map((p:any)=>[p.route,p.file]));
const normalize=(s:string)=>s.replace(/<[^>]*>/g,' ').replace(/&#x([0-9a-f]+);/gi,(_,v)=>String.fromCodePoint(parseInt(v,16))).replace(/&#(\d+);/g,(_,v)=>String.fromCodePoint(+v)).replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&apos;|&#39;/g,"'").replace(/\s+/g,' ').trim();
const rows=[];
for(const item of MATTER_SOURCE_GUIDANCE) for(const problem of item.problems) for(const lang of ['en','ar'] as const){
 const route=`/${item.region}${lang==='ar'?'/ar':''}/services/${item.service}/${problem}`;
 const file=files.get(route); if(!file)throw Error(`Missing route ${route}`);
 const raw=readFileSync(resolve(root,'artifacts/legal-site/dist/public',file as string),'utf8');
 const visible=normalize(raw.replace(/<script\b[\s\S]*?<\/script>/gi,'').replace(/<style\b[\s\S]*?<\/style>/gi,''));
 const nodes=[...raw.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>{const j=JSON.parse(m[1]);return Array.isArray(j)?j:j['@graph']??[j]});
 const faq=nodes.flatMap((n:any)=>n['@type']==='FAQPage'?n.mainEntity:[]);
 const issues=[];
 for(const passage of [item[lang].q,item[lang].a]) if(!visible.includes(normalize(passage)))issues.push('Missing visible passage: '+passage);
 if(!faq.some((q:any)=>q.name===item[lang].q&&q.acceptedAnswer?.text===item[lang].a))issues.push('Visible answer missing or different in FAQ schema');
 for(const s of item.sources)if(!raw.includes(`href="${s.href.replace(/&/g,'&amp;')}"`))issues.push('Missing crawlable source '+s.href);
 rows.push({route,id:item.id,htmlSha256:createHash('sha256').update(raw).digest('hex'),issues});
}
const answerPages=rows.length;
let administrativePages=0;
for(const [route,file] of files){
 if(!/^\/sa(?:\/ar)?\/services\/administrative-law(?:\/|$)/.test(route as string))continue;
 administrativePages++;
 const raw=readFileSync(resolve(root,'artifacts/legal-site/dist/public',file as string),'utf8');
 const issues=raw.includes('href="https://www.bog.gov.sa/"')?[]:['Missing Board of Grievances primary source'];
 const existing=rows.find(x=>x.route===route);
 if(existing)existing.issues.push(...issues);else rows.push({route:route as string,id:'saudi-administrative-primary-source',htmlSha256:createHash('sha256').update(raw).digest('hex'),issues});
}
const result={generatedAt:new Date().toISOString(),environment:'local production initial HTML',summary:{pages:rows.length,answerPages,administrativePages,failed:rows.filter(x=>x.issues.length).length},pages:rows};
writeFileSync(resolve(root,'docs/matter-source-delivery-2026-09-07.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result.summary));if(result.summary.failed){console.error(rows.filter(x=>x.issues.length));process.exitCode=1;}
