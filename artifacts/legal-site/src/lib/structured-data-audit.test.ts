import assert from "node:assert/strict";
import test from "node:test";
import { auditStructuredData, readJsonLd, schemaTypes } from "./structured-data-audit";

const base = "https://counselo-legal.com";
const script = (value: unknown) => `<script nonce="test" data-rh="true" type='application/ld+json'>${JSON.stringify(value)}</script>`;

test("JSON-LD auditing accepts Helmet attributes, arrays and inherited graph context", () => {
  const parsed = readJsonLd(script({ "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", "@id": `${base}/#website`, url: base },
    { "@type": ["WebPage", "CollectionPage"], "@id": `${base}/#webpage`, url: `${base}/`, hasPart: { "@type": "CollectionPage", "@id": `${base}/legal-library#articles`, url: `${base}/legal-library` } },
  ] }));
  assert.equal(parsed.blockCount, 1);
  assert.deepEqual(parsed.errors, []);
  assert.ok(parsed.nodes.flatMap(node => schemaTypes(node.value)).includes("WebSite"));
  assert.deepEqual(auditStructuredData(parsed, `${base}/`, "/"), []);
  assert.equal(readJsonLd(script([{ "@type": "Article" }, { "@type": "BreadcrumbList" }])).documents.length, 2);
});

test("malformed or non-object JSON-LD cannot silently pass validation", () => {
  for (const body of ["{broken", "null", '"text"', "[]"]) {
    const parsed = readJsonLd(`<script type=application/ld+json data-rh="true">${body}</script>`);
    assert.equal(parsed.errors.length, 1);
    assert.equal(auditStructuredData(parsed, `${base}/sa`, "/sa")[0].rule, "schema-invalid-json");
  }
});

test("graph page canonicals and regional WebSite impersonation are checked", () => {
  const parsed = readJsonLd(script({ "@context": "https://schema.org", "@graph": [
    { "@type": "AboutPage", url: `${base}/sa/about`, "@id": `${base}/sa/about#webpage` },
    { "@type": "WebSite", url: `${base}/syr`, "@id": `${base}/syr#website` },
  ] }));
  assert.deepEqual(auditStructuredData(parsed, `${base}/syr/about`, "/syr/about").map(issue => issue.rule), [
    "webpage-schema-canonical-mismatch", "webpage-id-canonical-mismatch", "website-identity-mismatch",
  ]);
});

test("Our Work hierarchy validates actual locale paths, positions and WebSite parent", () => {
  for (const prefix of ["", "/ar"]) for (const detail of ["", "/case-record"]) {
    const route = `${prefix}/our-work${detail}`;
    const expected = [base + (prefix || "/"), `${base}${prefix}/our-work`, ...(detail ? [base + route] : [])];
    const values = [
      { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${base}${route}#webpage`, url: base + route, isPartOf: { "@id": `${base}/#website` } },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: expected.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: "Ignored label", item })) },
    ];
    assert.deepEqual(auditStructuredData(readJsonLd(script(values)), base + route, route), []);
    values[1].itemListElement!.splice(1, 0, { "@type": "ListItem", position: 2, name: "Library", item: `${base}${prefix}/legal-library` });
    assert.ok(auditStructuredData(readJsonLd(script(values)), base + route, route).some(issue => issue.rule === "work-breadcrumb-hierarchy"));
  }
});

test("Legal Articles is a root collection with locale-correct article descendants", () => {
  for (const ar of [false, true]) for (const detail of [false, true]) {
    const index = ar ? "/blog/ar" : "/blog";
    const route = detail ? `/blog/${ar ? "ar" : "en"}/article-record` : index;
    const paths = [ar ? "/ar" : "/", index, ...(detail ? [route] : [])];
    const schema = { "@context": "https://schema.org", "@type": detail ? "Article" : ["CollectionPage", "Blog"], "@id": base + route + (detail ? "#article" : "#collection"), url: base + route, isPartOf: { "@id": detail ? base + index + "#collection" : base + "/#website" } };
    const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: paths.map((path, position) => ({ "@type": "ListItem", position: position + 1, item: base + path })) };
    assert.deepEqual(auditStructuredData(readJsonLd(script([schema, breadcrumb])), base + route, route), []);
    breadcrumb.itemListElement[0].item = base + "/sa";
    assert.ok(auditStructuredData(readJsonLd(script([schema, breadcrumb])), base + route, route).some(issue => issue.rule === "article-breadcrumb-hierarchy"));
  }
});
