import { pgTable, serial, text, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const workSamplesTable = pgTable("work_samples", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  date: text("date").notNull(),
  titleEn: text("title_en").notNull().default(""),
  titleAr: text("title_ar").notNull().default(""),
  summaryEn: text("summary_en").notNull().default(""),
  summaryAr: text("summary_ar").notNull().default(""),
  workTypeEn: text("work_type_en").notNull().default(""),
  workTypeAr: text("work_type_ar").notNull().default(""),
  jurisdictionEn: text("jurisdiction_en").notNull().default(""),
  jurisdictionAr: text("jurisdiction_ar").notNull().default(""),
  clientTypeEn: text("client_type_en").notNull().default(""),
  clientTypeAr: text("client_type_ar").notNull().default(""),
  challengeEn: text("challenge_en").notNull().default(""),
  challengeAr: text("challenge_ar").notNull().default(""),
  approachEn: text("approach_en").notNull().default(""),
  approachAr: text("approach_ar").notNull().default(""),
  outcomeEn: text("outcome_en").notNull().default(""),
  outcomeAr: text("outcome_ar").notNull().default(""),
  seoTitleEn: text("seo_title_en").notNull().default(""),
  seoTitleAr: text("seo_title_ar").notNull().default(""),
  seoDescriptionEn: text("seo_description_en").notNull().default(""),
  seoDescriptionAr: text("seo_description_ar").notNull().default(""),
  documentLanguage: text("document_language").notNull().default("ar"),
  fileName: text("file_name").notNull().default(""),
  fileMimeType: text("file_mime_type").notNull().default(""),
  fileSize: integer("file_size").notNull().default(0),
  fileData: text("file_data").notNull().default(""),
  confidentialityConfirmed: boolean("confidentiality_confirmed").notNull().default(false),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertWorkSampleSchema = createInsertSchema(workSamplesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectWorkSampleSchema = createSelectSchema(workSamplesTable);
export type InsertWorkSample = z.infer<typeof insertWorkSampleSchema>;
export type WorkSample = typeof workSamplesTable.$inferSelect;
