import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";
import { readPublicCacheDeploymentVersion } from "./public-cache-version.js";

function fixture() {
  const cwd = mkdtempSync(path.join(tmpdir(), "counselo-cache-version-"));
  const dist = path.join(cwd, "artifacts/legal-site/dist");
  const api = path.join(cwd, "artifacts/api-server/dist/index.mjs");
  mkdirSync(path.join(dist, "public"), { recursive: true });
  mkdirSync(path.dirname(api), { recursive: true });
  writeFileSync(api, "// bundled renderer and public repair code version one");
  writeFileSync(path.join(dist, "public/index.html"), '<script src="/assets/index-first.js"></script>');
  writeFileSync(path.join(dist, "ssr-template.html"), '<script src="/assets/index-first.js"></script><div id="root"></div>');
  return { cwd, dist, api, options: { cwd, moduleUrl: pathToFileURL(api).href } };
}

test("deployment identity is stable across restarts and installation paths but changes with API or frontend artifacts", () => {
  const first = fixture();
  const otherLocation = fixture();
  try {
    const identity = readPublicCacheDeploymentVersion(first.options);
    assert.match(identity!, /^[a-f0-9]{64}$/);
    assert.equal(readPublicCacheDeploymentVersion(first.options), identity);
    assert.equal(readPublicCacheDeploymentVersion(otherLocation.options), identity, "absolute paths must not split the same build");
    assert.equal(readPublicCacheDeploymentVersion({ ...first.options, cwd: path.join(first.cwd, "artifacts/api-server") }), identity, "pnpm package cwd uses the same frontend");
    writeFileSync(first.api, "// bundled renderer and public repair code version two");
    const changedApi = readPublicCacheDeploymentVersion(first.options);
    assert.notEqual(changedApi, identity, "API-only repairs must invalidate public API and HTML");
    writeFileSync(path.join(first.dist, "public/index.html"), '<script src="/assets/index-second.js"></script>');
    const changedFrontend = readPublicCacheDeploymentVersion(first.options);
    assert.notEqual(changedFrontend, changedApi, "frontend asset references must invalidate cached HTML");
    writeFileSync(path.join(first.dist, "ssr-template.html"), '<script src="/assets/index-second.js"></script><div id="root"></div>');
    assert.notEqual(readPublicCacheDeploymentVersion(first.options), changedFrontend, "the shell used by the renderer must participate");
  } finally {
    rmSync(first.cwd, { recursive: true, force: true });
    rmSync(otherLocation.cwd, { recursive: true, force: true });
  }
});

test("source mode and missing production artifacts disable persistence without an unstable fallback", () => {
  const item = fixture();
  try {
    assert.equal(readPublicCacheDeploymentVersion({ ...item.options, moduleUrl: pathToFileURL(path.join(item.cwd, "src/index.ts")).href }), null);
    rmSync(path.join(item.dist, "ssr-template.html"));
    assert.equal(readPublicCacheDeploymentVersion(item.options), null);
    rmSync(item.api);
    assert.equal(readPublicCacheDeploymentVersion(item.options), null);
  } finally {
    rmSync(item.cwd, { recursive: true, force: true });
  }
});
