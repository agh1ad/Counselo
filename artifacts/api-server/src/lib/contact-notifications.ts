import {
  and,
  asc,
  eq,
  gt,
  isNull,
  lt,
  lte,
  or,
} from "drizzle-orm";
import { contactSubmissionsTable, db } from "@workspace/db";
import type { ContactInput } from "./contact-input.js";
import { assertContactEncryptionConfiguration, decryptContactPayload, encryptContactPayload } from "./contact-crypto.js";
import {
  assertContactNotificationConfiguration,
  sendCustomerConfirmationEmail,
  sendConsultationEmail,
} from "./contact-providers.js";
import { retainContactAttribution } from "./contact-attribution.js";
import { logger } from "./logger.js";

const MAX_NOTIFICATION_ATTEMPTS = 5;
const LOCK_TIMEOUT_MS = 5 * 60_000;
const RESTORE_PAGE_SIZE = 100;
const MAX_RECOVERY_FAILURES = 5;
const retryTimers = new Map<number, { timer: ReturnType<typeof setTimeout>; dueAt: number }>();
const recoveryFailures = new Map<number, number>();
let restoreTimer: ReturnType<typeof setTimeout> | undefined;
let recoveryEnabled = true;

type PendingNotification = {
  id: number;
  notificationAttempts: number;
  nextAttemptAt: Date;
  processingAt: Date | null;
};

const pendingFields = {
  id: contactSubmissionsTable.id,
  notificationAttempts: contactSubmissionsTable.notificationAttempts,
  nextAttemptAt: contactSubmissionsTable.nextAttemptAt,
  processingAt: contactSubmissionsTable.processingAt,
};

function retryDelay(attempt: number): number {
  return Math.min(30 * 60_000, 30_000 * 2 ** Math.max(0, attempt - 1));
}

function scheduleNotificationRetry(id: number, delayMs: number): void {
  if (!recoveryEnabled) return;
  const delay = Math.max(1, delayMs);
  const dueAt = Date.now() + delay;
  const existing = retryTimers.get(id);
  if (existing && existing.dueAt <= dueAt) return;
  if (existing) clearTimeout(existing.timer);

  const timer = setTimeout(async () => {
    retryTimers.delete(id);
    try {
      await processContactNotification(id);
    } catch (error) {
      logger.error(
        { err: error, submissionId: id },
        "Scheduled contact notification retry failed",
      );
    }
  }, delay);
  timer.unref();
  retryTimers.set(id, { timer, dueAt });
}

function scheduleStoredNotification(submission: PendingNotification): void {
  if (submission.notificationAttempts >= MAX_NOTIFICATION_ATTEMPTS) return;
  const nextAttempt = submission.nextAttemptAt.getTime();
  // A different instance may still own the atomic claim. Recover only after
  // its lease expires, including a crash after the provider accepted a send.
  const claimExpires = submission.processingAt ? submission.processingAt.getTime() + LOCK_TIMEOUT_MS + 1 : 0;
  scheduleNotificationRetry(submission.id, Math.max(nextAttempt, claimExpires) - Date.now());
}

/** Rebuild transient timers from durable deadlines once per server start. */
export async function restoreContactNotificationRetries(): Promise<number> {
  let afterId = 0;
  let restored = 0;
  for (;;) {
    if (!recoveryEnabled) return restored;
    const pending = await db.select(pendingFields).from(contactSubmissionsTable).where(and(
      gt(contactSubmissionsTable.id, afterId),
      lt(contactSubmissionsTable.notificationAttempts, MAX_NOTIFICATION_ATTEMPTS),
      or(isNull(contactSubmissionsTable.emailProviderId), isNull(contactSubmissionsTable.customerEmailProviderId)),
    )).orderBy(asc(contactSubmissionsTable.id)).limit(RESTORE_PAGE_SIZE);
    for (const submission of pending) scheduleStoredNotification(submission);
    restored += pending.length;
    if (pending.length < RESTORE_PAGE_SIZE) return restored;
    afterId = pending[pending.length - 1]!.id;
  }
}

/** Startup recovery stops after a successful scan; it never polls an empty queue. */
export function startContactNotificationRecovery(): void {
  recoveryEnabled = true;
  const restore = async (attempt: number): Promise<void> => {
    try {
      assertContactEncryptionConfiguration();
      assertContactNotificationConfiguration();
      const restored = await restoreContactNotificationRetries();
      logger.info({ restored }, "Restored pending consultation notification deadlines");
    } catch (error) {
      logger.error({ err: error, attempt }, "Unable to restore consultation notification deadlines");
      if (recoveryEnabled && attempt < MAX_RECOVERY_FAILURES) {
        restoreTimer = setTimeout(() => { restoreTimer = undefined; void restore(attempt + 1); }, retryDelay(attempt));
        restoreTimer.unref();
      }
    }
  };
  void restore(1);
}

/** Used by one-shot recovery commands and graceful shutdown, not to discard DB work. */
export function stopContactNotificationRecovery(): void {
  recoveryEnabled = false;
  for (const { timer } of retryTimers.values()) clearTimeout(timer);
  retryTimers.clear();
  recoveryFailures.clear();
  if (restoreTimer) clearTimeout(restoreTimer);
  restoreTimer = undefined;
}

