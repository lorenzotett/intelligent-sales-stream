import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Full-width illustration that tilts flat, zooms and drifts as it passes through the viewport. */
export function ScrollImage({ src, alt, dark = false }: { src: string; alt: string; dark?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.86, 1, 1.04]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.3, 1]);
  return (
    <div ref={ref} className={`${dark ? "bg-navy" : ""} py-10 sm:py-14`} style={{ perspective: 1200 }}>
      <motion.figure
        style={reduce ? undefined : { rotateX, scale, opacity }}
        className="container-site relative"
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-soft)] sm:aspect-[21/9]">
          <motion.img
            src={src} alt={alt} loading="lazy" width={1600} height={912}
            style={reduce ? undefined : { y: imgY }}
            className="absolute inset-0 h-[116%] w-full -top-[8%] object-cover"
          />
          <span aria-hidden className="rule-tri absolute inset-x-0 top-0" />
        </div>
      </motion.figure>
    </div>
  );
}
