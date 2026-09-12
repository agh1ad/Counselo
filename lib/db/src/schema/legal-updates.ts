import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
  date,
  bigserial,
  unique,
  index,
  check,
} from "drizzle-orm/pg-core";
export const legalUpdatesTable = pgTable(
  "legal_updates",
  {
    id: uuid("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    region: text("region").notNull(),
    sourceUrl: text("source_url").notNull(),
    sourceName: text("source_name").notNull(),
    sourceHash: text("source_hash").notNull(),
    sourceText: text("source_text").notNull(),
    discoveredAt: timestamp("discovered_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    draft: jsonb("draft").notNull(),
    status: text("status").notNull().default("draft"),
    reviewer: text("reviewer"),
    reviewNote: text("review_note"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    modifiedAt: timestamp("modified_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    editorial: jsonb("editorial").notNull().default({}),
    sourceCheckedAt: timestamp("source_checked_at", { withTimezone: true }),
    sourceCheckStatus: text("source_check_status"),
    revision: integer("revision").notNull().default(1),
  },
  (table) => [
    unique("legal_updates_region_source_url_source_hash_key").on(
      table.region,
      table.sourceUrl,
      table.sourceHash,
    ),
    index("legal_updates_public")
      .on(table.region, table.publishedAt.desc())
      .where(sql`${table.status} = 'published'`),
    index("legal_updates_public_order")
      .on(table.publishedAt.desc(), table.id.desc())
      .where(sql`${table.status} = 'published'`),
    index("legal_updates_public_services")
      .using("gin", sql`(${table.draft}->'serviceSlugs')`)
      .where(sql`${table.status} = 'published'`),
    index("legal_updates_source_check")
      .on(table.sourceCheckedAt.asc().nullsFirst())
      .where(sql`${table.status} = 'published'`),
    check(
      "legal_updates_region_check",
      sql`${table.region} IN ('sa','uae','syr')`,
    ),
    check(
      "legal_updates_publication_review_check",
      sql`${table.status} <> 'published' OR (${table.reviewer} IS NOT NULL AND length(trim(${table.reviewer})) >= 3 AND ${table.reviewNote} IS NOT NULL AND length(trim(${table.reviewNote})) >= 10 AND ${table.publishedAt} IS NOT NULL)`,
    ),
    check(
      "legal_updates_status_check",
      sql`${table.status} IN ('draft','published','rejected','withdrawn')`,
    ),
  ],
).enableRLS();
export const legalUpdateRunsTable = pgTable(
  "legal_update_runs",
  {
    id: uuid("id").primaryKey(),
    day: date("day").notNull().unique(),
    startedAt: timestamp("started_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    status: text("status").notNull(),
    report: jsonb("report").notNull().default({}),
  },
  (table) => [
    check(
      "legal_update_runs_status_check",
      sql`${table.status} IN ('running','completed','partial','failed')`,
    ),
  ],
).enableRLS();
export const legalUpdateAuditTable = pgTable(
  "legal_update_audit",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    updateId: uuid("update_id")
      .notNull()
      .references(() => legalUpdatesTable.id),
    action: text("action").notNull(),
    actor: text("actor").notNull(),
    snapshot: jsonb("snapshot").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("legal_updates_audit_history").on(
      table.updateId,
      table.createdAt.desc(),
    ),
  ],
).enableRLS();
