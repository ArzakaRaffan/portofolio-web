"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const GLYPHS = ".:-=+*#%";
const HOLD_MS = 2600;
const OUT_MS = 900;   // old word erodes left → right
const IN_DELAY = 350; // new word starts condensing while the old one is still going
const IN_MS = 900;
const FLY_MS = 550;   // how long a particle travels before it lands
const PAD = 80;       // canvas bleed so vapour can drift outside the text box

const mask = (dir, f) =>
  dir === "out"
    ? `linear-gradient(90deg, transparent ${f - 6}%, #000 ${f + 6}%)`
    : `linear-gradient(90deg, #000 ${f - 6}%, transparent ${f + 6}%)`;

/** Glyph positions covering `text` when drawn with the given font into a w×h box. */
function sample(text, font, spacing, w, h, step) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const x = c.getContext("2d", { willReadFrequently: true });
  x.font = font;
  x.letterSpacing = spacing; // match DOM tracking so particles line up with the glyphs
  x.textBaseline = "middle";
  x.fillText(text, 0, h / 2);
  const d = x.getImageData(0, 0, w, h).data;
  const pts = [];
  for (let y = 0; y < h; y += step)
    for (let i = 0; i < w; i += step)
      if (d[(y * w + i) * 4 + 3] > 120) pts.push({ x: i, y, g: GLYPHS[(Math.random() * GLYPHS.length) | 0] });
  return pts;
}

/**
 * Cycles words: the current one evaporates into drifting ASCII glyphs from the
 * left while the next condenses out of a glyph cloud into crisp text.
 */
export function VapourText({ words, className }) {
  const [state, setState] = useState({ cur: 0, prev: null });
  const box = useRef(null);
  const prevEl = useRef(null);
  const curEl = useRef(null);
  const cv = useRef(null);
  const visible = useRef(true);

  // Pause cycling offscreen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  // Queue the next word while idle.
  useEffect(() => {
    if (state.prev !== null) return;
    const id = setTimeout(function tick() {
      if (!visible.current || document.hidden) return void setTimeout(tick, 500);
      setState((s) => ({ cur: (s.cur + 1) % words.length, prev: s.cur }));
    }, HOLD_MS);
    return () => clearTimeout(id);
  }, [state, words.length]);

  // Hide the incoming word before paint so it never flashes in fully.
  useLayoutEffect(() => {
    if (state.prev === null || !curEl.current) return;
    curEl.current.style.maskImage = curEl.current.style.webkitMaskImage = mask("in", -10);
  }, [state]);

  useEffect(() => {
    if (state.prev === null) return;
    const finish = () => setState((s) => ({ cur: s.cur, prev: null }));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return void finish();

    const c = cv.current, cx = c.getContext("2d");
    const b = box.current.getBoundingClientRect();
    const cs = getComputedStyle(curEl.current);
    const fs = parseFloat(cs.fontSize);
    const font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const w = Math.ceil(b.width), h = Math.ceil(b.height);
    const dpr = Math.min(devicePixelRatio || 1, 2);
    c.width = (w + PAD * 2) * dpr; c.height = (h + PAD * 2) * dpr;
    c.style.width = `${w + PAD * 2}px`; c.style.height = `${h + PAD * 2}px`;
    cx.setTransform(dpr, 0, 0, dpr, PAD * dpr, PAD * dpr);
    cx.textBaseline = "middle";
    cx.font = `${Math.max(8, fs * 0.32)}px ui-monospace, monospace`;
    cx.fillStyle = "#FF4D00";

    const step = Math.max(2, Math.round(fs / 11));
    const out = sample(words[state.prev], font, cs.letterSpacing, w, h, step).map((p) => ({
      ...p, vx: 30 + Math.random() * 90, vy: -(15 + Math.random() * 60), t0: (p.x / w) * OUT_MS,
    }));
    const inn = sample(words[state.cur], font, cs.letterSpacing, w, h, step).map((p) => ({
      ...p, ox: -30 - Math.random() * 90, oy: (Math.random() - 0.5) * 70, t1: IN_DELAY + (p.x / w) * IN_MS,
    }));

    const start = performance.now();
    let id;
    const frame = (now) => {
      const t = now - start;
      prevEl.current.style.maskImage = prevEl.current.style.webkitMaskImage = mask("out", -10 + (t / OUT_MS) * 120);
      curEl.current.style.maskImage = curEl.current.style.webkitMaskImage = mask("in", -10 + ((t - IN_DELAY) / IN_MS) * 120);
      cx.clearRect(-PAD, -PAD, w + PAD * 2, h + PAD * 2);
      for (const p of out) {
        const lt = (t - p.t0) / 700;
        if (lt < 0 || lt > 1) continue;
        cx.globalAlpha = 1 - lt;
        cx.fillText(p.g, p.x + p.vx * lt, p.y + p.vy * lt);
      }
      for (const p of inn) {
        const lt = (t - (p.t1 - FLY_MS)) / FLY_MS;
        if (lt < 0 || lt >= 1) continue;
        const e = 1 - Math.pow(1 - lt, 3);
        cx.globalAlpha = Math.min(1, lt * 2);
        cx.fillText(p.g, p.x + p.ox * (1 - e), p.y + p.oy * (1 - e));
      }
      cx.globalAlpha = 1;
      if (t < IN_DELAY + IN_MS + 200) id = requestAnimationFrame(frame);
      else {
        cx.clearRect(-PAD, -PAD, w + PAD * 2, h + PAD * 2);
        curEl.current.style.maskImage = curEl.current.style.webkitMaskImage = "";
        finish();
      }
    };
    id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [state, words]);

  return (
    <span ref={box} className={`relative inline-grid ${className ?? ""}`}>
      <span className="sr-only" aria-live="off">{words[state.cur]}</span>
      {state.prev !== null && (
        <span ref={prevEl} aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap">{words[state.prev]}</span>
      )}
      <span ref={curEl} aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap">{words[state.cur]}</span>
      <canvas ref={cv} aria-hidden="true" className="pointer-events-none absolute" style={{ left: -PAD, top: -PAD, width: 0, height: 0 }} />
    </span>
  );
}
