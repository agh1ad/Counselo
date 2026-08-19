// @refresh reset
import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { useLocation } from "wouter";
import { en } from "@/translations/en";
import { ar } from "@/translations/ar";
import { enSyr } from "@/translations/en-syr";
import { arSyr } from "@/translations/ar-syr";
import { enUae } from "@/translations/en-uae";
import { arUae } from "@/translations/ar-uae";
import { useRegion } from "@/contexts/RegionContext";
import { LanguageContext } from "@/contexts/LanguageContextCore";
import { qualifyProfessionalRoleCopy } from "@/lib/professional-role-scope";
import { qualifyEeatCopy } from "@/lib/eeat-scope";

export type { Lang, Translations, LanguageContextType } from "@/contexts/LanguageContextCore";
export { useLanguage } from "@/contexts/LanguageContextCore";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { region, lang, regionPrefix, setBlogLang } = useRegion();
  const [location, navigate] = useLocation();
  const toggleLang = () => {
    const next = lang === "en" ? "ar" : "en";
    const isBlogPath = location === "/blog" || location.startsWith("/blog/");
    const isWorkPath = location === "/our-work" || location.startsWith("/our-work/") || location === "/ar/our-work" || location.startsWith("/ar/our-work/");
    const isLibraryPath = location === "/legal-library" || location === "/ar/legal-library";
    if (isBlogPath) {
      if (location === "/blog") navigate("/blog/ar");
      else if (location === "/blog/ar") navigate("/blog");
      else if (location.startsWith("/blog/en/") || location.startsWith("/blog/ar/")) navigate(next === "ar" ? location.replace(/^\/blog\/en\//, "/blog/ar/") : location.replace(/^\/blog\/ar\//, "/blog/en/"));
      else setBlogLang(next);
    } else if (isLibraryPath) navigate(next === "ar" ? "/ar/legal-library" : "/legal-library");
    else if (isWorkPath) navigate(next === "ar" ? location.replace(/^\/our-work/, "/ar/our-work") : location.replace(/^\/ar\/our-work/, "/our-work"));
    else navigate(`/${region}${next === "ar" ? "/ar" : ""}${location.slice(regionPrefix.length)}`);
  };
  const isRTL = lang === "ar";
  const t = useMemo(() => {
    const source = region === "syr" ? (lang === "en" ? enSyr : arSyr) : region === "uae" ? (lang === "en" ? enUae : arUae) : (lang === "en" ? en : ar);
    return qualifyEeatCopy(qualifyProfessionalRoleCopy(source));
  }, [region, lang]);
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);
  return <LanguageContext.Provider value={{ lang, t, toggleLang, isRTL }}>{children}</LanguageContext.Provider>;
}
