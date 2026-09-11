import assert from "node:assert/strict";
import test from "node:test";
import { validateKeywordOwnership, type OwnershipRow, type OwnershipPolicy } from "./keyword-ownership.js";
const url = "https://counselo-legal.com/sa/ar/services/contracts";
const other = `${url}/contract-drafting-and-review`;
const row: OwnershipRow = { id: "Q1", query: "مراجعة عقد", country: "sa", language: "ar", intent_id: "contract-review", ownership_key: "sa:ar:contract-review", target_url: url, target_status: "existing" };
const policy: OwnershipPolicy = { owners: [{ key: row.ownership_key, url, status: "existing" }], supporting_routes: [] };
const routes = new Set([url, other]);
test("synonyms may share one owner but cannot acquire a second primary URL", () => {
  const synonym = { ...row, id: "Q2", query: "محامي مراجعة عقود" };
  assert.deepEqual(validateKeywordOwnership([row, synonym], policy, routes), []);
  assert.ok(validateKeywordOwnership([row, { ...synonym, target_url: other }], policy, routes).some(e => e.startsWith("Multiple primary URLs")));
});
test("normalization prevents case, whitespace and Arabic diacritic duplicate queries", () => {
  assert.ok(validateKeywordOwnership([row, { ...row, id: "Q2", query: "  مُراجعة  عقد " }], policy, routes).some(e => e.startsWith("Duplicate or blank")));
  const en = { ...row, query: "Contract Review" };
  assert.ok(validateKeywordOwnership([en, { ...en, id: "Q2", query: "contract review" }], policy, routes).some(e => e.startsWith("Duplicate or blank")));
});
test("new intent labels cannot bypass approved ownership", () => {
  assert.ok(validateKeywordOwnership([{ ...row, intent_id: "contract-reviews", ownership_key: "sa:ar:contract-reviews" }], policy, routes).some(e => e.startsWith("Unapproved")));
});
test("locale aliases, missing routes and silent publication status changes fail", () => {
  assert.ok(validateKeywordOwnership([{ ...row, target_url: url.replace("/sa/ar/", "/uae/ar/") }], policy, routes).some(e => e.startsWith("Noncanonical")));
  assert.ok(validateKeywordOwnership([row], policy, new Set()).some(e => e.startsWith("Existing owner missing")));
  const planned = { ...row, target_status: "planned" };
  const reserved = { ...policy, owners: [{ ...policy.owners[0], status: "planned" }] };
  assert.deepEqual(validateKeywordOwnership([planned], reserved, new Set()), []);
  assert.ok(validateKeywordOwnership([planned], reserved, routes).some(e => e.startsWith("Planned owner now exists")));
});
test("supporting route restriction survives an attempted policy reassignment", () => {
  const restricted = { owners: [{ ...policy.owners[0], url: other }], supporting_routes: [{ url: other, prohibited_primary_keys: [row.ownership_key] }] };
  assert.ok(validateKeywordOwnership([{ ...row, target_url: other }], restricted, routes).some(e => e.startsWith("Supporting URL cannot own")));
});
