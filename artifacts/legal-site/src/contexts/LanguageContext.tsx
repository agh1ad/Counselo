// @refresh reset
import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { useLocation } from "wouter";
import { en } from "@/translations/en";
import { ar } from "@/translations/ar";
import { enSyr } from "@/translations/en-syr";
import { arSyr } from "@/translations/ar-syr";
import { useRegion } from "@/contexts/RegionContext";
import { LanguageContext } from "@/contexts/LanguageContextCore";

export type { Lang, Translations, LanguageContextType } from "@/contexts/LanguageContextCore";
export { useLanguage } from "@/contexts/LanguageContextCore";

/**
 * Language is derived entirely from the URL (via RegionContext) so that
 * SSR/prerendered HTML and client hydration always agree, and so Arabic has
 * a real, distinct, crawlable URL rather than being a client-only toggle.
 * See RegionContext.tsx for the /ar URL-segment detection logic.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { region, lang, regionPrefix } = useRegion();
  const [location, navigate] = useLocation();

  const toggleLang = () => {
    const next = lang === "en" ? "ar" : "en";
    const rest = location.slice(regionPrefix.length);
    const nextPrefix = `/${region}${next === "ar" ? "/ar" : ""}`;
    navigate(`${nextPrefix}${rest}`);
  };

  const isRTL = lang === "ar";

  const t = useMemo(() => {
    if (region === "syr") return lang === "en" ? enSyr : arSyr;
    return lang === "en" ? en : ar;
  }, [region, lang]);

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
