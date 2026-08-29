import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, relative } from "node:path";
import process from "node:process";

const root = process.cwd();
const site = join(root, "artifacts/legal-site");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function read(relativePath) {
  return readFile(join(root, relativePath), "utf8");
}

async function write(relativePath, content) {
  const target = join(root, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content);
}

function replaceOnce(source, search, replacement, label) {
  assert(source.includes(search), `Missing expected source while applying ${label}`);
  return source.replace(search, replacement);
}

function replaceRegexOnce(source, pattern, replacement, label) {
  assert(pattern.test(source), `Missing expected pattern while applying ${label}`);
  pattern.lastIndex = 0;
  return source.replace(pattern, replacement);
}

function fontBlocks(css) {
  return css.match(/\/\*[^*]+\*\/\s*@font-face\s*\{[^}]+\}/g) ?? [];
}

function weightIncludes400(block) {
  const match = block.match(/font-weight:\s*([^;]+);/);
  if (!match) return false;
  const values = match[1].trim().split(/\s+/).map(Number).filter(Number.isFinite);
  if (values.length === 1) return values[0] === 400;
  if (values.length >= 2) return values[0] <= 400 && values[values.length - 1] >= 400;
  return false;
}

function criticalFontHref(css, family, subset) {
  const unicodeNeedle = subset === "arabic" ? /U\+0600-06FF/i : /U\+0000-00FF/i;
  const block = fontBlocks(css).find((candidate) =>
    candidate.includes(`font-family: '${family}'`) &&
    /font-style:\s*normal;/.test(candidate) &&
    weightIncludes400(candidate) &&
    unicodeNeedle.test(candidate),
  );
  return block?.match(/url\((\/fonts\/[^)]+\.woff2)\)/)?.[1] ?? null;
}

async function localizeGoogleFonts() {
  const cssUrl = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700&family=Tajawal:wght@300;400;500;700&display=block";
  const response = await fetch(cssUrl, {
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151.0 Safari/537.36",
      accept: "text/css,*/*;q=0.1",
    },
  });
  assert(response.ok, `Google Fonts CSS request failed: ${response.status}`);
  let css = await response.text();
  const remoteUrls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((match) => match[1]))];
  assert(remoteUrls.length > 0, "No WOFF2 URLs found in Google Fonts CSS");

  const fontsDir = join(site, "public/fonts");
  await mkdir(fontsDir, { recursive: true });

  for (const remoteUrl of remoteUrls) {
    const fontResponse = await fetch(remoteUrl);
    assert(fontResponse.ok, `Font request failed: ${remoteUrl} (${fontResponse.status})`);
    const bytes = Buffer.from(await fontResponse.arrayBuffer());
    const extension = extname(new URL(remoteUrl).pathname) || ".woff2";
    const filename = `${createHash("sha256").update(remoteUrl).digest("hex").slice(0, 20)}${extension}`;
    await writeFile(join(fontsDir, filename), bytes);
    css = css.split(remoteUrl).join(`/fonts/${filename}`);
  }

  css = css
    .replace(/font-display:\s*[^;]+;/g, "font-display: block;")
    .replace(/\r\n/g, "\n")
    .trim();
  await write("artifacts/legal-site/public/fonts/counselo-fonts.css", `${css}\n`);

  return {
    css,
    preloads: [
      criticalFontHref(css, "Inter", "latin"),
      criticalFontHref(css, "Playfair Display", "latin"),
      criticalFontHref(css, "Tajawal", "arabic"),
    ].filter(Boolean),
  };
}

function convertLosslessWebp(inputRelative, outputRelative) {
  const input = join(site, inputRelative);
  const output = join(site, outputRelative);
  execFileSync("cwebp", ["-quiet", "-lossless", "-z", "9", "-metadata", "none", input, "-o", output], { stdio: "inherit" });
}

async function patchIndexHtml(fontCss, fontPreloads) {
  const path = "artifacts/legal-site/index.html";
  let html = await read(path);

  html = replaceRegexOnce(
    html,
    /\s*<!-- The picker logo is above the fold only on \/ and \/ar\.[\s\S]*?<\/script>\s*/m,
    `\n    <!-- The picker logo is the desktop LCP candidate. A static preload lets the\n         browser discover the final lossless WebP before parsing the body. -->\n    <link rel="preload" as="image" href="/images/optimized/counselo-region-logo.webp" fetchpriority="high">\n`,
    "static picker logo preload",
  );

  html = replaceRegexOnce(
    html,
    /\s*<!--\s*The jurisdiction picker is a long prerendered document\.[\s\S]*?<\/style>\s*/m,
    `\n    <!-- The picker uses normal document layout for every section. This avoids\n         replacing guessed intrinsic heights after first paint and eliminates\n         synthetic layout shifts while preserving the exact rendered design. -->\n`,
    "layout-stable picker sections",
  );

  const preloadMarkup = fontPreloads
    .map((href) => `    <link rel="preload" as="font" type="font/woff2" href="${href}" crossorigin>`)
    .join("\n");
  const fontMarkup = `\n    <!-- Exact self-hosted copies of the existing CounselO fonts. The CSS is\n         inline so no stylesheet blocks rendering, and critical files are\n         preloaded so the first text paint uses final font metrics. -->\n${preloadMarkup}\n    <style id="counselo-fonts">\n${fontCss.replace(/^/gm, "      ")}\n      html { font-synthesis: none; }\n    </style>\n`;

  html = replaceRegexOnce(
    html,
    /\s*<!--\s*Keep the same Google font families[\s\S]*?<noscript><link[\s\S]*?<\/noscript>\s*/m,
    fontMarkup,
    "self-hosted font delivery",
  );

  html = replaceOnce(
    html,
    `        if(document.readyState==='complete')setTimeout(loadGA,0);\n        else window.addEventListener('load',loadGA,{once:true});`,
    `        function scheduleGA(){\n          if('requestIdleCallback' in window)requestIdleCallback(loadGA,{timeout:4000});\n          else setTimeout(loadGA,2000);\n        }\n        if(document.readyState==='complete')scheduleGA();\n        else window.addEventListener('load',scheduleGA,{once:true});`,
    "idle analytics loading",
  );

  await write(path, html);
}

