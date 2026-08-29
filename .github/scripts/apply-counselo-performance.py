from __future__ import annotations

from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / "artifacts/legal-site"


def replace_once(text: str, old: str, new: str, *, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{label}: expected exactly one match, found {count}")
    return text.replace(old, new, 1)


def optimize_index_html() -> None:
    path = SITE / "index.html"
    text = path.read_text()
    start_marker = "    <!-- The picker logo is above the fold only on / and /ar."
    end_marker = "    <!--app-head-->"
    start = text.index(start_marker)
    end = text.index(end_marker)
    text = (
        text[:start]
        + "    <!-- Picker-specific resource hints are injected during prerender so only\n"
        + "         / and /ar pay for their critical fonts and hero artwork. -->\n\n"
        + text[end:]
    )

    font_start_marker = "    <!--\n      Keep the same Google font families"
    font_start = text.index(font_start_marker)
    font_end = text.index("  </head>", font_start)
    text = (
        text[:font_start]
        + "    <!-- CounselO fonts are self-hosted inside the first-party CSS bundle. -->\n"
        + text[font_end:]
    )
    path.write_text(text)


def optimize_picker(path: Path, *, arabic: bool) -> None:
    text = path.read_text()
    text = replace_once(
        text,
        'const counseloLogo = "/images/optimized/counselo-region-logo.png";\n'
        'const saudiFlag = "/images/optimized/saudi-arabia-flag.jpg";\n'
        'const syrianFlag = "/images/optimized/syria-flag.jpg";',
        'const counseloLogo = "/images/optimized/counselo-region-logo-193.webp";\n'
        'const counseloLogo2x = "/images/optimized/counselo-region-logo-386.webp";\n'
        'const saudiFlag = "/images/optimized/saudi-arabia-flag-72.webp";\n'
        'const syrianFlag = "/images/optimized/syria-flag-72.webp";',
        label=f"{path.name} asset constants",
    )

    side = "start" if arabic else "end"
    text = replace_once(
        text,
        f'''        <img
          src="/images/optimized/counselo-platform-line-art-v1.png"
          alt=""
          aria-hidden="true"
          width="1200"
          height="900"
          decoding="async"
          className="pointer-events-none absolute -{side}-32 top-4 -z-10 hidden h-[92%] w-auto max-w-none object-contain opacity-[0.13] lg:block"
        />''',
        f'''        <picture className="contents" aria-hidden="true">
          <source
            media="(min-width: 1024px)"
            type="image/webp"
            srcSet="/images/optimized/counselo-platform-line-art-v1.webp"
          />
          <source
            media="(min-width: 1024px)"
            type="image/png"
            srcSet="/images/optimized/counselo-platform-line-art-v1.png"
          />
          <img
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            alt=""
            width="1200"
            height="900"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none absolute -{side}-32 top-4 -z-10 hidden h-[92%] w-auto max-w-none object-contain opacity-[0.13] lg:block"
          />
        </picture>''',
        label=f"{path.name} responsive line art",
    )

    text = replace_once(
        text,
        "                src={counseloLogo}\n",
        "                src={counseloLogo}\n"
        "                srcSet={`${counseloLogo} 1x, ${counseloLogo2x} 2x`}\n",
        label=f"{path.name} logo srcset",
    )
    text = replace_once(
        text,
        '                fetchPriority="high"\n                decoding="async"',
        '                loading="eager"\n                fetchPriority="high"\n                decoding="async"',
        label=f"{path.name} eager logo",
    )

    if arabic:
        text = replace_once(
            text,
            '<span className={`font-serif text-5xl ${dark ? "text-white/15" : "text-[#0d4a31]/12"}`}>{number}</span>',
            '<span aria-hidden="true" className={`font-serif text-5xl ${dark ? "text-white/15" : "text-[#0d4a31]/12"}`}>{number}</span>',
            label=f"{path.name} decorative numbers",
        )
        replacements = {
            'mb-6 text-xs font-bold tracking-[0.12em] text-[#aa7e28]':
                'mb-6 text-xs font-bold tracking-[0.12em] text-[#d4b66c]',
            'mb-2 text-xs font-bold tracking-[0.12em] text-[#aa7e28]':
                'mb-2 text-xs font-bold tracking-[0.12em] text-[#d4b66c]',
            'mb-4 text-xs font-bold tracking-[0.12em] text-[#aa7e28]':
                'mb-4 text-xs font-bold tracking-[0.12em] text-[#8e651d]',
            'text-xs font-bold tracking-[0.1em] text-[#0d4a31]/65':
                'text-xs font-bold tracking-[0.1em] text-[#4d7665]',
        }
    else:
        text = replace_once(
            text,
            '<span className={`font-serif text-5xl italic ${dark ? "text-white/15" : "text-[#0d4a31]/12"}`}>{number}</span>',
            '<span aria-hidden="true" className={`font-serif text-5xl italic ${dark ? "text-white/15" : "text-[#0d4a31]/12"}`}>{number}</span>',
            label=f"{path.name} decorative numbers",
        )
        replacements = {
            'mb-6 text-xs font-bold uppercase tracking-[0.24em] text-[#aa7e28]':
                'mb-6 text-xs font-bold uppercase tracking-[0.24em] text-[#d4b66c]',
            'mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#aa7e28]':
                'mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d4b66c]',
            'mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#aa7e28]':
                'mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#8e651d]',
            'text-xs font-bold uppercase tracking-[0.14em] text-[#0d4a31]/65':
                'text-xs font-bold uppercase tracking-[0.14em] text-[#4d7665]',
        }

    for old, new in replacements.items():
        if old not in text:
            raise RuntimeError(f"{path.name}: missing contrast token {old}")
        text = text.replace(old, new)

    text = replace_once(
        text,
        "text-white/55 hover:text-white text-xs",
        "text-white/60 hover:text-white text-xs",
        label=f"{path.name} LinkedIn contrast",
    )
    path.write_text(text)


def optimize_analytics() -> None:
    path = SITE / "src/lib/analytics.ts"
    text = path.read_text()
    text = replace_once(
        text,
        'const GTM_CONTAINER_ID = "GTM-WZ6SW99X";\n',
        'const GTM_CONTAINER_ID = "GTM-WZ6SW99X";\nlet gtmScheduled = false;\n',
        label="analytics global scheduling guard",
    )
    old = '''  if (typeof document === "undefined" || typeof window === "undefined") return;
  if (document.getElementById("gtm-script")) return;

  const win = window as unknown as { dataLayer?: object[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const loadGTM = () => {
    if (document.getElementById("gtm-script")) return;
    const f = document.getElementsByTagName("script")[0];
    const j = document.createElement("script");
    j.id = "gtm-script";
    j.async = true;
    j.fetchPriority = "low";
    j.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
    f.parentNode?.insertBefore(j, f);
  };

  // Analytics is not needed to render or operate the page. Waiting until the
  // load event prevents the third-party request from competing with CSS,
  // fonts, images, and route chunks on constrained mobile connections. The
  // dataLayer queue above preserves pageview/conversion events in the meantime.
  if (document.readyState === "complete") {
    window.setTimeout(loadGTM, 0);
  } else {
    window.addEventListener("load", loadGTM, { once: true });
  }'''
    new = '''  if (typeof document === "undefined" || typeof window === "undefined") return;
  if (gtmScheduled || document.getElementById("gtm-script")) return;
  gtmScheduled = true;

  const win = window as unknown as { dataLayer?: object[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  let scheduledTimer: number | undefined;
  let idleHandle: number | undefined;
  let loaded = false;

  const cleanupInteractionListeners = () => {
    window.removeEventListener("pointerdown", loadAfterInteraction);
    window.removeEventListener("keydown", loadAfterInteraction);
    window.removeEventListener("touchstart", loadAfterInteraction);
  };

  const loadGTM = () => {
    if (loaded || document.getElementById("gtm-script")) return;
    loaded = true;
    cleanupInteractionListeners();
    if (scheduledTimer !== undefined) window.clearTimeout(scheduledTimer);
    if (idleHandle !== undefined && "cancelIdleCallback" in window) {
      window.cancelIdleCallback(idleHandle);
    }

    const firstScript = document.getElementsByTagName("script")[0];
    const script = document.createElement("script");
    script.id = "gtm-script";
    script.async = true;
    script.fetchPriority = "low";
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
    firstScript.parentNode?.insertBefore(script, firstScript);
  };

  function loadAfterInteraction() {
    loadGTM();
  }

  const scheduleAfterCriticalLoad = () => {
    // Keep a short post-load quiet window so analytics cannot compete with
    // LCP, font, or image work. The dataLayer and local store remain active.
    scheduledTimer = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(loadGTM, { timeout: 2_000 });
      } else {
        loadGTM();
      }
    }, 3_000);
  };

  window.addEventListener("pointerdown", loadAfterInteraction, { once: true, passive: true });
  window.addEventListener("keydown", loadAfterInteraction, { once: true });
  window.addEventListener("touchstart", loadAfterInteraction, { once: true, passive: true });

  if (document.readyState === "complete") {
    scheduleAfterCriticalLoad();
  } else {
    window.addEventListener("load", scheduleAfterCriticalLoad, { once: true });
  }'''
    text = replace_once(text, old, new, label="analytics deferred GTM loader")
    path.write_text(text)


def optimize_prerender() -> None:
    path = SITE / "src/scripts/prerender.ts"
    text = path.read_text()
    marker = '''function htmlTag(route: string): string {
  const isArabic = route.includes("/ar/") || route.endsWith("/ar");
  return isArabic ? '<html lang="ar" dir="rtl">' : '<html lang="en" dir="ltr">';
}

'''
    helpers = marker + r'''const PICKER_ROUTES = new Set(["/", "/ar"]);

const ENGLISH_PICKER_FONT_PRELOADS = [
  "/fonts/07-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2",
  "/fonts/15-nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2",
  "/fonts/11-nuFkD-vYSZviVYUb_rj3ij__anPXDTnogkk7.woff2",
] as const;

const ARABIC_PICKER_FONT_PRELOADS = [
  "/fonts/18-Iura6YBj_oCad4k1nzSBC45I.woff2",
  "/fonts/22-Iurf6YBj_oCad4k1l4qkHrRpiYlJ.woff2",
] as const;

function pickerResourceHints(route: string): string {
  if (!PICKER_ROUTES.has(route)) return "";
  const fontPreloads = (route === "/ar"
    ? ARABIC_PICKER_FONT_PRELOADS
    : ENGLISH_PICKER_FONT_PRELOADS
  )
    .map(
      (href) =>
        `<link rel="preload" as="font" href="${href}" type="font/woff2" crossorigin>`,
    )
    .join("");

  return [
    fontPreloads,
    '<link rel="preload" as="image" href="/images/optimized/counselo-region-logo-193.webp" imagesrcset="/images/optimized/counselo-region-logo-193.webp 1x, /images/optimized/counselo-region-logo-386.webp 2x" type="image/webp" fetchpriority="high">',
    '<link rel="preload" as="image" href="/images/optimized/counselo-platform-line-art-v1.webp" type="image/webp" media="(min-width: 1024px)" fetchpriority="high">',
  ].join("");
}

function inlinePickerStyles(route: string, template: string): string {
  if (!PICKER_ROUTES.has(route)) return template;

  return template.replace(/<link\b[^>]*>/gi, (tag) => {
    if (!/\brel=["']stylesheet["']/i.test(tag)) return tag;
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (!href || !href.startsWith("/") || !href.includes(".css")) return tag;

    const stylesheetPath = resolve(
      publicDir,
      href.replace(/^\/+/, "").replace(/[?#].*$/, ""),
    );
    const css = readFileSync(stylesheetPath, "utf-8").replace(
      /<\/style/gi,
      "<\\/style",
    );
    return `<style data-picker-critical-css>${css}</style>`;
  });
}

'''
    text = replace_once(text, marker, helpers, label="prerender picker helpers")
    text = replace_once(
        text,
        "  const routeHtml = template\n",
        "  const routeTemplate = inlinePickerStyles(route, template);\n"
        "  const routeHtml = routeTemplate\n",
        label="prerender route template",
    )
    text = replace_once(
        text,
        "      `${unescapeHeadEntities(addDataRh(head))}${initialData}`,\n",
        "      `${pickerResourceHints(route)}${unescapeHeadEntities(addDataRh(head))}${initialData}`,\n",
        label="prerender resource hints",
    )
    path.write_text(text)


def install_fonts_and_images() -> None:
    generated = ROOT / "generated-assets"
    font_css = (generated / "fonts/counselo-fonts.css").read_text().strip()
    css_path = SITE / "src/index.css"
    css = css_path.read_text()
    anchor = '@plugin "@tailwindcss/typography";\n'
    font_block = (
        "\n\n/* Self-hosted CounselO typefaces. These are the same Google Fonts files\n"
        "   previously used, served from the first-party origin so the browser\n"
        "   does not wait on two external font origins. */\n"
        + font_css
        + "\n"
    )
    css = replace_once(css, anchor, anchor + font_block, label="self-hosted font CSS")
    css_path.write_text(css)

    public_fonts = SITE / "public/fonts"
    public_images = SITE / "public/images/optimized"
    public_fonts.mkdir(parents=True, exist_ok=True)
    for source in (generated / "fonts").glob("*.woff2"):
        shutil.copy2(source, public_fonts / source.name)
    for source in (generated / "images").glob("*.webp"):
        shutil.copy2(source, public_images / source.name)


def main() -> None:
    optimize_index_html()
    optimize_picker(SITE / "src/pages/region-picker.tsx", arabic=False)
    optimize_picker(SITE / "src/pages/ar-region-picker.tsx", arabic=True)
    optimize_analytics()
    optimize_prerender()
    install_fonts_and_images()
    print("CounselO performance hardening applied successfully")


if __name__ == "__main__":
    main()
