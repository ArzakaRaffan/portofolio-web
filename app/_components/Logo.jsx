"use client";
import { motion } from "framer-motion";
import { EASE } from "./ui";

/**
 * Caret-prompt mark: "^" + "_" reads as an A with a terminal cursor.
 * Ink follows currentColor; the cursor is always accent and blinks.
 * `draw` strokes the caret in on mount. `mono` makes the cursor currentColor too,
 * for places behind mix-blend-difference where orange would invert to blue.
 */
export function Logo({ className, draw = false, delay = 0, mono = false }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <motion.path
        d="M14 72 L42 20 L70 72"
        fill="none"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="square"
        initial={draw ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      />
      <motion.rect
        className="caret-blink"
        x="62" y="78" width="26" height="10"
        fill={mono ? "currentColor" : "#FF4D00"}
        initial={draw ? { scaleX: 0 } : false}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: delay + 0.7 }}
      />
    </svg>
  );
}
