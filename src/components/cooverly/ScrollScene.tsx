import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

type Piece = { c: string; w: number; h: number; to: [number, number]; from: [number, number, number] };

const C = { royal: "var(--primary)", navy: "var(--navy)", sky: "var(--sky)", warm: "var(--accent-warm)", red: "var(--danger-brand)" };

/** Pieces scatter in space and lock into a shape as you scroll — no framed pictures. */
const SCENES: Record<"build" | "rise" | "together", Piece[]> = {
  build: [
    { c: C.navy, w: 220, h: 60, to: [0, 120], from: [-520, 260, -40] },
    { c: C.royal, w: 100, h: 60, to: [-60, 60], from: [-380, -220, 60] },
    { c: C.sky, w: 100, h: 60, to: [60, 60], from: [420, -160, -70] },
    { c: C.warm, w: 100, h: 60, to: [0, 0], from: [520, 240, 90] },
    { c: C.red, w: 60, h: 60, to: [0, -60], from: [-120, -360, 180] },
  ],
  rise: [
    { c: C.royal, w: 90, h: 30, to: [-200, 120], from: [-560, 300, -30] },
    { c: C.sky, w: 90, h: 30, to: [-100, 70], from: [-300, -300, 40] },
    { c: C.navy, w: 90, h: 30, to: [0, 20], from: [0, 360, -60] },
    { c: C.warm, w: 90, h: 30, to: [100, -30], from: [340, -320, 70] },
    { c: C.red, w: 90, h: 30, to: [200, -80], from: [560, 220, -90] },
  ],
  together: [
    { c: C.royal, w: 130, h: 130, to: [-70, 0], from: [-600, 0, -20] },
    { c: C.warm, w: 130, h: 130, to: [70, 0], from: [600, 0, 20] },
    { c: C.sky, w: 70, h: 70, to: [0, -110], from: [0, -400, 120] },
    { c: C.red, w: 40, h: 40, to: [0, 110], from: [0, 380, -120] },
  ],
};

function Block({ p, prog }: { p: Piece; prog: MotionValue<number> }) {
  const x = useTransform(prog, [0, 1], [p.from[0], p.to[0]]);
  const y = useTransform(prog, [0, 1], [p.from[1], p.to[1]]);
  const rotate = useTransform(prog, [0, 1], [p.from[2], 0]);
  return (
    <motion.div className="absolute left-1/2 top-1/2" style={{ x, y, rotate, marginLeft: -p.w / 2, marginTop: -p.h / 2 }}>
      <div className="block3d" style={{ ["--w" as string]: `${p.w}px`, ["--h" as string]: `${p.h}px`, ["--d" as string]: "28px", ["--c" as string]: p.c }}>
        <span /><span /><span />
      </div>
    </motion.div>
  );
}

export function ScrollScene({ scene, dark = false }: { scene: keyof typeof SCENES; dark?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const prog = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);
  const rotY = useTransform(scrollYProgress, [0, 1], reduce ? [-28, -28] : [-60, -28]);
  const glow = useTransform(scrollYProgress, [0.4, 1], [0, 0.55]);
  return (
    <div ref={ref} aria-hidden className={`relative h-[360px] overflow-hidden sm:h-[460px] ${dark ? "bg-navy" : ""}`} style={{ perspective: 1100 }}>
      <motion.div style={{ opacity: glow }} className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--sky),transparent_70%)] blur-2xl" />
      <motion.div className="absolute inset-0 origin-center scale-[0.6] sm:scale-100" style={{ rotateX: 22, rotateY: rotY, transformStyle: "preserve-3d" }}>
        {SCENES[scene].map((p, i) => <Block key={i} p={p} prog={prog} />)}
      </motion.div>
    </div>
  );
}
