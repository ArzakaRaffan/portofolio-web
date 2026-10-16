"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, EASE_IN } from "./ui";
import { lenis } from "./Providers";

const LINES = ["Booting", "Compiling shaders", "Placing pixels", "Spawning player", "Ready"];
const DURATION = 1900;

let done = false;
/** True once the intro has cleared; the hero waits on this. */
export function useIntroDone() {
  const [d, setD] = useState(done);
  useEffect(() => {
    if (done) return setD(true);
    const on = () => setD(true);
    addEventListener("intro:done", on);
    return () => removeEventListener("intro:done", on);
  }, []);
  return d;
}

export function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);

  useEffect(() => {
    const quick = sessionStorage.getItem("intro") || matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = quick ? 250 : DURATION;
    // The intro always lands on the hero, so don't restore a stale scroll position.
    history.scrollRestoration = "manual";
    if (!location.hash) scrollTo(0, 0);
    lenis.current?.stop();
    const start = performance.now();
    let id;
    const step = (t) => {
      const p = Math.min(1, (t - start) / total);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) id = requestAnimationFrame(step);
      else {
        sessionStorage.setItem("intro", "1");
        setShow(false);
      }
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  const line = LINES[Math.min(LINES.length - 1, Math.floor((n / 100) * LINES.length))];

  return (
    <AnimatePresence
      onExitComplete={() => {
        done = true;
        lenis.current?.start();
        dispatchEvent(new Event("intro:done"));
      }}
    >
      {show && (
        <motion.div
          key="pre"
          className="fixed inset-0 z-[100] bg-ink text-paper"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.8, ease: EASE_IN } }}
          aria-hidden="true"
        >
          <div className="frame flex h-full flex-col justify-between py-6 md:py-10">
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-paper/60">
              <span>// Arzaka Raffan — Portfolio</span>
              <span>v2.0</span>
            </div>
            <div className="flex items-end justify-between gap-6">
              <motion.div
                key={line}
                className="font-mono text-sm uppercase tracking-[0.08em]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <span className="text-accent">▸</span> {line}{n < 100 ? "…" : ""}
              </motion.div>
              <div className="font-sans text-[22vw] font-medium leading-[0.8] tracking-[-0.06em] tabular-nums md:text-[14vw]">
                {String(n).padStart(3, "0")}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-[2px] bg-accent" style={{ width: `${n}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
