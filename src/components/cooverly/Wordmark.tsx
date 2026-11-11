import { cn } from "@/lib/utils";

export function Wordmark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-baseline gap-2 font-display", className)}>
      <span className={cn("text-xl font-extrabold tracking-tight", inverted ? "text-navy-foreground" : "text-foreground")}>
        Cooverly
      </span>
      <span aria-hidden className="h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-primary" />
    </span>
  );
}
