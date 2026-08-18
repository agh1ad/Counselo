/**
 * seo-validate.ts
 * Run: pnpm --filter @workspace/legal-site run seo:validate
 *
 * Reads all prerendered HTML files under dist/public and validates each page
 * against a set of SEO rules. Writes:
 *   - seo-validation-report.md   (human-readable summary)
 *   - seo-validation-report.json (machine-readable full detail)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../../dist/public");
const PAGES = path.join(DIST, "__pages");
const BASE = "https://counselo-legal.com";

// ── helpers ─────────────────────────────────────────────────────────────────

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function meta(html: string, attr: string, name: string): string {
  for (const pat of [
    new RegExp(
      `<meta\\b[^>]*\\b${attr}="${escapeRe(name)}"[^>]*\\bcontent="([^"]*)"`,
      "i",
    ),
    new RegExp(
      `<meta\\b[^>]*\\bcontent="([^"]*)"[^>]*\\b${attr}="${escapeRe(name)}"`,
      "i",
    ),
  ]) {
    const m = html.match(pat);
    if (m) return decode(m[1]);
  }
  return "";
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function title(html: string): string {
  const m = html.match(/<title\b[^>]*>([^<]+)<\/title>/i);
  return m ? decode(m[1].trim()) : "";
}

function canonical(html: string): string {
  const m =
    html.match(/<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]*)"/i) ||
    html.match(/<link\b[^>]*\bhref="([^"]*)"[^>]*\brel="canonical"/i);
  return m ? m[1] : "";
}

function hreflangTags(html: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re = /<link\b([^>]*)>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const attrs = m[1];
    if (!/rel="alternate"/i.test(attrs)) continue;
    const lang = attrs.match(/hrefLang="([^"]*)"/i)?.[1];
    const href = attrs.match(/href="([^"]*)"/i)?.[1];
    if (lang && href) out[lang] = href;
  }
  return out;
}

function h1s(html: string): string[] {
  const re = /<h1\b[^>]*>(.*?)<\/h1>/gis;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    out.push(decode(m[1].replace(/<[^>]+>/g, "").trim()));
  }
  return out;
}

function schemas(html: string): object[] {
  const re = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  const out: object[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    try {
      out.push(JSON.parse(m[1]));
    } catch {
      /* skip malformed */
    }
  }
  return out;
}

function imagesWithoutAlt(html: string): number {
  let count = 0;
  const re = /<img\b([^>]*)>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    if (!/\balt="/i.test(m[1])) count++;
  }
  return count;
}

function internalLinksFromBody(html: string): string[] {
  const body = html
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, "");
  const re = /<a\b[^>]*\bhref="(\/[^"]*)"/gi;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) out.push(m[1]);
  return out;
}

// ── rule engine ──────────────────────────────────────────────────────────────

type Severity = "error" | "warn" | "info";

interface Issue {
  severity: Severity;
  rule: string;
  detail: string;
}

interface PageResult {
  file: string;
  route: string;
  isRedirect: boolean;
  redirectTo?: string;
  title: string;
  description: string;
  issues: Issue[];
  schemaTypes: string[];
  hreflangCount: number;
  internalLinkCount: number;
  hreflangs: Record<string, string>;
  internalLinks: string[];
}

