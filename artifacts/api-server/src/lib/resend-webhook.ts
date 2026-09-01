import { eq, or } from "drizzle-orm";
import type { RequestHandler } from "express";
import { Resend, type WebhookEventPayload } from "resend";
import { contactSubmissionsTable, db } from "@workspace/db";
import { logger } from "./logger.js";

const TERMINAL_STATUSES = new Set([
  "delivered",
  "opened",
  "clicked",
  "bounced",
  "complained",
  "failed",
  "suppressed",
]);

const SUCCESS_RANK: Record<string, number> = {
  pending: 0,
  scheduled: 1,
  sent: 2,
  delivery_delayed: 2,
  delivered: 3,
  opened: 4,
  clicked: 5,
};

const EVENT_STATUSES: Record<string, string> = {
  "email.scheduled": "scheduled",
  "email.sent": "sent",
  "email.delivery_delayed": "delivery_delayed",
  "email.delivered": "delivered",
  "email.opened": "opened",
  "email.clicked": "clicked",
  "email.bounced": "bounced",
  "email.complained": "complained",
  "email.failed": "failed",
  "email.suppressed": "suppressed",
};

export function resendEventStatus(type: string): string | null {
  return EVENT_STATUSES[type] ?? null;
}

export function nextDeliveryStatus(
  currentStatus: string,
  incomingStatus: string,
): string {
  if (TERMINAL_STATUSES.has(currentStatus)) {
    if (["bounced", "complained", "failed", "suppressed"].includes(incomingStatus)) {
      return incomingStatus;
    }
    return currentStatus;
  }
  const currentRank = SUCCESS_RANK[currentStatus] ?? 0;
  const incomingRank = SUCCESS_RANK[incomingStatus];
  if (incomingRank === undefined) return incomingStatus;
  return incomingRank >= currentRank ? incomingStatus : currentStatus;
}

function deliveryComplete(status: string): boolean {
  return TERMINAL_STATUSES.has(status);
}

function verifyEvent(payload: string, headers: {
  id: string;
  timestamp: string;
  signature: string;
}): WebhookEventPayload {
  const webhookSecret = process.env["RESEND_WEBHOOK_SECRET"]?.trim();
  if (!webhookSecret) throw new Error("RESEND_WEBHOOK_SECRET is required");
  const resend = new Resend(process.env["RESEND_API_KEY"] ?? "re_webhook_verify");
  return resend.webhooks.verify({ payload, headers, webhookSecret });
}

export const handleResendWebhook: RequestHandler = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
  const id = req.get("svix-id");
  const timestamp = req.get("svix-timestamp");
  const signature = req.get("svix-signature");
  if (!id || !timestamp || !signature || typeof req.body !== "string") {
    res.status(400).json({ error: "Invalid webhook request" });
    return;
  }

  let event: WebhookEventPayload;
  try {
    event = verifyEvent(req.body, { id, timestamp, signature });
  } catch (error) {
    logger.warn({ err: error }, "Rejected invalid Resend webhook");
    res.status(400).json({ error: "Invalid webhook signature" });
    return;
  }

  const incomingStatus = resendEventStatus(event.type);
  if (!incomingStatus || !("email_id" in event.data)) {
    res.status(200).json({ received: true, matched: false });
    return;
  }

  const emailId = event.data.email_id;
  const [submission] = await db
    .select({
      id: contactSubmissionsTable.id,
      emailProviderId: contactSubmissionsTable.emailProviderId,
      emailStatus: contactSubmissionsTable.emailStatus,
      customerEmailProviderId: contactSubmissionsTable.customerEmailProviderId,
      customerEmailStatus: contactSubmissionsTable.customerEmailStatus,
      completedAt: contactSubmissionsTable.completedAt,
    })
    .from(contactSubmissionsTable)
    .where(
      or(
        eq(contactSubmissionsTable.emailProviderId, emailId),
        eq(contactSubmissionsTable.customerEmailProviderId, emailId),
      ),
    )
    .limit(1);

  if (!submission) {
    res.status(200).json({ received: true, matched: false });
    return;
  }

  const emailStatus =
    submission.emailProviderId === emailId
      ? nextDeliveryStatus(submission.emailStatus, incomingStatus)
      : submission.emailStatus;
  const customerEmailStatus =
    submission.customerEmailProviderId === emailId
      ? nextDeliveryStatus(submission.customerEmailStatus, incomingStatus)
      : submission.customerEmailStatus;
  const completed =
    deliveryComplete(emailStatus) && deliveryComplete(customerEmailStatus);

  await db
    .update(contactSubmissionsTable)
    .set({
      emailStatus,
      customerEmailStatus,
      completedAt: completed ? (submission.completedAt ?? new Date()) : null,
      updatedAt: new Date(),
    })
    .where(eq(contactSubmissionsTable.id, submission.id));

  res.status(200).json({ received: true, matched: true });
};
