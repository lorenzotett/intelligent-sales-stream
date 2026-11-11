import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Decorative floating 3D shapes behind the hero, with scroll parallax. */
export function DepthScene() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -160]);
  const y2 = useTransform(scrollY, [0, 800], [0, -60]);
  const y3 = useTransform(scrollY, [0, 800], [0, -260]);
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ perspective: 900 }}>
      <motion.div style={{ y: y1 }} className="absolute left-[6%] top-[12%]">
        <div className="cube3d" style={{ ["--s" as string]: "70px" }}>
          {Array.from({ length: 6 }).map((_, i) => <span key={i} />)}
        </div>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute right-[4%] top-[8%] h-72 w-72">
        <div className="ring3d border-primary/30" />
        <div className="ring3d border-accent-warm/40 [animation-duration:22s] [animation-direction:reverse]" />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-[6%] left-[42%]">
        <div className="cube3d [animation-duration:26s]" style={{ ["--s" as string]: "40px" }}>
          {Array.from({ length: 6 }).map((_, i) => <span key={i} />)}
        </div>
      </motion.div>
      <div className="grid3d absolute inset-x-0 bottom-0 h-1/2" />
    </div>
  );
}