async function patchPickerPage(relativePath) {
  let source = await read(relativePath);
  source = source
    .replaceAll("counselo-region-logo.png", "counselo-region-logo.webp")
    .replaceAll("counselo-platform-line-art-v1.png", "counselo-platform-line-art-v1.webp");

  const decorativeNeedle = `          width="1200"\n          height="900"\n          decoding="async"`;
  if (source.includes(decorativeNeedle)) {
    source = source.replace(
      decorativeNeedle,
      `          width="1200"\n          height="900"\n          loading="lazy"\n          fetchPriority="low"\n          decoding="async"`,
    );
  }

  await write(relativePath, source);
}

async function patchEntryClient() {
  const path = "artifacts/legal-site/src/entry-client.tsx";
  let source = await read(path);

  source = replaceOnce(
    source,
    `function afterWindowLoad(callback: () => void) {\n  if (document.readyState === "complete") {\n    window.setTimeout(callback, 0);\n    return;\n  }\n  window.addEventListener("load", callback, { once: true });\n}\n`,
    `function afterWindowLoad(callback: () => void) {\n  if (document.readyState === "complete") {\n    window.setTimeout(callback, 0);\n    return;\n  }\n  window.addEventListener("load", callback, { once: true });\n}\n\nfunction whenBrowserIsIdle(callback: () => void) {\n  if ("requestIdleCallback" in window) {\n    window.requestIdleCallback(callback, { timeout: 4000 });\n    return;\n  }\n  window.setTimeout(callback, 2000);\n}\n`,
    "idle scheduling helper",
  );

  source = replaceOnce(
    source,
    `  afterWindowLoad(() => {\n    void loadAnalytics().then(({ injectGTM, trackPageview }) => {\n      trackPageview(window.location.pathname);\n      injectGTM();\n    });\n  });`,
    `  afterWindowLoad(() => {\n    whenBrowserIsIdle(() => {\n      void loadAnalytics().then(({ injectGTM, trackPageview }) => {\n        trackPageview(window.location.pathname);\n        injectGTM();\n      });\n    });\n  });`,
    "idle picker analytics",
  );

  source = replaceOnce(
    source,
    `  window.scrollTo({ top: 0, behavior: "instant" });\n  installPickerAnalytics();`,
    `  if (window.scrollY !== 0) {\n    window.scrollTo({ top: 0, behavior: "instant" });\n  }\n  installPickerAnalytics();`,
    "conditional initial scroll reset",
  );

  await write(path, source);
}

async function patchViteConfig() {
  const path = "artifacts/legal-site/vite.config.ts";
  let source = await read(path);
  if (!source.includes("resolveDependencies:")) {
    source = replaceRegexOnce(
      source,
      /build:\s*\{/,
      `build: {\n      modulePreload: {\n        // Dynamic picker/runtime chunks are fetched only when their import is\n        // triggered by scroll or interaction. Do not preload them on the static\n        // jurisdiction picker, where they otherwise appear as unused JS.\n        resolveDependencies: (_filename, dependencies, context) =>\n          context.hostType === "js" ? [] : dependencies,\n      },`,
      "dynamic modulepreload filtering",
    );
  }
  await write(path, source);
}

async function main() {
  convertLosslessWebp(
    "public/images/optimized/counselo-region-logo.png",
    "public/images/optimized/counselo-region-logo.webp",
  );
  convertLosslessWebp(
    "public/images/optimized/counselo-platform-line-art-v1.png",
    "public/images/optimized/counselo-platform-line-art-v1.webp",
  );

  const { css, preloads } = await localizeGoogleFonts();
  await patchIndexHtml(css, preloads);
  await patchPickerPage("artifacts/legal-site/src/pages/region-picker.tsx");
  await patchPickerPage("artifacts/legal-site/src/pages/ar-region-picker.tsx");
  await patchEntryClient();
  await patchViteConfig();

  console.log("CounselO PageSpeed hardening applied successfully.");
  console.log(`Self-hosted font files: ${fontBlocks(css).length} @font-face rules`);
  console.log(`Critical font preloads: ${preloads.join(", ")}`);
  console.log(`Site root: ${relative(root, site)}`);
}

await main();
