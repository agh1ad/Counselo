"""Join every retained URL to this round's decisions and evidence boundaries."""
import collections
import datetime
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
def read(name):
    return json.loads((ROOT / name).read_text())

baseline = read('docs/page-seo-ledger-2026-09-06.json')['pages']
graph = {p['route']: p for p in read('docs/seo-opportunity-graph-2026-09-06.json')['pages']}
research = {p['route']: p for p in read('docs/seo-service-search-research-2026-09-06.json')['pages']}
assert set(graph) == {p['route'] for p in baseline}
rows = []
for page in baseline:
    route, family = page['route'], page['family']
    g = graph[route]
    actions = []
    if family == 'legal matter':
        actions.append('Present stronger subject matches first among the six related matters while retaining distributed sibling discovery.')
    if route.startswith('/blog/') and route.count('/') == 3:
        actions.append('Add this article to its authored reading topic in the matching-language library, resolved against current published records.')
    if route.endswith('/contact'):
        actions.append('Add matching-region and matching-language privacy and terms links before visitors share information.')
    if route.endswith('/privacy-policy') or route.endswith('/terms-of-service'):
        actions.append('Provide contextual discovery from the corresponding consultation form; retain the policy purpose.')
    if route.endswith('/about') or route.endswith('/vision'):
        actions.append('Connect the about-page consultation explanation to the matching vision page.')
    if route in ['/legal-library', '/ar/legal-library']:
        actions.append('Expose all 45 reviewed article records through seven subject groups; repair stored-region hydration sequencing.')
    if route in ['/sa/services/employment-law', '/sa/ar/services/employment-law']:
        actions.append('Add a bilingual source-backed Article 116 unpaid-leave answer, qualified to Saudi Labor Law employment.')
    if route in ['/sa/services/contracts', '/sa/ar/services/contracts']:
        actions.append('Add bilingual Saudi-scoped answers on simulation and franchise versus agency, with visible supporting sources.')
    if route in ['/uae/services/employment-labour', '/uae/ar/services/employment-labour']:
        actions.append('Add a bilingual employer passport-retention answer; distinguish other holders and court restrictions without inventing a uniform penalty.')
    shared = route.startswith('/blog') or route.startswith('/our-work') or route.startswith('/ar/our-work') or route.endswith('/legal-library')
    if shared:
        actions.append('Preserve server-rendered content while restoring saved regional navigation preferences through a non-urgent transition.')
    if not actions:
        actions.append('Retain the previously assessed purpose, content and route; this round found no evidence justifying an additional intent or copy change.')
    parent = route.rsplit('/', 1)[0] if '/services/' in route and route.count('/') > (4 if '/ar/' in route else 3) else route
    search = research.get(route) or research.get(parent)
    rows.append({
        'route': route, 'language': page['language'], 'region': page['region'], 'family': family,
        'primaryIntent': page['searchIntent']['primary'], 'supportingIntents': page['searchIntent']['supporting'],
        'decision': actions, 'priorEditorialEvidence': page['editorialAssessmentFile'],
        'contentReviewBasis': 'Carry forward the recorded editorial assessment; inspect the complete rebuilt HTML graph and apply the changes recorded here. This does not claim a new independent legal or competitor review for every URL.',
        'searchResearch': {'serviceRoute': search['route'], 'query': search['query'], 'level': 'country-and-language-query-candidate-discovery; not controlled rankings or full competitor-page comparison'} if search else {'level': 'existing editorial and query evidence; no new page-specific competitor search asserted'},
        'technical': {'initialHtmlRead': True, 'sha256': g['htmlSha256'], 'reachable': g['clickDepthFromRoot'] is not None, 'clickDepth': g['clickDepthFromRoot'], 'sameLanguageContentIncoming': g['sameLanguageContentIncomingCount'], 'issues': page['technicalIssues']},
        'titleAndSnippetDecision': 'Retain reviewed metadata unless a new observed query exposes a specific mismatch; do not rewrite every title without page-query-country-device CTR evidence.',
        'authorityDecision': 'Preserve truthful author/entity/source relationships. Additional original case facts and earned independent citations require verifiable contributions; no acquired external link is claimed.',
        'performance': 'Shared rendering and responsive checks apply; representative lab runs are not field measurements for this URL.',
        'outcome': 'Indexing, rankings, CTR, AI citations and qualified inquiries remain dependent on new search/account evidence.',
        'implementationState': 'local-verified; publication pending',
    })
assert len(rows) == len({p['route'] for p in rows}) == 1468
result = {'generatedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'scope': 'Every retained URL has a decision; excluded and redirected historical paths are tracked separately. No claim of every conceivable query being appropriate to every page.', 'summary': {'retained':len(rows),'assessed':len(rows),'omitted':0,'families':dict(collections.Counter(p['family'] for p in rows)),'independentSearchOutcomeCompletion':False}, 'pages':rows}
(ROOT/'docs/seo-opportunity-ledger-2026-09-06.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(result['summary']))
