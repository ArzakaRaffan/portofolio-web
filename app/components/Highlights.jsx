"use client";
import React from "react";
import { Icon } from "./Icons";
import { Reveal } from "./Animations";

// Highlights — awards, patents, publications. The CV one-pager moments.
const hlStyles = {
  section: { position: "relative", padding: "120px 0", overflow: "hidden", borderTop: "1px solid var(--hairline-strong)" },
  glow: {
    position: "absolute", inset: "-20% -10% 60% -10%",
    background: "radial-gradient(closest-side at 22% 20%, rgba(255,197,61,0.20), transparent 65%)",
    filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
  },
  inner: { position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 32px" },
  head: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, gap: 24, flexWrap: "wrap" },
  title: {
    fontFamily: "var(--font-serif)", fontSize: 56, lineHeight: 1.0,
    letterSpacing: "-0.96px", color: "var(--ink)", margin: 0, fontWeight: 400,
  },
  sub: { fontSize: 15, color: "var(--mute)", fontFamily: "var(--font-sans)", maxWidth: 320, margin: 0, lineHeight: 1.5 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 12,
  },
  card: {
    position: "relative",
    background: "var(--surface-card)",
    borderRadius: 12,
    boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
    padding: 24,
    display: "flex", flexDirection: "column", gap: 14,
    minHeight: 260,
    overflow: "hidden",
    textDecoration: "none",
    color: "inherit",
    transition: "box-shadow 240ms cubic-bezier(0.16,1,0.3,1)",
  },
  cardHover: { boxShadow: "inset 0 0 0 1px var(--hairline-bright)" },
  cardGlow: {
    position: "absolute", inset: "-30% -30% 40% -30%",
    pointerEvents: "none", opacity: 0.5,
    filter: "blur(50px)",
  },
  inner2: { position: "relative", display: "flex", flexDirection: "column", gap: 14, height: "100%" },
  rank: {
    fontFamily: "var(--font-serif)", fontSize: 56, lineHeight: 0.9,
    letterSpacing: "-1.5px", color: "var(--ink)", fontWeight: 400,
    margin: 0,
  },
  kind: {
    fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--mute)",
    letterSpacing: "0.6px", textTransform: "uppercase",
  },
  body: { display: "flex", flexDirection: "column", gap: 6, marginTop: "auto" },
  h: {
    fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.35,
    color: "var(--ink)", margin: 0, fontWeight: 500, letterSpacing: "-0.2px",
  },
  meta: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--mute)", letterSpacing: "0.3px" },
  link: {
    display: "inline-flex", alignItems: "center", gap: 4,
    fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--ink)",
    fontWeight: 500, marginTop: 4,
  },
};

const highlights = [
  {
    rank: "1st",
    kind: "Game Jam · Champion",
    title: "Garena Game Jam 3",
    meta: "2026 · with Let Meow Out / Let Neigh Out",
    glow: "radial-gradient(circle at 30% 30%, rgba(255,197,61,0.55), transparent 60%)",
    link: null,
  },
  {
    rank: "2nd",
    kind: "Game Jam · Runner-up",
    title: "Garena Game Jam 2",
    meta: "2025 · with Alien Brawl",
    glow: "radial-gradient(circle at 30% 30%, rgba(59,158,255,0.5), transparent 60%)",
    link: null,
  },
  {
    rank: "Patent",
    kind: "HAKI · Indonesia",
    title: "Petualangan Tala",
    meta: "Mobile game · Hak Kekayaan Intelektual",
    glow: "radial-gradient(circle at 30% 30%, rgba(34,255,153,0.45), transparent 60%)",
    link: "https://drive.google.com/file/d/1CJa9TDeLwPko_W6lw1vGPO3N-y3sVLle/view?usp=drivesdk",
  },
  {
    rank: "Magazine",
    kind: "Published Article",
    title: "DPR Majalah Parlementaria",
    meta: "Nov 2022 · Article Writer",
    glow: "radial-gradient(circle at 30% 30%, rgba(255,89,0,0.4), transparent 60%)",
    link: "https://drive.google.com/drive/folders/1JF_YeaTyjocJcUVOSI3sVzgIfYS2Z3IS",
  },
];

function Highlights() {
  const [hov, setHov] = React.useState(-1);
  return (
    <section id="highlights" style={hlStyles.section}>
      <div style={hlStyles.glow} className="glow-breathe" />
      <div style={hlStyles.inner}>
        <Reveal>
          <div style={hlStyles.head}>
            <h2 style={hlStyles.title}>Highlights.</h2>
            <p style={hlStyles.sub}>A couple of jam wins, one patent, and an article in a national magazine. The CV-paper kind of moments.</p>
          </div>
        </Reveal>
        <div style={hlStyles.grid} data-grid="highlights-grid">
          {highlights.map((h, i) => {
            const Wrapper = h.link ? "a" : "div";
            const wrapperProps = h.link ? { href: h.link, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <Reveal key={h.title} delay={i * 80}>
                <Wrapper {...wrapperProps}
                         style={{ ...hlStyles.card, ...(hov === i ? hlStyles.cardHover : {}) }}
                         onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)}>
                <div style={{
                  ...hlStyles.cardGlow, background: h.glow,
                  transition: "opacity 300ms ease, transform 400ms cubic-bezier(0.16,1,0.3,1)",
                  opacity: hov === i ? 0.72 : 0.5,
                  transform: hov === i ? "scale(1.18)" : "scale(1)",
                }}></div>
                <div style={hlStyles.inner2}>
                  <span style={hlStyles.kind}>{h.kind}</span>
                  <h3 style={hlStyles.rank}>{h.rank}</h3>
                  <div style={hlStyles.body}>
                    <p style={hlStyles.h}>{h.title}</p>
                    <span style={hlStyles.meta}>{h.meta}</span>
                    {h.link && (
                      <span style={hlStyles.link}>View <Icon name="arrow-up-right" size={11} /></span>
                    )}
                  </div>
                </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { Highlights };