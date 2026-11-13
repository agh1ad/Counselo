import { z } from "zod/v4";

/**
 * Governance metadata for every real client testimonial.
 * Classification never establishes authenticity, publication consent or redaction.
 */
export const testimonialMetadataSchema = z.object({
  text: z.string().trim().min(1),
  jurisdiction: z.string().trim().min(1),
  service: z.string().trim().min(1),
  sourceType: z.string().trim().min(1),
  verified: z.boolean().default(false),
  consentVerified: z.boolean().default(false),
  anonymized: z.boolean().default(false),
  internalReference: z.string().trim().min(1),
});

export type TestimonialMetadata = z.infer<typeof testimonialMetadataSchema>;

export const testimonialAiAssignmentSchema = z.object({
  jurisdiction: z.string().trim().min(1),
  service: z.string().trim().min(1),
  sourceType: z.string().trim().min(1),
});

/** AI can classify a draft; a person must record evidence and publication checks. */
export function assignAiTestimonialMetadata(
  input: Pick<TestimonialMetadata, "text" | "internalReference"> & z.input<typeof testimonialAiAssignmentSchema>,
): TestimonialMetadata {
  return testimonialMetadataSchema.parse({
    ...input,
    verified: false,
    consentVerified: false,
    anonymized: false,
  });
}

export function isPublishableTestimonial(testimonial: TestimonialMetadata): boolean {
  return testimonial.verified === true && testimonial.consentVerified === true && testimonial.anonymized === true
    && [testimonial.text, testimonial.jurisdiction, testimonial.service, testimonial.sourceType, testimonial.internalReference]
      .every(value => typeof value === "string" && value.trim().length > 0);
}

export function publicTestimonial(testimonial: TestimonialMetadata): Omit<TestimonialMetadata, "internalReference"> {
  const { internalReference: _internalReference, ...safe } = testimonial;
  return safe;
}

/** Apply the same evidence gate to API and SSR outputs; keep drafts only in admin storage. */
export function selectPublicTestimonials(testimonials: unknown): Array<Omit<TestimonialMetadata, "internalReference">> {
  if (!Array.isArray(testimonials)) return [];
  return testimonials.flatMap(value => {
    const parsed = testimonialMetadataSchema.safeParse(value);
    return parsed.success && isPublishableTestimonial(parsed.data) ? [publicTestimonial(parsed.data)] : [];
  });
}
