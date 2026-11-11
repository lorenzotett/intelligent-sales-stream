import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

export function Tilt3D({ children, className, max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 160, damping: 18 });
  const shine = useTransform([x, y] as never, ([a, b]: number[]) =>
    `radial-gradient(420px circle at ${a * 100}% ${b * 100}%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%)`);
  if (reduce) return <div className={className}>{children}</div>;
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { x.set(0.5); y.set(0.5); };
  return (
    <div className={className} style={{ perspective: 1100 }} onPointerMove={move} onPointerLeave={leave}>
      <motion.div className="relative h-full" style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
        {children}
        <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-xl" style={{ background: shine }} />
      </motion.div>
    </div>
  );
}
