import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Cinematic brand film: starts as a small rounded window and opens to full-bleed
 * as you scroll, while the footage drifts and zooms for depth. Plays only on screen.
 */
export function ScrollVideo({ src, dark = false, kicker, title }: { src: string; dark?: boolean; kicker?: string; title?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const inset = useTransform(scrollYProgress, [0.1, 0.45], reduce ? [0, 0] : [14, 0]);
  const radius = useTransform(scrollYProgress, [0.1, 0.45], reduce ? [0, 0] : [32, 0]);
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}% round ${radius}px)`;
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  const shade = useTransform(scrollYProgress, [0.6, 1], [0, 0.5]);
  const textY = useTransform(scrollYProgress, [0.2, 0.55], reduce ? [0, 0] : [60, 0]);
  const textO = useTransform(scrollYProgress, [0.25, 0.5, 0.85], [0, 1, 0.6]);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.15 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative h-[70vh] min-h-[380px] sm:h-[95vh] ${dark ? "bg-navy" : "bg-background"}`}>
      <motion.div style={{ clipPath }} className="sticky top-0 h-full overflow-hidden">
        <motion.video
          ref={vid} src={src} aria-hidden muted loop playsInline preload="metadata"
          style={{ scale, y }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-navy" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
        {title && (
          <motion.div style={{ y: textY, opacity: textO }} className="container-site absolute inset-x-0 bottom-0 pb-12 sm:pb-20">
            {kicker && <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-warm">{kicker}</p>}
            <p className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-[1.08] text-navy-foreground sm:text-5xl lg:text-6xl">{title}</p>
          </motion.div>
        )}
        <span aria-hidden className="rule-tri absolute inset-x-0 bottom-0" />
      </motion.div>
    </div>
  );
}
