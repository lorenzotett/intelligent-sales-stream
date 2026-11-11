import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="progress-glow fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-[linear-gradient(90deg,var(--primary),var(--primary-hover))]"
    />
  );
}
