"""Resumable sequential mobile lab. CLI owns the browser; no parallel timing runs.
Explicit shared-template route samples only; timings do not certify every URL.
"""
import argparse,json,pathlib,subprocess,hashlib
p=argparse.ArgumentParser();p.add_argument('--routes',required=True);p.add_argument('--report',required=True);p.add_argument('--repeats',type=int,default=1);p.add_argument('--cache-mode',choices=['cold','warm'],default='cold');p.add_argument('--batch-size',type=int,default=1);a=p.parse_args()
root=pathlib.Path(__file__).resolve().parents[1]
inventory=json.loads((root/'docs/page-seo-ledger-2026-09-06.json').read_text())['pages']
routes=json.loads((root/a.routes).read_text())
expected={x['route']:x for x in inventory}
report=root/a.report;report.parent.mkdir(parents=True,exist_ok=True)
seen={(r['route'],r['repeat']) for r in map(json.loads,report.read_text().splitlines())} if report.exists() else set()
code=(root/'scripts/seo-controlled-mobile.js').read_text();generated=root/'output/seo/mobile-current-batch.js'
fingerprint=hashlib.sha256((root/'artifacts/legal-site/dist/ssr-template.html').read_bytes()).hexdigest()
for repeat in range(a.repeats):
 pending=[r for r in routes if (r,repeat) not in seen]
 for offset in range(0,len(pending),a.batch_size):
  batch=pending[offset:offset+a.batch_size]
  generated.write_text(code.replace('__ROUTES__',json.dumps(batch)).replace('__COLD_CACHE__','true' if a.cache_mode=='cold' else 'false'))
  cmd=['bash','/Users/aghiadalbarzi/.codex/skills/playwright/scripts/playwright_cli.sh','--session=counselo-mobile-complete','run-code','--filename',str(generated)]
  result=None
  try:
   result=subprocess.run(cmd,cwd=root,text=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=160*a.batch_size)
   data=json.JSONDecoder().raw_decode(result.stdout.split('### Result\n',1)[1])[0]
   if len(data)!=len(batch):raise ValueError('Incomplete batch result')
  except Exception as e:
   data=[{'route':route,'failure':str(e)} for route in batch]
   (root/'output/seo/mobile-cli-last-error.txt').write_text(result.stdout if result else str(e))
  for row in data:
   row.update(repeat=repeat,buildTemplateSha256=fingerprint,profile={'viewport':'390x844','cpuSlowdown':4,'latencyMs':150,'downloadBytesPerSecond':200000,'cacheMode':a.cache_mode,'origin':'local read-only production build; not Replit TTFB or field CWV'})
   if row.get('load',{}).get('h1') is not None:row['h1MatchesInventory']=' '.join(row['load']['h1'].split())==' '.join(expected[row['route']]['h1'].split())
   with report.open('a') as f:f.write(json.dumps(row,ensure_ascii=False)+'\n')
   print(json.dumps({'route':row['route'],'repeat':repeat,'failure':row.get('failure'),'lcp':row.get('load',{}).get('lcp'),'cls':row.get('final',{}).get('cls')}),flush=True)
