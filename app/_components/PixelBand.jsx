"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const COLS = 32;
const ROWS = 4;
// Deterministic noise so server and client render the same thresholds.
const rand = (n) => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); };

/**
 * Pixel dissolve between a light and a dark section.
 * mode "in": sits above a dark section, pixels fill in as it approaches.
 * mode "out": sits below a dark section, pixels break away as you leave.
 * One CSS variable drives every cell, so it costs a single style write per frame.
 */
export function PixelBand({ mode = "in", className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mode === "in" ? ["start end", "end 55%"] : ["start 75%", "end 20%"],
  });
  const p = useTransform(scrollYProgress, (v) => (mode === "in" ? v : 1 - v));

  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Rows nearest the dark section switch on first.
      const nearDark = mode === "in" ? (ROWS - 1 - r) / ROWS : r / ROWS;
      const t = (nearDark * 0.65 + rand(r * COLS + c) * 0.35).toFixed(3);
      cells.push(
        <span
          key={`${r}-${c}`}
          className="bg-ink"
          style={{ opacity: `clamp(0, calc((var(--p) - ${t}) * 40), 1)` }}
        />
      );
    }
  }

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 grid ${className}`}
      style={{ "--p": p, gridTemplateColumns: `repeat(${COLS}, 1fr)`, aspectRatio: `${COLS} / ${ROWS}` }}
    >
      {cells}
    </motion.div>
  );
}
