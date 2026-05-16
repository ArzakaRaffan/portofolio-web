"use client";
import React from "react";
import { Icon } from "./Icons";

const heroStyles = {
  wrap: {
    position: "relative",
    minHeight: "92vh",
    paddingTop: 140,
    paddingBottom: 80,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  glow: {
    position: "absolute",
    inset: "-10% -10% 30% -10%",
    background:
      "radial-gradient(closest-side at 18% 32%, rgba(255,89,0,0.42), transparent 60%), " +
      "radial-gradient(closest-side at 82% 18%, rgba(0,117,255,0.45), transparent 65%)",
    filter: "blur(80px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  inner: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px",
  },
  h1: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(64px, 14vw, 168px)",
    lineHeight: 0.92,
    letterSpacing: "-0.04em",
    color: "var(--ink)",
    margin: 0,
    fontWeight: 400,
    display: "flex",
    flexDirection: "column",
  },
  italic: { fontStyle: "italic" },
  cursor: {
    display: "inline-block",
    width: "0.06em",
    height: "0.8em",
    background: "var(--accent-orange)",
    marginLeft: "0.06em",
    verticalAlign: "baseline",
    boxShadow: "0 0 14px var(--accent-orange)",
    animation: "blink 1.1s steps(1,end) infinite",
  },
  metaRow: {
    marginTop: 40,
    display: "flex",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  rolePill: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--mute)",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  roleDot: {
    width: 5, height: 5, borderRadius: "50%", background: "var(--ink)",
  },
  cta: {
    marginTop: 28,
    display: "inline-flex",
  },
};

function Hero() {
  return (
    <section style={heroStyles.wrap}>
      <div style={heroStyles.glow} className="glow-breathe" />
      <div style={heroStyles.inner}>
        <h1 style={heroStyles.h1}>
          <span className="hero-anim-1">Arzaka</span>
          <span className="hero-anim-2" style={heroStyles.italic}>Raffan</span>
          <span className="hero-anim-3">
            Mawardi.<span style={heroStyles.cursor} aria-hidden="true"></span>
          </span>
        </h1>
        <div style={heroStyles.metaRow} className="hero-anim-4">
          <span style={heroStyles.rolePill}>
            <span style={heroStyles.roleDot}></span> Web developer
          </span>
          <span style={heroStyles.rolePill}>
            <span style={{ ...heroStyles.roleDot, background: "var(--accent-green)" }}></span> Game developer
          </span>
          <span style={heroStyles.rolePill}>
            <span style={{ ...heroStyles.roleDot, background: "var(--accent-blue)" }}></span> Fasilkom UI &rsquo;23
          </span>
        </div>
        <div style={heroStyles.cta} className="hero-anim-4">
          <a href="#work" className="btn btn--primary btn--pill">
            See the work <Icon name="arrow-right" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export { Hero };