import { pgTable, serial, text, boolean, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogSectionSchema = z.object({
  heading: z.string().optional(),
  body: z.string(),
});
export type BlogSection = z.infer<typeof blogSectionSchema>;

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  date: text("date").notNull(),
  categoryEn: text("category_en").notNull().default(""),
  categoryAr: text("category_ar").notNull().default(""),
  readTime: integer("read_time").notNull().default(5),
  titleEn: text("title_en").notNull().default(""),
  titleAr: text("title_ar").notNull().default(""),
  excerptEn: text("excerpt_en").notNull().default(""),
  excerptAr: text("excerpt_ar").notNull().default(""),
  seoTitleEn: text("seo_title_en").notNull().default(""),
  seoTitleAr: text("seo_title_ar").notNull().default(""),
  seoDescriptionEn: text("seo_description_en").notNull().default(""),
  seoDescriptionAr: text("seo_description_ar").notNull().default(""),
  contentEn: jsonb("content_en").$type<BlogSection[]>().notNull().default([]),
  contentAr: jsonb("content_ar").$type<BlogSection[]>().notNull().default([]),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectBlogPostSchema = createSelectSchema(blogPostsTable);

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPostsTable.$inferSelect;
