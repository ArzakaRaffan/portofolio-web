"use client";
import React from "react";
import { Reveal } from "./Animations";

const skillStyles = {
  section: { position: "relative", padding: "120px 0", overflow: "hidden", borderTop: "1px solid var(--hairline-strong)" },
  glow: {
    position: "absolute", inset: "-30% -10% 50% -10%",
    background:
      "radial-gradient(closest-side at 30% 30%, rgba(0,117,255,0.24), transparent 60%), " +
      "radial-gradient(closest-side at 85% 70%, rgba(34,255,153,0.14), transparent 60%)",
    filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
  },
  inner: { position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 32px" },
  head: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, gap: 24, flexWrap: "wrap" },
  h: {
    fontFamily: "var(--font-serif)", fontSize: 56, lineHeight: 1.0, fontWeight: 400,
    letterSpacing: "-0.96px", color: "var(--ink)", margin: 0,
  },
  sub: { fontSize: 15, color: "var(--mute)", fontFamily: "var(--font-sans)", maxWidth: 320, margin: 0, lineHeight: 1.5 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
  },
  group: {
    background: "var(--surface-card)",
    borderRadius: 12,
    boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
    padding: 28,
    display: "flex", flexDirection: "column", gap: 18,
    minHeight: 280,
  },
  groupHead: {
    display: "flex", alignItems: "center", gap: 10,
    fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--mute)",
    letterSpacing: "0.6px", textTransform: "uppercase",
  },
  groupHeadLine: { flex: 1, height: 1, background: "var(--hairline-strong)" },
  groupTitle: {
    fontFamily: "var(--font-serif)", fontSize: 28, lineHeight: 1.15,
    letterSpacing: "-0.4px", color: "var(--ink)", margin: 0, fontWeight: 400,
  },
  groupNote: { fontSize: 14, color: "var(--body)", lineHeight: 1.55, margin: 0 },

  logoRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
    gap: 12,
    marginTop: "auto",
    paddingTop: 18,
    borderTop: "1px solid var(--hairline)",
  },
  logoCell: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
    gap: 8, padding: "10px 6px",
    borderRadius: 8,
    transition: "background 160ms ease",
  },
  logo: {
    width: 26, height: 26,
    objectFit: "contain",
    filter: "brightness(0) invert(1)",
    opacity: 0.88,
  },
  logoLabel: {
    fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--mute)",
    letterSpacing: "0.2px", textAlign: "center", lineHeight: 1.3,
  },
};

const groups = [
  {
    eyebrow: "Frontend",
    title: "The part people see.",
    note: "React-flavored everything. I care a lot about how a button feels when you click it.",
    tech: [
      { name: "Next.js",    slug: "nextdotjs" },
      { name: "React",      slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind",   slug: "tailwindcss" },
      { name: "HTML",       slug: "html5" },
      { name: "CSS",        slug: "css3" },
    ],
  },
  {
    eyebrow: "Backend",
    title: "The part that breaks at 2am.",
    note: "APIs, databases, the boring-but-important stuff. Django, Spring, and the occasional Node detour.",
    tech: [
      { name: "Python",      slug: "python" },
      { name: "Django",      slug: "django" },
      { name: "Java",        slug: "openjdk" },
      { name: "Spring Boot", slug: "springboot" },
      { name: "Node.js",     slug: "nodedotjs" },
      { name: "Postgres",    slug: "postgresql" },
      { name: "AWS",         slug: "amazonwebservices" },
      { name: "Docker",      slug: "docker" },
      { name: "Git",         slug: "git" },
    ],
  },
  {
    eyebrow: "Games & Design",
    title: "The part I do for fun.",
    note: "Godot for everything that moves. Figma when something needs to be drawn first.",
    tech: [
      { name: "Godot",  slug: "godotengine" },
      { name: "Figma",  slug: "figma" },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" style={skillStyles.section}>
      <div style={skillStyles.glow} className="glow-breathe" />
      <div style={skillStyles.inner}>
        <Reveal>
          <div style={skillStyles.head}>
            <h2 style={skillStyles.h}>What I work with.</h2>
            <p style={skillStyles.sub}>Three lanes. The good projects touch all three at once.</p>
          </div>
        </Reveal>
        <div style={skillStyles.grid} data-grid="skills-grid">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 100}>
              <div style={skillStyles.group}>
                <div style={skillStyles.groupHead}>
                  <span>{g.eyebrow}</span>
                  <span style={skillStyles.groupHeadLine}></span>
                </div>
                <h3 style={skillStyles.groupTitle}>{g.title}</h3>
                <p style={skillStyles.groupNote}>{g.note}</p>
                <div style={skillStyles.logoRow}>
                  {g.tech.map((t) => (
                    <div key={t.name} style={skillStyles.logoCell} className="skill-logo-cell" title={t.name}>
                      <img src={`https://cdn.simpleicons.org/${t.slug}/fcfdff`}
                           alt={t.name}
                           style={skillStyles.logo}
                           className="skill-logo-img"
                           loading="lazy" />
                      <span style={skillStyles.logoLabel}>{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Skills };