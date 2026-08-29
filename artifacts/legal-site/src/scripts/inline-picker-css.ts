import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const publicDir = path.resolve(import.meta.dirname, "../../dist/public");
const pickerRoutes = new Set(["/", "/ar"]);

async function findHtmlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await findHtmlFiles(fullPath)));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

function routeFromHtml(html: string): string | null {
  return html.match(/\bdata-ssr-url=["']([^"']+)["']/)?.[1] ?? null;
}

function stylesheetHref(tag: string): string | null {
  const rel = tag.match(/\brel=["']([^"']+)["']/i)?.[1]?.toLowerCase();
  if (rel !== "stylesheet") return null;
  return tag.match(/\bhref=["']([^"']+\.css(?:\?[^"']*)?)["']/i)?.[1] ?? null;
}

async function main() {
  const htmlFiles = await findHtmlFiles(publicDir);
  let inlinedDocuments = 0;

  for (const filePath of htmlFiles) {
    let html = await readFile(filePath, "utf8");
    const route = routeFromHtml(html);
    if (!route || !pickerRoutes.has(route)) continue;

    let stylesheetCount = 0;
    const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
    for (const tag of linkTags) {
      const href = stylesheetHref(tag);
      if (!href || !href.startsWith("/assets/")) continue;
      const cleanHref = href.split("?", 1)[0]!;
      const cssPath = path.resolve(publicDir, `.${cleanHref}`);
      const css = (await readFile(cssPath, "utf8")).replace(/<\/style/gi, "<\\/style");
      html = html.replace(
        tag,
        `<style data-counselo-inline-css data-source="${cleanHref}">${css}</style>`,
      );
      stylesheetCount += 1;
    }

    if (stylesheetCount === 0) {
      throw new Error(`No production stylesheet found to inline for picker route ${route}`);
    }

    await writeFile(filePath, html, "utf8");
    inlinedDocuments += 1;
    console.log(`[css] inlined ${stylesheetCount} stylesheet(s) for ${route}`);
  }

  if (inlinedDocuments !== pickerRoutes.size) {
    throw new Error(`Expected ${pickerRoutes.size} picker documents, inlined ${inlinedDocuments}`);
  }
}

main().catch((error) => {
  console.error("Picker CSS inlining failed:", error);
  process.exitCode = 1;
});
