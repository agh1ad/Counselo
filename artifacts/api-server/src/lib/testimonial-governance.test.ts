import assert from "node:assert/strict";
import test from "node:test";
import { assignAiTestimonialMetadata, isPublishableTestimonial, selectPublicTestimonials, testimonialMetadataSchema } from "@workspace/api-zod";
import { parseWorkSampleInput, publicWorkSample } from "./work-input.js";
import type { WorkSample } from "@workspace/db";

const classified = { text: "Client supplied statement", jurisdiction: "Syria", service: "Contracts", sourceType: "Written feedback", internalReference: "private-evidence-record" };
const approved = { ...classified, verified: true, consentVerified: true, anonymized: true };

test("missing evidence checks and AI classification never grant publication approval", () => {
  for (const draft of [testimonialMetadataSchema.parse(classified), assignAiTestimonialMetadata(classified), assignAiTestimonialMetadata(approved)]) {
    assert.equal(draft.verified, false);
    assert.equal(draft.consentVerified, false);
    assert.equal(draft.anonymized, false);
    assert.equal(isPublishableTestimonial(draft), false);
    assert.deepEqual(selectPublicTestimonials([draft]), []);
  }
});

test("every explicit check and a private source reference are required for public output", () => {
  for (const field of ["verified", "consentVerified", "anonymized"]) {
    assert.deepEqual(selectPublicTestimonials([{ ...approved, [field]: false }]), []);
    assert.deepEqual(selectPublicTestimonials([{ ...approved, [field]: "true" }]), []);
  }
  for (const field of ["text", "jurisdiction", "service", "sourceType", "internalReference"]) assert.deepEqual(selectPublicTestimonials([{ ...approved, [field]: " " }]), []);
  assert.deepEqual(selectPublicTestimonials([null, "legacy statement", { text: "Legacy record" }]), []);
  const result = selectPublicTestimonials([approved]);
  assert.equal(result.length, 1);
  assert.equal(result[0].text, approved.text);
  assert.equal("internalReference" in result[0], false);
  assert.ok(!JSON.stringify(result).includes(classified.internalReference));
});

test("work drafts retain pending feedback privately while public work output omits it", () => {
  const draft = parseWorkSampleInput({ slug: "testimonial-draft", date: "2026-11-13", titleEn: "Draft", summaryEn: "Draft work sample", testimonialGovernanceVersion: 1, testimonials: [classified] });
  assert.equal(draft.testimonials?.length, 1);
  assert.equal(draft.testimonials?.[0].consentVerified, false);
  const sample = { ...draft, testimonials: [draft.testimonials![0], approved], fileData: "", fileSize: 0 } as WorkSample;
  const result = publicWorkSample(sample);
  assert.equal(result.testimonials.length, 1);
  assert.equal(result.testimonials[0].text, approved.text);
  assert.ok(!JSON.stringify(result).includes(classified.internalReference));
});
