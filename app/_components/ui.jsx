"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";

// Motion tokens: arrive with expo-out, leave faster with expo-in.
export const EASE = [0.16, 1, 0.3, 1];
export const EASE_IN = [0.7, 0, 0.84, 0];

const GLYPHS = "!<>-_\\/[]{}=+*^?#░▒▓";

/** Decodes text from random glyphs. Replays on hover when `hover` is set. */
export function Scramble({ text, className, delay = 0, hover = false, as: Tag = "span" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);
  const timer = useRef();

  const run = () => {
    if (reduce) return;
    clearInterval(timer.current);
    let f = 0;
    const total = text.length * 2 + 6;
    timer.current = setInterval(() => {
      setOut(text.split("").map((c, i) =>
        c === " " || i < f / 2 - 3 ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      ).join(""));
      if (++f > total) { clearInterval(timer.current); setOut(text); }
    }, 28);
  };

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(run, delay * 1000);
    return () => { clearTimeout(t); clearInterval(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Tag ref={ref} className={className} aria-label={text} onMouseEnter={hover ? run : undefined}>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}

/** Headline words rise out of a mask. Keep to short headlines. */
export function SplitReveal({ text, className, delay = 0, stagger = 0.06, as: Tag = "span" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
          >
            {w}{i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Small fade-up on enter. y stays small so it reads as a fade, not a slide. */
export function Reveal({ children, delay = 0, y = 14, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Pulls toward the cursor, clamped so it never leaves its hit box. */
export function Magnetic({ children, strength = 0.3, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, willChange: "transform" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/** 3D tilt toward the cursor; also exposes --mx/--my (0–100%) for spotlights. */
export function Tilt({ children, max = 8, className }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  return (
    <div className={className} style={{ perspective: 900 }}>
      <motion.div
        className="h-full"
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          ry.set((px - 0.5) * max * 2);
          rx.set(-(py - 0.5) * max * 2);
          e.currentTarget.style.setProperty("--mx", `${px * 100}%`);
          e.currentTarget.style.setProperty("--my", `${py * 100}%`);
        }}
        onPointerLeave={() => { rx.set(0); ry.set(0); }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Live local time in the profile's timezone. */
export function Clock({ className }) {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: profile.tz, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className={className} suppressHydrationWarning>{t}</span>;
}
