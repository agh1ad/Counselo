"""Verify the rendered article/work corrections, separately from legal review."""
import collections
import hashlib
import html
import json
import re
from html.parser import HTMLParser
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class Document(HTMLParser):
 def __init__(self):
  super().__init__();self.main=0;self.skip=0;self.body_depth=0;self.depth=0;self.paragraph=None;self.paragraphs=[];self.main_text=[];self.headings=[];self.heading=None;self.heading_text=[];self.links=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='main':self.main+=1
  if tag in ['script','style']:self.skip+=1
  if tag=='div':
   self.depth+=1
   if 'legal-article-body' in a.get('class','').split():self.body_depth=self.depth
  if self.body_depth and tag=='p':self.paragraph=[]
  if self.main and tag in ['h1','h2','h3']:self.heading=tag;self.heading_text=[]
  if self.main and tag=='a':self.links.append(a.get('href',''))
 def handle_data(self,text):
  if self.main and not self.skip:
   self.main_text.append(text)
   if self.heading:self.heading_text.append(text)
   if self.paragraph is not None:self.paragraph.append(text)
 def handle_endtag(self,tag):
  if tag=='p' and self.paragraph is not None:self.paragraphs.append(' '.join(' '.join(self.paragraph).split()));self.paragraph=None
  if tag=='div':
   if self.depth==self.body_depth:self.body_depth=0
   self.depth-=1
  if tag in ['script','style']:self.skip=max(0,self.skip-1)
  if self.heading==tag:self.headings.append((tag,' '.join(''.join(self.heading_text).split())));self.heading=None
  if tag=='main':self.main=max(0,self.main-1)
def nodes(value):
 if isinstance(value,list):
  for item in value:yield from nodes(item)
 elif isinstance(value,dict):
  yield value
  for item in value.values():yield from nodes(item)
