"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./ui";

const RAMP = "@%#*+=-:. "; // dark → light
const CELL_PX = 3.2; // target glyph width; ~160 columns on desktop, fewer on narrow screens
const CELL = 0.6; // monospace glyph width / height
const FOCUS_Y = 0.3; // matches the photo's object-[center_30%]
const SHARPEN = 2; // unsharp-mask amount...
const RADIUS = 3; // ...over a 7×7 neighbourhood: brings out glasses, hair, folded arms
const GAMMA = 1.8; // after equalisation; keeps skin in light glyphs instead of blank
const FOCAL = 700;
const ASSEMBLE_MS = 2200;
const INK = ["#0E0E0E", "#FF4D00"]; // settled, in flight

/**
 * Portrait as ASCII: glyphs assemble from a scattered cloud on first view, then the
 * settled image is cached and the panel tilts toward the cursor (CSS 3D, so the
 * portrait stays faithful). A click flips between ASCII and photo (re-assembling on return).
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
    let cells = [], cols = 0, rows = 0, w = 0, h = 0, raf = 0, visible = false, started = false, settled = false;
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

    const img = new Image();
    img.src = src;
    const off = document.createElement("canvas");
    const o = off.getContext("2d", { willReadFrequently: true });
    // Glyph atlas: every ramp glyph pre-rendered in both inks, so a frame is
    // drawImage calls only (fillText + font switches can't keep up at ~15k glyphs).
    const atlas = document.createElement("canvas");
    const glyph = { bw: 0, bh: 0, k: 1 };
    const still = document.createElement("canvas"); // the assembled portrait, drawn once

    // Sample the photo into the grid, cropped exactly like the <img> (object-cover, FOCUS_Y),
    // so relief and photo line up when toggling.
    const build = () => {
      if (!img.naturalWidth || !w) return;
      cols = Math.max(60, Math.min(170, Math.round(w / CELL_PX)));
      rows = Math.round(cols * (h / w) * CELL);
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const sw = w / s, sh = h / s;
      off.width = cols; off.height = rows;
      o.imageSmoothingQuality = "high";
      o.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) * FOCUS_Y, sw, sh, 0, 0, cols, rows);
      const data = o.getImageData(0, 0, cols, rows).data;
      const N = cols * rows;
      const lum = new Float32Array(N);
      for (let k = 0; k < N; k++) lum[k] = (0.299 * data[k * 4] + 0.587 * data[k * 4 + 1] + 0.114 * data[k * 4 + 2]) / 255;
      const sharp = lum.map((v, k) => {
        const i = k % cols, j = (k / cols) | 0;
        let sum = 0, n = 0;
        for (let dj = -RADIUS; dj <= RADIUS; dj++) for (let di = -RADIUS; di <= RADIUS; di++) {
          const ii = i + di, jj = j + dj;
          if (ii >= 0 && ii < cols && jj >= 0 && jj < rows) { sum += lum[jj * cols + ii]; n++; }
        }
        return v + SHARPEN * (v - sum / n);
      });
      // Histogram equalisation: the busy brick/ceiling background can't hog the dark end of the ramp.
      const sorted = Float32Array.from(sharp).sort();
      const rank = (v) => { let l = 0, r = N; while (l < r) { const m = (l + r) >> 1; if (sorted[m] < v) l = m + 1; else r = m; } return l / N; };
      cells = Array.from(sharp, (v, k) => {
        const n = Math.pow(rank(v), GAMMA);
        return {
          i: k % cols, j: (k / cols) | 0, n,
          g: Math.min(RAMP.length - 1, Math.floor(n * RAMP.length)),
          sx: (Math.random() - 0.5) * 900, sy: (Math.random() - 0.5) * 900, sz: (Math.random() - 0.5) * 1400,
          d: Math.random() * 0.35,
        };
      }).filter((c) => RAMP[c.g] !== " ");

      const dpr = Math.min(devicePixelRatio || 1, 2);
      const fs = h / rows;
      glyph.k = dpr * 1.25; // headroom for glyphs scaled up by perspective
      glyph.bw = Math.ceil(fs * 0.7 * glyph.k);
      glyph.bh = Math.ceil(fs * 1.2 * glyph.k);
      atlas.width = glyph.bw * RAMP.length; atlas.height = glyph.bh * INK.length;
      const a = atlas.getContext("2d");
      a.font = `${fs * glyph.k}px ui-monospace, monospace`;
      a.textAlign = "center"; a.textBaseline = "middle";
      INK.forEach((ink, r) => {
        a.fillStyle = ink;
        for (let g = 0; g < RAMP.length; g++) a.fillText(RAMP[g], (g + 0.5) * glyph.bw, (r + 0.5) * glyph.bh);
      });
      still.width = w * dpr; still.height = h * dpr;
      const sc = still.getContext("2d");
      sc.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cw = w / cols, ch = h / rows, gw = glyph.bw / glyph.k, gh = glyph.bh / glyph.k;
      for (const c of cells) sc.drawImage(atlas, c.g * glyph.bw, 0, glyph.bw, glyph.bh, (c.i + 0.5) * cw - gw / 2, (c.j + 0.5) * ch - gh / 2, gw, gh);
      settled = false;
    };

    img.onload = () => {
      resize();
      if (reduce) { assemble.current = { start: -1e9 }; draw(0); }
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
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
      const ry = tilt.x * 0.22 + Math.sin(t * 0.6) * 0.03;
      const rx = -tilt.y * 0.16 + Math.cos(t * 0.5) * 0.015;
      cv.style.transform = `perspective(1100px) rotateY(${ry}rad) rotateX(${rx}rad)`;

      if (a.t >= 1) {
        // Settled: one blit, then only the CSS tilt above changes per frame.
        if (!settled) { cx.clearRect(0, 0, w, h); cx.drawImage(still, 0, 0, w, h); settled = true; }
      } else {
        settled = false;
        const cw = w / cols, ch = h / rows;
        const { bw, bh, k } = glyph;
        const gw = bw / k, gh = bh / k;
        cx.clearRect(0, 0, w, h);
        let lastAlpha = -1;
        for (const c of cells) {
          const p = ease(Math.max(0, Math.min(1, (a.t - c.d) / (1 - c.d))));
          const q = 1 - p;
          const s = FOCAL / (FOCAL + c.sz * q);
          if (s <= 0) continue;
          const alpha = Math.round((0.35 + p * 0.65) * 10) / 10;
          if (alpha !== lastAlpha) cx.globalAlpha = lastAlpha = alpha;
          const x = ((c.i + 0.5) * cw - w / 2 + c.sx * q) * s + w / 2;
          const y = ((c.j + 0.5) * ch - h / 2 + c.sy * q) * s + h / 2;
          const dw = gw * s, dh = gh * s;
          cx.drawImage(atlas, c.g * bw, (p < 0.85 ? 1 : 0) * bh, bw, bh, x - dw / 2, y - dh / 2, dw, dh);
        }
        cx.globalAlpha = 1;
      }
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
      data-cursor="native"
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
