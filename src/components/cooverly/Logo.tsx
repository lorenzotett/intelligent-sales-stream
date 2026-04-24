import logo from "@/assets/cooverly-logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}

export function Logo({ className, showWordmark = false, size = 36 }: LogoProps) {
  return (
    <div className={cn("group relative inline-flex items-center", className)}>
      {/* Ambient brand glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.65 0.22 28 / 0.35), transparent 60%), radial-gradient(circle at 70% 70%, oklch(0.78 0.13 240 / 0.4), transparent 65%)",
        }}
      />
      <img
        src={logo}
        alt="Cooverly logo"
        width={size}
        height={size}
        className="object-contain transition-transform duration-500 will-change-transform group-hover:scale-[1.06] group-hover:-rotate-1"
        style={{
          height: size,
          width: size,
          filter:
            "drop-shadow(0 8px 22px oklch(0.55 0.18 258 / 0.55)) drop-shadow(0 0 14px oklch(0.78 0.13 240 / 0.35))",
        }}
      />
      {showWordmark && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Cooverly
        </span>
      )}
    </div>
  );
}