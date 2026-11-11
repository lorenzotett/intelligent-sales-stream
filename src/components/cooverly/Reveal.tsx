import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked 3D reveal: content tilts in from below, settles flat while it is
 * readable, then tips away as it leaves. Opacity is a one-shot fade so text never
 * fades out while the visitor is reading it.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  depth = 1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** 0 = almost flat, 1 = full 3D swing. */
  depth?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [9 * depth, 0, 0, -5 * depth]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40 * depth, 0, -10 * depth, -22 * depth]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.99]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transformPerspective: 1100, transformStyle: "preserve-3d", rotateX, y, scale }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
