import {
  and,
  eq,
  gte,
  isNotNull,
  isNull,
  lt,
  lte,
  notInArray,
  or,
} from "drizzle-orm";
import { contactSubmissionsTable, db } from "@workspace/db";
import type { ContactInput } from "./contact-input.js";
import { decryptContactPayload } from "./contact-crypto.js";
import {
  getEmailDeliveryStatus,
  sendCustomerConfirmationEmail,
  sendConsultationEmail,
} from "./contact-providers.js";
import { logger } from "./logger.js";

const MAX_NOTIFICATION_ATTEMPTS = 5;
const WORKER_INTERVAL_MS = 60_000;
const LOCK_TIMEOUT_MS = 5 * 60_000;

function retryDelay(attempt: number): number {
  return Math.min(30 * 60_000, 30_000 * 2 ** Math.max(0, attempt - 1));
}

function safeError(error: unknown): string {
  if (error instanceof Error) return error.message.slice(0, 500);
  return "Unknown notification error";
}

function isEmailTerminal(status: string): boolean {
  return [
    "delivered",
    "opened",
    "clicked",
    "bounced",
    "complained",
    "failed",
    "canceled",
  ].includes(status);
}

async function claimSubmission(id: number) {
  const staleBefore = new Date(Date.now() - LOCK_TIMEOUT_MS);
  const [claimed] = await db
    .update(contactSubmissionsTable)
    .set({ processingAt: new Date(), updatedAt: new Date() })
    .where(
      and(
        eq(contactSubmissionsTable.id, id),
        or(
          isNull(contactSubmissionsTable.processingAt),
          lt(contactSubmissionsTable.processingAt, staleBefore),
        ),
      ),
    )
    .returning();
  return claimed;
}

export async function processContactNotification(id: number): Promise<{
  emailAccepted: boolean;
}> {
  const submission = await claimSubmission(id);
  if (!submission) return { emailAccepted: false };

  let input: ContactInput;
  try {
    input = decryptContactPayload<ContactInput>({
      encryptedPayload: submission.encryptedPayload,
      payloadIv: submission.payloadIv,
      payloadAuthTag: submission.payloadAuthTag,
    });
  } catch (error) {
    logger.error(
      { err: error, reference: submission.reference },
      "Unable to decrypt consultation payload",
    );
    await db
      .update(contactSubmissionsTable)
      .set({
        emailStatus: submission.emailProviderId
          ? submission.emailStatus
          : "failed",
        customerEmailStatus: submission.customerEmailProviderId
          ? submission.customerEmailStatus
          : "failed",
        notificationAttempts: MAX_NOTIFICATION_ATTEMPTS,
        processingAt: null,
        lastError: "Unable to decrypt the notification payload.",
        updatedAt: new Date(),
      })
      .where(eq(contactSubmissionsTable.id, submission.id));
    return {
      emailAccepted: Boolean(
        submission.emailProviderId && submission.customerEmailProviderId,
      ),
    };
  }

  const internalEmailPromise = submission.emailProviderId
    ? Promise.resolve({
        id: submission.emailProviderId,
        status: submission.emailStatus,
      })
    : sendConsultationEmail(input, submission.reference);
  const customerEmailPromise = submission.customerEmailProviderId
    ? Promise.resolve({
        id: submission.customerEmailProviderId,
        status: submission.customerEmailStatus,
      })
    : sendCustomerConfirmationEmail(input, submission.reference);
  const [internalEmailResult, customerEmailResult] = await Promise.all([
    Promise.resolve(internalEmailPromise).then(
      (value) => ({ status: "fulfilled" as const, value }),
      (reason: unknown) => ({ status: "rejected" as const, reason }),
    ),
    Promise.resolve(customerEmailPromise).then(
      (value) => ({ status: "fulfilled" as const, value }),
      (reason: unknown) => ({ status: "rejected" as const, reason }),
    ),
  ]);

  const internalEmailAccepted = internalEmailResult.status === "fulfilled";
  const customerEmailAccepted = customerEmailResult.status === "fulfilled";
  const emailAccepted = internalEmailAccepted && customerEmailAccepted;
  const attempt = submission.notificationAttempts + 1;
  const errors = [
    internalEmailResult.status === "rejected"
      ? `Internal email: ${safeError(internalEmailResult.reason)}`
      : "",
    customerEmailResult.status === "rejected"
      ? `Customer email: ${safeError(customerEmailResult.reason)}`
      : "",
  ].filter(Boolean);
  const exhausted = attempt >= MAX_NOTIFICATION_ATTEMPTS;

  await db
    .update(contactSubmissionsTable)
    .set({
      emailStatus: internalEmailAccepted
        ? internalEmailResult.value.status
        : exhausted
          ? "failed"
          : "pending",
      emailProviderId: internalEmailAccepted
        ? internalEmailResult.value.id
        : submission.emailProviderId,
      customerEmailStatus: customerEmailAccepted
        ? customerEmailResult.value.status
        : exhausted
          ? "failed"
          : "pending",
      customerEmailProviderId: customerEmailAccepted
        ? customerEmailResult.value.id
        : submission.customerEmailProviderId,
      notificationAttempts: attempt,
      nextAttemptAt: new Date(Date.now() + retryDelay(attempt)),
      processingAt: null,
      lastError: errors.join(" | ") || null,
      encryptedPayload: emailAccepted ? "" : submission.encryptedPayload,
      payloadIv: emailAccepted ? "" : submission.payloadIv,
      payloadAuthTag: emailAccepted ? "" : submission.payloadAuthTag,
      updatedAt: new Date(),
    })
    .where(eq(contactSubmissionsTable.id, submission.id));

  logger.info(
    {
      reference: submission.reference,
      internalEmailAccepted,
      customerEmailAccepted,
      attempt,
    },
    "Consultation notification attempt completed",
  );

  return { emailAccepted };
}

