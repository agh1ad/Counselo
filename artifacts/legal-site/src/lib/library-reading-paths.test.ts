import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { LIBRARY_READING_PATHS, libraryReadingPaths } from "./library-reading-paths";

test("reading paths cover the reviewed article inventory once without creating stale links", () => {
  const ledger = JSON.parse(readFileSync(new URL("../../../../docs/page-seo-ledger-2026-09-06.json", import.meta.url), "utf8"));
  const slugs: string[] = ledger.pages.filter((p: any) => p.family === "article" && p.language === "en").map((p: any) => p.route.split("/").at(-1));
  const selected = LIBRARY_READING_PATHS.flatMap(group => [...group.slugs]);
  assert.deepEqual([...selected].sort(), [...slugs].sort());
  const posts = slugs.map(slug => ({ slug, titleEn: slug, titleAr: slug, published: true }));
  const removed = posts[0];
  const unpublished = posts[1];
  const enOnly = posts[2];
  const current = posts.filter(p => p !== removed).map(p => p === unpublished ? { ...p, published: false } : p === enOnly ? { ...p, titleAr: "" } : p);
  const ar = libraryReadingPaths(current, true).flatMap(group => group.posts);
  assert.ok(!ar.some(p => [removed.slug, unpublished.slug, enOnly.slug].includes(p.slug)));
  assert.equal(ar.length, slugs.length - 3);
  assert.ok(libraryReadingPaths(current, false).flatMap(group => group.posts).some(p => p.slug === enOnly.slug));
  assert.deepEqual(libraryReadingPaths([], true), []);
});
