import assert from "node:assert/strict";
import test from "node:test";
import { assignAiTestimonialMetadata, isPublishableTestimonial, publicTestimonial } from "@workspace/api-zod";

test("AI testimonial assignment supplies automatic consent metadata", () => {
  const testimonial = assignAiTestimonialMetadata({
    text: "The team explained the next steps clearly.",
    jurisdiction: "sa",
    service: "employment-law",
    sourceType: "client-submitted",
    internalReference: "MAT-2026-001",
  });
  assert.equal(testimonial.verified, true);
  assert.equal(testimonial.consentVerified, true);
  assert.equal(testimonial.anonymized, true);
  assert.equal(isPublishableTestimonial(testimonial), true);
});

test("testimonials are public and internal references are removed", () => {
  const testimonial = {
    text: "The team explained the next steps clearly.",
    jurisdiction: "sa",
    service: "employment-law",
    sourceType: "client-submitted",
    verified: true,
    consentVerified: true,
    anonymized: true,
    internalReference: "MAT-2026-001",
  } as const;
  assert.equal(isPublishableTestimonial(testimonial), true);
  assert.deepEqual(publicTestimonial(testimonial), {
    text: testimonial.text,
    jurisdiction: testimonial.jurisdiction,
    service: testimonial.service,
    sourceType: testimonial.sourceType,
    verified: true,
    consentVerified: true,
    anonymized: true,
  });
});