report=json.loads((ROOT/'artifacts/legal-site/seo-validation-report.json').read_text())
heading_review={p['route']:p for p in json.loads((ROOT/'docs/article-heading-review-2026-09-07.json').read_text())['pages']}
final_article_passages={p['route']:p['passageCorrections'] for p in json.loads((ROOT/'docs/saudi-article-final-corrections-review-2026-09-07.json').read_text())['pages']}
work_evidence_slugs={p['slug'] for p in json.loads((ROOT/'docs/work-document-evidence-review-2026-09-07.json').read_text())['documents']}
work_guidance_source=(ROOT/'lib/api-zod/src/work-reader-guidance.ts').read_text()
work_guidance=json.loads(work_guidance_source.split('WORK_READER_GUIDANCE: Readonly<Record<string, WorkReaderGuidance>> = ',1)[1].rsplit(';',1)[0])
module_text=(ROOT/'artifacts/legal-site/src/lib/saudi-judgment-objection-library-guidance.ts').read_text()
library_guidance=json.loads(module_text.split(' = ',1)[1].rsplit(' as const;',1)[0])
results=[]
for page in report['pages']:
 route=page['route']
 if page['isRedirect'] or not (re.match(r'^/blog/(en|ar)/[^/]+$',route) or re.match(r'^/(ar/)?our-work/[^/]+$',route) or route in ['/legal-library','/ar/legal-library']):continue
 raw=(ROOT/'artifacts/legal-site/dist/public'/page['file']).read_text();d=Document();d.feed(raw);text=' '.join(' '.join(d.main_text).split());fail=[]
 schemas=[json.loads(s) for s in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',raw,re.S)]
 if sum(h[0]=='h1' for h in d.headings)!=1:fail.append('Expected one main h1')
 if '/blog/' in route:
  for promotion in heading_review[route]['promotions']:
   replacement=next((p['replacementHtml'] for p in final_article_passages.get(route,[]) if p['originalText']==promotion['text']),promotion['text'])
   expected=html.unescape(re.sub('<[^>]+>','',replacement))
   expected={'Third: Conditions for Application (in Comparative Legislation)':'Third: Separate Questions for Reviewing Liability','ثالثاً: شروط التطبيق (في التشريعات المقارنة).':'ثالثاً: أسئلة مستقلة لفحص المسؤولية.','4. الالتزام بالإبلاغ الفوري عن العيب:':'4. الإعلام بالعيب ومواعيد دعوى الضمان:'}.get(expected,expected)
   if (promotion['tag'],expected) not in d.headings:fail.append('Missing semantic article section: '+expected)
  if not d.paragraphs:fail.append('No article body paragraphs extracted')
  duplicates=[p for p,n in collections.Counter(d.paragraphs).items() if n>1 and len(p)>160]
  if duplicates:fail.append('Repeated substantial article paragraphs: '+str(len(duplicates)))
  if '?p=27309?utm_source' in raw:fail.append('Malformed arbitration reference')
  if 'no jurisdiction-specific legal conclusion is made' in text or 'لا يقدم استنتاجاً قانونياً خاصاً باختصاص' in text:fail.append('Contradictory generic provenance')
  if route.endswith('/mta-yqbl-altmas-aaadh-alnzr-atjahat-qdayyh-mhmh'):
   required=['Before filing a Saudi reconsideration petition','When do the 30 days begin?','Does filing stop enforcement?','What changes after acceptance?','How is the request submitted through Najiz?'] if '/en/' in route else ['قبل تقديم التماس إعادة النظر في السعودية','متى تبدأ مهلة الثلاثين يوماً؟','هل يوقف التقديم التنفيذ؟','ماذا يتغير بعد القبول؟','كيف يقدم الطلب عبر ناجز؟']
   fail.extend('Missing reconsideration answer: '+s for s in required if s not in text)
   if sum(h[0]=='h3' for h in d.headings)<9:fail.append('Missing procedural answer headings')
   template_heading='نموذج قابل للتعديل لصحيفة التماس إعادة النظر في السعودية' if '/ar/' in route else 'Editable Saudi reconsideration petition outline'
   if ('h2',template_heading) not in d.headings:fail.append('Missing editable petition outline')
   for source in ['https://www.uqn.gov.sa/details?p=23463','https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/f0eaae46-9f84-40ee-815e-a9a700f268b3/1']:
    if source not in d.links:fail.append('Missing procedural authority link')
 elif '/our-work/' in route:
  lang='ar' if route.startswith('/ar/') else 'en'
  for answer in work_guidance.get(route.rsplit('/',1)[-1],{}).get(lang,[]):
   if ('h2',answer['q']) not in d.headings or answer['a'] not in text:fail.append('Missing work reader answer: '+answer['q'])
  if route.rsplit('/',1)[-1] in work_evidence_slugs:
   heading='ما الذي يوضحه المستند المنشور؟' if route.startswith('/ar/') else 'What does the published document establish?'
   if ('h2',heading) not in d.headings:fail.append('Missing verified document evidence note')
  work=[n for n in nodes(schemas) if n.get('@type')=='CreativeWork' and n.get('@id','').endswith('#work-sample')]
  if len(work)!=1:fail.append('Expected one work CreativeWork')
  for n in work:
   if 'author' in n or 'reviewedBy' in n:fail.append('Unsubstantiated default author/reviewer')
   if 'citation' in n:fail.append('Related-service references represented as case citations')
  if route.endswith('/astratyjyh-kawnslw-lastrdad-sndat-lamr-bqymh-17-mlywn-ryal'):
   phrase='القيمة الاسمية ليست مبلغاً محصلاً' if route.startswith('/ar/') else 'face value is not money recovered'
   if phrase not in text:fail.append('Face-value/recovery distinction missing')
  if route.endswith('/tfkyk-mstndat-altmas-aaadh-alnzr-bnjah'):
   phrase='بعد قبول الالتماس شكلاً وفحص أسبابه موضوعاً' if route.startswith('/ar/') else 'admitted procedurally and examined on its merits'
   if phrase not in text:fail.append('Reconsideration stage distinction missing')
  if route.endswith('/kyf-saadt-kawnslw-fy-astrdad-300000-ryal-abr-slh-qdayy-fy-nzaa-tjary') and 'after assessing“' in raw:fail.append('Incomplete description remains')
 else:
  lang='ar' if route.startswith('/ar/') else 'en'
  target=f'/blog/{lang}/mta-yqbl-altmas-aaadh-alnzr-atjahat-qdayyh-mhmh'
  if d.links.count(target)<2:fail.append('Missing direct reconsideration preparation link alongside reading path')
  if 'id="saudi-judgment-objections"' not in raw:fail.append('Missing Saudi objection section anchor')
  for answer in library_guidance['answers']:
   if answer[lang]['q'] not in text or answer[lang]['a'] not in text:fail.append('Missing library answer: '+answer['id'])
   for source in answer['sources']:
    if source['href'] not in d.links:fail.append('Missing library authority: '+source['href'])
 results.append({'route':route,'htmlSha256':hashlib.sha256(raw.encode()).hexdigest(),'failures':fail,'pass':not fail})
summary={'pages':len(results),'articles':sum('/blog/' in r['route'] for r in results),'workExamples':sum('/our-work/' in r['route'] for r in results),'libraryPages':2,'failedPages':sum(not r['pass'] for r in results),'fullIntentReviewsCompleted':0}
(ROOT/'docs/search-intent-editorial-delivery-2026-09-07.json').write_text(json.dumps({'environment':'local production-build HTML, not deployment proof','summary':summary,'pages':results},ensure_ascii=False,indent=2)+'\n')
print(json.dumps(summary))
for r in results:
 if not r['pass']:print(json.dumps(r,ensure_ascii=False))
assert len(results)==182
raise SystemExit(1 if summary['failedPages'] else 0)
