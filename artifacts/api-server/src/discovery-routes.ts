import type { Express } from "express";
import * as fs from "fs";
import * as path from "path";
import { eq } from "drizzle-orm";
import { blogPostsTable, db, workSamplesTable } from "@workspace/db";
import {
  buildDiscoveryFeed,
  buildDynamicSitemap,
  PUBLIC_CACHE_POLICY,
} from "@workspace/api-zod";
import { logger } from "./lib/logger.js";

function findLegalDist(): string {
  const fromRoot = path.join(process.cwd(), "artifacts/legal-site/dist/public");
  if (fs.existsSync(path.join(fromRoot, "index.html"))) return fromRoot;
  return path.resolve(process.cwd(), "../../artifacts/legal-site/dist/public");
}

const LEGAL_DIST = findLegalDist();
const baseXmlCache = new Map<string, string>();

function baseSitemap(filename: string): string {
  const cached = baseXmlCache.get(filename);
  if (cached) return cached;
  const xml = fs.readFileSync(path.join(LEGAL_DIST, filename), "utf-8");
  baseXmlCache.set(filename, xml);
  return xml;
}

const blogDiscoveryColumns = {
  slug: blogPostsTable.slug,
  titleEn: blogPostsTable.titleEn,
  titleAr: blogPostsTable.titleAr,
  excerptEn: blogPostsTable.excerptEn,
  excerptAr: blogPostsTable.excerptAr,
  date: blogPostsTable.date,
  updatedAt: blogPostsTable.updatedAt,
  seoTitleEn: blogPostsTable.seoTitleEn,
  seoTitleAr: blogPostsTable.seoTitleAr,
  seoDescriptionEn: blogPostsTable.seoDescriptionEn,
  seoDescriptionAr: blogPostsTable.seoDescriptionAr,
  bodyEn: blogPostsTable.bodyEn,
  bodyAr: blogPostsTable.bodyAr,
  contentEn: blogPostsTable.contentEn,
  contentAr: blogPostsTable.contentAr,
};

const workDiscoveryColumns = {
  slug: workSamplesTable.slug,
  titleEn: workSamplesTable.titleEn,
  titleAr: workSamplesTable.titleAr,
  summaryEn: workSamplesTable.summaryEn,
  summaryAr: workSamplesTable.summaryAr,
  date: workSamplesTable.date,
  updatedAt: workSamplesTable.updatedAt,
};

async function publishedBlogs() {
  return db
    .select(blogDiscoveryColumns)
    .from(blogPostsTable)
    .where(eq(blogPostsTable.published, true));
}

async function publishedWork() {
  return db
    .select(workDiscoveryColumns)
    .from(workSamplesTable)
    .where(eq(workSamplesTable.published, true));
}

/**
 * Lean discovery routes registered before the legacy dynamic route module.
 * They intentionally generate the same sitemap/feed output while avoiding
 * unrelated table reads and large columns on crawler requests.
 */
export function registerDiscoveryRoutes(app: Express): void {
  app.get("/sitemap-blog.xml", async (_req, res) => {
    try {
      const posts = await publishedBlogs();
      res.type("application/xml");
      res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
      res.send(buildDynamicSitemap(baseSitemap("sitemap-blog.xml"), posts, []));
    } catch (err) {
      logger.error({ err }, "Failed to generate live blog sitemap");
      res.status(503).type("text/plain").send("Sitemap temporarily unavailable");
    }
  });

  app.get("/sitemap-work.xml", async (_req, res) => {
    try {
      const samples = await publishedWork();
      res.type("application/xml");
      res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
      res.send(buildDynamicSitemap(baseSitemap("sitemap-work.xml"), [], samples));
    } catch (err) {
      logger.error({ err }, "Failed to generate live work sitemap");
      res.status(503).type("text/plain").send("Sitemap temporarily unavailable");
    }
  });

  app.get("/feed.xml", async (_req, res) => {
    try {
      const [posts, samples] = await Promise.all([
        publishedBlogs(),
        publishedWork(),
      ]);
      res.type("application/rss+xml");
      res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
      res.send(buildDiscoveryFeed(posts, samples));
    } catch (err) {
      logger.error({ err }, "Failed to generate discovery feed");
      res.status(503).type("text/plain").send("Feed temporarily unavailable");
    }
  });
}
