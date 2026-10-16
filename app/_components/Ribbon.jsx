"use client";
import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const WORDS = ["Web development", "Game development", "Pixel art", "Teaching", "Interaction", "Godot", "Next.js"];

/** Marquee whose speed follows scroll velocity and flips direction with it. */
function Track({ base, className, sep }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const dir = useRef(1);

  useAnimationFrame((_, dt) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) dir.current = -1; else if (f > 0) dir.current = 1;
    let next = x.get() - dir.current * base * (dt / 1000) * (1 + Math.abs(f));
    // Content is duplicated, so wrap at half its width (expressed in %).
    next = ((next % 50) - 50) % 50;
    x.set(next);
  });

  const items = [...WORDS, ...WORDS];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="inline-flex" style={{ x: useTransform(x, (v) => `${v}%`) }}>
        {[0, 1].map((k) => (
          <span key={k} className="inline-flex">
            {items.map((w, i) => (
              <span key={i} className="inline-flex items-center">
                <span className="px-6">{w}</span>
                <span className={sep}>✦</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Ribbon() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-label="Disciplines">
      <div className="-mx-10 -rotate-[4deg] bg-accent py-3 text-ink md:py-4">
        <Track base={3} className="text-[clamp(28px,4vw,56px)] font-medium tracking-[-0.03em]" sep="text-ink" />
      </div>
      <div className="-mx-10 -mt-6 rotate-[3deg] bg-ink py-2 text-paper md:py-3">
        <Track base={-2} className="font-mono text-[13px] uppercase tracking-[0.1em]" sep="text-accent" />
      </div>
    </section>
  );
}
