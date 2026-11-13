import express from "express";
import { createHash } from "node:crypto";
import type { Plugin } from "vite";
import { publicWorkDocumentPath, publicWorkDocumentTextPath } from "../../../lib/api-zod/src/public-work-documents";
import { PUBLIC_WORK_DOCUMENT_TEXTS } from "../../api-server/src/lib/public-work-document-texts";

const PUBLISHED_ORIGIN = "https://counselo-legal.com";

/** Same-origin preview of currently published documents; no private API or database access. */
export function publicDocumentsPreviewPlugin(): Plugin {
  return {
    name: "public-documents-preview",
    configureServer(server) {
      const preview = express();
      preview.use((_req, res, next) => {
        res.set("Cache-Control", "no-store");
        res.set("X-Robots-Tag", "noindex");
        next();
      });
      preview.get("/documents/:filename", async (req, res) => {
        const filename = req.params.filename;
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:pdf|txt)$/.test(filename)) { res.sendStatus(404); return; }
        const slug = filename.slice(0, -4);
        const metadata = await fetch(`${PUBLISHED_ORIGIN}/api/work/${encodeURIComponent(slug)}`, { signal: AbortSignal.timeout(30_000) });
        if (metadata.status === 404 || metadata.status === 410) { res.sendStatus(404); return; }
        if (!metadata.ok) throw new Error("Published document metadata unavailable");
        const sample = await metadata.json();
        const pdfPath = publicWorkDocumentPath(sample);
        if (pdfPath !== `/documents/${slug}.pdf`) { res.sendStatus(404); return; }
        const file = await fetch(`${PUBLISHED_ORIGIN}/api/work/${encodeURIComponent(slug)}/file`, { signal: AbortSignal.timeout(30_000) });
        if (file.status === 404 || file.status === 410) { res.sendStatus(404); return; }
        if (!file.ok) throw new Error("Published document unavailable");
        const bytes = Buffer.from(await file.arrayBuffer());
        if (bytes.length !== sample.fileSize || bytes.subarray(0, 5).toString("ascii") !== "%PDF-") { res.sendStatus(404); return; }
        const isText = filename.endsWith(".txt");
        const source = isText ? PUBLIC_WORK_DOCUMENT_TEXTS.find(entry => entry.slug === slug) : undefined;
        if (isText && (!source || !source.text.trim() || publicWorkDocumentTextPath(sample) !== `/documents/${filename}` ||
            createHash("sha256").update(bytes).digest("hex") !== source.sourceSHA256)) { res.sendStatus(404); return; }
        const body = source ? Buffer.from(source.text, "utf8") : bytes;
        res.set("Content-Type", isText ? "text/plain; charset=utf-8" : "application/pdf");
        res.set("Content-Length", String(body.length));
        res.set("Content-Disposition", `${req.query.download === "1" ? "attachment" : "inline"}; filename="${filename}"`);
        res.set("Content-Security-Policy", "frame-ancestors 'self'");
        res.set("X-Content-Type-Options", "nosniff");
        res.set("Link", `<${PUBLISHED_ORIGIN}${pdfPath}>; rel="canonical"`);
        if (source) res.set("Content-Language", source.language);
        res.send(body);
      });
      preview.use((_req, res) => { res.sendStatus(404); });
      preview.use((_error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        res.status(503).set("Cache-Control", "no-store").set("X-Robots-Tag", "noindex").type("text/plain").send("Published document temporarily unavailable.");
      });
      server.middlewares.use((req, res, next) => {
        if (!/^\/documents(?:\/|\?|$)/.test(req.url ?? "")) { next(); return; }
        preview(req, res, next);
      });
    },
  };
}
