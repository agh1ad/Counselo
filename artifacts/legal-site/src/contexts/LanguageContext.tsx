// @refresh reset
import { useState, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { en } from "@/translations/en";
import { ar } from "@/translations/ar";
import { enSyr } from "@/translations/en-syr";
import { arSyr } from "@/translations/ar-syr";
import { useRegion } from "@/contexts/RegionContext";
import { LanguageContext } from "@/contexts/LanguageContextCore";

export type { Lang, Translations, LanguageContextType } from "@/contexts/LanguageContextCore";
export { useLanguage } from "@/contexts/LanguageContextCore";

const STORAGE_KEY = "counselo-lang";

type Lang = "en" | "ar";

function getSavedLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "en") return saved;
  } catch {}
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getSavedLang);
  const { region } = useRegion();

  const toggleLang = () =>
    setLang(prev => {
      const next = prev === "en" ? "ar" : "en";
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
      return next;
    });

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
