import assert from "node:assert/strict";
import test from "node:test";
import {LEGAL_PROBLEM_PAGES} from "./legal-problem-pages";
import {matterSourceGuidance} from "./matter-source-guidance";
import {distinctProblemFaqs,problemContentDescription} from "./problem-content-quality";

test("every retained problem has explicitly mapped bilingual guidance with source links",()=>{
 for(const page of LEGAL_PROBLEM_PAGES){
  const guidance=matterSourceGuidance(page.region,page.parentServiceSlug,page.slug);
  assert.ok(guidance.length,`${page.region}/${page.parentServiceSlug}/${page.slug}`);
  for(const item of guidance){
   assert.ok(item.en.q && item.en.a && /[\u0600-\u06ff]/.test(item.ar.q) && /[\u0600-\u06ff]/.test(item.ar.a));
   assert.ok(item.sources.length && item.sources.every(s=>s.en && s.ar && s.href.startsWith("https://")));
  }
 }
});

test("all localized problem overviews add information instead of repeating their hero",()=>{
 for(const page of LEGAL_PROBLEM_PAGES) for(const lang of ["en","ar"] as const){
  assert.ok(!page.overview[lang].includes(page.heroSummary[lang]), `${page.region}/${page.slug}/${lang}`);
  assert.ok(!page.overview[lang].includes("undefined"));
 }
});
test("FAQ deduplication preserves original citations and excludes answers already visible",()=>{
 const sources=[{en:"Source",ar:"مصدر",href:"https://example.org/law"}];
 const faq={q:"Question?",a:"A supported answer.",sources};
 const results=distinctProblemFaqs([faq,{q:"Question?",a:"A supported answer."},{q:"Other?",a:"Hero text."}],["Hero text."]);
 assert.deepEqual(results,[faq]);
 assert.strictEqual(results[0].sources,sources);
});
test("every problem retains nonduplicated FAQ content and topic-specific descriptions",()=>{
 for(const page of LEGAL_PROBLEM_PAGES) for(const lang of ["en","ar"] as const){
  const cited=matterSourceGuidance(page.region,page.parentServiceSlug,page.slug).map(x=>({...x[lang],sources:x.sources}));
  const visible=[page.heroSummary[lang],...(cited[0]?[cited[0].a]:[])];
  const faqs=distinctProblemFaqs([...cited,...page.faqs[lang]],visible);
  assert.ok(faqs.length>0,`${page.region}/${page.slug}/${lang}`);
  assert.ok(faqs.every(f=>!visible.includes(f.a)));
  const description=problemContentDescription(page.heroSummary[lang],page.region,lang==="ar");
  assert.ok(description.length<=175);
  assert.ok(!description.includes("see the issues to review and documents to prepare"));
 }
});
