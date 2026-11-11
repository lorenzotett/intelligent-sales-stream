import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ScrollProgress } from "./ScrollProgress";
import { useLang } from "@/i18n/LanguageContext";

export function PageShell({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2">Skip to content</a>
      <ScrollProgress />
      <SiteHeader />
      <main id="main" key={lang} className="page-enter flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Eyebrow({ children, inverted }: { children: ReactNode; inverted?: boolean }) {
  return <p className={`text-[13px] font-semibold uppercase tracking-[0.18em] ${inverted ? "text-navy-muted" : "text-primary"}`}>{children}</p>;
}
