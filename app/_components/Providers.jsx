"use client";
import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";

export const lenis = { current: null };

export function Providers({ children }) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ lerp: 0.09, anchors: { offset: -64 } });
    lenis.current = l;
    let id;
    const raf = (t) => { l.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); l.destroy(); lenis.current = null; };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
