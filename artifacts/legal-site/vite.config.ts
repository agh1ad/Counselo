import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { execSync } from "child_process";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

/**
 * Vite configuration supporting three build modes:
 *
 *   pnpm run dev          → dev server (command = "serve")
 *   pnpm run build:client → client bundle → dist/public/
 *   pnpm run build:ssr    → SSR Node bundle → dist/server/  (VITE_SSR=true)
 *
 * PORT is only required for the dev/preview server; build modes skip the check.
 */

const isBuildStep = process.argv.some((a) => a === "build");
const rawPort = process.env.PORT;

if (!rawPort && !isBuildStep) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = rawPort ? Number(rawPort) : 0;

if (port !== 0 && (Number.isNaN(port) || port <= 0)) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";
const isSSR = process.env.VITE_SSR === "true";
const isProduction = isBuildStep || process.env.NODE_ENV === "production";

function sitemapPlugin() {
  return {
    name: "generate-sitemap",
    buildStart() {
      if (isSSR) return;
      execSync("pnpm run generate-sitemap", {
        cwd: import.meta.dirname,
        stdio: "inherit",
      });
    },
  };
}

/**
 * The two jurisdiction-picker pages use Framer Motion components whose
 * `initial={false}` configuration leaves them at their ordinary resting CSS
 * state. Resolve only those two imports to a tiny DOM-compatible shim so the
 * landing-page chunk does not pay for the animation runtime.
 */
function staticMotionForRegionPickers() {
  const shim = path.resolve(import.meta.dirname, "src/lib/static-motion.tsx");
  return {
    name: "static-motion-region-pickers",
    enforce: "pre" as const,
    resolveId(source: string, importer?: string) {
      if (source !== "framer-motion" || !importer) return null;
      const normalizedImporter = importer.split(path.sep).join("/");
      if (
        normalizedImporter.endsWith("/src/pages/region-picker.tsx") ||
        normalizedImporter.endsWith("/src/pages/ar-region-picker.tsx")
      ) {
        return shim;
      }
      return null;
    },
  };
}

/**
 * Avoid the api-zod barrel and toast runtime on the initial public shell.
 * The barrel re-exports generated Zod schemas that the picker never uses.
 * These importer-scoped replacements expose only the exact values/functions
 * consumed by each lightweight surface, while all other routes keep the
 * original package behavior.
 */
function lightweightPublicImports() {
  const pickerApi = path.resolve(import.meta.dirname, "src/lib/api-zod-picker.ts");
  const blogPath = path.resolve(import.meta.dirname, "src/lib/blog-path-light.ts");
  const deferredToaster = path.resolve(import.meta.dirname, "src/lib/deferred-toaster.tsx");

  return {
    name: "lightweight-public-imports",
    enforce: "pre" as const,
    resolveId(source: string, importer?: string) {
      if (!importer) return null;
      const normalizedImporter = importer.split(path.sep).join("/");

      if (source === "@workspace/api-zod") {
        if (
          normalizedImporter.endsWith("/src/pages/region-picker.tsx") ||
          normalizedImporter.endsWith("/src/pages/ar-region-picker.tsx")
        ) {
          return pickerApi;
        }
        if (
          normalizedImporter.endsWith("/src/components/content/latest-content-carousels.tsx") ||
          normalizedImporter.endsWith("/src/App.tsx")
        ) {
          return blogPath;
        }
      }

      if (
        source === "@/components/ui/toaster" &&
        normalizedImporter.endsWith("/src/App.tsx")
      ) {
        return deferredToaster;
      }

      return null;
    },
  };
}

/** Temporary build diagnostics used by the performance PR. */
function entryBundleReport() {
  return {
    name: "entry-bundle-report",
    apply: "build" as const,
    generateBundle(_options: unknown, bundle: Record<string, any>) {
      if (isSSR) return;
      for (const output of Object.values(bundle)) {
        if (output.type !== "chunk" || !output.isEntry) continue;
        const modules = Object.entries(output.modules as Record<string, { renderedLength: number }>)
          .map(([id, info]) => ({ id, bytes: info.renderedLength ?? 0 }))
          .sort((a, b) => b.bytes - a.bytes);
        console.log(`[bundle-entry] ${output.fileName} modules=${modules.length}`);
        for (const module of modules.slice(0, 35)) {
          console.log(`[bundle-entry] ${module.bytes.toString().padStart(8)} ${module.id}`);
        }
      }
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    sitemapPlugin(),
    staticMotionForRegionPickers(),
    lightweightPublicImports(),
    entryBundleReport(),
    react(),
    tailwindcss(),
    ...(!isProduction ? [runtimeErrorOverlay()] : []),
    ...(!isProduction && process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: [
      {
        find: "@/route-pages",
        replacement: path.resolve(import.meta.dirname, isSSR ? "src/route-pages.ssr.ts" : "src/route-pages.ts"),
      },
      {
        find: "@/contexts/LanguageContext",
        replacement: path.resolve(import.meta.dirname, isSSR ? "src/contexts/LanguageContext.ssr.tsx" : "src/contexts/LanguageContext.tsx"),
      },
      { find: "@", replacement: path.resolve(import.meta.dirname, "src") },
      { find: "@assets", replacement: path.resolve(import.meta.dirname, "..", "..", "attached_assets") },
    ],
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: isSSR
      ? path.resolve(import.meta.dirname, "dist/server")
      : path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    ssr: isSSR ? "src/entry-server.tsx" : undefined,
  },
  server: {
    port: port || undefined,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port: port || undefined,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  // SSR build: do NOT add noExternal for react-helmet-async.
  // Its canUseDOM static field reads `typeof window !== "undefined"` at module
  // load time. If Vite bundles it (noExternal), its browser-target transform
  // replaces typeof-window with `true`, making canUseDOM=true → Helmet skips
  // SSR context population entirely. Leaving it external lets Node.js require()
  // it at runtime where window is genuinely undefined → canUseDOM=false → SSR
  // context is populated correctly after renderToString.
});
