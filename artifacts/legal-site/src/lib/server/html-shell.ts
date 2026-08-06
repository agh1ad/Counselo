import { escapeXml } from "./hreflang.js";

export function buildSpaShell(
  templateHtml: string,
  title: string,
  robots = "noindex, nofollow",
): string {
  const headContent = `<title>${escapeXml(title)}</title><meta name="robots" content="${robots}">`;
  if (!templateHtml) {
    return `<!doctype html><html><head>${headContent}</head><body><div id="root"></div></body></html>`;
  }
  return templateHtml.replace("<!--app-head-->", headContent);
}

export function buildNotFoundHtml(
  templateHtml?: string,
  language: "en" | "ar" = "en",
): string {
  const isArabic = language === "ar";
  const title = isArabic ? "صفحة غير موجودة | كاونسلو" : "Page Not Found | CounselO";
  if (templateHtml) {
    return buildSpaShell(templateHtml, title, "noindex, nofollow");
  }
  return `<!doctype html><html lang="${language}" dir="${isArabic ? "rtl" : "ltr"}"><head><title>${escapeXml(title)}</title><meta name="robots" content="noindex, nofollow"></head><body><h1>${escapeXml(title)}</h1></body></html>`;
}
