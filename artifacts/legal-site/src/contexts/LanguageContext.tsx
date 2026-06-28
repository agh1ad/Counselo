import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { en } from "@/translations/en";
import { ar } from "@/translations/ar";

export type Lang = "en" | "ar";
export type Translations = typeof en;

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  isRTL: boolean;
}

const STORAGE_KEY = "qanoni-lang";

function getSavedLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "en") return saved;
  } catch {}
  return "en";
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getSavedLang);

  const toggleLang = () =>
    setLang(prev => {
      const next = prev === "en" ? "ar" : "en";
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
      return next;
    });

  const isRTL = lang === "ar";
  const t = lang === "en" ? en : ar;

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

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
