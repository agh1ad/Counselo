import assert from "node:assert/strict";
import test from "node:test";
import {
  decryptContactPayload,
  encryptContactPayload,
  fingerprintRequest,
} from "./contact-crypto.js";

test("encrypts pending consultation data and decrypts it losslessly", () => {
  const previousKey = process.env["CONTACT_ENCRYPTION_KEY"];
  process.env["CONTACT_ENCRYPTION_KEY"] = "11".repeat(32);
  try {
    const original = { name: "Client", message: "Confidential matter" };
    const encrypted = encryptContactPayload(original);
    assert.doesNotMatch(encrypted.encryptedPayload, /Confidential matter/);
    assert.deepEqual(decryptContactPayload(encrypted), original);
  } finally {
    if (previousKey === undefined) delete process.env["CONTACT_ENCRYPTION_KEY"];
    else process.env["CONTACT_ENCRYPTION_KEY"] = previousKey;
  }
});

test("creates stable, non-reversible request fingerprints", () => {
  const previousSecret = process.env["CONTACT_RATE_LIMIT_SECRET"];
  process.env["CONTACT_RATE_LIMIT_SECRET"] =
    "rate-limit-test-secret-that-is-long-enough";
  try {
    const first = fingerprintRequest("203.0.113.20");
    const second = fingerprintRequest("203.0.113.20");
    assert.equal(first, second);
    assert.notEqual(first, "203.0.113.20");
  } finally {
    if (previousSecret === undefined)
      delete process.env["CONTACT_RATE_LIMIT_SECRET"];
    else process.env["CONTACT_RATE_LIMIT_SECRET"] = previousSecret;
  }
});
