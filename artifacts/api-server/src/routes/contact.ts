import { randomBytes } from "node:crypto";
import { Router, type Request } from "express";
import { and, count, desc, eq, gte } from "drizzle-orm";
import { contactSubmissionsTable, db } from "@workspace/db";
import { ContactInputError, parseContactInput } from "../lib/contact-input.js";
import {
  encryptContactPayload,
  decryptContactPayload,
  fingerprintRequest,
} from "../lib/contact-crypto.js";
import { processContactNotification } from "../lib/contact-notifications.js";
import {
  assertContactNotificationConfiguration,
  NotificationConfigurationError,
} from "../lib/contact-providers.js";
import { logger } from "../lib/logger.js";
import { requireAdmin } from "../middlewares/auth.js";
import { contactAttribution, prepareStoredContact, updateLeadProgress, LEAD_OUTCOMES, type StoredContactPayload } from "../lib/contact-attribution.js";

const router = Router();
const RATE_LIMIT_WINDOW_MS = 15 * 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function createReference(): string {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `CON-${date}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

function requestIp(req: Request): string {
  return req.ip || "unknown";
}

function originAllowed(req: Request): boolean {
  const origin = req.get("origin");
  const host = req.get("host");
  if (!origin || !host) return false;
  return origin === `${req.protocol}://${host}`;
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
        .json({ reference: createReference(), notificationStatus: "accepted" });
      return;
    }

    assertContactNotificationConfiguration();
    const requestFingerprint = fingerprintRequest(requestIp(req));
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
    const [rate] = await db
      .select({ total: count() })
      .from(contactSubmissionsTable)
      .where(
        and(
          eq(contactSubmissionsTable.requestFingerprint, requestFingerprint),
          gte(contactSubmissionsTable.createdAt, windowStart),
        ),
      );
    if ((rate?.total ?? 0) >= RATE_LIMIT_MAX_REQUESTS) {
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

    const reference = createReference();
    const payload = prepareStoredContact(input);
    const encrypted = encryptContactPayload(payload);
    const [submission] = await db
      .insert(contactSubmissionsTable)
      .values({
        reference,
        region: input.region,
        language: input.language,
        service: input.service,
        requestFingerprint,
        ...encrypted,
      })
      .returning({ id: contactSubmissionsTable.id });
    if (!submission) throw new Error("Failed to store consultation request.");

    const result = await processContactNotification(submission.id);
    res.status(result.emailAccepted ? 201 : 202).json({
      reference,
      leadId: payload.leadId,
      notificationStatus: result.emailAccepted ? "sent" : "pending",
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

// Attribution and outcomes are opened one request at a time. Do not bulk-load
// encrypted attachments just to populate an analytics/admin table.
router.get("/admin/contact-submissions/:reference/attribution", requireAdmin, async (req, res) => {
  const reference = String(req.params.reference);
  if (!/^CON-\d{8}-[0-9A-F]{8}$/.test(reference)) return res.status(400).json({ error: "Invalid request reference." });
  try {
    const [row] = await db.select({ encryptedPayload: contactSubmissionsTable.encryptedPayload, payloadIv: contactSubmissionsTable.payloadIv, payloadAuthTag: contactSubmissionsTable.payloadAuthTag })
      .from(contactSubmissionsTable).where(eq(contactSubmissionsTable.reference, reference)).limit(1);
    if (!row) return res.status(404).json({ error: "Request not found." });
    return res.json({ reference, ...contactAttribution(decryptContactPayload<StoredContactPayload>(row)) });
  } catch {
    return res.status(500).json({ error: "Request attribution is temporarily unavailable." });
  }
});

router.patch("/admin/contact-submissions/:reference/attribution", requireAdmin, async (req, res) => {
  const reference = String(req.params.reference);
  if (!LEAD_OUTCOMES.includes(req.body?.status)) return res.status(400).json({ error: "Choose a supported enquiry outcome." });
  if (!originAllowed(req)) return res.status(403).json({ error: "This update origin is not allowed." });
  if (!/^CON-\d{8}-[0-9A-F]{8}$/.test(reference)) return res.status(400).json({ error: "Invalid request reference." });
  try {
    const result = await db.transaction(async (tx) => {
      const [row] = await tx.select().from(contactSubmissionsTable).where(eq(contactSubmissionsTable.reference, reference)).limit(1).for("update");
      if (!row) return { status: 404, body: { error: "Request not found." } };
      const updated = updateLeadProgress(decryptContactPayload<StoredContactPayload>(row), req.body?.status);
      if (!updated) return { status: 400, body: { error: "Choose a supported enquiry outcome." } };
      await tx.update(contactSubmissionsTable).set({ ...encryptContactPayload(updated), updatedAt: new Date() }).where(eq(contactSubmissionsTable.id, row.id));
      return { status: 200, body: { reference, ...contactAttribution(updated) } };
    });
    return res.status(result.status).json(result.body);
  } catch {
    return res.status(500).json({ error: "The enquiry outcome could not be saved. Please retry." });
  }
});

export default router;
