import { useLang } from "@/i18n/LanguageContext";

export function HeroMap() {
  const { t } = useLang();
  const h = t.hero;
  return (
    <figure className="relative rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-7" aria-label={h.dossierLabel}>
      <span aria-hidden className="absolute -right-2 -top-2 h-16 w-16 rounded-xl bg-accent-warm/15" />
      <div className="relative flex items-center justify-between gap-3 border-b border-border pb-4">
        <p className="font-display text-base font-bold">{h.dossierTitle}</p>
        <span className="shrink-0 rounded-md border border-border px-2 py-1 text-[13px] font-medium text-muted-foreground">{h.dossierLabel}</span>
      </div>
      <ol className="relative mt-5 space-y-0">
        {h.stages.map((s, i) => (
          <li key={s.k} className="relative flex gap-4 pb-5 last:pb-0">
            {i < h.stages.length - 1 && <span aria-hidden className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-border" />}
            <span className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-bold ${i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-0.5">
              <p className="font-semibold leading-tight">{s.k}</p>
              <p className="text-[15px] text-muted-foreground">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-[15px] text-muted-foreground">
        <span aria-hidden className="h-2 w-2 rounded-full bg-accent-warm" /> {h.decision}
      </figcaption>
    </figure>
  );
}
