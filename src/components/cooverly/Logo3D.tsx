import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/cooverly-logo.png";

/**
 * Floating 3D logo showcase with mouse-tracking tilt and ambient orbit rings.
 */
export function Logo3D() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), { stiffness: 120, damping: 14 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() { mx.set(0); my.set(0); }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[360px] md:max-w-[460px]"
      style={{ perspective: "1400px" }}
    >
      {/* Orbit rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: i === 0
              ? "oklch(0.65 0.22 28 / 0.5)"
              : i === 1
              ? "oklch(0.72 0.19 50 / 0.4)"
              : "oklch(0.78 0.13 240 / 0.5)",
            transform: `scale(${0.7 + i * 0.13})`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 22 + i * 6, repeat: Infinity, ease: "linear" }}
        >
          {/* Orbit dots */}
          <span
            className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
            style={{
              background:
                i === 0 ? "oklch(0.65 0.22 28)"
                : i === 1 ? "oklch(0.72 0.19 50)"
                : "oklch(0.78 0.13 240)",
              boxShadow: "0 0 18px currentColor",
              color: i === 0 ? "oklch(0.65 0.22 28)"
                : i === 1 ? "oklch(0.72 0.19 50)"
                : "oklch(0.78 0.13 240)",
            }}
          />
        </motion.div>
      ))}

      {/* Glow halo */}
      <div
        className="absolute inset-12 rounded-full blur-3xl opacity-60"
        style={{ background: "var(--gradient-brand)" }}
      />

      {/* Logo card */}
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="absolute inset-16 grid place-items-center"
      >
        <motion.div
          animate={{ y: [-10, 10, -10], rotateZ: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative grid h-full w-full place-items-center p-8"
          style={{ transform: "translateZ(60px)" }}
        >
          <img
            src={logo}
            alt="Cooverly"
            className="h-full w-full object-contain"
            style={{
              filter:
                "drop-shadow(0 30px 70px oklch(0.55 0.18 258 / 0.75)) drop-shadow(0 0 32px oklch(0.78 0.13 240 / 0.55)) drop-shadow(0 0 18px oklch(0.65 0.22 28 / 0.35))",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}