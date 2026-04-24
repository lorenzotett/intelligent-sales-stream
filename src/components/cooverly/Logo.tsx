import logo from "@/assets/cooverly-logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}

export function Logo({ className, showWordmark = false, size = 36 }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img
        src={logo}
        alt="Cooverly logo"
        width={size}
        height={size}
        className="rounded-md object-contain"
        style={{ height: size, width: size, background: "white", padding: 2 }}
      />
      {showWordmark && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Cooverly
        </span>
      )}
    </div>
  );
}