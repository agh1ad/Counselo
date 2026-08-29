import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { readFileSync } from "node:fs";
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
 * The root jurisdiction picker is prerendered with the normal production
 * components, so SEO/body HTML remains exactly the same. For the browser-only
 * production bundle, give only those two picker pages a second module instance
 * of LatestContentCarousels whose data refresh and carousel engines are tiny
 * compatibility runtimes. The first client render deliberately matches the
 * SSR markup; the lighter engines take over only after hydration.
 *
 * Development and the SSR/prerender build are intentionally excluded, and the
 * normal App lazy chunk keeps TanStack Query + Embla unchanged for every other
 * route.
 */
function lightweightPickerRuntime() {
  const queryRuntime = path.resolve(import.meta.dirname, "src/lib/react-query-picker-lite.tsx");
  const carouselRuntime = path.resolve(import.meta.dirname, "src/components/ui/carousel-picker-lite.tsx");
  const latestContent = path.resolve(import.meta.dirname, "src/components/content/latest-content-carousels.tsx");
  const pickerVariant = `${latestContent}?picker-lite-runtime`;

  return {
    name: "lightweight-picker-runtime",
    enforce: "pre" as const,
    resolveId(source: string, importer?: string) {
      if (!isBuildStep || isSSR || !importer) return null;
      const normalizedImporter = importer.split(path.sep).join("/");

      if (
        source === "@tanstack/react-query" &&
        normalizedImporter.endsWith("/src/PickerApp.tsx")
      ) {
        return queryRuntime;
      }

      if (
        source === "@/components/content/latest-content-carousels" &&
        (normalizedImporter.endsWith("/src/pages/region-picker.tsx") ||
          normalizedImporter.endsWith("/src/pages/ar-region-picker.tsx"))
      ) {
        return pickerVariant;
      }

      return null;
    },
    load(id: string) {
      if (id !== pickerVariant) return null;
      return readFileSync(latestContent, "utf8")
        .replace('from "@tanstack/react-query"', 'from "@/lib/react-query-picker-lite"')
        .replace('from "@/components/ui/carousel"', 'from "@/components/ui/carousel-picker-lite"')
        .replace('from "@workspace/api-zod"', 'from "@/lib/blog-path-light"');
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

/**
 * Keep react-helmet-async external at runtime so its server environment check
 * remains correct, but bridge its CommonJS package shape through createRequire
 * so Node ESM can consume Helmet/HelmetProvider during prerendering.
 */
function helmetSsrInterop() {
  const wrapper = path.resolve(import.meta.dirname, "src/lib/helmet-async-ssr.ts");
  return {
    name: "helmet-ssr-interop",
    enforce: "pre" as const,
    resolveId(source: string) {
      if (isSSR && source === "react-helmet-async") return wrapper;
      return null;
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    sitemapPlugin(),
    staticMotionForRegionPickers(),
    lightweightPickerRuntime(),
    lightweightPublicImports(),
    helmetSsrInterop(),
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
});