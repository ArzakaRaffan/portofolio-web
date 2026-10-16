"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, EASE_IN } from "./ui";
import { lenis } from "./Providers";
import { Logo } from "./Logo";

const LINES = ["Booting", "Compiling shaders", "Placing pixels", "Spawning player", "Ready"];
const DURATION = 1900;
const BURST_LINES = 260;
const BURST_MS = 1100;

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

/**
 * Hairline filaments burst out of the logo, then retract to their tips and fade.
 * Plays once at 100%; calls onDone when finished so the wipe can start.
 */
function LogoBurst({ onDone }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const cx = cv.getContext("2d");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = innerWidth, h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const maxR = Math.hypot(w, h) * 0.55;
    const lines = Array.from({ length: BURST_LINES }, (_, i) => ({
      a: (i / BURST_LINES) * Math.PI * 2 + (Math.random() - 0.5) * 0.05,
      reach: maxR * (0.3 + Math.pow(Math.random(), 0.7) * 0.7),
      hot: Math.random() < 0.12,
      dot: Math.random() < 0.3,
    }));
    const start = performance.now();
    let id;
    const frame = (now) => {
      const t = Math.min(1, (now - start) / BURST_MS);
      const e = 1 - Math.pow(2, -10 * t); // expo-out: fast launch, long glide
      const tail = t * t;                  // tails catch up late, so lines retract to tips
      cx.clearRect(0, 0, w, h);
      cx.globalAlpha = 1 - Math.pow(t, 3);
      cx.lineWidth = 1;
      for (const l of lines) {
        const head = l.reach * e, from = head * tail;
        const c = Math.cos(l.a), s = Math.sin(l.a);
        cx.strokeStyle = l.hot ? "#FF4D00" : "rgba(242,241,236,0.75)";
        cx.beginPath();
        cx.moveTo(w / 2 + c * from, h / 2 + s * from);
        cx.lineTo(w / 2 + c * head, h / 2 + s * head);
        cx.stroke();
        if (l.dot) {
          cx.fillStyle = cx.strokeStyle;
          cx.fillRect(w / 2 + c * head * 1.12 - 1, h / 2 + s * head * 1.12 - 1, 2, 2);
        }
      }
      if (t < 1) id = requestAnimationFrame(frame);
      else onDone();
    };
    id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [onDone]);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />;
}

export function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);
  const [burst, setBurst] = useState(false);
  const finish = useCallback(() => setShow(false), []);

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
        if (quick) setShow(false);
        else setBurst(true);
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
          {burst && <LogoBurst onDone={finish} />}
          <div className="frame flex h-full flex-col justify-between py-6 md:py-10">
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-paper/60">
              <span>// Arzaka Raffan — Portfolio</span>
              <span>v2.0</span>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={burst ? { scale: [1, 0.82, 1.35], opacity: [1, 1, 0] } : undefined}
                transition={{ duration: 0.7, times: [0, 0.25, 1], ease: EASE }}
              >
                <Logo draw delay={0.1} className="h-20 w-20 md:h-28 md:w-28" />
              </motion.div>
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
