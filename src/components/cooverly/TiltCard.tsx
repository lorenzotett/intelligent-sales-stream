import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glow?: "primary" | "accent";
}

export function TiltCard({ children, className, glow = "primary" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 20 });
  const shineX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
    ref.current?.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    ref.current?.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  }
  function reset() {
    mx.set(0); my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1200 }}
      className={cn(
        "group relative rounded-2xl border border-border/80 bg-card/70 p-6 backdrop-blur-xl transition-all duration-500 will-change-transform",
        "hover:border-primary/40 hover:-translate-y-1",
        glow === "primary" ? "hover:shadow-[var(--shadow-glow)]" : "hover:shadow-[var(--shadow-accent)]",
        className,
      )}
    >
      {/* Glossy edge highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-60"
        style={{
          background:
            "linear-gradient(135deg, oklch(1 0 0 / 0.06) 0%, transparent 40%, transparent 60%, oklch(1 0 0 / 0.03) 100%)",
        }}
      />
      {/* Cursor-tracked shine */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay"
        style={{
          background: useTransform(
            [shineX, shineY] as never,
            ([x, y]: string[]) =>
              `radial-gradient(220px circle at ${x} ${y}, oklch(1 0 0 / 0.18), transparent 65%)`,
          ),
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            glow === "primary"
              ? "radial-gradient(450px circle at var(--mx,50%) var(--my,50%), oklch(0.62 0.21 255 / 0.22), transparent 60%)"
              : "radial-gradient(450px circle at var(--mx,50%) var(--my,50%), oklch(0.68 0.22 38 / 0.25), transparent 60%)",
        }}
      />
      <div style={{ transform: "translateZ(50px)" }} className="relative">{children}</div>
    </motion.div>
  );
}