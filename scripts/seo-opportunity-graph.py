"""Reproducible complete-inventory link assessment; no inferred ranking results.

Run after the production prerender and seo:validate. Uses every retained HTML
document, including audit snapshots for dynamic routes. No URL sampling.
"""
import collections
import datetime
import hashlib
import gzip
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://counselo-legal.com"


class Document(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.links = []
        self.anchor = None
        self.headings = []
        self.heading = None
        self.text = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag not in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}:
            self.stack.append(tag)
        if tag == "a":
            self.anchor = {"href": attrs.get("href", ""), "text": "", "role": "navigation" if any(t in self.stack for t in ("nav", "header", "footer")) else "content"}
        if tag in {"h1", "h2", "h3"}:
            self.heading = {"level": tag, "text": ""}

    def handle_data(self, data):
        if any(t in self.stack for t in ("script", "style", "noscript")):
            return
        if self.anchor is not None:
            self.anchor["text"] += data
        if self.heading is not None:
            self.heading["text"] += data
        if "body" in self.stack:
            self.text.append(data)

    def handle_endtag(self, tag):
        if tag == "a" and self.anchor is not None:
            self.anchor["text"] = " ".join(self.anchor["text"].split())
            self.links.append(self.anchor)
            self.anchor = None
        if tag in {"h1", "h2", "h3"} and self.heading is not None:
            self.heading["text"] = " ".join(self.heading["text"].split())
            self.headings.append(self.heading)
            self.heading = None
        if tag in self.stack:
            self.stack = self.stack[:len(self.stack) - 1 - self.stack[::-1].index(tag)]


def run():
    report = json.loads((ROOT / "artifacts/legal-site/seo-validation-report.json").read_text())
    ledger = json.loads((ROOT / "docs/page-seo-ledger-2026-09-06.json").read_text())
    inventory = {p["route"]: p for p in ledger["pages"]}
    files = {p["route"]: p["file"] for p in report["pages"] if not p["isRedirect"]}
    if set(files) != set(inventory):
        raise ValueError("Build and retained-page ledger differ; reconcile inventory first")
    incoming = collections.defaultdict(set)
    editorial = collections.defaultdict(set)
    graph = {}
    rows = []
    for route, page in inventory.items():
        source = ROOT / "artifacts/legal-site/dist/public" / files[route]
        raw = source.read_text()
        doc = Document()
        doc.feed(raw)
        links, external = [], []
        for link in doc.links:
            target = urlsplit(urljoin(BASE + route, link["href"]))
            if target.scheme not in {"http", "https"}:
                continue
            if target.netloc != "counselo-legal.com":
                external.append({**link, "url": target.geturl()})
                continue
            path = target.path.rstrip("/") or "/"
            if path == route or path not in inventory:
                continue
            links.append({**link, "target": path})
            incoming[path].add(route)
            if link["role"] == "content" and page["language"] == inventory[path]["language"]:
                editorial[path].add(route)
        graph[route] = sorted(set(x["target"] for x in links))
        unique_content = {link["target"]: link for link in links if link["role"] == "content"}
        unique_external = {link["url"]: link for link in external if link["role"] == "content"}
        rows.append({"route": route, "language": page["language"], "region": page["region"], "family": page["family"], "primaryIntent": page["searchIntent"]["primary"], "title": page["title"], "headingCount": len(doc.headings), "headingExamples": doc.headings[:6], "htmlSha256": hashlib.sha256(raw.encode()).hexdigest(), "outgoingCount": len(graph[route]), "contentLinkCount": len(unique_content), "contentLinkExamples": [{"target": link["target"], "text": link["text"]} for link in list(unique_content.values())[:8]], "externalReferenceCount": len(unique_external), "externalReferenceExamples": [{"url": link["url"], "text": link["text"]} for link in list(unique_external.values())[:6]]})
    depths = {"/": 0}
    queue = collections.deque(["/"])
    while queue:
        route = queue.popleft()
        for target in graph[route]:
            if target not in depths:
                depths[target] = depths[route] + 1
                queue.append(target)
    for row in rows:
        route = row["route"]
        row.update(incomingPageCount=len(incoming[route]), incomingExamples=sorted(incoming[route])[:5], sameLanguageContentIncomingCount=len(editorial[route]), contentIncomingExamples=sorted(editorial[route])[:5], clickDepthFromRoot=depths.get(route))
        row["linkDecision"] = "repair-unreachable" if route not in depths else "review-content-discovery" if not editorial[route] and route not in {"/", "/ar"} else "retain-reachable-links"
        row["performance"] = "field-data-not-measured-by-this-audit"
        row["searchOutcome"] = "requires-current-page-query-country-device-evidence"
    result = {"generatedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(), "method": "Complete local initial-HTML graph. Content means outside header/nav/footer, not proof of editorial relevance. Depth includes language links. Does not establish ranking, backlinks, performance or live deployment.", "summary": {"inventory": len(inventory), "read": len(rows), "omitted": len(inventory) - len(rows), "unreachable": len(set(inventory) - set(depths)), "noSameLanguageContentIncoming": sum(not editorial[r] for r in inventory), "maximumDepth": max(depths.values())}, "pages": rows}
    target = ROOT / "docs/seo-opportunity-graph-2026-09-06.json"
    target.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    # Keep the complete directed graph, without exploding the public report
    # with thousands of repeated navigation-to-home edges.
    with gzip.open(ROOT / "output/seo/complete-link-graph-2026-09-06.json.gz", "wt") as f:
        json.dump(graph, f, ensure_ascii=False)
    print(json.dumps(result["summary"]))
    print(json.dumps([{k: p[k] for k in ("route", "linkDecision", "clickDepthFromRoot")} for p in rows if p["linkDecision"] != "retain-reachable-links"], ensure_ascii=False))


if __name__ == "__main__":
    run()
