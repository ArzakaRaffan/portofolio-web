"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AsciiField } from "./AsciiField";
import { VapourText } from "./VapourText";
import { useIntroDone } from "./Preloader";
import { Clock, EASE, Magnetic, Scramble } from "./ui";
import { profile } from "@/lib/data";

const [FIRST, LAST] = profile.short.split(" ");
const ROLES = ["Web developer", "Game developer", "Teaching assistant", "Jam champion"];

function Chars({ text, ready, delay, letters }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%", rotate: 6 }}
          animate={ready ? { y: "0%", rotate: 0 } : undefined}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.035 }}
        >
          <span ref={(el) => el && letters.current.add(el)} className="inline-block" style={{ fontWeight: 500 }}>
            {c}
          </span>
        </motion.span>
      ))}
    </span>
  );
}

/** Letters thin out near the cursor (Geist is a variable font, 100–900). */
function useWeightLens(scope, letters) {
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = scope.current;
    const m = { x: -1e4, y: -1e4 };
    const cur = new Map();
    let raf = 0;
    const tick = () => {
      let moving = false;
      for (const el of letters.current) {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - m.x, r.top + r.height / 2 - m.y);
        const target = 500 - 380 * Math.max(0, 1 - d / 320);
        const w = cur.get(el) ?? 500;
        const next = w + (target - w) * 0.14;
        if (Math.abs(next - w) > 0.5) moving = true;
        cur.set(el, next);
        el.style.fontWeight = Math.round(next);
      }
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e) => { m.x = e.clientX; m.y = e.clientY; kick(); };
    const leave = () => { m.x = m.y = -1e4; kick(); };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [scope, letters]);
}

export function Hero() {
  const ready = useIntroDone();
  const ref = useRef(null);
  const letters = useRef(new Set());
  useWeightLens(ref, letters);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const fade = (d) => ({
    initial: { opacity: 0, y: 10 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, ease: EASE, delay: d },
  });

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden">
      <motion.div className="absolute inset-0" style={{ opacity: fieldOpacity, scale: fieldScale }}>
        <AsciiField className="h-full w-full" />
      </motion.div>

      <div className="frame pointer-events-none relative flex flex-1 flex-col pb-6 pt-24 md:pb-8 md:pt-28">
        <motion.div {...fade(0.1)} className="grid grid-cols-2 gap-4 border-t border-line pt-3 md:grid-cols-4">
          <span className="label">// {profile.role}</span>
          <span className="label hidden md:block">{profile.name}</span>
          <span className="label hidden md:block">Selected work 2024—26</span>
          <span className="label text-right">Index ’26</span>
        </motion.div>

        <motion.h1
          style={{ y: nameY }}
          className="mt-auto font-sans text-[clamp(64px,14vw,232px)] leading-[0.84] tracking-[-0.055em]"
          aria-label={profile.name}
        >
          <Chars text={FIRST} ready={ready} delay={0.05} letters={letters} />
          <span className="flex items-end gap-[0.12em]">
            <Chars text={LAST} ready={ready} delay={0.25} letters={letters} />
            <motion.span
              className="mb-[0.12em] inline-block h-[0.13em] w-[0.13em] rounded-full bg-accent"
              initial={{ scale: 0 }}
              animate={ready ? { scale: 1 } : undefined}
              transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.75 }}
              aria-hidden="true"
            />
          </span>
        </motion.h1>

        <div className="mt-8 grid grid-cols-1 items-end gap-6 border-t border-line pt-4 md:mt-10 md:grid-cols-[1fr_auto_1fr]">
          <motion.div {...fade(0.55)} className="flex flex-col gap-3">
            <span className="flex items-baseline gap-3 text-[clamp(24px,2.6vw,40px)] font-medium leading-none tracking-[-0.03em]">
              <span className="font-mono text-[0.5em] text-accent" aria-hidden="true">▸</span>
              <VapourText words={ROLES} />
            </span>
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-ink-2 md:text-base">
              Building fast, considered interfaces and small worlds you can play in.
            </p>
          </motion.div>
          <motion.div {...fade(0.65)} className="pointer-events-auto hidden md:block">
            <Magnetic strength={0.4}>
              <a href="#work" className="group grid h-24 w-24 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 ease-out hover:scale-105">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em]">
                  See work
                  <span className="mt-1 block text-center text-accent transition-transform duration-300 ease-out group-hover:translate-y-1">↓</span>
                </span>
              </a>
            </Magnetic>
          </motion.div>
          <motion.div {...fade(0.75)} className="flex justify-between gap-4 md:flex-col md:items-end">
            <span className="label">{profile.city} · <Clock /> WIB</span>
            <span className="label hidden text-ink-3 md:block">
              <Scramble text="Move over the name. Click the field." delay={1.4} />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
