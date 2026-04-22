import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_LANG, type Lang, tr } from "./translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  discreet: boolean;
  toggleDiscreet: () => void;
};

const LanguageContext = createContext<Ctx | null>(null);

const LS_LANG = "gz_lang";
const LS_DISCREET = "gz_discreet";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const [discreet, setDiscreet] = useState(false);

  useEffect(() => {
    try {
      const saved = (localStorage.getItem(LS_LANG) as Lang | null) ?? DEFAULT_LANG;
      setLangState(saved);
      const d = localStorage.getItem(LS_DISCREET) === "1";
      setDiscreet(d);
      if (d) document.documentElement.classList.add("discreet");
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(LS_LANG, l); } catch {}
  };

  const toggleDiscreet = () => {
    setDiscreet((prev) => {
      const next = !prev;
      try { localStorage.setItem(LS_DISCREET, next ? "1" : "0"); } catch {}
      document.documentElement.classList.toggle("discreet", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: (k) => tr(k, lang), discreet, toggleDiscreet }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
