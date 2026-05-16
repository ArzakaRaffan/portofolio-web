"use client";
import React from "react";
import { Reveal } from "./Animations";

const aboutStyles = {
  section: { position: "relative", padding: "120px 0", overflow: "hidden", borderTop: "1px solid var(--hairline-strong)" },
  glow: {
    position: "absolute", inset: "-20% -10% 60% -10%",
    background: "radial-gradient(closest-side at 20% 30%, rgba(34,255,153,0.14), transparent 60%)",
    filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
  },
  inner: {
    position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 32px",
    display: "grid",
    gridTemplateColumns: "minmax(0, 220px) minmax(0, 1fr)",
    gap: 56,
    alignItems: "start",
  },
  side: { display: "flex", flexDirection: "column", gap: 18 },
  eyebrow: {
    fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--mute)",
    letterSpacing: "0.7px", textTransform: "uppercase",
    display: "flex", alignItems: "center", gap: 10,
  },
  eyebrowLine: { width: 24, height: 1, background: "var(--mute)" },
  portrait: {
    width: "100%", aspectRatio: "1 / 1",
    background: "var(--surface-card)", borderRadius: 12,
    boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
    position: "relative", overflow: "hidden",
  },
  portraitImg: {
    position: "absolute", inset: 0,
    width: "100%", height: "100%",
    objectFit: "cover", objectPosition: "center 30%",
    display: "block",
    filter: "saturate(0.95) contrast(1.02)",
  },
  meta: {
    display: "flex", flexDirection: "column", gap: 4,
    fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--mute)",
    letterSpacing: "0.3px",
  },
  metaRow: { display: "flex", justifyContent: "space-between", gap: 8 },
  metaKey: { color: "var(--mute)" },
  metaVal: { color: "var(--ink)", textAlign: "right" },

  body: { display: "flex", flexDirection: "column", gap: 22 },
  h: {
    fontFamily: "var(--font-serif)", fontSize: 56, lineHeight: 1.05, fontWeight: 400,
    letterSpacing: "-0.96px", color: "var(--ink)", margin: 0,
  },
  p: {
    fontSize: 18, lineHeight: 1.55, color: "var(--body)", margin: 0,
    fontFamily: "var(--font-sans)",
  },
};

function About() {
  return (
    <section id="about" style={aboutStyles.section}>
      <div style={aboutStyles.glow} className="glow-breathe" />
      <div style={aboutStyles.inner} data-grid="about">
        <Reveal>
          <aside style={aboutStyles.side}>
          <div style={aboutStyles.portrait}>
            <img src="/assets/portrait.jpeg" alt="Arzaka Raffan Mawardi" style={aboutStyles.portraitImg} />
          </div>
          <div style={aboutStyles.meta}>
            <div style={aboutStyles.metaRow}><span style={aboutStyles.metaKey}>Based in</span><span style={aboutStyles.metaVal}>Depok, ID</span></div>
            <div style={aboutStyles.metaRow}><span style={aboutStyles.metaKey}>Studying</span><span style={aboutStyles.metaVal}>CS · UI ’23</span></div>
            <div style={aboutStyles.metaRow}><span style={aboutStyles.metaKey}>Email</span><span style={aboutStyles.metaVal}>arzakaraffan</span></div>
          </div>
          </aside>
        </Reveal>
        <Reveal delay={120}>
          <div style={aboutStyles.body}>
          <span style={aboutStyles.eyebrow}><span style={aboutStyles.eyebrowLine}></span> About</span>
          <h2 style={aboutStyles.h}>
            Student by day, full-stack by night, indie game dev on weekends.
          </h2>
          <p style={aboutStyles.p}>
            I&rsquo;m a seventh-semester CS student at <span className="hl hl--blue">Universitas Indonesia</span>.
            Most weeks I&rsquo;m juggling lectures, a side project, and one half-finished game I keep telling myself I&rsquo;ll get back to.
          </p>
          <p style={aboutStyles.p}>
            I help run RISTEK&rsquo;s Game Development division, TA a few CS courses, and occasionally write articles about politics.
            I like building things people actually use, and I&rsquo;d like to keep being surprised by what I get to work on.
          </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { About };