function validatePage(filepath: string): PageResult {
  const html = fs.readFileSync(filepath, "utf-8");
  const issues: Issue[] = [];

  const isRedirect =
    /http-equiv="refresh"/i.test(html) && /noindex, nofollow/i.test(html);

  if (isRedirect) {
    const redir = html.match(/content="0;\s*url=([^"]+)"/i)?.[1] ?? "";
    const sourceRoute =
      meta(html, "name", "x-source-route") ||
      `/${path.basename(filepath, ".html").replace(/-/g, "/")}`;
    return {
      file: path.basename(filepath),
      route: sourceRoute,
      isRedirect: true,
      redirectTo: redir,
      title: "",
      description: "",
      issues: [],
      schemaTypes: [],
      hreflangCount: 0,
      internalLinkCount: 0,
      hreflangs: {},
      internalLinks: [],
    };
  }

  const ogUrl = meta(html, "property", "og:url");
  const route = ogUrl ? ogUrl.replace(BASE, "") || "/" : "/";
  const isSyr = route.startsWith("/syr");
  const isUae = route.startsWith("/uae");
  const isSa = route.startsWith("/sa") || route === "/" || route === "/ar";
  const isSharedWork =
    route === "/legal-library" ||
    route === "/ar/legal-library" ||
    route === "/our-work" ||
    route.startsWith("/our-work/") ||
    route === "/ar/our-work" ||
    route.startsWith("/ar/our-work/");
  const isSingleUrlBlog = route === "/blog" || route.startsWith("/blog/");
  const isAr = route.includes("/ar/") || route.endsWith("/ar");

  // ── core meta ──
  const t = title(html);
  const desc = meta(html, "name", "description");
  const robots = meta(html, "name", "robots");
  const canon = canonical(html);
  const ogTitle = meta(html, "property", "og:title");
  const ogDesc = meta(html, "property", "og:description");

  if (!t)
    issues.push({
      severity: "error",
      rule: "title-missing",
      detail: "No <title> tag",
    });
  if (!desc)
    issues.push({
      severity: "error",
      rule: "description-missing",
      detail: "No meta description",
    });
  if (!canon)
    issues.push({
      severity: "error",
      rule: "canonical-missing",
      detail: "No canonical link",
    });
  if (robots && /noindex/i.test(robots))
    issues.push({
      severity: "error",
      rule: "noindexed",
      detail: `robots: ${robots}`,
    });

  // ── title/desc length ──
  const tLen = [...t].length;
  const dLen = [...desc].length;
  if (t && tLen < 20)
    issues.push({
      severity: "warn",
      rule: "title-too-short",
      detail: `${tLen} chars (min 20)`,
    });
  if (t && tLen > 70)
    issues.push({
      severity: "warn",
      rule: "title-too-long",
      detail: `${tLen} chars (max 70)`,
    });
  if (desc && dLen < 80)
    issues.push({
      severity: "warn",
      rule: "desc-too-short",
      detail: `${dLen} chars (min 80)`,
    });
  if (desc && dLen > 170)
    issues.push({
      severity: "warn",
      rule: "desc-too-long",
      detail: `${dLen} chars (max 170)`,
    });

  // ── OG ──
  if (!ogTitle)
    issues.push({
      severity: "warn",
      rule: "og-title-missing",
      detail: "No og:title",
    });
  if (!ogDesc)
    issues.push({
      severity: "warn",
      rule: "og-desc-missing",
      detail: "No og:description",
    });

  // ── hreflang ──
  const hl = hreflangTags(html);
  const hlCount = Object.keys(hl).length;
  if (hlCount === 0)
    issues.push({
      severity: "error",
      rule: "hreflang-missing",
      detail: "No hreflang links",
    });
  if (!hl["x-default"])
    issues.push({
      severity: "warn",
      rule: "hreflang-no-xdefault",
      detail: "Missing x-default hreflang",
    });

  // ── H1 ──
  const allH1 = h1s(html);
  if (allH1.length === 0)
    issues.push({
      severity: "error",
      rule: "h1-missing",
      detail: "No H1 found",
    });
  if (allH1.length > 1)
    issues.push({
      severity: "warn",
      rule: "h1-multiple",
      detail: `${allH1.length} H1s found`,
    });

  // ── structured data ──
  const sc = schemas(html);
  const schemaTypes = sc.map((s: any) => s["@type"] ?? "unknown");
  const webPageSchemas = sc.filter((schema: any) => schema?.["@type"] === "WebPage");
  if (webPageSchemas.some((schema: any) => schema["@context"] !== "https://schema.org"))
    issues.push({
      severity: "error",
      rule: "webpage-schema-context-missing",
      detail: "Standalone WebPage JSON-LD must declare https://schema.org context",
    });
  const hasBreadcrumbSchema = sc.some((schema: any) => {
    const visit = (value: unknown): boolean => {
      if (!value || typeof value !== "object") return false;
      if (Array.isArray(value)) return value.some(visit);
      const node = value as Record<string, unknown>;
      return node["@type"] === "BreadcrumbList" || Object.values(node).some(visit);
    };
    return visit(schema);
  });
  if (sc.length === 0)
    issues.push({
      severity: "warn",
      rule: "schema-missing",
      detail: "No JSON-LD schema",
    });
  // A homepage is the root of a breadcrumb trail, so BreadcrumbList adds no
  // navigation value there. Other pages may embed it in their WebPage schema.
  if (route !== "/" && route !== "/ar" && !hasBreadcrumbSchema)
    issues.push({
      severity: "warn",
      rule: "schema-no-breadcrumb",
      detail: "No BreadcrumbList schema",
    });

  // ── images ──
  const noAlt = imagesWithoutAlt(html);
  if (noAlt > 0)
    issues.push({
      severity: "warn",
      rule: "img-missing-alt",
      detail: `${noAlt} image(s) without alt`,
    });

  // ── geo ──
  const geoRegion = meta(html, "name", "geo.region");
  if (!geoRegion && !isSingleUrlBlog && !isSharedWork)
    issues.push({
      severity: "warn",
      rule: "geo-region-missing",
      detail: "No geo.region meta",
    });

  // ── Syria-specific ──
  if (isSyr && !isSingleUrlBlog && !isSharedWork) {
    const syrTitle = meta(html, "property", "og:title") + " " + t;
    if (/المملكة/.test(syrTitle))
      issues.push({
        severity: "error",
        rule: "syr-ksa-title-leak",
        detail: `"المملكة" found in title/og:title on Syria page`,
      });
    if (/Saudi Arabia/i.test(t) && !/Syria/i.test(t))
      issues.push({
        severity: "warn",
        rule: "syr-sa-title-en",
        detail: `"Saudi Arabia" in title without "Syria"`,
      });

    const visibleText = decode(
      html
        .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
        .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " "),
    );
    const contamination = visibleText.match(
      /Saudi(?: Arabia)?|\bKSA\b|\bSAMA\b|\bCMA\b|\bZATCA\b|\bMISA\b|\bSAIP\b|\bCITC\b|Vision 2030|السعود(?:ية|ي)?|ساما|هيئة الزكاة/gi,
    );
    // The About page deliberately documents the founder's cross-border work.
    // That authority evidence is not an offer of Saudi-only services on Syria URLs.
    const isAboutPage = /^\/syr(?:\/ar)?\/about$/.test(route);
    if (contamination?.length && !isAboutPage)
      issues.push({
        severity: "error",
        rule: "syr-jurisdiction-contamination",
        detail: `Saudi-only terms in visible Syria content: ${[...new Set(contamination)].join(", ")}`,
      });

    if (!hl["en-SY"])
      issues.push({
        severity: "error",
        rule: "syr-hreflang-en-sy-missing",
        detail: "Missing en-SY hreflang",
      });
    if (!hl["ar-SY"])
      issues.push({
        severity: "error",
        rule: "syr-hreflang-ar-sy-missing",
        detail: "Missing ar-SY hreflang",
      });
  }

  // ── SA-specific ──
  if (isSa && !isSingleUrlBlog && !isSharedWork) {
    if (!hl["en-SA"])
      issues.push({
        severity: "error",
        rule: "sa-hreflang-en-sa-missing",
        detail: "Missing en-SA hreflang",
      });
    if (!hl["ar-SA"])
      issues.push({
        severity: "error",
        rule: "sa-hreflang-ar-sa-missing",
        detail: "Missing ar-SA hreflang",
      });
  }

  // ── UAE-specific ──
  if (isUae && !isSingleUrlBlog && !isSharedWork) {
    if (!hl["en-AE"])
      issues.push({
        severity: "error",
        rule: "uae-hreflang-en-ae-missing",
        detail: "Missing en-AE hreflang",
      });
    if (!hl["ar-AE"])
      issues.push({
        severity: "error",
        rule: "uae-hreflang-ar-ae-missing",
        detail: "Missing ar-AE hreflang",
      });
  }

  if (isSharedWork) {
    if (!hl["en"])
      issues.push({
        severity: "error",
        rule: "work-hreflang-en-missing",
        detail: "Missing English hreflang",
      });
    if (!hl["ar"])
      issues.push({
        severity: "error",
        rule: "work-hreflang-ar-missing",
        detail: "Missing Arabic hreflang",
      });
  }

  const bodyLinks = internalLinksFromBody(html);
  const isProblemPage = /^\/(?:sa|syr|uae)(?:\/ar)?\/services\/[^/]+\/[^/]+$/.test(route);
  if (isProblemPage && !/(CounselO|كاونسلو)/.test(t))
    issues.push({
      severity: "error",
      rule: "problem-title-brand-missing",
      detail: "Problem-page title was truncated before the CounselO brand",
    });
  if (isProblemPage && /\b(?:a|an|and|for|in|of|or|the|to|with)$/i.test(t))
    issues.push({
      severity: "error",
      rule: "problem-title-dangling-word",
      detail: "Problem-page title ends with an incomplete connector word",
    });
  const isArabicRoute = route === "/ar"
    || route.startsWith("/ar/")
    || route === "/blog/ar"
    || route.startsWith("/blog/ar/")
    || /\/(?:sa|syr|uae)\/ar(?:\/|$)/.test(route);
  if (isArabicRoute && bodyLinks.includes("/blog")) {
    issues.push({
      severity: "error",
      rule: "arabic-page-links-english-blog-hub",
      detail: "Arabic page links to the English blog hub instead of /blog/ar",
    });
  }

  // ── blog hubs — must have article links ──
  if (
    route === "/blog" ||
    route === "/blog/ar" ||
    route === "/sa/blog" ||
    route === "/syr/blog" ||
    route === "/uae/blog" ||
    route === "/sa/ar/blog" ||
    route === "/syr/ar/blog" ||
    route === "/uae/ar/blog"
  ) {
    const links = internalLinksFromBody(html);
    const articleLinks = links.filter(
      (l) => l.includes("/blog/") && l !== route,
    );
    if (articleLinks.length === 0)
      issues.push({
        severity: "error",
        rule: "blog-hub-no-articles",
        detail: "Blog hub has no crawlable article links",
      });
    else
      issues.push({
        severity: "info",
        rule: "blog-hub-articles",
        detail: `${articleLinks.length} article link(s)`,
      });

    if (!schemaTypes.includes("ItemList"))
      issues.push({
        severity: "warn",
        rule: "blog-hub-no-itemlist",
        detail: "Blog hub missing ItemList schema",
      });
  }

  // ── blog posts — must have Article schema ──
  if (/^\/blog\/(?:en|ar)\/[^/]+$/.test(route)) {
    if (!schemaTypes.includes("Article"))
      issues.push({
        severity: "warn",
        rule: "blog-post-no-article-schema",
        detail: "Blog post missing Article schema",
      });
    if (!/id="trust-signals-heading"/.test(html))
      issues.push({
        severity: "error",
        rule: "blog-trust-signals-missing",
        detail: "Article page is missing visible trust and transparency signals",
      });
  }

  // ── service pages — should have LegalService or Service schema ──
  if (/\/services\/[^/]+$/.test(route)) {
    const hasServiceSchema = schemaTypes.some((t) =>
      /legal|service|organization/i.test(t),
    );
    if (!hasServiceSchema)
      issues.push({
        severity: "warn",
        rule: "service-no-schema",
        detail: "Service page missing LegalService/Service schema",
      });
    if (!/id="trust-signals-heading"/.test(html))
      issues.push({
        severity: "error",
        rule: "service-trust-signals-missing",
        detail: "Service page is missing visible trust and transparency signals",
      });
    if (bodyLinks.filter((link) => /\/services\/[^/]+/.test(link)).length < 2)
      issues.push({
        severity: "error",
        rule: "service-contextual-links-weak",
        detail: "Service page needs at least two contextual links to related services",
      });
    if (!bodyLinks.some((link) => link === "/blog" || link.startsWith("/blog/")))
      issues.push({
        severity: "error",
        rule: "service-blog-link-missing",
        detail: "Service page has no contextual link to the legal blog",
      });
  }

  return {
    file: path.basename(filepath),
    route,
    isRedirect: false,
    title: t,
    description: desc,
    issues,
    schemaTypes,
    hreflangCount: hlCount,
    internalLinkCount: bodyLinks.length,
    hreflangs: hl,
    internalLinks: bodyLinks,
  };
}

