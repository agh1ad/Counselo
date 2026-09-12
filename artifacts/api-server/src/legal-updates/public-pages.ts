import type { Express } from "express";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  updatesSitemap,
  legalUpdatesSitemapDocument,
  routeToFlatFilename,
  type LegalUpdatesData,
  updateContext,
} from "@workspace/api-zod";
import { publishedUpdates, legalUpdatesSitemapRows } from "./store.js";
const root = existsSync(resolve("artifacts/legal-site/dist/ssr-template.html"))
  ? resolve("artifacts/legal-site/dist")
  : resolve("../legal-site/dist");
const safe = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
export { updatesSitemap } from "@workspace/api-zod";

function snapshotArray(html: string, name: string): unknown[] {
  const marker = `window.${name}=`;
  const start = html.indexOf(marker);
  if (start < 0) return [];
  let quoted = false,
    escaped = false,
    depth = 0;
  const from = start + marker.length;
  for (let i = from; i < html.length; i++) {
    const c = html[i];
    if (quoted) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === '"') quoted = false;
      continue;
    }
    if (c === '"') quoted = true;
    else if (c === "[") depth++;
    else if (c === "]" && --depth === 0) {
      try {
        return JSON.parse(html.slice(from, i + 1));
      } catch {
        return [];
      }
    }
  }
  return [];
}

let renderer:
  | Promise<{
      render: (
        url: string,
        posts: unknown[],
        work: unknown[],
        updates: LegalUpdatesData,
      ) => { head: string; body: string };
    }>
  | undefined;
export function registerLegalUpdatePages(app: Express) {
  app.get(
    /^\/sitemap-legal-updates(?:-([1-9]\d*))?\.xml$/,
    async (req, res) => {
      try {
        const part = req.params[0] ? Number(req.params[0]) : undefined;
        const xml = legalUpdatesSitemapDocument(
          await legalUpdatesSitemapRows(),
          part,
        );
        if (!xml) {
          res.status(404).send("Sitemap not found");
          return;
        }
        res.type("application/xml").set("Cache-Control", "no-cache").send(xml);
      } catch {
        res.status(503).send("Sitemap temporarily unavailable");
      }
    },
  );
  app.get(
    /^\/(?:ar\/)?legal-updates(?:\/.*)?$|^\/(sa|uae|syr)(?:\/ar)?\/legal-updates(?:\/.*)?$|^\/(sa|uae|syr)(?:\/ar)?(?:\/services\/[^/]+(?:\/[^/]+)?)?$/,
    async (req, res, next) => {
      const isUpdate = req.path.includes("/legal-updates");
      const existingPage = resolve(
        root,
        "public/__pages",
        routeToFlatFilename(req.path),
      );
      if (!isUpdate && !existsSync(existingPage)) return next();
      try {
        const context = updateContext(req.path);
        if (!context) {
          res
            .status(404)
            .set("X-Robots-Tag", "noindex")
            .send("Legal update not found");
          return;
        }
        const updates = await publishedUpdates(req.path);
        // Existing pages keep their build artifact until there is relevant live content.
        if (!isUpdate && !updates.items.length) return next();
        if (
          (context.kind === "article" && !updates.article) ||
          (context.kind === "hub" &&
            (context.page > 1 || context.service) &&
            !updates.items.length)
        ) {
          res
            .status(404)
            .set("X-Robots-Tag", "noindex")
            .send("Legal update not found");
          return;
        }
        renderer ??= import(
          pathToFileURL(resolve(root, "server/entry-server.js")).href
        );
        const snapshotPath = resolve(
          root,
          "public/__pages",
          routeToFlatFilename(req.path),
        );
        const snapshot =
          !isUpdate && existsSync(snapshotPath)
            ? readFileSync(snapshotPath, "utf8")
            : "";
        const posts = snapshotArray(snapshot, "__SSR_POSTS__");
        const work = snapshotArray(snapshot, "__SSR_WORK_SAMPLES__");
        const { head, body } = (await renderer!).render(
          req.path,
          posts,
          work,
          updates,
        );
        const ar = req.path.split("/").includes("ar");
        const html = readFileSync(resolve(root, "ssr-template.html"), "utf8")
          .replace(
            '<html lang="en">',
            `<html lang="${ar ? "ar" : "en"}" dir="${ar ? "rtl" : "ltr"}">`,
          )
          .replace(
            "<!--app-head-->",
            `${head}<script>window.__SSR_LEGAL_UPDATES__=${safe(updates)};window.__SSR_POSTS__=${safe(posts)};window.__SSR_WORK_SAMPLES__=${safe(work)};</script>`,
          )
          .replace(
            '<div id="root"></div>',
            `<div id="root" data-ssr="true" data-ssr-url="${req.path.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;")}">${body}</div>`,
          );
        res
          .type("html")
          .set("Cache-Control", "public, max-age=0, must-revalidate")
          .send(html);
      } catch {
        if (!isUpdate) return next();
        res
          .status(503)
          .set("Retry-After", "60")
          .send("Legal updates temporarily unavailable");
      }
    },
  );
}
