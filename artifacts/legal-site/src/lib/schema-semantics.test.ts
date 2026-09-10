import assert from "node:assert/strict";
import test from "node:test";
import { COOPERATING_OFFICES, COUNSELO_ORGANIZATION, regionalServiceEntity, regionalServiceDirectoryEntity } from "@workspace/api-zod/browser";
import { validateSchemaSemantics } from "./schema-semantics";

test("keeps legitimate offices and online offerings distinct in nested graphs", () => {
  const graph = { "@graph": [COUNSELO_ORGANIZATION, ...Object.values(COOPERATING_OFFICES), regionalServiceDirectoryEntity("sa", "ar", "الخدمات", "استشارات قانونية", [{ id: "employment-law", title: "قانون العمل" }])] };
  assert.deepEqual(validateSchemaSemantics(graph, "/sa/ar/services"), []);
  assert.equal(regionalServiceEntity("sa", "employment-law", "قانون العمل", "استشارات", "ar").url, "https://counselo-legal.com/sa/ar/services/employment-law");
});

test("rejects the previous business/service confusion even inside WebPage about", () => {
  const issues = validateSchemaSemantics({ "@type": "WebPage", about: { ...regionalServiceEntity("sa", "employment-law", "Employment", "Advice"), "@type": "LegalService" } }, "/sa/services/employment-law");
  assert.ok(issues.some(issue => issue.rule === "business-service-confusion"));
  assert.ok(issues.some(issue => issue.rule === "service-entity-type"));
  assert.ok(issues.some(issue => issue.rule === "service-no-schema"));
});

test("rejects retyping the platform or using an anonymous service provider", () => {
  assert.ok(validateSchemaSemantics([{ ...COUNSELO_ORGANIZATION, "@type": "LegalService" }, { ...regionalServiceEntity("syr", "family-law", "Family", "Advice"), provider: { name: "CounselO" } }], "/syr/services/family-law").some(issue => issue.rule === "platform-entity-type"));
  assert.ok(validateSchemaSemantics({ ...regionalServiceEntity("syr", "family-law", "Family", "Advice"), provider: { name: "CounselO" } }, "/syr/services/family-law").some(issue => issue.rule === "service-provider-identity"));
});
