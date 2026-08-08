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
  assert.equal(parsed.consultationProduct, "comprehensive-consultation");
  assert.deepEqual(parsed.attachments, []);
});

test("validates consultation products independently from practice areas", () => {
  const parsed = parseContactInput({ ...validInput, consultationProduct: "document-review" });
  assert.equal(parsed.consultationProduct, "document-review");
  assert.throws(
    () => parseContactInput({ ...validInput, consultationProduct: "fixed-price-package" }),
    ContactInputError,
  );
});

test("accepts one valid service for every region and language", () => {
  const cases = [
    ["sa", "en", "business-law"],
    ["sa", "ar", "business-law"],
    ["syr", "en", "civil-law"],
    ["syr", "ar", "civil-law"],
    ["uae", "en", "corporate-commercial"],
    ["uae", "ar", "corporate-commercial"],
  ] as const;
  for (const [region, language, service] of cases) {
    const parsed = parseContactInput({ ...validInput, region, language, service });
    assert.equal(parsed.region, region);
    assert.equal(parsed.language, language);
    assert.equal(parsed.service, service);
  }
});

test("rejects every cross-region service", () => {
  assert.throws(
    () => parseContactInput({ ...validInput, region: "uae", service: "business-law" }),
    ContactInputError,
  );
  assert.throws(
    () => parseContactInput({ ...validInput, region: "sa", service: "corporate-commercial" }),
    ContactInputError,
  );
  assert.throws(
    () => parseContactInput({ ...validInput, region: "syr", service: "corporate-commercial" }),
    ContactInputError,
  );
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
