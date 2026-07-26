import { randomBytes } from "node:crypto";
import { Router, type Request } from "express";
import { and, count, desc, eq, gte } from "drizzle-orm";
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
    const encrypted = encryptContactPayload(input);
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

export default router;
