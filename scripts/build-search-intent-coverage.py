"""Reconcile every retained page with dated query evidence, without ranking claims.

Run: python3 scripts/build-search-intent-coverage.py
The private GSC input is optional; its absence is reported, never treated as zero demand.
No account metrics are copied into the public documentation outputs.
"""
import collections
import csv
import hashlib
import html
import importlib.util
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs'
STAMP = '2026-09-07'


def read(path):
    return json.loads((ROOT / path).read_text())


def run():
    inventory = read('docs/page-seo-ledger-2026-09-06.json')['pages']
    routes = {p['route']: p for p in inventory}
    validation = read('artifacts/legal-site/seo-validation-report.json')
    files = {p['route']: p['file'] for p in validation['pages'] if not p['isRedirect']}
    assert len(routes) == len(inventory), 'Duplicate inventory routes'
    assert set(files) == set(routes), 'Reconcile build and editorial inventory first'
    spec = importlib.util.spec_from_file_location('graph', ROOT / 'scripts/seo-opportunity-graph.py')
    graph = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(graph)
    keywords = read('docs/search-query-targets-2026-09-06.json')
    gsc_path = ROOT / 'output/seo/search-console-query-refinement-2026-09-06.json'
    gsc = json.loads(gsc_path.read_text()) if gsc_path.exists() else None
    refinement = read(f'docs/search-intent-procedural-refinement-{STAMP}.json')
    refined_by_query = {r['query']: r for r in refinement['rows']}
    completion_path = OUT / f'search-intent-page-completion-{STAMP}.json'
    completed = {p['route']: p for p in json.loads(completion_path.read_text())['pages']} if completion_path.exists() else {}
    assert set(completed).issubset(routes)
    assert len(refined_by_query) == len(refinement['rows'])
    refined_destinations = collections.defaultdict(list)
    for row in refinement['rows']:
        destination = row['proposedDestination'].split('#')[0]
        assert destination in routes
        assert row['originalDestination'] in routes
        refined_destinations[destination].append(row)
    assigned = collections.defaultdict(list)
    translated = collections.defaultdict(set)
    unassigned = []
    procedural = []
    for row in keywords['rows']:
        query = row['keyword']
        language = 'ar' if re.search(r'[\u0600-\u06ff]', query) else 'en'
        targets = sorted({t[language] for t in row['targets']})
        assert all(t in routes for t in targets)
        if not targets:
            unassigned.append({'query': query, 'source': 'keyword-export', 'reason': row['reason']})
        for target in targets:
            assigned[target].append({'query': query, 'source': 'keyword-export',
                                     'answerEvidence': 'editorial-assignment-only'})
        for target in {t['en' if language == 'ar' else 'ar'] for t in row['targets']}:
            assert target in routes
            translated[target].add(query)
        # A documented, manually inspected library mismatch. Do not infer a
        # matching local procedural regime from the export's regional alternatives.
        if '/ar/legal-library' in targets and re.search(
                r'التماس|اعادة النظر|إعادة النظر|الاعتراض على الحكم|رفض الدعوى', query):
            procedural.append({'query': query, 'assignedRoute': '/ar/legal-library',
                               'status': 'partial-preparation-guidance',
                               'nextAction': 'Resolve jurisdiction and proceeding; research a direct answer for the requested conditions, deadline, filing, form or remedy before selecting an existing page or proposing a new one.'})
    if gsc:
        for row in gsc['queries']:
            targets = row['destinations']
            assert all(t in routes for t in targets)
            if not targets:
                unassigned.append({'query': row['query'], 'source': 'dated-gsc-snapshot',
                                   'reason': row.get('reason') or row['decision']})
            for target in targets:
                assigned[target].append({'query': row['query'], 'source': 'dated-gsc-snapshot',
                                         'answerEvidence': row['coverageLevel'],
                                         'scopeLimitation': row.get('scopeLimitation'),
                                         'destinationEvidence': 'editorial-proposal; not observed page-query attribution'})
    for gap in procedural:
        if gap['query'] in refined_by_query:
            row = refined_by_query[gap['query']]
            gap.update({'status': row['assessment'],
                        'proposedDestination': row['proposedDestination'],
                        'nextAction': row['remainingGap']})
    assert set(refined_by_query).issubset({r['query'] for r in procedural})
    dimensions = {
        'legal matter': ['issue and applicable regime', 'rights and material exceptions',
                         'immediate steps and competent authority', 'documents and evidence',
                         'time limits and their triggering events', 'fees versus professional charges',
                         'available remedies and alternatives', 'consultation scope and next step'],
        'service': ['service scope and applicable regime', 'which specific matter page to use',
                    'eligibility and exclusions', 'process and preparation', 'fees and engagement scope',
                    'provider identity and relevant evidence', 'consultation next step'],
        'article': ['specific educational question', 'jurisdiction and current primary authority',
                    'rule and material exceptions', 'practical application supported by sources',
                    'related questions and appropriate service'],
        'work example': ['documented matter context', 'actual work performed',
                         'documented outcome and limitations', 'related service'],
        'shared or regional page': ['actual navigation, identity, intake or disclosure purpose',
                                    'appropriate language and jurisdiction destination'],
    }
    pages = []
    reviews = collections.defaultdict(list)
    for review_file in sorted(OUT.glob(f'search-intent-*-review-{STAMP}.json')):
        review = json.loads(review_file.read_text())
        for row in review.get('pages', review.get('rows', [])):
            assert row['route'] in routes, f"Unknown reviewed route {row['route']}"
            detail = row.get('individualResearchReview', {})
            gaps = next((row[key] for key in ['remainingKnownPublicContentGaps', 'remainingPublicGaps', 'remainingPublicContentGaps', 'unansweredPublicIntents', 'remainingQuestions', 'unresolvedGaps', 'openGaps', 'gaps', 'unresolvedQuestions', 'knownMissingBusinessFacts'] if key in row), detail.get('realUnansweredPublicQuestions', []))
            reviews[row['route']].append({
                'file': str(review_file.relative_to(ROOT)),
                'primaryIntent': row.get('primaryIntent', detail.get('primaryIntent')),
                'supportingIntents': row.get('supportingIntentCandidates', row.get('supportingResearchIntents', row.get('supportingResearchedIntents', row.get('supportingIntents', [])))),
                'implementedAnswerIds': row.get('newAnswerIds', row.get('implementedAnswerIds', detail.get('newAnswerIds', []))),
                'openGaps': gaps,
                'status': row.get('status', row.get('stage')),
                'completionAccepted': False,
            })
    for route, page in sorted(routes.items()):
        path = ROOT / 'artifacts/legal-site/dist/public' / files[route]
        raw = path.read_bytes()
        closure = completed.get(route)
        if closure:
            assert closure['status'] == 'completed-defined-page-purpose'
            assert not closure['knownInScopeContentGaps']
            assert closure['verifiedHtmlSha256'] == hashlib.sha256(raw).hexdigest(), f'Reverify changed completed page: {route}'
        doc = graph.Document()
        doc.feed(raw.decode())
        nodes = []
        for match in re.finditer(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', raw.decode(), re.S):
            node = json.loads(match.group(1))
            nodes.extend(node if isinstance(node, list) else node.get('@graph', [node]))
        visible = ' '.join(doc.text)
        normalize = lambda text: ' '.join(html.unescape(re.sub(r'<[^>]*>', ' ', text)).split())
        visible = normalize(visible)
        local_refinements = []
        for row in refined_destinations[route]:
            if '#' in row['proposedDestination']:
                anchor = row['proposedDestination'].split('#', 1)[1]
                assert f'id="{anchor}"' in raw.decode(), f'Missing refined-query anchor on {route}'
            missing = [h for h in row['requiredVisibleHeadings'] if normalize(h) not in visible]
            assert not missing, f'Missing refined-query answer on {route}: {missing}'
            local_refinements.append({**row, 'requiredHeadingsPresentInLocalHtml': True,
                                      'deliveryEvidence': 'local rendered HTML; legal scope assessment is separately recorded'})
        known_questions = []
        for node in nodes:
            if node.get('@type') != 'FAQPage':
                continue
            for question in node.get('mainEntity', []):
                answer = question.get('acceptedAnswer', {}).get('text', '')
                known_questions.append({
                    'question': question.get('name', ''), 'answer': answer,
                    'visibleQuestionAndAnswer': normalize(question.get('name', '')) in visible and normalize(answer) in visible,
                    'demandEvidence': 'content-derived question; no measured search demand inferred',
                    'legalAnswerAdequacy': 'requires individual jurisdiction-specific review',
                })
        # Reading the HTML establishes content availability only. Headings or
        # phrase presence cannot prove that an intent is answered correctly.
        observed = [q for q in assigned[route] if q['source'] == 'dated-gsc-snapshot']
        proposed = [q for q in assigned[route] if q['source'] == 'keyword-export']
        pages.append({
            'route': route, 'language': page['language'], 'region': page['region'],
            'family': page['family'],
            'primaryIntent': next((h['text'] for h in doc.headings if h['level'] == 'h1'), page['searchIntent']['primary']),
            'title': html.unescape(re.search(r'<title[^>]*>(.*?)</title>', raw.decode(), re.S).group(1)),
            'supportingIntents': page['searchIntent']['supporting'],
            'individualResearchReviews': reviews[route],
            'acceptedPageClosure': closure,
            'queryAssignments': assigned[route],
            'currentProceduralQueryRefinements': local_refinements,
            'existingQuestionIntents': known_questions,
            'translatedAssignmentCountNotMeasuredDemand': len(translated[route]),
            'researchState': ('dated-observed-query-candidates' if observed else
                              'keyword-export-candidates' if proposed else 'no-direct-query-evidence-in-inputs'),
            'researchChecklistNotVerifiedCoverage': dimensions[page['family']],
            'contentEvidence': {'file': str(path.relative_to(ROOT)),
                                'sha256': hashlib.sha256(raw).hexdigest(), 'headings': doc.headings},
            'answerCompleteness': 'currently-reviewed-intents-complete-for-defined-page-purpose' if closure else 'not-established-by-assignment-or-html-parsing',
            'taskCompletionState': 'completed-defined-page-purpose' if closure else 'researched-not-fully-closed' if reviews[route] else 'pending-individual-intent-review-and-verification',
            'nextAction': ('Monitor changes in purpose, services and observed searches; linked-page work remains separate' if closure else
                           'Review the completed scoped procedural answers within the broader library purpose' if route == '/ar/legal-library' else
                           'Validate candidate queries against full answers and jurisdiction before editing' if assigned[route] else
                           'Research same-language queries for this specific purpose; lack of evidence is not lack of demand'),
            'rankAndLiveDelivery': 'not-measured-in-this-run',
        })
    summary = {
        'pagesRead': len(pages), 'omitted': len(routes) - len(pages),
        'researchStates': dict(collections.Counter(p['researchState'] for p in pages)),
        'keywordRowsAccountedFor': len(keywords['rows']),
        'gscRowsAccountedFor': len(gsc['queries']) if gsc else None,
        'gscAnswerEvidence': dict(collections.Counter(q['coverageLevel'] for q in gsc['queries'])) if gsc else None,
        'libraryProceduralQueriesNeedingDirectAnswerReview': len(procedural),
        'proceduralQueriesWithScopedArticleAnswer': sum(r['status'] == 'scoped-source-backed-answer-implemented' for r in procedural),
        'proceduralQueriesWithScopedLibraryAnswer': sum(r['status'] == 'scoped-source-backed-library-answer-implemented' for r in procedural),
        'proceduralQueriesWithoutDirectAnswer': sum(r['status'] == 'partial-preparation-guidance' for r in procedural),
        'proceduralTemplateDemandsUnfilled': sum(r['status'] == 'preparation-only-template-demand-unfilled' for r in procedural),
        'excludedSourceRowsPreserved': len(unassigned),
        'pageCompletionClaims': len(completed),
        'pagesWithIndividualResearch': sum(bool(p['individualResearchReviews']) for p in pages),
        'pagesWithUnclosedResearchFindings': sum(not p['acceptedPageClosure'] and any(r['openGaps'] for r in p['individualResearchReviews']) for p in pages),
        'pagesRemainingForFullIntentReview': len(pages) - len(completed),
        'existingQuestionIntents': sum(len(p['existingQuestionIntents']) for p in pages),
        'questionDeliveryMismatches': sum(not q['visibleQuestionAndAnswer'] for p in pages for q in p['existingQuestionIntents']),
    }
    result = {
        'assessmentDate': STAMP, 'taskStatus': 'in-progress', 'summary': summary,
        'method': 'Complete local rendered-inventory reconciliation with dated editorial query assignments. No new all-page SERP, legal-answer, publication, or ranking audit is claimed.',
        'gscSource': gsc['source'] if gsc else 'unavailable; no zero-demand inference',
        'limitations': ['GSC destination choices are editorial proposals, not measured landing pages.',
                       'Country alternatives do not establish demand in those countries.',
                       'Translated destinations do not establish demand in the translated language.',
                       'A checklist is a research prompt, not an instruction to add every section to every page.',
                       'Previous verification labels are dated evidence and are not fresh legal certification.',
                       'Query snapshots and keyword exports are finite; exhaustive future intent coverage is impossible.'],
        'documentedGaps': procedural, 'excludedSourceRows': unassigned, 'pages': pages,
    }
    (OUT / f'search-intent-coverage-{STAMP}.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    with (OUT / f'search-intent-coverage-{STAMP}.csv').open('w', newline='') as handle:
        writer = csv.writer(handle, lineterminator="\n")
        writer.writerow(['route', 'language', 'region', 'family', 'primary_intent', 'research_state',
                         'assigned_queries', 'next_action', 'answer_completeness'])
        for p in pages:
            writer.writerow([p['route'], p['language'], p['region'], p['family'], p['primaryIntent'],
                             p['researchState'], ' | '.join(sorted({q['query'] for q in p['queryAssignments']})),
                             p['nextAction'], p['answerCompleteness']])
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    run()