async function deliveryResult(
  providerId: string | null,
  currentStatus: string,
): Promise<string> {
  if (!providerId || isEmailTerminal(currentStatus)) return currentStatus;
  return Promise.resolve(getEmailDeliveryStatus(providerId)).then(
    (value) => ({ status: "fulfilled" as const, value }),
    () => ({ status: "rejected" as const }),
  ).then((result) =>
    result.status === "fulfilled" ? result.value : currentStatus,
  );
}

async function processPendingNotifications(): Promise<void> {
  const pending = await db
    .select({ id: contactSubmissionsTable.id })
    .from(contactSubmissionsTable)
    .where(
      and(
        lt(
          contactSubmissionsTable.notificationAttempts,
          MAX_NOTIFICATION_ATTEMPTS,
        ),
        lte(contactSubmissionsTable.nextAttemptAt, new Date()),
        or(
          isNull(contactSubmissionsTable.emailProviderId),
          isNull(contactSubmissionsTable.customerEmailProviderId),
        ),
      ),
    )
    .limit(10);

  for (const submission of pending) {
    await processContactNotification(submission.id);
  }
}

async function refreshDeliveryStatuses(): Promise<void> {
  const recentCutoff = new Date(Date.now() - 48 * 60 * 60_000);
  const submissions = await db
    .select()
    .from(contactSubmissionsTable)
    .where(
      and(
        or(
          isNotNull(contactSubmissionsTable.emailProviderId),
          isNotNull(contactSubmissionsTable.customerEmailProviderId),
        ),
        gte(contactSubmissionsTable.createdAt, recentCutoff),
        or(
          notInArray(contactSubmissionsTable.emailStatus, [
            "delivered",
            "opened",
            "clicked",
            "bounced",
            "complained",
            "failed",
            "canceled",
          ]),
          notInArray(contactSubmissionsTable.customerEmailStatus, [
            "delivered",
            "opened",
            "clicked",
            "bounced",
            "complained",
            "failed",
            "canceled",
          ]),
        ),
      ),
    )
    .limit(20);

  for (const submission of submissions) {
    const [emailStatus, customerEmailStatus] = await Promise.all([
      deliveryResult(submission.emailProviderId, submission.emailStatus),
      deliveryResult(
        submission.customerEmailProviderId,
        submission.customerEmailStatus,
      ),
    ]);
    const completed =
      isEmailTerminal(emailStatus) && isEmailTerminal(customerEmailStatus);

    await db
      .update(contactSubmissionsTable)
      .set({
        emailStatus,
        customerEmailStatus,
        completedAt: completed ? new Date() : submission.completedAt,
        updatedAt: new Date(),
      })
      .where(eq(contactSubmissionsTable.id, submission.id));
  }
}

let workerStarted = false;

export function startContactNotificationWorker(): void {
  if (workerStarted || process.env.NODE_ENV === "test") return;
  workerStarted = true;

  const run = async () => {
    try {
      await processPendingNotifications();
      await refreshDeliveryStatuses();
    } catch (error) {
      logger.error({ err: error }, "Contact notification worker failed");
    }
  };

  const initialTimer = setTimeout(run, 5_000);
  initialTimer.unref();
  const interval = setInterval(run, WORKER_INTERVAL_MS);
  interval.unref();
}
