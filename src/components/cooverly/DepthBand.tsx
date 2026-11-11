import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Decorative depth band for full-bleed sections (the navy ones): a perspective
 * floor and two rings drifting at their own speed. Purely visual, never clickable.
 */
export function DepthBand() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yRing = useTransform(scrollYProgress, [0, 1], [-60, 90]);
  const yRing2 = useTransform(scrollYProgress, [0, 1], [40, -120]);
  const yFloor = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);

  if (reduce) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ perspective: 800 }}
    >
      <motion.div style={{ y: yRing, rotateX: tilt }} className="absolute -right-16 top-[12%] h-64 w-64">
        <div className="ring3d border-navy-foreground/15" />
      </motion.div>
      <motion.div style={{ y: yRing2 }} className="absolute -left-10 bottom-[8%] h-40 w-40">
        <div className="ring3d border-primary/25 [animation-duration:26s] [animation-direction:reverse]" />
        <div className="ring3d border-accent-warm/30 [animation-duration:34s] scale-[1.3]" />
      </motion.div>
      <motion.div style={{ y: yRing }} className="absolute -right-8 top-[74%] h-24 w-24">
        <div className="ring3d border-danger-brand/20 [animation-duration:30s]" />
      </motion.div>
      <motion.div style={{ y: yFloor }} className="grid3d-dark absolute inset-x-0 bottom-0 h-2/3" />
    </motion.div>
  );
}
