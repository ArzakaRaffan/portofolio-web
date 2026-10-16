"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./ui";

const RAMP = "@%#*+=-:·. "; // dark → light
const COLS = 76;
const DEPTH = 140;
const FOCAL = 700;
const ASSEMBLE_MS = 2200;

/**
 * Portrait as a 3D ASCII relief: brightness becomes depth, the relief tilts
 * toward the cursor, glyphs assemble from a scattered cloud on first view,
 * and a click flips between relief and photo (re-assembling on the way back).
 */
export function AsciiPortrait({ src, alt }) {
  const wrap = useRef(null);
  const cvRef = useRef(null);
  const [photo, setPhoto] = useState(false);
  const assemble = useRef({ t: 0, from: 0 });

  useEffect(() => {
    const cv = cvRef.current;
    const cx = cv.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cells = [], rows = 0, w = 0, h = 0, raf = 0, visible = false, started = false;
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

    const img = new Image();
    img.src = src;
    img.onload = () => {
      // Sample the photo into a COLS-wide grid (cells are ~2× taller than wide).
      const aspect = img.height / img.width;
      rows = Math.round(COLS * aspect * 0.5);
      const off = document.createElement("canvas");
      off.width = COLS; off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true });
      o.drawImage(img, 0, 0, COLS, rows);
      const data = o.getImageData(0, 0, COLS, rows).data;
      const lum = [];
      for (let k = 0; k < data.length; k += 4) lum.push((0.299 * data[k] + 0.587 * data[k + 1] + 0.114 * data[k + 2]) / 255);
      // Stretch contrast so the ramp is fully used.
      const lo = Math.min(...lum), hi = Math.max(...lum);
      cells = lum.map((v, k) => {
        const n = (v - lo) / (hi - lo || 1);
        return {
          i: k % COLS, j: Math.floor(k / COLS), n,
          g: RAMP[Math.min(RAMP.length - 1, Math.floor(n * RAMP.length))],
          sx: (Math.random() - 0.5) * 900, sy: (Math.random() - 0.5) * 900, sz: (Math.random() - 0.5) * 1400,
          d: Math.random() * 0.35,
        };
      }).filter((c) => c.g !== " ");
      resize();
      if (reduce) { assemble.current = { start: -1e9 }; draw(0); }
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.textAlign = "center";
      cx.textBaseline = "middle";
    };

    const ease = (p) => 1 - Math.pow(1 - p, 4);

    const draw = (time) => {
      if (!rows) return;
      const t = time / 1000;
      const a = assemble.current;
      if (a.start == null) a.start = time;
      a.t = Math.min(1, (time - a.start) / ASSEMBLE_MS);
      tilt.x += (tilt.tx - tilt.x) * 0.08;
      tilt.y += (tilt.ty - tilt.y) * 0.08;
      const ry = tilt.x * 0.7 + Math.sin(t * 0.6) * 0.12;
      const rx = -tilt.y * 0.5 + Math.cos(t * 0.5) * 0.05;
      const cosY = Math.cos(ry), sinY = Math.sin(ry), cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cw = w / COLS, ch = h / rows;
      const fs = Math.max(6, ch * 1.05);

      cx.clearRect(0, 0, w, h);
      // Font/fill changes are the expensive part; only set them when they differ.
      let lastFont = "", lastFill = "", lastAlpha = -1;
      for (const c of cells) {
        const p = ease(Math.max(0, Math.min(1, (a.t - c.d) / (1 - c.d))));
        let x = (c.i - COLS / 2 + 0.5) * cw;
        let y = (c.j - rows / 2 + 0.5) * ch;
        let z = (0.5 - c.n) * DEPTH; // darker = closer
        x += c.sx * (1 - p); y += c.sy * (1 - p); z += c.sz * (1 - p);
        // Rotate Y then X, then project.
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const s = FOCAL / (FOCAL + z2);
        if (s <= 0) continue;
        const near = z2 < -DEPTH * 0.3;
        const alpha = Math.round((0.35 + p * 0.65) * 10) / 10;
        if (alpha !== lastAlpha) cx.globalAlpha = lastAlpha = alpha;
        const fill = near ? "#FF4D00" : "#0E0E0E";
        if (fill !== lastFill) cx.fillStyle = lastFill = fill;
        const font = `${Math.round(fs * s * 2) / 2}px ui-monospace, monospace`;
        if (font !== lastFont) cx.font = lastFont = font;
        cx.fillText(c.g, w / 2 + x1 * s, h / 2 + y1 * s);
      }
      cx.globalAlpha = 1;
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !started) { started = true; assemble.current = { t: 0 }; }
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    }, { threshold: 0.2 });
    io.observe(cv);

    const host = wrap.current;
    const move = (e) => {
      const b = host.getBoundingClientRect();
      tilt.tx = ((e.clientX - b.left) / b.width - 0.5) * 2;
      tilt.ty = ((e.clientY - b.top) / b.height - 0.5) * 2;
    };
    const leave = () => { tilt.tx = tilt.ty = 0; };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      removeEventListener("resize", resize);
    };
  }, [src]);

  const toggle = () => {
    setPhoto((p) => {
      if (p) assemble.current = { t: 0 }; // rebuild the relief when returning to it
      return !p;
    });
  };

  return (
    <button
      ref={wrap}
      type="button"
      onClick={toggle}
      aria-pressed={photo}
      aria-label={photo ? "Show ASCII portrait" : "Show photo"}
      className="group relative block h-full w-full cursor-crosshair overflow-hidden text-left"
    >
      <canvas ref={cvRef} className="absolute inset-0 h-full w-full" role="img" aria-label={`${alt}, rendered as ASCII`} />
      <AnimatePresence>
        {photo && (
          <motion.img
            key="photo"
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)", transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] } }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        )}
      </AnimatePresence>
      <span className="label absolute bottom-3 left-3 z-10 bg-paper px-1.5 py-0.5">
        Fig. 01 — {photo ? "Photo" : "ASCII relief"}
      </span>
      <span className="label absolute right-3 top-3 z-10 bg-paper px-1.5 py-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Click to {photo ? "rebuild" : "reveal"}
      </span>
    </button>
  );
}
