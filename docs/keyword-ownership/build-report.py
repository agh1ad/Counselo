"""Render the checked-in ownership registry as a self-contained, searchable report."""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
matrix = json.loads((HERE / 'matrix.json').read_text())
rows = matrix['rows']
evidence = json.loads((HERE / 'search-evidence.json').read_text())
ledger_path = ROOT / 'output/search-intent-copy-2026-09-07/rendered-pages.json'
if ledger_path.exists():
    ledger = {r['url']: r for r in json.loads(ledger_path.read_text())}
    for row in rows:
        page = ledger.get(row['target_url'])
        row['local_page_evidence'] = ({k: page[k] for k in ['title', 'description', 'h1', 'h2']} if page else None)
        row['local_page_evidence_basis'] = 'Local rendered copy snapshot 2026-09-07, commit 0b90299; not live deployment or indexing evidence'
        row['intent_stage'] = 'Hire or evaluate legal help; some results also satisfy self-service information needs'
    (HERE / 'matrix.json').write_text(json.dumps(matrix, ensure_ascii=False, indent=2) + '\n')

owners = {}
for row in rows:
    existing = owners.get(row['ownership_key'])
    if existing and existing['url'] != row['target_url']:
        raise ValueError('Conflicting owners: ' + row['ownership_key'])
    owners[row['ownership_key']] = {'key': row['ownership_key'], 'url': row['target_url'], 'status': row['target_status']}

# Explicitly reserve overlapping existing pages for supporting or different tasks.
restrictions = []
def support(country, intent, path, reason):
    for lang in ['ar', 'en']:
        key = f'{country}:{lang}:{intent}'
        if key not in owners:
            continue
        url = f'https://counselo-legal.com/{country}' + ('/ar' if lang == 'ar' else '') + path
        if url != owners[key]['url']:
            restrictions.append({'url': url, 'prohibited_primary_keys': [key], 'reason': reason})
for country in ['sa', 'syr']:
    support(country, 'unpaid-wages', '/services/employment-law/unpaid-wages-and-benefits', 'Broader benefits overview must route salary-recovery enquiries to the delayed-or-unpaid-salary owner; repositioning remains an editorial action.')
    support(country, 'contract-review', '/services/contracts', 'Contracts hub supports discovery; the drafting-and-review page owns the review task.')
    support(country, 'debt-collection', '/services/enforcement', 'Enforcement hub supports discovery; commercial-debt-recovery owns commercial collection.')
support('syr', 'company-incorporation', '/services/companies-law/company-formation-and-restructuring', 'Initial formation belongs to business-law/company-formation-and-registration; retain distinct restructuring work here.')
support('syr', 'tax-assessment-objection', '/services/tax-zakat/tax-audit-and-assessment-objection', 'The Syria-specific assessment page is primary; generic tax page needs differentiation or consolidation review.')
support('syr', 'trademark-registration', '/services/intellectual-property/trademark-registration-and-disputes', 'Syria-specific registration page is primary; broader disputes page must support it.')
support('syr', 'marriage-registration', '/services/family-law/marriage-registration-and-family-status-certificate-problem', 'Rejected or deficient records are a remediation task, not the reserved initial-registration task.')
support('uae', 'company-incorporation', '/services/corporate-commercial/company-formation-and-registration-problem', 'Deficient/refused registration is distinct from initial incorporation.')
support('uae', 'labour-complaint-filing', '/services/employment-labour/wrongful-termination-and-labour-complaint', 'Termination challenge is narrower than all employee complaints; complaint filing has a reserved owner.')
support('sa', 'zakat-assessment-objection', '/services/tax-zakat/tax-audit-and-assessment-objection', 'Do not use a general tax objection page as the primary zakat-objection owner.')
policy = {'version': 1, 'scope': 'One primary URL per country, language and canonical client-task intent. Synonyms share an intent ID. Country and language versions are separate owners.', 'semantic_review': 'A human must group semantically identical tasks before adding intent IDs. This validator does not infer intent from every page or force search engines to select a URL.', 'owners': list(owners.values()), 'supporting_routes': restrictions}
# Policy is independently reviewed and locked; report refreshes never silently rewrite it.
policy_path = HERE / 'policy.json'
if not policy_path.exists():
    policy_path.write_text(json.dumps(policy, ensure_ascii=False, indent=2) + '\n')
