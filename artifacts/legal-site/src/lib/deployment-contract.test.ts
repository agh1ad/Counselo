import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const legalSiteRoot = path.resolve(import.meta.dirname, "../..");

test("the legal-site build produces the server used by Replit production", () => {
  const packageJson = readFileSync(
    path.resolve(legalSiteRoot, "package.json"),
    "utf8",
  );
  const artifactConfig = readFileSync(
    path.resolve(legalSiteRoot, ".replit-artifact/artifact.toml"),
    "utf8",
  );

  assert.match(packageJson, /build:prerender && pnpm run build:server/);
  assert.match(packageJson, /outfile=dist\/ssr-server\.mjs/);
  assert.match(
    artifactConfig,
    /artifacts\/legal-site\/dist\/ssr-server\.mjs/,
  );
});
