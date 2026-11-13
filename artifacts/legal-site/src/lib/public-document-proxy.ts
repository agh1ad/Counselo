import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import type { RequestHandler } from "express";

/** The web artifact forwards documents through the API-owned /api namespace.
 * Using /api/documents prevents a same-origin loop on path-routed deployments. */
export function publicDocumentProxy(apiOrigin: string): RequestHandler {
  return (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const fail = (status: number) => {
      if (res.writableEnded) return;
      if (res.headersSent) { res.destroy(); return; }
      res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
      if (status >= 500) res.setHeader("Retry-After", "60");
      res.status(status).type("text/plain").send(status === 404 ? "Document not found" : "Document temporarily unavailable");
    };
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.setHeader("Allow", "GET, HEAD");
      fail(405); return;
    }
    if (!/^\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:pdf|txt)$/.test(req.path)) { fail(404); return; }
    const target = new URL(`${apiOrigin}/api/documents${req.url}`);
    const headers: Record<string, string> = { "accept-encoding": "identity" };
    for (const name of ["range", "if-range", "if-none-match", "if-modified-since"]) {
      const value = req.get(name);
      if (value) headers[name] = value;
    }
    let deadline: ReturnType<typeof setTimeout>;
    const upstream = (target.protocol === "https:" ? httpsRequest : httpRequest)(target, {
      method: req.method, headers,
    }, response => {
      response.once("end", () => clearTimeout(deadline));
      const status = response.statusCode ?? 502;
      if (status >= 400) { response.destroy(); fail(status); return; }
      const type = String(response.headers["content-type"] ?? "");
      const expected = req.path.endsWith(".txt") ? /^text\/plain\b/i : /^application\/pdf\b/i;
      if (status !== 304 && !expected.test(type)) { response.destroy(); fail(502); return; }
      res.status(status);
      for (const name of ["content-type", "content-length", "content-encoding", "content-disposition", "content-language", "content-range", "accept-ranges", "etag", "last-modified", "link", "content-security-policy", "cross-origin-resource-policy", "x-content-type-options"]) {
        const value = response.headers[name];
        if (value !== undefined) res.setHeader(name, value);
      }
      res.removeHeader("X-Robots-Tag");
      res.removeHeader("X-Frame-Options");
      response.on("error", () => fail(502));
      response.pipe(res);
    });
    deadline = setTimeout(() => upstream.destroy(new Error("Document API deadline exceeded")), 45_000);
    deadline.unref();
    upstream.setTimeout(20_000, () => upstream.destroy(new Error("Document API request timed out")));
    upstream.on("error", () => { clearTimeout(deadline); fail(503); });
    res.once("close", () => { clearTimeout(deadline); if (!res.writableEnded) upstream.destroy(); });
    upstream.end();
  };
}
