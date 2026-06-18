import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Lang, type Translation } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("cooverly-lang");
    if (stored === "en" || stored === "es" || stored === "it") {
      setLangState(stored);
      document.documentElement.lang = stored;
      return;
    }
    const nav = (navigator.language || "en").toLowerCase();
    const detected: Lang = nav.startsWith("es") ? "es" : nav.startsWith("it") ? "it" : "en";
    setLangState(detected);
    document.documentElement.lang = detected;
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cooverly-lang", l);
      document.documentElement.lang = l;
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}