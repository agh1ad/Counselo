import { randomBytes } from "node:crypto";
import { fingerprintRequest } from "./contact-crypto.js";
import type { ContactInput } from "./contact-input.js";

/** Same form attempt and normalized payload must resolve to one stored request. */
export function createContactReference(input?: ContactInput): string {
  if (input?.idempotencyKey) {
    return `CON-${fingerprintRequest(`contact-v1:${JSON.stringify(input)}`).slice(0, 32).toUpperCase()}`;
  }
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `CON-${date}-${randomBytes(4).toString("hex").toUpperCase()}`;
}
