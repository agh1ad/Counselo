/** Public display names; URL, account and entity identifiers stay stable. */
export const COUNSELO_BRAND = {
  en: "CounselO Legal",
  ar: "كاونسلو للاستشارات القانونية",
  taglineEn: "Online Legal Consultations",
  taglineAr: "استشارات قانونية عبر الإنترنت",
} as const;

/** Refresh editorial prose without rewriting links, email addresses or handles. */
export function currentBrandText(value: string, language?: "en" | "ar"): string {
  return value.split(/((?:https?:\/\/|mailto:)[^\s<>"']+|[\w.+-]+@[\w.-]+|@[\w]+)/g)
    .map((part, index) => index % 2 ? part : part
      .replace(/(?<![\w/.-])CounselO(?: Legal)?(?![\w/@-]|\.[a-z])/gi, language === "ar" ? COUNSELO_BRAND.ar : COUNSELO_BRAND.en)
      .replace(/كاونسلو(?! للاستشارات القانونية)/g, COUNSELO_BRAND.ar))
    .join("");
}

/** Only HTML text nodes change; quotations, code and original attributes stay intact. */
export function currentBrandHtml(value: string, language?: "en" | "ar"): string {
  const protectedTags: string[] = [];
  return value.split(/(<!--[\s\S]*?-->|<[^>]*>)/g).map(part => {
    if (part.startsWith("<")) {
      const tag = part.match(/^<\s*(\/?)\s*(script|style|blockquote|q|code|pre)\b/i);
      if (tag) {
        if (tag[1]) protectedTags.pop();
        else protectedTags.push(tag[2]);
      }
      return part;
    }
    return protectedTags.length ? part : currentBrandText(part, language);
  }).join("");
}

/** Whitelist public editorial fields. Slugs, evidence, testimonials and files are untouched. */
export function currentBrandRecord<T extends object>(record: T): T {
  const out = { ...record } as Record<string, unknown>;
  for (const key of Object.keys(out)) {
    if (/^(?:title|excerpt|summary|seoTitle|seoDescription|body|challenge|approach|outcome|author|primaryAuthorName|contentMethodology)(?:En|Ar)?$/.test(key) && typeof out[key] === "string") {
      out[key] = currentBrandHtml(out[key] as string, key.endsWith("Ar") ? "ar" : undefined);
    }
    if (/^content(?:En|Ar)$/.test(key) && Array.isArray(out[key])) {
      out[key] = (out[key] as Record<string, unknown>[]).map(section => ({
        ...section,
        ...(typeof section.heading === "string" ? { heading: currentBrandText(section.heading, key.endsWith("Ar") ? "ar" : undefined) } : {}),
        ...(typeof section.body === "string" ? { body: currentBrandHtml(section.body, key.endsWith("Ar") ? "ar" : undefined) } : {}),
      }));
    }
  }
  return out as T;
}
