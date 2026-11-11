import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { copy, type Lang, type SiteCopy } from "./site";

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: SiteCopy }
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const stored = window.localStorage.getItem("cooverly-lang-v2");
    // English is the default; another language only if the visitor picked it.
    const l: Lang = stored === "es" || stored === "it" ? stored : "en";
    setLangState(l);
    document.documentElement.lang = l;
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem("cooverly-lang-v2", l); } catch { /* noop */ }
    document.documentElement.lang = l;
  };
  return <LanguageContext.Provider value={{ lang, setLang, t: copy[lang] }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
