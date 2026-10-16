"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useIntroDone } from "./Preloader";
import { EASE } from "./ui";

/** Dot + trailing ring. Ring swells over anything clickable. Fine pointers only. */
function Cursor() {
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY);
      setHover(!!e.target.closest?.("a, button, [role=tab]"));
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    addEventListener("pointermove", move);
    addEventListener("pointerdown", d);
    addEventListener("pointerup", u);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", d);
      removeEventListener("pointerup", u);
    };
  }, [x, y]);

  if (!on) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[90] mix-blend-difference" aria-hidden="true">
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="h-1.5 w-1.5 rounded-full bg-paper"
          style={{ x: "-50%", y: "-50%" }}
          animate={{ scale: hover ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x: rx, y: ry }}>
        <motion.div
          className="h-9 w-9 rounded-full border border-paper"
          style={{ x: "-50%", y: "-50%" }}
          animate={{ scale: down ? 0.7 : hover ? 2 : 1, backgroundColor: hover ? "rgba(242,241,236,1)" : "rgba(242,241,236,0)" }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      </motion.div>
    </div>
  );
}

/** Thin accent bar tracking page progress. */
function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return <motion.div className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent" style={{ scaleX }} aria-hidden="true" />;
}

/** Blueprint column guides that draw down once the intro clears. */
function Guides() {
  const ready = useIntroDone();
  const line = (i, side) => (
    <motion.span
      className={`absolute top-0 h-full w-px origin-top bg-paper/[0.08] ${side}`}
      initial={{ scaleY: 0 }}
      animate={ready ? { scaleY: 1 } : undefined}
      transition={{ duration: 1.6, ease: EASE, delay: 0.2 + i * 0.08 }}
    />
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] mix-blend-difference" aria-hidden="true">
      <div className="frame grid h-full grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="relative">
            {line(i, "left-0")}
            {i === 3 && line(4, "right-0")}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Overlays() {
  return (
    <>
      <Guides />
      <Progress />
      <Cursor />
    </>
  );
}
