import { motion, useScroll, useTransform } from "framer-motion";

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Deep gradient field */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.62 0.21 255 / 0.18) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.62 0.21 255 / 0.18) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full blur-3xl opacity-50"
      >
        <div className="h-full w-full rounded-full" style={{ background: "var(--gradient-primary)" }} />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-40"
      >
        <div className="h-full w-full rounded-full" style={{ background: "var(--gradient-accent)" }} />
      </motion.div>
      <motion.div
        style={{ y: y3, rotate: rot }}
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full blur-3xl opacity-30"
      >
        <div className="h-full w-full rounded-full bg-primary-glow" />
      </motion.div>

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}