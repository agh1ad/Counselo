import { Router, type Request } from "express";
import { and, count, desc, eq, gte, sql } from "drizzle-orm";
import { contactSubmissionsTable, db } from "@workspace/db";
import { ContactInputError, parseContactInput } from "../lib/contact-input.js";
import {
  encryptContactPayload,
  fingerprintRequest,
} from "../lib/contact-crypto.js";
import { processContactNotification } from "../lib/contact-notifications.js";
import {
  assertContactNotificationConfiguration,
  NotificationConfigurationError,
} from "../lib/contact-providers.js";
import { logger } from "../lib/logger.js";
import { requireAdmin } from "../middlewares/auth.js";
import { createContactReference } from "../lib/contact-reference.js";

const router = Router();
const RATE_LIMIT_WINDOW_MS = 15 * 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function requestIp(req: Request): string {
  return req.ip || "unknown";
}

function originAllowed(req: Request): boolean {
  const origin = req.get("origin");
  const host = req.get("host");
  if (!origin || !host) return false;
  return origin === `${req.protocol}://${host}`;
}

const receiptFields = {
  id: contactSubmissionsTable.id,
  emailProviderId: contactSubmissionsTable.emailProviderId,
  customerEmailProviderId: contactSubmissionsTable.customerEmailProviderId,
};

async function resumeStoredNotification(
  submission: { id: number; emailProviderId: string | null; customerEmailProviderId: string | null },
  reference: string,
): Promise<boolean> {
  if (submission.emailProviderId && submission.customerEmailProviderId) return true;
  try {
    return (await processContactNotification(submission.id)).emailAccepted;
  } catch (error) {
    // The request remains in the durable admin inbox. Pending recovery can be
    // retried by this receipt path or the existing recovery command.
    logger.error({ err: error, reference }, "Stored consultation notification remains pending");
    return false;
  }
}

router.post("/contact", async (req, res) => {
  if (!originAllowed(req)) {
    res.status(403).json({ error: "This submission origin is not allowed." });
    return;
  }

  try {
    const input = parseContactInput(req.body);
    if (input.website) {
      res
        .status(201)
        .json({ reference: createContactReference(), notificationStatus: "accepted" });
      return;
    }

    const reference = createContactReference(input);
    // A retry must recover the original receipt even if notification settings
    // change or this client has since reached the new-request rate limit.
    const [existing] = await db
      .select(receiptFields)
      .from(contactSubmissionsTable)
      .where(eq(contactSubmissionsTable.reference, reference))
      .limit(1);
    if (existing) {
      const emailAccepted = await resumeStoredNotification(existing, reference);
      res.status(emailAccepted ? 200 : 202).json({ reference, notificationStatus: emailAccepted ? "sent" : "pending" });
      return;
    }

    assertContactNotificationConfiguration();
    const requestFingerprint = fingerprintRequest(requestIp(req));
    const encrypted = encryptContactPayload(input);
    const accepted = await db.transaction(async (transaction) => {
      // Serialize this fingerprint's count and insert across Autoscale
      // instances. The transaction never includes a provider/network send.
      await transaction.execute(sql`select pg_advisory_xact_lock(hashtextextended(${`contact-rate:${requestFingerprint}`}, 0))`);
      const [replayed] = await transaction.select(receiptFields).from(contactSubmissionsTable)
        .where(eq(contactSubmissionsTable.reference, reference)).limit(1);
      if (replayed) return { kind: "stored" as const, created: false, submission: replayed };
      const [rate] = await transaction.select({ total: count() }).from(contactSubmissionsTable).where(and(
        eq(contactSubmissionsTable.requestFingerprint, requestFingerprint),
        gte(contactSubmissionsTable.createdAt, new Date(Date.now() - RATE_LIMIT_WINDOW_MS)),
      ));
      if ((rate?.total ?? 0) >= RATE_LIMIT_MAX_REQUESTS) return { kind: "limited" as const };
      const [submission] = await transaction.insert(contactSubmissionsTable).values({
        reference,
        region: input.region,
        language: input.language,
        service: input.service,
        requestFingerprint,
        ...encrypted,
      }).onConflictDoNothing({ target: contactSubmissionsTable.reference }).returning({ id: contactSubmissionsTable.id });
      if (submission) return { kind: "stored" as const, created: true, submission: { ...submission, emailProviderId: null, customerEmailProviderId: null } };
      // A mobile retry can arrive from another IP; the unique reference still
      // prevents a second request even though the rate-limit locks differ.
      const [stored] = await transaction.select(receiptFields).from(contactSubmissionsTable)
        .where(eq(contactSubmissionsTable.reference, reference)).limit(1);
      if (!stored) throw new Error("Unable to recover stored consultation receipt.");
      return { kind: "stored" as const, created: false, submission: stored };
    });
    if (accepted.kind === "limited") {
      res.setHeader(
        "Retry-After",
        String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
      );
      res
        .status(429)
        .json({
          error: "Too many consultation requests. Please try again later.",
        });
      return;
    }

    const emailAccepted = await resumeStoredNotification(accepted.submission, reference);
    res.status(emailAccepted ? (accepted.created ? 201 : 200) : 202).json({
      reference,
      notificationStatus: emailAccepted ? "sent" : "pending",
    });
  } catch (error) {
    if (error instanceof ContactInputError) {
      res.status(400).json({ error: error.message });
      return;
    }
    if (error instanceof NotificationConfigurationError) {
      logger.error(
        { err: error },
        "Contact notification configuration is incomplete",
      );
      res
        .status(503)
        .json({
          error:
            "Consultation notifications are temporarily unavailable. Please contact us by phone or email.",
        });
      return;
    }
    logger.error({ err: error }, "Failed to accept consultation request");
    res
      .status(500)
      .json({
        error:
          "We could not submit your consultation request. Please try again or contact us directly.",
      });
  }
});

router.get("/admin/contact-submissions", requireAdmin, async (_req, res) => {
  const submissions = await db
    .select({
      reference: contactSubmissionsTable.reference,
      region: contactSubmissionsTable.region,
      language: contactSubmissionsTable.language,
      service: contactSubmissionsTable.service,
      emailStatus: contactSubmissionsTable.emailStatus,
      customerEmailStatus: contactSubmissionsTable.customerEmailStatus,
      notificationAttempts: contactSubmissionsTable.notificationAttempts,
      lastError: contactSubmissionsTable.lastError,
      createdAt: contactSubmissionsTable.createdAt,
      updatedAt: contactSubmissionsTable.updatedAt,
      completedAt: contactSubmissionsTable.completedAt,
    })
    .from(contactSubmissionsTable)
    .orderBy(desc(contactSubmissionsTable.createdAt))
    .limit(100);
  res.json(submissions);
});

export default router;
