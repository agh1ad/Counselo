/** Public pages deliberately withdrawn. Keep them crawlable so crawlers see 410. */
export function isRetiredPublicPath(input: string): boolean {
  let path = input.split(/[?#]/, 1)[0];
  try { path = decodeURIComponent(path); } catch { /* Match the original invalid path. */ }
  path = path.replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/";
  return /^\/(?:(?:sa|syr|uae)\/)?(?:ar\/)?(?:vision|legal-updates)(?:\/|$)/i.test(path)
    || /^\/ar\/(?:sa|syr|uae)\/(?:vision|legal-updates)(?:\/|$)/i.test(path)
    || /^\/sitemap-legal-updates(?:-\d+)?\.xml$/i.test(path)
    || /^\/api\/legal-updates(?:-sitemap)?(?:\/|$)/i.test(path)
    // Old build artifacts must not bypass retirement through static hosting.
    || /^\/__pages\/(?:(?:sa|syr|uae)-)?(?:ar-)?(?:vision|legal-updates)(?:-|\.html$)/i.test(path);
}

export function retiredPageCopy(path: string) {
  const ar = /(?:^|\/)ar(?:\/|$)/.test(path.split(/[?#]/, 1)[0]) || /(?:^|-)ar-/.test(path);
  return {
    ar,
    title: ar ? "تمت إزالة الصفحة" : "This page has been removed",
    description: ar ? "لم تعد هذه الصفحة متاحة. يمكنك متابعة القراءة في مكتبتنا القانونية أو العودة إلى الرئيسية." : "This page is no longer available. Continue to our legal library or return to the homepage.",
    library: ar ? "المكتبة القانونية" : "Legal library",
    home: ar ? "الرئيسية" : "Homepage",
    libraryPath: ar ? "/ar/legal-library" : "/legal-library",
    homePath: ar ? "/ar" : "/",
  };
}

export const RETIRED_RESPONSE_HEADERS = {
  "X-Robots-Tag": "noindex, follow",
  "Cache-Control": "no-store",
  "Content-Type": "text/html; charset=utf-8",
} as const;

/** Independent of the database, SSR bundles and old prerendered files. */
export function retiredPageHtml(path: string): string {
  const c = retiredPageCopy(path);
  return `<!doctype html><html lang="${c.ar ? "ar" : "en"}" dir="${c.ar ? "rtl" : "ltr"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, follow"><title>${c.title} | CounselO Legal</title><style>body{margin:0;background:#f6f7f3;color:#173f30;font:17px/1.8 system-ui,sans-serif}main{max-width:680px;margin:12vh auto;padding:40px 28px;border-top:3px solid #c6a353}strong{letter-spacing:.04em}h1{font-size:clamp(28px,5vw,42px);line-height:1.25}p{color:#476157}nav{display:flex;flex-wrap:wrap;gap:16px;margin-top:32px}a{color:#173f30;font-weight:700;padding:10px 18px;border:1px solid #173f30;text-decoration:none}a:first-child{background:#173f30;color:white}a:focus-visible{outline:3px solid #b38b35;outline-offset:4px}</style></head><body><main><strong>CounselO Legal</strong><h1>${c.title}</h1><p>${c.description}</p><nav><a href="${c.libraryPath}">${c.library}</a><a href="${c.homePath}">${c.home}</a></nav></main></body></html>`;
}
