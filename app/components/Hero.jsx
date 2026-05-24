"use client";
import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Icon } from "./Icons";
import { BackgroundBeams } from "@/components/ui/background-beams";

const up = (delay) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

const roles = [
  { label: "Web developer",   color: "#fcfdff" },
  { label: "Game developer",  color: "#11ff99" },
  { label: "Fasilkom UI '23", color: "#3b9eff" },
];

function MagneticButton({ href, children }) {
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });
  return (
    <motion.a
      ref={ref} href={href}
      className="btn btn--primary btn--pill inline-flex items-center gap-2"
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.a>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen pt-36 pb-20 overflow-hidden flex items-center bg-canvas">
      {/* Aceternity Background Beams */}
      <BackgroundBeams className="opacity-40" />

      {/* Dual atmospheric glow on top of beams */}
      <div className="absolute pointer-events-none animate-breathe"
           style={{ inset: "-15% -10% 20% -10%", zIndex: 1,
             background:
               "radial-gradient(closest-side at 15% 38%, rgba(255,89,0,0.35), transparent 58%), " +
               "radial-gradient(closest-side at 85% 15%, rgba(0,117,255,0.38), transparent 62%)",
             filter: "blur(90px)" }} />

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
           style={{ background: "linear-gradient(to bottom, transparent, #000)", zIndex: 2 }} />

      <div className="relative w-full max-w-container mx-auto px-8" style={{ zIndex: 3 }}>
        {/* Eyebrow */}
        <motion.div {...up(0.04)}
                    className="font-mono text-[11px] text-mute tracking-[1.2px] uppercase mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-mute opacity-60" />
          CS Student · Fasilkom UI
        </motion.div>

        {/* Name */}
        <h1 className="font-display font-normal text-ink m-0 flex flex-col"
            style={{ fontSize: "clamp(72px, 15vw, 180px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}>
          <motion.span {...up(0.08)}>Arzaka</motion.span>
          <motion.span {...up(0.2)}
                       style={{
                         fontStyle: "italic",
                         backgroundImage: "linear-gradient(135deg, #fcfdff 25%, rgba(255,128,31,0.85) 100%)",
                         WebkitBackgroundClip: "text",
                         WebkitTextFillColor: "transparent",
                         backgroundClip: "text",
                       }}>
            Raffan
          </motion.span>
          <motion.span {...up(0.32)}>
            Mawardi.
            <span className="inline-block bg-accent-orange ml-[0.06em] align-baseline animate-blink"
                  style={{ width: "0.06em", height: "0.8em", boxShadow: "0 0 18px rgba(255,128,31,0.85)" }}
                  aria-hidden="true" />
          </motion.span>
        </h1>

        {/* Role pills */}
        <motion.div {...up(0.44)} className="mt-10 flex items-center gap-5 flex-wrap">
          {roles.map(({ label, color }, i) => (
            <motion.span
              key={label}
              className="font-mono text-[12px] text-mute tracking-[0.4px] uppercase flex items-center gap-2"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.44 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-[5px] h-[5px] rounded-full flex-shrink-0 animate-pulse2"
                    style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
              {label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div {...up(0.52)} className="mt-8">
          <MagneticButton href="#work">
            See the work <Icon name="arrow-right" size={14} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

export { Hero };
