"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { EASE } from "./ui";

/**
 * Giant outlined wordmark. On fine pointers, letters near the cursor stretch
 * upward and an orange fill is revealed in a soft circle around the cursor.
 * Touch devices get solid text (see .wm-* in globals.css).
 */
export function Wordmark({ text }) {
  const host = useRef(null);
  const letters = useRef([]);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = host.current;
    const m = { x: -1e4, y: -1e4, in: false };
    const cur = letters.current.map(() => 1);
    let raf = 0;
    const tick = () => {
      let moving = false;
      const reach = innerWidth * 0.16;
      letters.current.forEach((l, i) => {
        if (!l) return;
        const r = l.getBoundingClientRect();
        const d = Math.abs(m.x - (r.left + r.width / 2));
        const target = m.in ? 1 + 0.5 * Math.max(0, 1 - d / reach) ** 2 : 1;
        cur[i] += (target - cur[i]) * 0.15;
        if (Math.abs(target - cur[i]) > 0.002) moving = true;
        l.style.transform = `scaleY(${cur[i].toFixed(3)})`;
        // Fill mask is positioned in each letter's own (unscaled) box.
        l.style.setProperty("--x", `${m.x - r.left}px`);
        l.style.setProperty("--y", `${(m.y - r.top) / cur[i]}px`);
      });
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e) => { m.x = e.clientX; m.y = e.clientY; m.in = true; kick(); };
    const leave = () => { m.in = false; m.x = m.y = -1e4; kick(); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const chars = [...text];
  return (
    <motion.div
      ref={host}
      aria-hidden="true"
      className="select-none whitespace-nowrap pt-[0.4em] text-center text-[14.5vw] font-medium leading-[0.8] tracking-[-0.065em]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      variants={{ show: { transition: { staggerChildren: 0.04 } } }}
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{ hidden: { y: "100%", rotate: 8 }, show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE } } }}
        >
          <span ref={(el) => (letters.current[i] = el)} className="relative inline-block origin-bottom will-change-transform">
            <span className={i === chars.length - 1 ? "text-accent" : "wm-outline"}>{c === " " ? " " : c}</span>
            {i < chars.length - 1 && c !== " " && <span className="wm-fill absolute inset-0">{c}</span>}
          </span>
        </motion.span>
      ))}
    </motion.div>
  );
}
