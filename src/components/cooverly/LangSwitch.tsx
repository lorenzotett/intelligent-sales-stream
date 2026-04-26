import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-card/50 p-0.5 text-xs backdrop-blur",
        className,
      )}
    >
      {(["en", "es", "it"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={cn(
            "rounded-full px-2.5 py-1 font-medium uppercase tracking-wider transition",
            lang === l
              ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)]"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={lang === l}
          aria-label={l === "en" ? "English" : l === "es" ? "Español" : "Italiano"}
        >
          {l}
        </button>
      ))}
    </div>
  );
}