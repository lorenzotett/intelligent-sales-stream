import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const glow = (color: string, strength: number) =>
  `radial-gradient(circle at center, color-mix(in oklab, ${color} ${strength}%, transparent), transparent 70%)`;

/**
 * Decorative 3D scene behind the hero: shapes and light at four different scroll
 * speeds, so the page reads as depth rather than as a flat background.
 * It fades out before the next section so text always sits on a calm surface.
 */
export function DepthScene() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 600, 1100], [1, 0.45, 0]);
  const yBack = useTransform(scrollY, [0, 900], [0, -160]);
  const yMid = useTransform(scrollY, [0, 900], [0, -280]);
  const yNear = useTransform(scrollY, [0, 900], [0, -430]);
  const yGrid = useTransform(scrollY, [0, 900], [0, -70]);
  const tilt = useTransform(scrollY, [0, 900], [0, 34]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ perspective: 900, opacity: fade }}
    >
      {/* light layers — slowest */}
      <motion.div
        style={{ y: yBack }}
        className="absolute -left-24 -top-16 h-[26rem] w-[26rem] rounded-full"
      >
        <div className="h-full w-full" style={{ background: glow("var(--primary)", 15) }} />
      </motion.div>
      <motion.div
        style={{ y: yBack }}
        className="absolute right-[8%] top-[38%] h-80 w-80 rounded-full"
      >
        <div className="h-full w-full" style={{ background: glow("var(--accent-warm)", 10) }} />
      </motion.div>
      <motion.div
        style={{ y: yBack }}
        className="absolute right-[26%] top-[2%] h-56 w-56 rounded-full"
      >
        <div className="h-full w-full" style={{ background: glow("var(--danger-brand)", 7) }} />
      </motion.div>

      {/* mid layer: rings */}
      <motion.div style={{ y: yMid, rotateX: tilt }} className="absolute -right-10 bottom-[1%] h-40 w-40 sm:right-[3%] sm:top-[6%] sm:bottom-auto sm:h-72 sm:w-72">
        <div className="ring3d border-primary/30" />
        <div className="ring3d border-accent-warm/40 [animation-duration:22s] [animation-direction:reverse]" />
        <div className="ring3d border-sky/45 [animation-duration:38s] scale-[1.25]" />
        <div className="ring3d border-danger-brand/35 [animation-duration:44s] scale-[1.45]" />
      </motion.div>

      {/* near layer: cubes */}
      <motion.div style={{ y: yNear }} className="absolute left-[2%] top-[2%] hidden sm:block">
        <div className="cube3d sky" style={{ ["--s" as string]: "70px" }}>
          {Array.from({ length: 6 }).map((_, i) => <span key={i} />)}
        </div>
      </motion.div>
      <motion.div style={{ y: yNear }} className="absolute bottom-[10%] left-[44%] hidden sm:block">
        <div className="cube3d warm [animation-duration:26s]" style={{ ["--s" as string]: "40px" }}>
          {Array.from({ length: 6 }).map((_, i) => <span key={i} />)}
        </div>
      </motion.div>
      <motion.div style={{ y: yMid }} className="absolute right-[6%] bottom-[6%] hidden sm:block">
        <div className="cube3d red [animation-duration:34s]" style={{ ["--s" as string]: "24px" }}>
          {Array.from({ length: 6 }).map((_, i) => <span key={i} />)}
        </div>
      </motion.div>

      {/* floor */}
      <motion.div style={{ y: yGrid }} className="grid3d absolute inset-x-0 bottom-0 h-1/2" />
    </motion.div>
  );
}
