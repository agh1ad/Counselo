// @refresh reset
import { use, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { useLocation } from "wouter";
import { useRegion } from "@/contexts/RegionContext";
import { LanguageContext } from "@/contexts/LanguageContextCore";
import { qualifyProfessionalRoleCopy } from "@/lib/professional-role-scope";
import { qualifyEeatCopy } from "@/lib/eeat-scope";

export type { Lang, Translations, LanguageContextType } from "@/contexts/LanguageContextCore";
export { useLanguage } from "@/contexts/LanguageContextCore";

type TranslationModule = typeof import("@/translations/en");
type TranslationValue = TranslationModule["en"];

const translationLoaders = {
  sa: {
    en: () => import("@/translations/en").then((module) => module.en),
    ar: () => import("@/translations/ar").then((module) => module.ar),
  },
  syr: {
    en: () => import("@/translations/en-syr").then((module) => module.enSyr),
    ar: () => import("@/translations/ar-syr").then((module) => module.arSyr),
  },
  uae: {
    en: () => import("@/translations/en-uae").then((module) => module.enUae),
    ar: () => import("@/translations/ar-uae").then((module) => module.arUae),
  },
} as const;
const translationPromises = new Map<string, Promise<TranslationValue>>();

function loadTranslation(region: keyof typeof translationLoaders, lang: "en" | "ar"): Promise<TranslationValue> {
  const key = `${region}:${lang}`;
  const existing = translationPromises.get(key);
  if (existing) return existing;
  const promise = translationLoaders[region][lang]() as Promise<TranslationValue>;
  translationPromises.set(key, promise);
  return promise;
}

/**
 * Language is derived entirely from the URL (via RegionContext) so that
 * SSR/prerendered HTML and client hydration always agree, and so Arabic has
 * a real, distinct, crawlable URL rather than being a client-only toggle.
 * See RegionContext.tsx for the /ar URL-segment detection logic.
 *
 * Every published blog post uses /blog/en/:slug and /blog/ar/:slug. Incomplete
 * or duplicate language records remain drafts and have no public article URL.
 * The shared Legal Library and Our Work sections have distinct crawlable language URLs.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { region, lang, regionPrefix, setBlogLang } = useRegion();
  const [location, navigate] = useLocation();

  const toggleLang = () => {
    const next = lang === "en" ? "ar" : "en";
    const isBlogPath = location === "/blog" || location.startsWith("/blog/");
    const isWorkPath =
      location === "/our-work" ||
      location.startsWith("/our-work/") ||
      location === "/ar/our-work" ||
      location.startsWith("/ar/our-work/");
    const isLibraryPath = location === "/legal-library" || location === "/ar/legal-library";
    if (isBlogPath) {
      if (location === "/blog") {
        navigate("/blog/ar");
      } else if (location === "/blog/ar") {
        navigate("/blog");
      } else if (location.startsWith("/blog/en/") || location.startsWith("/blog/ar/")) {
        navigate(next === "ar"
          ? location.replace(/^\/blog\/en\//, "/blog/ar/")
          : location.replace(/^\/blog\/ar\//, "/blog/en/"));
      } else {
        setBlogLang(next);
      }
    } else if (isLibraryPath) {
      navigate(next === "ar" ? "/ar/legal-library" : "/legal-library");
    } else if (isWorkPath) {
      navigate(
        next === "ar"
          ? location.replace(/^\/our-work/, "/ar/our-work")
          : location.replace(/^\/ar\/our-work/, "/our-work"),
      );
    } else {
      const rest = location.slice(regionPrefix.length);
      const nextPrefix = `/${region}${next === "ar" ? "/ar" : ""}`;
      navigate(`${nextPrefix}${rest}`);
    }
  };

  const isRTL = lang === "ar";

  const source = use(loadTranslation(region, lang));
  const t = useMemo(() => {
    return qualifyEeatCopy(qualifyProfessionalRoleCopy(source));
  }, [source]);

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}
