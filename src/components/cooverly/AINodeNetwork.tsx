import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Animated 3D-feeling AI node graph for the hero.
 * Pure SVG + framer-motion, no canvas dependency.
 */
export function AINodeNetwork() {
  const nodes = useMemo(
    () => [
      { x: 50, y: 50, r: 14, label: "Lead" },
      { x: 200, y: 90, r: 8 },
      { x: 340, y: 40, r: 10 },
      { x: 120, y: 200, r: 9 },
      { x: 260, y: 220, r: 12, label: "AI" },
      { x: 400, y: 180, r: 8 },
      { x: 90, y: 340, r: 10 },
      { x: 230, y: 360, r: 8 },
      { x: 380, y: 330, r: 14, label: "Booked" },
    ],
    [],
  );

  const edges = useMemo(
    () => [
      [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
      [3, 4], [4, 5], [3, 6], [4, 7], [5, 8],
      [6, 7], [7, 8], [4, 8], [1, 5], [3, 7],
    ],
    [],
  );

  return (
    <div
      className="relative h-[440px] w-full max-w-[460px]"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: [8, -6, 8], rotateY: [-12, 14, -12] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 460 420" className="h-full w-full">
          <defs>
            <linearGradient id="edge" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.55 0.18 258)" stopOpacity="0.15" />
              <stop offset="50%" stopColor="oklch(0.78 0.13 240)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="oklch(0.72 0.19 50)" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="nodeFill" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="oklch(0.99 0.005 250)" />
              <stop offset="55%" stopColor="oklch(0.78 0.13 240)" />
              <stop offset="100%" stopColor="oklch(0.18 0.09 260)" />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {edges.map(([a, b], i) => {
            const A = nodes[a], B = nodes[b];
            return (
              <g key={i}>
                <line
                  x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                  stroke="url(#edge)" strokeWidth="1.2" opacity="0.55"
                />
                <motion.circle
                  r="3"
                  fill="oklch(0.72 0.19 50)"
                  filter="url(#glow)"
                  initial={{ cx: A.x, cy: A.y, opacity: 0 }}
                  animate={{
                    cx: [A.x, B.x],
                    cy: [A.y, B.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: (i % 5) * 0.6,
                    ease: "easeInOut",
                  }}
                />
              </g>
            );
          })}

          {nodes.map((n, i) => (
            <g key={i} filter="url(#glow)">
              <motion.circle
                cx={n.x} cy={n.y} r={n.r}
                fill="url(#nodeFill)"
                stroke="oklch(0.85 0.08 250)"
                strokeWidth="0.8"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 3 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />
              {n.label && (
                <text
                  x={n.x + n.r + 6}
                  y={n.y + 3}
                  fill="oklch(0.95 0.02 250)"
                  fontSize="9"
                  fontFamily="ui-sans-serif"
                  letterSpacing="2"
                >
                  {n.label.toUpperCase()}
                </text>
              )}
            </g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}