import { createContext, useContext } from "react";
import { en } from "@/translations/en";

export type Lang = "en" | "ar";
export type Translations = typeof en;

export interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
