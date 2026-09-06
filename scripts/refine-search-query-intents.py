"""Refine the private observed-query map without publishing account metrics."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
source = json.loads((ROOT / "output/seo/search-console-query-intent-assessment-2026-09-06.json").read_text())
inventory = {p["route"]: p for p in json.loads((ROOT / "docs/page-seo-ledger-2026-09-06.json").read_text())["pages"]}

# Read as educational articles rather than routing precise information searches
# to a broad service. These articles were reviewed in the preceding release.
articles = [
    (r"evidence law private document", "athbat-alaqwd-amam-alqda-alsawdy"),
    (r"electronic signature|electronic transactions law", "e-contracts-legal-validity-saudi-arabia"),
    (r"تفسير العقد|عبارة العقد واضحة", "contract-interpretation-syrian-courts"),
    (r"عيوب الاراد|عيوب الاراده|عيوب الارادة", "defects-of-will-syrian-law"),
    (r"شروط صحة.*(?:العقد|عقد البيع)|أركان عقد البيع|شرح قانون العقود", "alaqd-fy-alqanwn-alswry"),
    (r"نظام الامتياز التجاري|شروط الامتياز التجاري في السعودية", "aqwd-alamtyaz-altjary-alfrnshayz-fy-alnzam-alsawdy"),
]
matters = [
    (r"الشرط الجزائي", ["penalty-and-compensation-clauses"]),
    (r"نموذج شكوى جرائم إلكترونية|رفع دعوى جرائم معلوماتية", ["cybercrime-complaint-and-digital-evidence-problem-in-syria"]),
    (r"wrongful termination|unfair termination|فصل تعسفي", ["wrongful-termination", "wrongful-termination-and-labour-complaint"]),
    (r"salary delay|pay disputes|payroll", ["delayed-or-unpaid-salary"]),
    (r"سوء تشخيص", ["misdiagnosis-and-delayed-diagnosis"]),
    (r"(?:corporate|company) (?:dissolution|liquidation)", ["company-dissolution-and-liquidation-dispute"]),
    (r"loan default|default on funds", ["loan-default-and-restructuring"]),
    (r"trademark opposition", ["trademark-opposition-and-cancellation"]),
    (r"foreign judgment enforcement", ["foreign-judgment-enforcement"]),
    (r"نموذج اخلاء سبيل", ["arrest-detention-and-release-application-in-syria"]),
    (r"التشهير في القانون السوري", ["defamation-and-reputation-damage-claim-in-syria"]),
    (r"(?:jurisdiction|competence) of arbitral tribunal", ["challenge-to-arbitration-jurisdiction"]),
    (r"insurance coverage", ["coverage-and-policy-interpretation", "policy-coverage-dispute"]),
    (r"breach of trust", ["breach-of-trust-complaint-or-defence", "fraud-and-breach-of-trust-accusation"]),
]
gaps = {
    "unpaid leave in saudi arabia": "Add source-checked unpaid-leave guidance; annual/sick leave is not an equivalent answer.",
    "absolute and relative simulation": "A broad contract review page does not establish a complete explanation of sham transactions; jurisdiction is unspecified.",
    "عقوبة حجز جواز السفر في الإمارات": "Clarify who holds the passport and context before choosing employment, immigration or criminal guidance. Do not invent one penalty.",
    "الفرق بين الامتياز التجاري والوكالة التجارية": "Link the distinct franchise and agency explanations; do not imply the regimes are interchangeable.",
}
implemented = {
    "unpaid leave in saudi arabia": ("/sa/services/employment-law", "Saudi Labor Law Article 116; regime qualification retained."),
    "absolute and relative simulation": ("/sa/services/contracts", "Saudi explanation only; query does not specify a jurisdiction."),
    "عقوبة حجز جواز السفر في الإمارات": ("/uae/ar/services/employment-labour", "Employer retention only; other holders and court travel restrictions need separate assessment. No universal penalty asserted."),
    "الفرق بين الامتياز التجاري والوكالة التجارية": ("/sa/ar/services/contracts", "Saudi franchise versus agency scope; does not substitute for other countries' regimes."),
}
rows = []
for original in source["queries"]:
    row = dict(original)
    query = row["query"]
    old = row["destinations"]
    row["previousDestinations"] = old
    row["decision"] = "retain-explicit-exclusion" if not old else "retain-service-scope"
    row["coverageLevel"] = "excluded" if not old else "relevant-scope-not-every-query-detail"
    row["openContentNeed"] = gaps.get(query)
    if old:
        ar = bool(re.search(r"[\u0600-\u06ff]", query))
        article = next((slug for pattern, slug in articles if re.search(pattern, query, re.I)), None)
        if article:
            route = f'/blog/{"ar" if ar else "en"}/{article}'
            assert route in inventory, route
            row["destinations"] = [route]
            row["decision"] = "prefer-specific-educational-article"
            row["coverageLevel"] = "specific-topic-explanation-not-personal-legal-advice"
        else:
            slugs = next((slugs for pattern, slugs in matters if re.search(pattern, query, re.I)), [])
            replacements = []
            for current in old:
                region = current.split("/")[1]
                target = next((r for slug in slugs for r, p in inventory.items() if p["region"] == region and p["language"] == ("ar" if ar else "en") and r.endswith("/" + slug)), None)
                replacements.append(target or current)
            if replacements != old:
                row["destinations"] = replacements
                row["decision"] = "prefer-specific-matter-guidance"
                row["coverageLevel"] = "specific-issue-preparation-not-a-universal-form-or-rule"
        if query in {"vat", "vat dispute resolution"}:
            row["destinations"] = [p for p in row["destinations"] if not p.startswith("/syr/")]
            row["decision"] = "remove-unjustified-domestic-syrian-vat-target"
        if query == "zakat tax consultancy":
            row["destinations"] = ["/sa/services/tax-zakat"]
            row["decision"] = "scope-zakat-to-established-saudi-offer"
        if row["openContentNeed"]:
            row["coverageLevel"] = "partial-content-gap-recorded"
    if query in implemented:
        target, limitation = implemented[query]
        row["destinations"] = [target]
        row["decision"] = "source-backed-scoped-answer-added"
        row["coverageLevel"] = "scoped-answer-verified-in-local-initial-html"
        row["previousContentNeed"] = row["openContentNeed"]
        row["openContentNeed"] = None
        row["scopeLimitation"] = limitation
        row["deployment"] = "pending-public-verification"
    assert all(p in inventory for p in row["destinations"])
    rows.append(row)
result = {"source": source["source"], "method": "All 200 observed strings reassessed; specific information searches distinguished from service-selection queries. Regional alternatives are not measured country demand. A topical match is not proof that every requested detail is answered.", "summary": {"queries": len(rows), "omitted": len(source["queries"]) - len(rows), "changedDestinations": sum(r["destinations"] != r["previousDestinations"] for r in rows), "scopedAnswersAdded": len(implemented), "explicitContentGaps": sum(bool(r["openContentNeed"]) for r in rows)}, "queries": rows}
(ROOT / "output/seo/search-console-query-refinement-2026-09-06.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
print(json.dumps(result["summary"]))
