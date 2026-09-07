import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function legalDistFromCwd(cwd: string): string {
  const fromRoot = path.join(cwd, "artifacts/legal-site/dist/public");
  return existsSync(path.join(fromRoot, "index.html"))
    ? fromRoot
    : path.resolve(cwd, "../../artifacts/legal-site/dist/public");
}

/** Missing build evidence disables persistence instead of sharing a fallback key. */
export function readPublicCacheDeploymentVersion(options: {
  moduleUrl: string;
  cwd: string;
}): string | null {
  try {
    const apiBundle = fileURLToPath(options.moduleUrl);
    // In production esbuild places this module in dist/index.mjs. A source .ts
    // file alone cannot identify its renderer/repair dependencies reliably.
    if (path.extname(apiBundle) !== ".mjs") return null;
    const frontendDist = legalDistFromCwd(options.cwd);
    const inputs = [
      ["api-bundle", apiBundle],
      ["frontend-index", path.join(frontendDist, "index.html")],
      ["frontend-shell", path.resolve(frontendDist, "../ssr-template.html")],
    ] as const;
    const hash = createHash("sha256");
    for (const [label, filename] of inputs) {
      const bytes = readFileSync(filename);
      hash.update(`${label}:${bytes.length}:`);
      hash.update(bytes);
    }
    return hash.digest("hex");
  } catch {
    return null;
  }
}

// Evaluated once at process startup. API code and frontend asset references both
// participate, and neither deployment timestamps nor filesystem paths do.
export const PUBLIC_CACHE_DEPLOYMENT_VERSION = readPublicCacheDeploymentVersion({
  moduleUrl: import.meta.url,
  cwd: process.cwd(),
});
