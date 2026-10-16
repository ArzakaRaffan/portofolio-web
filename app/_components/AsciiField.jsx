"use client";
import { useEffect, useRef } from "react";

const RAMP = " .·:-=+*#%@";
const CELL_W = 10;
const CELL_H = 16;

/**
 * Glyph field: slow interference waves, a cursor lens that heats glyphs to the
 * accent color, and click ripples. Pauses offscreen; static under reduced motion.
 */
export function AsciiField({ className }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const cx = cv.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, cols = 0, rows = 0, raf = 0, visible = true;
    const mouse = { x: -1e3, y: -1e3, tx: -1e3, ty: -1e3 };
    const ripples = [];

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.font = `12px ${getComputedStyle(document.body).getPropertyValue("--font-geist-mono") || "monospace"}, monospace`;
      cx.textBaseline = "top";
      cols = Math.ceil(w / CELL_W); rows = Math.ceil(h / CELL_H);
    };

    const draw = (time) => {
      const t = time / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      cx.clearRect(0, 0, w, h);
      const hot = [];
      cx.fillStyle = "rgba(14,14,14,0.38)";
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * CELL_W, y = j * CELL_H;
          // Fade the field in from the left edge so it sits behind the type.
          const edge = Math.min(1, Math.max(0, (x / w - 0.15) * 2.2));
          let v = (Math.sin(i * 0.16 + t * 0.7) + Math.cos(j * 0.21 - t * 0.5) + Math.sin((i + j) * 0.07 + t * 0.3)) / 6 + 0.5;
          v *= edge;
          const d = Math.hypot(x - mouse.x, y - mouse.y);
          let heat = d < 120 ? 1 - d / 120 : 0;
          for (const r of ripples) {
            const band = Math.abs(Math.hypot(x - r.x, y - r.y) - r.r);
            if (band < 22) heat = Math.max(heat, (1 - band / 22) * r.life);
          }
          v = Math.min(1, v + heat * 0.7);
          const g = RAMP[Math.floor(v * (RAMP.length - 1))];
          if (g === " ") continue;
          if (heat > 0.25) hot.push(g, x, y);
          else cx.fillText(g, x, y);
        }
      }
      cx.fillStyle = "#FF4D00";
      for (let k = 0; k < hot.length; k += 3) cx.fillText(hot[k], hot[k + 1], hot[k + 2]);
      for (let k = ripples.length - 1; k >= 0; k--) {
        const r = ripples[k];
        r.r += 9; r.life -= 0.012;
        if (r.life <= 0) ripples.splice(k, 1);
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const b = cv.getBoundingClientRect();
      mouse.tx = e.clientX - b.left; mouse.ty = e.clientY - b.top;
    };
    const onLeave = () => { mouse.tx = mouse.ty = -1e3; };
    const onDown = (e) => {
      const b = cv.getBoundingClientRect();
      ripples.push({ x: e.clientX - b.left, y: e.clientY - b.top, r: 0, life: 1 });
    };

    resize();
    draw(0);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(cv);
    const host = cv.parentElement;
    addEventListener("resize", resize);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
