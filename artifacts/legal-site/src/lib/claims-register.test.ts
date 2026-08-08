import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

type Claim = {
  id: string;
  approvedWordingEn: string;
  approvedWordingAr: string;
  evidenceOwner: string;
  evidenceLocation: string;
  jurisdictions: string[];
  lastVerified: string;
  reviewBy: string;
  requiredDisclaimer: string;
};

const register = JSON.parse(readFileSync(resolve(process.cwd(), "../../docs/claims-register.json"), "utf8")) as { claims: Claim[] };

test("every public claim register entry has approval and evidence metadata", () => {
  assert.ok(register.claims.length >= 7);
  const ids = register.claims.map((claim) => claim.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const claim of register.claims) {
    assert.ok(claim.approvedWordingEn && claim.approvedWordingAr);
    assert.ok(claim.evidenceOwner && claim.evidenceLocation);
    assert.deepEqual(new Set(claim.jurisdictions), new Set(["uae", "sa", "syr"]));
    assert.match(claim.lastVerified, /^2026-\d{2}-\d{2}$/);
    assert.match(claim.reviewBy, /^2026-\d{2}-\d{2}$/);
    assert.ok(claim.requiredDisclaimer);
  }
});

test("known high-risk claim contradictions are absent from the public shell copy", () => {
  const files = [
    resolve(process.cwd(), "src/pages/region-picker.tsx"),
    resolve(process.cwd(), "src/pages/ar-region-picker.tsx"),
    resolve(process.cwd(), "src/translations/en.ts"),
  ];
  const copy = files.map((file) => readFileSync(file, "utf8")).join("\n");
  assert.doesNotMatch(copy, /Guaranteed Response|never shared|never share|يضمن كاونسلو|لا تُشارَك/);
});
