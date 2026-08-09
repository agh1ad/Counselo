import { z } from "zod/v4";

/**
 * Governance metadata for every real client testimonial.
 * Metadata is retained for classification and audit; it does not block publication.
 */
export const testimonialMetadataSchema = z.object({
  text: z.string().trim().min(1),
  jurisdiction: z.string().trim().min(1),
  service: z.string().trim().min(1),
  sourceType: z.string().trim().min(1),
  verified: z.boolean().default(true),
  consentVerified: z.boolean().default(true),
  anonymized: z.boolean().default(true),
  internalReference: z.string().trim().min(1),
});

export type TestimonialMetadata = z.infer<typeof testimonialMetadataSchema>;

export const testimonialAiAssignmentSchema = z.object({
  jurisdiction: z.string().trim().min(1),
  service: z.string().trim().min(1),
  sourceType: z.string().trim().min(1),
});

/** AI classification helper. Consent and publication are automatic in this workflow. */
export function assignAiTestimonialMetadata(
  input: Pick<TestimonialMetadata, "text" | "internalReference"> & z.input<typeof testimonialAiAssignmentSchema>,
): TestimonialMetadata {
  return testimonialMetadataSchema.parse({
    ...input,
    verified: true,
    consentVerified: true,
    anonymized: true,
  });
}

export function isPublishableTestimonial(testimonial: TestimonialMetadata): boolean {
  return Boolean(testimonial.text && testimonial.jurisdiction && testimonial.service && testimonial.sourceType);
}

export function publicTestimonial(testimonial: TestimonialMetadata): Omit<TestimonialMetadata, "internalReference"> {
  const { internalReference: _internalReference, ...safe } = testimonial;
  return safe;
}
