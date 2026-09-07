import { randomUUID } from "node:crypto";
import { sanitizeAcquisitionContext } from "@workspace/api-zod";
import type { ContactInput } from "./contact-input.js";

export const LEAD_OUTCOMES = ["new", "qualified", "not_qualified", "engaged", "closed"] as const;
export type LeadOutcome = typeof LEAD_OUTCOMES[number];
export interface LeadProgress { status: LeadOutcome; updatedAt: string; }
export type StoredContactPayload = ContactInput & { leadId?: string; leadProgress?: LeadProgress };

export function prepareStoredContact(input: ContactInput): StoredContactPayload {
  return { ...input, leadId: randomUUID(), leadProgress: { status: "new", updatedAt: new Date().toISOString() } };
}

/** No client narrative, attachments, identity or notification secrets may leave
 * this projection. Older encrypted requests remain readable and editable. */
export function contactAttribution(payload: StoredContactPayload) {
  return {
    leadId: typeof payload.leadId === "string" && /^[0-9a-f-]{36}$/i.test(payload.leadId) ? payload.leadId : null,
    acquisition: sanitizeAcquisitionContext(payload.acquisition) ?? null,
    progress: payload.leadProgress && LEAD_OUTCOMES.includes(payload.leadProgress.status)
      ? { status: payload.leadProgress.status, updatedAt: payload.leadProgress.updatedAt } : { status: "new" as const, updatedAt: null },
  };
}

export function updateLeadProgress(payload: StoredContactPayload, status: unknown): StoredContactPayload | undefined {
  if (!LEAD_OUTCOMES.includes(status as LeadOutcome)) return undefined;
  return { ...payload, leadProgress: { status: status as LeadOutcome, updatedAt: new Date().toISOString() } };
}
