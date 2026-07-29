import { blogPostsTable, db, workSamplesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { parseBlogPostInput } from "../lib/blog-input.js";
import {
  translateBlogForPublishing,
  translateWorkForPublishing,
} from "../lib/content-translation.js";
import { parseWorkSampleInput } from "../lib/work-input.js";

const CONCURRENCY = 4;
const MAX_ATTEMPTS = 3;

async function withRetry<T>(label: string, operation: () => Promise<T>): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === MAX_ATTEMPTS) break;
      console.warn(`${label}: attempt ${attempt} failed; retrying`);
      await new Promise((resolve) => globalThis.setTimeout(resolve, attempt * 1_000));
    }
  }
  throw lastError;
}

async function runPool<T>(
  items: T[],
  worker: (item: T, index: number) => Promise<void>,
): Promise<void> {
  let nextIndex = 0;
  const runners = Array.from(
    { length: Math.min(CONCURRENCY, items.length) },
    async () => {
      while (nextIndex < items.length) {
        const index = nextIndex++;
        await worker(items[index]!, index);
      }
    },
  );
  await Promise.all(runners);
}

async function backfillBlogs(): Promise<void> {
  const posts = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.published, true));

  await runPool(posts, async (post, index) => {
    await withRetry(`blog ${post.slug}`, async () => {
      const patch = await translateBlogForPublishing(post);
      if (Object.keys(patch).length === 0) {
        console.log(`[${index + 1}/${posts.length}] blog ${post.slug}: already bilingual`);
        return;
      }
      const values = parseBlogPostInput(
        { ...post, ...patch },
        { existingSlug: post.slug },
      );
      await db
        .update(blogPostsTable)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(blogPostsTable.id, post.id));
      console.log(`[${index + 1}/${posts.length}] blog ${post.slug}: translated and validated`);
    });
  });
}

async function backfillWork(): Promise<void> {
  const samples = await db
    .select()
    .from(workSamplesTable)
    .where(eq(workSamplesTable.published, true));

  await runPool(samples, async (sample, index) => {
    await withRetry(`work ${sample.slug}`, async () => {
      const patch = await translateWorkForPublishing(sample);
      if (Object.keys(patch).length === 0) {
        console.log(`[${index + 1}/${samples.length}] work ${sample.slug}: already bilingual`);
        return;
      }
      const values = parseWorkSampleInput(
        { ...sample, ...patch },
        { existingSlug: sample.slug, existingFile: sample },
      );
      await db
        .update(workSamplesTable)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(workSamplesTable.id, sample.id));
      console.log(`[${index + 1}/${samples.length}] work ${sample.slug}: translated and validated`);
    });
  });
}

await backfillBlogs();
await backfillWork();
