import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {validateEditorial} from '../legal-updates/editorial.js';
import {updateContext,updateArchivePath,legalUpdatesSitemapDocument} from '@workspace/api-zod';
process.env.DATABASE_URL ||= 'postgres://test:test@127.0.0.1:1/test';
const {pool}=await import('@workspace/db');
const {checkPublishedSources}=await import('../legal-updates/monitor.js');
test('corrections and images cannot publish with a missing Arabic counterpart',()=>{
 assert.throws(()=>validateEditorial({correctionEn:'A material correction'},'sa'),/both English and Arabic/);
 assert.throws(()=>validateEditorial({imageUrl:'https://counselo-legal.com/test.png',imageAltEn:'An official document'},'sa'),/English and Arabic alternatives/);
 assert.throws(()=>validateEditorial({status:'superseded'},'sa'),/later published update/);
 assert.throws(()=>validateEditorial({relatedMatterPaths:['/uae/services/companies-law/example']},'sa'),/same jurisdiction/);
});
test('archive routes preserve locale and reject unknown taxonomy and page-one duplicates',()=>{
 assert.equal(updateArchivePath('sa','ar','companies-law',2),'/sa/ar/legal-updates/practice/companies-law/page/2');
 assert.equal(updateContext('/sa/ar/legal-updates/practice/companies-law/page/2')?.page,2);
 assert.equal(updateContext('/sa/legal-updates/practice/not-a-real-service'),null);
 assert.equal(updateContext('/legal-updates/page/1'),null);
 assert.equal(updateContext('/sa/legal-updates/page/-1'),null);
});
test('large sitemaps split into bounded documents and reject missing parts',()=>{
 const rows=Array.from({length:10001},(_,i)=>({slug:`example-${i}`,region:'sa' as const,modifiedAt:'2026-09-12T00:00:00Z'}));
 assert.match(legalUpdatesSitemapDocument(rows)!,/<sitemapindex/);
 assert.equal((legalUpdatesSitemapDocument(rows,1)!.match(/<url>/g)||[]).length,20008);
 assert.equal(legalUpdatesSitemapDocument(rows,3),null);
});
test('source monitoring detects a changed snapshot without generating or publishing content',async()=>{
 const quote='Official source text for a local test.';
 const original=globalThis.fetch;
 const writes:{sql:string;values:unknown[]}[]=[];
 Object.defineProperty(pool,'query',{configurable:true,value:async(sql:string,values:unknown[]=[])=>{
   if(sql.startsWith('SELECT'))return {rows:[{id:'fixture',region:'sa',source_url:'https://www.moj.gov.sa/test',source_hash:createHash('sha256').update(quote).digest('hex')}]};
   writes.push({sql,values});return {rows:[],rowCount:1};
 }});
 globalThis.fetch=(async(input)=>new Response(String(input).endsWith('/robots.txt')?'User-agent: *\nAllow: /':'<p>Changed official text</p>',{headers:{'Content-Type':String(input).endsWith('/robots.txt')?'text/plain':'text/html'}})) as typeof fetch;
 try{
  const report=await checkPublishedSources();assert.equal(report[0].status,'changed');assert.equal(writes.length,1);assert.equal(writes[0].values[1],'changed');assert.ok(!writes[0].sql.includes("status='draft'"));assert.ok(!writes[0].sql.includes('SET draft='));
 }finally{globalThis.fetch=original;}
});
