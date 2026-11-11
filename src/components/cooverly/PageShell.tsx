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

export type Tone = "royal" | "sky" | "red" | "warm";

const LIGHT_TONES: Record<Tone, string> = {
  royal: "text-primary",
  sky: "text-sky-deep",
  red: "text-danger-brand",
  warm: "text-warm-deep",
};

const DARK_TONES: Record<Tone, string> = {
  royal: "text-navy-muted",
  sky: "text-sky",
  red: "text-danger-brand",
  warm: "text-accent-warm",
};

export function Eyebrow({
  children,
  inverted,
  tone = "royal",
}: {
  children: ReactNode;
  inverted?: boolean;
  tone?: Tone;
}) {
  const toneCls = inverted ? DARK_TONES[tone] : LIGHT_TONES[tone];
  return <p className={`text-[13px] font-semibold uppercase tracking-[0.18em] ${toneCls}`}>{children}</p>;
}
