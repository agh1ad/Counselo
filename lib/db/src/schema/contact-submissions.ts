import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const contactSubmissionsTable = pgTable(
  "contact_submissions",
  {
    id: serial("id").primaryKey(),
    reference: text("reference").notNull().unique(),
    region: text("region").notNull(),
    language: text("language").notNull(),
    service: text("service").notNull(),
    requestFingerprint: text("request_fingerprint").notNull(),
    encryptedPayload: text("encrypted_payload").notNull(),
    payloadIv: text("payload_iv").notNull(),
    payloadAuthTag: text("payload_auth_tag").notNull(),
    emailStatus: text("email_status").notNull().default("pending"),
    emailProviderId: text("email_provider_id"),
    customerEmailStatus: text("customer_email_status")
      .notNull()
      .default("pending"),
    customerEmailProviderId: text("customer_email_provider_id"),
    notificationAttempts: integer("notification_attempts").notNull().default(0),
    nextAttemptAt: timestamp("next_attempt_at").notNull().defaultNow(),
    processingAt: timestamp("processing_at"),
    lastError: text("last_error"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    completedAt: timestamp("completed_at"),
  },
  (table) => [
    index("contact_submissions_rate_limit_idx").on(
      table.requestFingerprint,
      table.createdAt,
    ),
    index("contact_submissions_retry_idx").on(
      table.emailProviderId,
      table.nextAttemptAt,
    ),
    index("contact_submissions_customer_retry_idx").on(
      table.customerEmailProviderId,
      table.nextAttemptAt,
    ),
  ],
);

export type ContactSubmission = typeof contactSubmissionsTable.$inferSelect;
