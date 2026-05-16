"use client";
import React from "react";
import { Icon, StatusPill } from "./Icons";

const footStyles = {
  foot: {
    borderTop: "1px solid var(--hairline-strong)",
    padding: "64px 0 48px",
    background: "var(--canvas)",
  },
  inner: { maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", flexDirection: "column", gap: 56 },
  top: {
    display: "grid", gridTemplateColumns: "minmax(0, 1.6fr) repeat(2, minmax(0, 1fr))",
    gap: 48,
  },
  brand: {
    display: "flex", flexDirection: "column", gap: 16, maxWidth: 360,
  },
  word: {
    fontFamily: "var(--font-serif)", fontSize: 36, letterSpacing: "-0.6px",
    color: "var(--ink)", lineHeight: 1.1, margin: 0,
  },
  blurb: { fontSize: 13, color: "var(--ash)", lineHeight: 1.55, margin: 0 },
  col: { display: "flex", flexDirection: "column", gap: 10 },
  colH: {
    fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--mute)",
    letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 6,
  },
  colA: {
    fontSize: 14, color: "var(--ash)", fontFamily: "var(--font-sans)",
    transition: "color 120ms ease",
  },
  bottom: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    flexWrap: "wrap", gap: 16,
    paddingTop: 24, borderTop: "1px solid var(--hairline)",
  },
  copy: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ash)" },
  socials: { display: "flex", gap: 4 },
  social: {
    width: 36, height: 36, borderRadius: 9999, display: "grid", placeItems: "center",
    color: "var(--ash)", boxShadow: "inset 0 0 0 1px transparent",
    transition: "all 120ms ease", cursor: "pointer",
  },
};

function Footer() {
  return (
    <footer style={footStyles.foot}>
      <div style={footStyles.inner}>
        <div style={footStyles.top} data-grid="footer">
          <div style={footStyles.brand}>
            <p style={footStyles.word}>Made this thing<br/><em style={{ fontStyle: "italic" }}>between classes.</em></p>
            <p style={footStyles.blurb}>
              A small site, no tracking, no popups. If you&rsquo;ve scrolled this far,
              you&rsquo;re probably someone I&rsquo;d enjoy working with.
            </p>
            <div style={{ marginTop: 8 }}>
              <StatusPill tone="green">All systems operational</StatusPill>
            </div>
          </div>
          <div style={footStyles.col}>
            <div style={footStyles.colH}>Pages</div>
            <a href="#work" style={footStyles.colA}>Selected work</a>
            <a href="#skills" style={footStyles.colA}>Skills</a>
            <a href="#about" style={footStyles.colA}>About</a>
            <a href="#contact" style={footStyles.colA}>Contact</a>
          </div>
          <div style={footStyles.col}>
            <div style={footStyles.colH}>Elsewhere</div>
            <a href="https://github.com/ArzakaRaffan/" target="_blank" rel="noopener noreferrer" style={footStyles.colA}>GitHub</a>
            <a href="https://www.linkedin.com/in/arzakaraffan/" target="_blank" rel="noopener noreferrer" style={footStyles.colA}>LinkedIn</a>
            <a href="https://heisenbergers.itch.io/" target="_blank" rel="noopener noreferrer" style={footStyles.colA}>itch.io · heisenbergers</a>
            <a href="mailto:arzakaraffan@gmail.com" style={footStyles.colA}>Email</a>
          </div>
        </div>
        <div style={footStyles.bottom}>
          <span style={footStyles.copy}>© 2026 Arzaka Raffan Mawardi.</span>
          <div style={footStyles.socials}>
            {[
              { n: "github", url: "https://github.com/ArzakaRaffan/" },
              { n: "linkedin", url: "https://www.linkedin.com/in/arzakaraffan/" },
              { n: "external", url: "https://heisenbergers.itch.io/" },
              { n: "mail", url: "mailto:arzakaraffan@gmail.com" },
            ].map((s) => (
              <a key={s.n} href={s.url} target={s.url.startsWith("http") ? "_blank" : undefined} rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined} style={footStyles.social}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.color = "var(--ink)";
                   e.currentTarget.style.boxShadow = "inset 0 0 0 1px var(--hairline-strong)";
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.color = "var(--ash)";
                   e.currentTarget.style.boxShadow = "inset 0 0 0 1px transparent";
                 }}>
                <Icon name={s.n} size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };