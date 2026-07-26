import assert from "node:assert/strict";
import test from "node:test";
import {
  ContactInputError,
  MAX_CONTACT_TOTAL_BYTES,
  parseContactInput,
} from "./contact-input.js";

const validInput = {
  name: "Ahmed Al-Harbi",
  email: "ahmed@example.com",
  phone: "+966550001234",
  service: "business-law",
  message: "I need advice about a commercial contract dispute.",
  region: "sa",
  language: "en",
  website: "",
};

test("accepts a valid consultation request", () => {
  const parsed = parseContactInput(validInput);
  assert.equal(parsed.email, "ahmed@example.com");
  assert.deepEqual(parsed.attachments, []);
});

test("accepts a real PDF attachment and records its decoded size", () => {
  const file = Buffer.from("%PDF-1.4\n%%EOF");
  const parsed = parseContactInput({
    ...validInput,
    attachments: [
      {
        name: "contract.pdf",
        type: "application/pdf",
        data: file.toString("base64"),
      },
    ],
  });
  assert.equal(parsed.attachments[0]?.size, file.length);
});

test("rejects disguised and oversized attachments", () => {
  assert.throws(
    () =>
      parseContactInput({
        ...validInput,
        attachments: [
          {
            name: "fake.pdf",
            type: "application/pdf",
            data: Buffer.from("not a pdf").toString("base64"),
          },
        ],
      }),
    ContactInputError,
  );

  const oversized = Buffer.concat([
    Buffer.from("%PDF-"),
    Buffer.alloc(MAX_CONTACT_TOTAL_BYTES + 1),
  ]);
  assert.throws(
    () =>
      parseContactInput({
        ...validInput,
        attachments: [
          {
            name: "large.pdf",
            type: "application/pdf",
            data: oversized.toString("base64"),
          },
        ],
      }),
    ContactInputError,
  );
});

test("preserves the honeypot value for silent bot handling", () => {
  const parsed = parseContactInput({
    ...validInput,
    website: "https://spam.invalid",
  });
  assert.equal(parsed.website, "https://spam.invalid");
});
