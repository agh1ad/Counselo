import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { EMPLOYMENT_SEARCH_GUIDANCE } from '../artifacts/legal-site/src/lib/employment-search-guidance.ts';
import { INTENT_EXPANSION_GUIDANCE } from '../artifacts/legal-site/src/lib/intent-expansion-guidance.ts';

const root = resolve(import.meta.dirname, '..');
const targets = new Map<string, { route: string; language: string; answers: { q: string; a: string }[] }>();
const followup = process.argv.includes('--followup');
const employmentIds = new Set(EMPLOYMENT_SEARCH_GUIDANCE.map(item => item.id));
let selected = followup ? INTENT_EXPANSION_GUIDANCE.filter(item => !employmentIds.has(item.id)) : EMPLOYMENT_SEARCH_GUIDANCE;
const moduleOption = process.argv.find(arg => arg.startsWith('--modules='))?.slice('--modules='.length);
const batchName = process.argv.find(arg => arg.startsWith('--batch-name='))?.slice('--batch-name='.length);
if (batchName && !/^[a-z0-9-]+$/.test(batchName)) throw new Error('Invalid batch name');
if (moduleOption) {
  selected = [];
  for (const name of moduleOption.split(',')) {
    if (!/^[a-z-]+$/.test(name)) throw new Error('Invalid guidance module');
    const stem = name === 'service-hub-scope' ? `${name}-guidance` : `${name}-search-guidance`;
    const imported = await import(`../artifacts/legal-site/src/lib/${stem}.ts`);
    const answers = imported[stem.replaceAll('-', '_').toUpperCase()];
    if (!Array.isArray(answers)) throw new Error(`Missing guidance export: ${name}`);
    selected.push(...answers);
  }
}
for (const item of selected) for (const lang of ['en', 'ar'] as const) {
  const base = `/${item.region}${lang === 'ar' ? '/ar' : ''}/services/${item.service}`;
  for (const route of [...item.problems.map(slug => `${base}/${slug}`), ...(item.includeOnServicePage ? [base] : [])]) {
    const row = targets.get(route) ?? { route, language: lang, answers: [] };
    row.answers.push(item[lang]);
    targets.set(route, row);
  }
}
const output = resolve(root, `output/playwright/intent-expansion-2026-09-07${batchName ? '-'+batchName : followup ? '-followup' : ''}`);
mkdirSync(output, { recursive: true });
// Each invocation handles an explicit bounded batch. The returned result is
// browser behaviour evidence, not legal review or search-result evidence.
const rows = [...targets.values()];
for (let i = 0; i < rows.length; i += 8) {
  const batch = rows.slice(i, i + 8);
  const code = `async (page) => {
    const rows = []; const errors = [];
    const listener = error => errors.push(String(error));
    page.on('pageerror', listener);
    try {
      await page.setViewportSize({width:390,height:844});
      for (const item of ${JSON.stringify(batch)}) {
        const start = errors.length;
        const response = await page.goto('http://127.0.0.1:24541'+item.route,{waitUntil:'load'});
        await page.locator('h1').waitFor();
        const answers = [];
        for (const answer of item.answers) {
          const question = page.getByText(answer.q,{exact:true}).first();
          await question.click();
          const body = page.getByText(answer.a,{exact:true}).first();
          await body.waitFor({state:'visible'});
          answers.push({question:answer.q,visible:await body.isVisible()});
        }
        const state = await page.evaluate(() => ({
          lang:document.documentElement.lang,dir:document.documentElement.dir,
          width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,
          h1s:document.querySelectorAll('h1').length
        }));
        const failures = errors.slice(start);
        rows.push({route:item.route,status:response.status(),answers,state,errors:failures,
          pass:response.status()===200 && state.h1s===1 && state.scrollWidth<=state.width+1 &&
            state.lang.startsWith(item.language) && state.dir===(item.language==='ar'?'rtl':'ltr') &&
            answers.every(a=>a.visible) && failures.length===0});
      }
      return {environment:'local production browser at 390x844',rows,pass:rows.every(row=>row.pass)};
    } catch(error) { return {rows,error:String(error),pass:false}; }
    finally { page.off('pageerror',listener); }
  }`;
  writeFileSync(resolve(output, `batch-${String(i / 8 + 1).padStart(2, '0')}.js`), code + '\n');
}
console.log(JSON.stringify({routes: rows.length,batches:Math.ceil(rows.length/8),output}));
