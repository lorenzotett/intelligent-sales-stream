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
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function reset() {
    mx.set(0); my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={cn(
        "group relative rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl transition-shadow",
        glow === "primary" ? "hover:shadow-[var(--shadow-glow)]" : "hover:shadow-[var(--shadow-accent)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            glow === "primary"
              ? "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), oklch(0.62 0.21 255 / 0.15), transparent 60%)"
              : "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), oklch(0.68 0.22 38 / 0.18), transparent 60%)",
        }}
      />
      <div style={{ transform: "translateZ(40px)" }}>{children}</div>
    </motion.div>
  );
}