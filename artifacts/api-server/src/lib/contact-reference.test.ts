import assert from "node:assert/strict";
import test from "node:test";
import { createContactReference } from "./contact-reference.js";
import { parseContactInput } from "./contact-input.js";

test("retries recover one private reference while new attempts and edited payloads remain distinct", () => {
  const previous = process.env.CONTACT_RATE_LIMIT_SECRET;
  process.env.CONTACT_RATE_LIMIT_SECRET = "reference-test-secret-which-is-never-used-in-production";
  try {
    const input = parseContactInput({
      name: "Test User", email: "test@example.com", phone: "+966550001234",
      service: "business-law", message: "Please review a commercial agreement.",
      region: "sa", language: "en", idempotencyKey: "0c21b6b4-aaf4-4e7b-8885-999e82aa707c",
    });
    const reference = createContactReference(input);
    assert.match(reference, /^CON-[A-F0-9]{32}$/);
    assert.equal(createContactReference(JSON.parse(JSON.stringify(input))), reference);
    assert.notEqual(createContactReference({ ...input, message: "Please review a different commercial agreement." }), reference);
    assert.notEqual(createContactReference({ ...input, idempotencyKey: "801b1f55-a646-48a8-9105-5489f3bce29a" }), reference);
    assert.ok(!reference.includes(input.email));
    assert.notEqual(createContactReference({ ...input, idempotencyKey: undefined }), createContactReference({ ...input, idempotencyKey: undefined }));
  } finally {
    if (previous === undefined) delete process.env.CONTACT_RATE_LIMIT_SECRET;
    else process.env.CONTACT_RATE_LIMIT_SECRET = previous;
  }
});
