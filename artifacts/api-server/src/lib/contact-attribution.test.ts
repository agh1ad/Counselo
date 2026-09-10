import assert from "node:assert/strict";
import test from "node:test";
import { parseContactInput } from "./contact-input.js";
import { contactAttribution, prepareStoredContact, updateLeadProgress } from "./contact-attribution.js";
import { decryptContactPayload, encryptContactPayload } from "./contact-crypto.js";

const request = { name: "Client Name", email: "client@example.com", phone: "+966550001234", service: "business-law", message: "Confidential legal narrative", region: "sa", language: "en", acquisition: { version: 1, landingPath: "/sa/services/business-law?client=private", source: "google", medium: "organic", privateQuery: "Client Name" }, leadProgress: { status: "engaged" }, leadId: "forged-client-id" };

test("accepted-request attribution is sanitized and client input cannot prequalify a lead or choose its join ID", () => {
  const payload = prepareStoredContact(parseContactInput(request));
  assert.equal(payload.leadProgress?.status, "new");
  assert.match(payload.leadId!, /^[0-9a-f-]{36}$/);
  assert.notEqual(payload.leadId, request.leadId);
  const attribution = contactAttribution(payload);
  assert.deepEqual(attribution.acquisition, { version: 1, landingPath: "/sa/services/business-law", source: "google", medium: "organic" });
  assert.doesNotMatch(JSON.stringify(attribution), /Client Name|client@example|Confidential|private/);
  assert.equal(parseContactInput({ ...request, acquisition: { ...request.acquisition, source: "client@example.com" } }).acquisition, undefined, "invalid attribution should not reject the enquiry");
});

test("outcome updates preserve encrypted contact content and join ID while exposing only the safe projection", () => {
  const previousKey = process.env.CONTACT_ENCRYPTION_KEY;
  process.env.CONTACT_ENCRYPTION_KEY = "11".repeat(32);
  try {
    const payload = prepareStoredContact(parseContactInput(request));
    const stored = encryptContactPayload(payload);
    const read = decryptContactPayload<typeof payload>(stored);
    const updated = updateLeadProgress(read, "qualified")!;
    const reread = decryptContactPayload<typeof payload>(encryptContactPayload(updated));
    assert.equal(reread.message, request.message);
    assert.equal(reread.email, request.email);
    assert.equal(reread.leadId, payload.leadId);
    assert.equal(contactAttribution(reread).progress.status, "qualified");
    assert.equal(updateLeadProgress(reread, "invented-outcome"), undefined);
    assert.doesNotMatch(JSON.stringify(contactAttribution(reread)), /Client Name|client@example|Confidential/);
  } finally { if (previousKey === undefined) delete process.env.CONTACT_ENCRYPTION_KEY; else process.env.CONTACT_ENCRYPTION_KEY = previousKey; }
});

test("old encrypted requests need no migration and do not fabricate historic acquisition or outcomes", () => {
  const old = parseContactInput({ ...request, acquisition: undefined });
  assert.deepEqual(contactAttribution(old), { leadId: null, acquisition: null, progress: { status: "new", updatedAt: null } });
  const updated = updateLeadProgress(old, "closed")!;
  assert.equal(updated.message, old.message);
  assert.equal(contactAttribution(updated).leadId, null);
  assert.equal(contactAttribution(updated).acquisition, null);
});