else:
    policy = json.loads(policy_path.read_text())

payload = json.dumps({'matrix': matrix, 'policy': policy, 'evidence': evidence}, ensure_ascii=False).replace('<', '\\u003c')
html = '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CounselO · Keyword ownership</title><link rel="icon" href="data:,">
<style>:root{font-family:system-ui,sans-serif;color:#183335;background:#f3f5f2}body{margin:0}header,main{padding:28px clamp(16px,3vw,48px)}header{background:#123a3c;color:white}h1{font-size:32px;margin:8px 0}p{line-height:1.6;max-width:1100px}.eyebrow{letter-spacing:.13em;color:#cfe1ba;font-size:13px}.stats{display:flex;gap:28px;flex-wrap:wrap}.stats strong{font-size:30px;display:block}.stats span{font-size:14px}.notice{background:#fff;border-left:4px solid #8c6334;padding:14px 20px}.controls{display:flex;flex-wrap:wrap;gap:12px;margin:24px 0}label{display:grid;gap:5px;font-size:13px;font-weight:600}input,select{font:inherit;padding:11px;border:1px solid #a8b8b6;border-radius:5px;background:white}input{width:min(340px,75vw)}.scroll{overflow:auto;max-height:78vh;background:white;border:1px solid #ccd7d2}table{border-collapse:collapse;width:100%;min-width:1800px;font-size:14px}th,td{padding:16px;text-align:left;vertical-align:top;border-bottom:1px solid #dce3df;line-height:1.5}th{background:#dce9df;position:sticky;top:0;z-index:1}td:nth-child(1){min-width:200px}td:nth-child(5){min-width:250px}td:nth-child(7),td:nth-child(8){min-width:300px}a{color:#006366;overflow-wrap:anywhere}small{display:block;color:#53676a;margin-top:7px;font-size:12px}.tag{display:inline-block;padding:3px 7px;background:#edf2ef;border-radius:4px;font-size:12px;margin:4px 0}.planned,.conditional{background:#f9e7c7;color:#604007}details{margin-top:12px}summary{cursor:pointer;font-weight:600}code{overflow-wrap:anywhere}footer{padding:20px 0;color:#53676a}button{padding:10px;background:#123a3c;color:white;border:0;border-radius:5px;cursor:pointer}</style>
<header><div class="eyebrow">COUNSELO / SEARCH OWNERSHIP / 07 SEPTEMBER 2026</div><h1>One client task. One primary URL.</h1><p>Saudi Arabia, UAE and Syria · Arabic and English · Exact queries researched individually. Use this registry to decide which page receives the title, H1, commercial introduction and internal-link emphasis for each intent.</p><div class="stats" id="stats"></div></header>
<main><div class="notice"><strong>Evidence boundaries</strong><p>Competitors are observed results from individual web searches, not verified localized Google positions. Commercial demand is inferred; no volume estimates are claimed. Official services and directories are labelled separately. Related BaghdadiLaw results are excluded as independent competitors. Content briefs are recommendations unless marked as a confirmed missing route. External authority gaps are verification needs, not proven missing credentials or backlinks. Planned URLs are reserved, not published.</p></div>
<div class="controls"><label>Search query, intent or gap<input id="search" type="search" placeholder="e.g. inheritance, عقود, salary"></label><label>Country<select id="country"><option value="">All countries</option><option value="sa">Saudi Arabia</option><option value="uae">UAE</option><option value="syr">Syria</option></select></label><label>Language<select id="language"><option value="">Both languages</option><option value="ar">Arabic</option><option value="en">English</option></select></label><label>Owner status<select id="status"><option value="">All statuses</option><option>existing</option><option>planned</option><option>conditional</option></select></label></div>
<p>Scroll the table horizontally to see all eight fields. Expand a row’s evidence to inspect source URLs.</p><p id="count" role="status" aria-live="polite"></p><div class="scroll" tabindex="0" aria-label="Keyword ownership table; scroll horizontally for all eight columns"><table><thead><tr><th>Query</th><th>Country</th><th>Language</th><th>Intent</th><th>Target URL</th><th>Current competitor</th><th>Content gap / brief</th><th>External authority gap</th></tr></thead><tbody id="rows"></tbody></table></div>
<details><summary>Ownership rule and overlapping routes</summary><p>Primary intent = country + language + canonical client task. Synonyms must use the same intent ID. A second primary URL for that key fails the build. Supporting pages can explain related subjects and link to the owner, but cannot claim its primary intent. Changes to approved owners require explicit policy edits and review. The build checks declared ownership; semantic similarity elsewhere on the site still requires editorial review. No redirects, canonical changes or content consolidation have been applied by this matrix.</p><div id="restrictions"></div></details>
<footer>Existing-route evidence uses the current repository registry. Page titles and headings shown below are a local rendered snapshot from commit 0b90299, not production verification. Search evidence includes dated source URLs in the adjacent JSON registry.</footer></main>
<script>const data=PAYLOAD;const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const names={sa:'Saudi Arabia',uae:'UAE',syr:'Syria'};const rows=data.matrix.rows;document.querySelector('#stats').innerHTML=[[rows.length,'exact queries'],[data.policy.owners.length,'intent owners'],[rows.filter(r=>r.target_status==='planned').length,'reserved page URLs'],[data.policy.supporting_routes.length,'supporting-route restrictions']].map(([n,l])=>'<div><strong>'+n+'</strong><span>'+l+'</span></div>').join('');
function render(){const q=document.querySelector('#search').value.toLowerCase();const subset=rows.filter(r=>(!q||JSON.stringify(r).toLowerCase().includes(q))&&['country','language'].every(k=>!document.getElementById(k).value||r[k]===document.getElementById(k).value)&&(!document.getElementById('status').value||r.target_status===document.getElementById('status').value));document.querySelector('#count').textContent=subset.length+' of '+rows.length+' queries';document.querySelector('#rows').innerHTML=subset.map(r=>{const e=data.evidence.find(e=>e.id===r.id);return '<tr><td><strong dir="auto">'+esc(r.query)+'</strong><small>'+esc(r.id)+'</small></td><td>'+names[r.country]+'</td><td>'+({ar:'Arabic',en:'English'}[r.language])+'</td><td>'+esc(r.intent)+'<small>'+esc(r.ownership_key)+'</small></td><td><a href="'+esc(r.target_url)+'">'+esc(r.target_url)+'</a><br><span class="tag '+r.target_status+'">'+r.target_status+'</span>'+(r.local_page_evidence?'<details><summary>Local title and H1</summary><p dir="auto">'+esc(r.local_page_evidence.title)+'</p><p dir="auto">'+esc(r.local_page_evidence.h1)+'</p></details>':'')+'</td><td>'+(r.competitor_url?'<a href="'+esc(r.competitor_url)+'">'+esc(r.current_competitor)+'</a>':esc(r.current_competitor))+'<small>'+esc(r.competitor_type)+' · 2026-09-07</small><details><summary>Search evidence</summary><p>No rank or geolocation claim.</p>'+e.returned_urls.slice(0,12).map(u=>'<p><a href="'+esc(u)+'">'+esc(u)+'</a></p>').join('')+'<small>'+e.related_site_results.length+' related-site results recorded separately.</small></details></td><td>'+esc(r.content_gap)+'<small>'+esc(r.content_gap_status)+'</small></td><td>'+esc(r.external_authority_gap)+'<small>'+esc(r.external_authority_gap_status)+'</small></td></tr>'}).join('');}
document.querySelectorAll('input,select').forEach(el=>el.addEventListener('input',render));document.querySelector('#restrictions').innerHTML=data.policy.supporting_routes.map(s=>'<p><a href="'+esc(s.url)+'">'+esc(s.url)+'</a><br>'+esc(s.reason)+'<small>Cannot own: '+esc(s.prohibited_primary_keys.join(', '))+'</small></p>').join('');render();</script></html>'''.replace('PAYLOAD', payload)
(HERE / 'matrix.html').write_text(html)
print(f'Report: {len(rows)} queries; {len(owners)} owners; {len(policy["supporting_routes"])} restrictions')
