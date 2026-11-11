import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const LABELS = { en: "English", it: "Italiano", es: "Español" } as const;

export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className={cn("inline-flex rounded-lg border border-border bg-card p-0.5 text-xs", className)}>
      {(["en", "it", "es"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          aria-label={LABELS[l]}
          className={cn(
            "min-h-9 min-w-9 rounded-md px-2 font-semibold uppercase tracking-wider transition-colors duration-200",
            lang === l ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