// ── main ────────────────────────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(DIST)) {
    console.error("❌  dist/public not found — run `pnpm run build` first.");
    process.exit(1);
  }

  const files: string[] = [];
  const rootIndex = path.join(DIST, "index.html");
  if (fs.existsSync(rootIndex)) files.push(rootIndex);
  if (fs.existsSync(PAGES)) {
    for (const f of fs.readdirSync(PAGES).sort()) {
      if (f.endsWith(".html")) files.push(path.join(PAGES, f));
    }
  }

  const results: PageResult[] = files.map(validatePage);
  const pages = results.filter((r) => !r.isRedirect);
  const redirects = results.filter((r) => r.isRedirect);

  const routeSet = new Set(pages.map((page) => page.route));
  const normalizeInternalRoute = (href: string) => {
    const withoutOrigin = href.replace(/^https:\/\/counselo-legal\.com/, "");
    const clean = withoutOrigin.split(/[?#]/, 1)[0] || "/";
    return clean.length > 1 ? clean.replace(/\/$/, "") : clean;
  };
  const inboundSources = new Map<string, Set<string>>();
  for (const source of pages) {
    for (const href of source.internalLinks) {
      const target = normalizeInternalRoute(href);
      if (!inboundSources.has(target)) inboundSources.set(target, new Set());
      if (target !== source.route) inboundSources.get(target)?.add(source.route);
    }
  }

  for (const page of pages) {
    for (const [hrefLang, href] of Object.entries(page.hreflangs)) {
      if (hrefLang === "x-default" || !href.startsWith(BASE)) continue;
      const target = normalizeInternalRoute(href);
      if (!routeSet.has(target)) {
        page.issues.push({
          severity: "error",
          rule: "hreflang-target-missing",
          detail: `${hrefLang} points to a non-rendered route: ${target}`,
        });
      }
    }
    if (/^\/(?:sa|syr|uae)(?:\/ar)?\/services\/[^/]+\/[^/]+$/.test(page.route)) {
      const inboundCount = inboundSources.get(page.route)?.size ?? 0;
      if (inboundCount < 3) {
        page.issues.push({
          severity: "error",
          rule: "problem-contextual-inbound-links-weak",
          detail: `Problem page has ${inboundCount} contextual inbound page(s); minimum is 3`,
        });
      }
    }
  }

  // ── counts ──
  const errors = pages.flatMap((p) =>
    p.issues.filter((i) => i.severity === "error"),
  );
  const warns = pages.flatMap((p) =>
    p.issues.filter((i) => i.severity === "warn"),
  );
  const infos = pages.flatMap((p) =>
    p.issues.filter((i) => i.severity === "info"),
  );

  const errorPages = pages.filter((p) =>
    p.issues.some((i) => i.severity === "error"),
  );
  const warnPages = pages.filter(
    (p) =>
      p.issues.some((i) => i.severity === "warn") &&
      !p.issues.some((i) => i.severity === "error"),
  );
  const okPages = pages.filter(
    (p) =>
      !p.issues.some((i) => i.severity === "error" || i.severity === "warn"),
  );

  const score = Math.round(
    ((okPages.length + warnPages.length * 0.5) / pages.length) * 100,
  );

  // ── rule frequency ──
  const ruleCount: Record<string, { errors: number; warns: number }> = {};
  for (const p of pages) {
    for (const issue of p.issues) {
      if (!ruleCount[issue.rule])
        ruleCount[issue.rule] = { errors: 0, warns: 0 };
      if (issue.severity === "error") ruleCount[issue.rule].errors++;
      else if (issue.severity === "warn") ruleCount[issue.rule].warns++;
    }
  }

  // ── markdown report ──
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const lines: string[] = [];

  lines.push(`# CounselO SEO Validation Report`);
  lines.push(`\n_Generated: ${now}_\n`);
  lines.push(`## Summary\n`);
  lines.push(`| Metric | Value |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Pages validated | ${pages.length} |`);
  lines.push(`| Redirect pages  | ${redirects.length} |`);
  lines.push(`| ✅ Clean pages  | ${okPages.length} |`);
  lines.push(`| ⚠️  Warn-only pages | ${warnPages.length} |`);
  lines.push(`| ❌ Error pages  | ${errorPages.length} |`);
  lines.push(`| Total errors    | ${errors.length} |`);
  lines.push(`| Total warnings  | ${warns.length} |`);
  lines.push(`| SEO score       | **${score}/100** |`);
  lines.push(``);

  if (errors.length === 0) {
    lines.push(
      `> ✅ **No errors found.** All pages pass critical SEO checks.\n`,
    );
  }

  // ── rule summary ──
  const ruleRows = Object.entries(ruleCount)
    .filter(([, v]) => v.errors + v.warns > 0)
    .sort((a, b) => b[1].errors - a[1].errors || b[1].warns - a[1].warns);

  if (ruleRows.length > 0) {
    lines.push(`## Issues by Rule\n`);
    lines.push(`| Rule | Errors | Warnings |`);
    lines.push(`|------|--------|----------|`);
    for (const [rule, counts] of ruleRows) {
      lines.push(
        `| \`${rule}\` | ${counts.errors || "—"} | ${counts.warns || "—"} |`,
      );
    }
    lines.push(``);
  }

  // ── error pages detail ──
  if (errorPages.length > 0) {
    lines.push(`## ❌ Pages with Errors\n`);
    for (const p of errorPages.sort((a, b) => a.route.localeCompare(b.route))) {
      lines.push(`### \`${p.route}\``);
      if (p.title) lines.push(`_Title: ${p.title}_\n`);
      for (const issue of p.issues.filter((i) => i.severity === "error")) {
        lines.push(`- ❌ **${issue.rule}**: ${issue.detail}`);
      }
      for (const issue of p.issues.filter((i) => i.severity === "warn")) {
        lines.push(`- ⚠️  **${issue.rule}**: ${issue.detail}`);
      }
      lines.push(``);
    }
  }

  // ── warn pages detail ──
  if (warnPages.length > 0) {
    lines.push(`## ⚠️  Pages with Warnings Only\n`);
    for (const p of warnPages.sort((a, b) => a.route.localeCompare(b.route))) {
      lines.push(`### \`${p.route}\``);
      if (p.title) lines.push(`_Title: ${p.title}_\n`);
      for (const issue of p.issues.filter((i) => i.severity === "warn")) {
        lines.push(`- ⚠️  **${issue.rule}**: ${issue.detail}`);
      }
      lines.push(``);
    }
  }

  // ── clean pages ──
  if (okPages.length > 0) {
    lines.push(`## ✅ Clean Pages (${okPages.length})\n`);
    for (const p of okPages.sort((a, b) => a.route.localeCompare(b.route))) {
      lines.push(
        `- \`${p.route}\` — schemas: ${p.schemaTypes.join(", ") || "none"}`,
      );
    }
    lines.push(``);
  }

  // ── redirect inventory ──
  if (redirects.length > 0) {
    lines.push(`## 🔀 Redirect Pages (${redirects.length})\n`);
    for (const r of redirects) {
      lines.push(`- \`${r.route}\` → \`${r.redirectTo}\``);
    }
    lines.push(``);
  }

  const mdOut = "seo-validation-report.md";
  const jsonOut = "seo-validation-report.json";

  fs.writeFileSync(mdOut, lines.join("\n"), "utf-8");
  console.log(`📝  ${mdOut}`);

  fs.writeFileSync(
    jsonOut,
    JSON.stringify(
      {
        generatedAt: now,
        summary: {
          pages: pages.length,
          redirects: redirects.length,
          ok: okPages.length,
          warnOnly: warnPages.length,
          errors: errorPages.length,
          totalErrors: errors.length,
          totalWarnings: warns.length,
          score,
        },
        ruleFrequency: ruleCount,
        // Link graphs are used by the cross-page checks above but omitted from
        // the checked-in report to keep it reviewable and avoid duplicating
        // tens of thousands of href values already present in rendered HTML.
        pages: results.map(({ hreflangs: _hreflangs, internalLinks: _internalLinks, ...result }) => result),
      },
      null,
      2,
    ),
    "utf-8",
  );
  console.log(`📊  ${jsonOut}`);

  console.log(`\n${"─".repeat(50)}`);
  console.log(
    `Pages: ${pages.length}  |  ✅ ${okPages.length}  ⚠️  ${warnPages.length}  ❌ ${errorPages.length}`,
  );
  console.log(`Errors: ${errors.length}  Warnings: ${warns.length}`);
  console.log(`Score: ${score}/100`);

  if (errors.length > 0) process.exit(1);
}

main();