function safeError(error: unknown): string {
  if (error instanceof Error) return error.message.slice(0, 500);
  return "Unknown notification error";
}

async function claimSubmission(id: number) {
  const staleBefore = new Date(Date.now() - LOCK_TIMEOUT_MS);
  const [claimed] = await db
    .update(contactSubmissionsTable)
    .set({ processingAt: new Date(), updatedAt: new Date() })
    .where(
      and(
        eq(contactSubmissionsTable.id, id),
        lt(contactSubmissionsTable.notificationAttempts, MAX_NOTIFICATION_ATTEMPTS),
        lte(contactSubmissionsTable.nextAttemptAt, new Date()),
        or(
          isNull(contactSubmissionsTable.emailProviderId),
          isNull(contactSubmissionsTable.customerEmailProviderId),
        ),
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
  try {
    assertContactEncryptionConfiguration();
    assertContactNotificationConfiguration();
    const result = await attemptContactNotification(id);
    if (result.emailAccepted) {
      recoveryFailures.delete(id);
      const scheduled = retryTimers.get(id);
      if (scheduled) clearTimeout(scheduled.timer);
      retryTimers.delete(id);
    }
    return result;
  } catch (error) {
    // Preserve recovery after a database/claim/status-write failure. The next
    // attempt still observes the persisted lease and provider idempotency key.
    const failures = (recoveryFailures.get(id) ?? 0) + 1;
    recoveryFailures.set(id, failures);
    if (failures < MAX_RECOVERY_FAILURES) scheduleNotificationRetry(id, retryDelay(failures));
    throw error;
  }
}

async function attemptContactNotification(id: number): Promise<{ emailAccepted: boolean }> {
  const submission = await claimSubmission(id);
  if (!submission) {
    return storedNotificationState(id);
  }
  const claimedAt = submission.processingAt;
  if (!claimedAt) throw new Error("Consultation notification claim has no lease timestamp");

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
    // A temporarily wrong deployment key must not permanently exhaust every
    // queued request. Preserve the ciphertext and provider attempt count for
    // configuration repair; recovery remains bounded and the admin sees why.
    await db.update(contactSubmissionsTable).set({
      processingAt: null,
      nextAttemptAt: new Date(Date.now() + LOCK_TIMEOUT_MS),
      lastError: "Unable to decrypt notification payload. Check encryption configuration and the stored record.",
      updatedAt: new Date(),
    }).where(and(eq(contactSubmissionsTable.id, submission.id), eq(contactSubmissionsTable.processingAt, claimedAt)));
    throw error;
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
  const nextDelay = retryDelay(attempt);

  const retained = emailAccepted ? retainContactAttribution(input) : undefined;
  const completedPayload = retained && Object.keys(retained).length ? encryptContactPayload(retained) : { encryptedPayload: "", payloadIv: "", payloadAuthTag: "" };
  const [saved] = await db
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
      nextAttemptAt: new Date(Date.now() + nextDelay),
      processingAt: null,
      lastError: errors.join(" | ") || null,
      encryptedPayload: emailAccepted ? completedPayload.encryptedPayload : submission.encryptedPayload,
      payloadIv: emailAccepted ? completedPayload.payloadIv : submission.payloadIv,
      payloadAuthTag: emailAccepted ? completedPayload.payloadAuthTag : submission.payloadAuthTag,
      updatedAt: new Date(),
    })
    .where(and(eq(contactSubmissionsTable.id, submission.id), eq(contactSubmissionsTable.processingAt, claimedAt)))
    .returning({ id: contactSubmissionsTable.id });

  // A delayed old status write must not undo a newer worker's result after the
  // five-minute claim lease expired. Read the current receipt instead.
  if (!saved) return storedNotificationState(submission.id);

  logger.info(
    {
      reference: submission.reference,
      internalEmailAccepted,
      customerEmailAccepted,
      attempt,
    },
    "Consultation notification attempt completed",
  );

  if (!emailAccepted && !exhausted) {
    scheduleNotificationRetry(submission.id, nextDelay);
  }

  return { emailAccepted };
}

async function storedNotificationState(id: number): Promise<{ emailAccepted: boolean }> {
  const [stored] = await db.select({
    ...pendingFields,
    emailProviderId: contactSubmissionsTable.emailProviderId,
    customerEmailProviderId: contactSubmissionsTable.customerEmailProviderId,
  }).from(contactSubmissionsTable).where(eq(contactSubmissionsTable.id, id)).limit(1);
  const emailAccepted = Boolean(stored?.emailProviderId && stored.customerEmailProviderId);
  if (stored && !emailAccepted) scheduleStoredNotification(stored);
  return { emailAccepted };
}

export async function processPendingNotifications(): Promise<number> {
  assertContactEncryptionConfiguration();
  assertContactNotificationConfiguration();
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
        or(isNull(contactSubmissionsTable.processingAt), lt(contactSubmissionsTable.processingAt, new Date(Date.now() - LOCK_TIMEOUT_MS))),
        or(
          isNull(contactSubmissionsTable.emailProviderId),
          isNull(contactSubmissionsTable.customerEmailProviderId),
        ),
      ),
    )
    .orderBy(asc(contactSubmissionsTable.nextAttemptAt), asc(contactSubmissionsTable.id))
    .limit(10);

  for (const submission of pending) {
    await processContactNotification(submission.id);
  }
  return pending.length;
}
