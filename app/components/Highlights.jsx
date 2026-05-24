"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Icon } from "./Icons";
import { Reveal } from "./Animations";

const highlights = [
  {
    rank: "1st", kind: "Game Jam · Champion",
    title: "Garena Game Jam 3", meta: "2026 · with Let Meow Out / Let Neigh Out",
    glow: "radial-gradient(circle at 30% 30%, rgba(255,197,61,0.6), transparent 60%)",
    accent: "rgba(255,197,61,0.7)", link: null,
  },
  {
    rank: "2nd", kind: "Game Jam · Runner-up",
    title: "Garena Game Jam 2", meta: "2025 · with Alien Brawl",
    glow: "radial-gradient(circle at 30% 30%, rgba(59,158,255,0.55), transparent 60%)",
    accent: "rgba(59,158,255,0.7)", link: null,
  },
  {
    rank: "Patent", kind: "HAKI · Indonesia",
    title: "Petualangan Tala", meta: "Mobile game · Hak Kekayaan Intelektual",
    glow: "radial-gradient(circle at 30% 30%, rgba(34,255,153,0.5), transparent 60%)",
    accent: "rgba(34,255,153,0.7)",
    link: "https://drive.google.com/file/d/1CJa9TDeLwPko_W6lw1vGPO3N-y3sVLle/view?usp=drivesdk",
  },
  {
    rank: "Mag.", kind: "Published Article",
    title: "DPR Majalah Parlementaria", meta: "Nov 2022 · Article Writer",
    glow: "radial-gradient(circle at 30% 30%, rgba(255,89,0,0.45), transparent 60%)",
    accent: "rgba(255,89,0,0.7)",
    link: "https://drive.google.com/drive/folders/1JF_YeaTyjocJcUVOSI3sVzgIfYS2Z3IS",
  },
];

function HighlightCard({ h, i }) {
  const ref = React.useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const xPct = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const yPct = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${xPct} ${yPct}, rgba(255,255,255,0.06), transparent 70%)`;

  const handleMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const Tag = h.link ? "a" : "div";
  const extra = h.link ? { href: h.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Reveal delay={i * 80}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Tag {...extra}
             className="relative bg-surface-card rounded-2xl shadow-border p-6 flex flex-col gap-3.5 min-h-[280px] overflow-hidden no-underline text-inherit block cursor-pointer group">
          {/* Glow blob */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ inset: "-30% -30% 40% -30%", background: h.glow, filter: "blur(50px)" }}
            initial={{ opacity: 0.5, scale: 1 }}
            whileHover={{ opacity: 0.9, scale: 1.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Mouse spotlight */}
          <motion.div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: spotlight }} />

          {/* Border glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{ boxShadow: `inset 0 0 0 1px ${h.accent}` }}
            transition={{ duration: 0.2 }}
          />

          <div className="relative flex flex-col gap-3.5 h-full z-10">
            <span className="font-mono text-[10px] text-mute tracking-[0.6px] uppercase">{h.kind}</span>
            <h3 className="font-display font-normal m-0"
                style={{ fontSize: "clamp(48px, 7vw, 72px)", lineHeight: 0.88, letterSpacing: "-2px",
                         backgroundImage: `linear-gradient(135deg, #fcfdff 40%, ${h.accent})`,
                         WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {h.rank}
            </h3>
            <div className="flex flex-col gap-1.5 mt-auto">
              <p className="font-ui text-[15px] leading-[1.3] text-ink m-0 font-medium tracking-[-0.2px]">{h.title}</p>
              <span className="font-mono text-[11px] text-mute tracking-[0.3px]">{h.meta}</span>
              {h.link && (
                <span className="inline-flex items-center gap-1 font-ui text-[12px] text-ink font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  View <Icon name="arrow-up-right" size={11} />
                </span>
              )}
            </div>
          </div>
        </Tag>
      </motion.div>
    </Reveal>
  );
}

function Highlights() {
  return (
    <section id="highlights" className="relative py-[120px] overflow-hidden border-t border-hairline-strong">
      <div className="absolute pointer-events-none animate-breathe"
           style={{ inset: "-20% -10% 60% -10%", background: "radial-gradient(closest-side at 22% 20%, rgba(255,197,61,0.18), transparent 65%)", filter: "blur(80px)", zIndex: 0 }} />
      <div className="relative z-10 max-w-container mx-auto px-8">
        <Reveal>
          <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
            <h2 className="font-display text-[56px] leading-none tracking-[-0.96px] text-ink m-0 font-normal">Highlights.</h2>
            <p className="text-[15px] text-mute max-w-[320px] m-0 leading-relaxed">
              A couple of jam wins, one patent, and an article in a national magazine.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-4 gap-3" data-grid="highlights-grid">
          {highlights.map((h, i) => <HighlightCard key={h.title} h={h} i={i} />)}
        </div>
      </div>
    </section>
  );
}

export { Highlights };
