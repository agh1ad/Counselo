import assert from "node:assert/strict";
import test from "node:test";
import { getConsultationPrices } from "@workspace/api-zod";
import {
  ContactInputError,
  MAX_CONTACT_TOTAL_BYTES,
  parseContactInput,
  isConsultationRequest,
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

test("legacy requests retain their serialized payload for retry fingerprints", () => {
  const parsed = parseContactInput(validInput);
  assert.equal(JSON.stringify(parsed), JSON.stringify({
    name: validInput.name, email: validInput.email, phone: validInput.phone,
    service: validInput.service, consultationProduct: "comprehensive-consultation",
    message: validInput.message, region: validInput.region, language: validInput.language,
    website: "", attachments: [],
  }));
  assert.equal(isConsultationRequest(parsed), true);
});

test("explicit general requests retain their legal field without commissioning a consultation", () => {
  for (const region of ["sa", "syr", "uae"] as const) {
    for (const service of [...getConsultationPrices(region).map(category => category.id), "urgent-legal-assistance"]) {
      const parsed = parseContactInput({ ...validInput, region, service, requestIntent: "general" });
      assert.equal(parsed.service, service);
      assert.equal(parsed.requestIntent, "general");
      assert.equal(parsed.consultationProduct, undefined);
      assert.equal(isConsultationRequest(parsed), false);
      assert.doesNotMatch(JSON.stringify(parsed), /consultationProduct/);
    }
  }
  assert.equal(parseContactInput({ ...validInput, requestIntent: "general", consultationProduct: "document-review" }).consultationProduct, undefined);
});

test("explicit consultation requests preserve product selection and reject unknown intents", () => {
  const parsed = parseContactInput({ ...validInput, requestIntent: "consultation", consultationProduct: "comprehensive-consultation" });
  assert.equal(parsed.consultationProduct, "comprehensive-consultation");
  assert.equal(isConsultationRequest(parsed), true);
  assert.throws(() => parseContactInput({ ...validInput, requestIntent: "unrecognized" }), ContactInputError);
});

test("accepts and normalizes Arabic and Eastern Arabic phone digits", () => {
  for (const phone of ["+٩٦٦٥٥٠٠٠١٢٣٤", "+۹۶۶۵۵۰۰۰۱۲۳۴"]) {
    assert.equal(parseContactInput({ ...validInput, phone, language: "ar" }).phone, "+966550001234");
  }
});

test("accepts only bounded UUID submission keys", () => {
  const idempotencyKey = "0c21b6b4-aaf4-4e7b-8885-999e82aa707c";
  assert.equal(parseContactInput({ ...validInput, idempotencyKey }).idempotencyKey, idempotencyKey);
  assert.throws(() => parseContactInput({ ...validInput, idempotencyKey: "arbitrary-value" }), ContactInputError);
});

test("phone separators cannot substitute for digits", () => {
  for (const phone of ["+........1", "1234567890123456", "not-a-phone-number"]) {
    assert.throws(() => parseContactInput({ ...validInput, phone }), ContactInputError);
  }
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

test("accepts each country's published consultation categories without unknown or foreign-region choices", () => {
  for (const region of ["sa", "syr", "uae"] as const) for (const category of getConsultationPrices(region)) {
    for (const language of ["en", "ar"]) {
      assert.equal(parseContactInput({ ...validInput, region, service: category.id, language }).service, category.id);
    }
  }
  for (const [region, service] of [["uae", "civil-procedure"], ["syr", "corporate-commercial"]]) {
    assert.throws(() => parseContactInput({ ...validInput, region, service }), ContactInputError);
  }
  assert.throws(() => parseContactInput({ ...validInput, service: "unknown-consultation" }), ContactInputError);
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

test("urgent assistance is accepted for each supported region and language", () => {
  for (const region of ["sa", "syr", "uae"]) for (const language of ["en", "ar"]) {
    const result = parseContactInput({ ...validInput, region, language, service: "urgent-legal-assistance" });
    assert.equal(result.service, "urgent-legal-assistance");
    assert.equal(result.region, region);
    assert.equal(result.language, language);
  }
});
