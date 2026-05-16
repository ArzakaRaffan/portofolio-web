"use client";
import React from "react";
import { Reveal } from "./Animations";

// Experience — student orgs, roles, freelance, teaching. The CV body.
const expStyles = {
  section: { position: "relative", padding: "120px 0", overflow: "hidden", borderTop: "1px solid var(--hairline-strong)" },
  glow: {
    position: "absolute", inset: "-30% -10% 50% -10%",
    background: "radial-gradient(closest-side at 80% 20%, rgba(255,89,0,0.18), transparent 65%)",
    filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
  },
  inner: { position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 32px" },
  head: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, gap: 24, flexWrap: "wrap" },
  h: {
    fontFamily: "var(--font-serif)", fontSize: 56, lineHeight: 1.0, fontWeight: 400,
    letterSpacing: "-0.96px", color: "var(--ink)", margin: 0,
  },
  sub: { fontSize: 15, color: "var(--mute)", fontFamily: "var(--font-sans)", maxWidth: 320, margin: 0, lineHeight: 1.5 },

  list: { display: "flex", flexDirection: "column", gap: 0 },
  item: {
    display: "grid",
    gridTemplateColumns: "160px minmax(0, 1.4fr) minmax(0, 1fr) auto",
    gap: 28,
    padding: "24px 0",
    borderTop: "1px solid var(--hairline-strong)",
    alignItems: "baseline",
  },
  date: {
    fontFamily: "var(--font-mono)", fontSize: 12,
    color: "var(--mute)", letterSpacing: "0.3px",
  },
  current: {
    display: "inline-block",
    marginLeft: 6,
    width: 6, height: 6, borderRadius: "50%",
    background: "var(--accent-green)",
    boxShadow: "0 0 8px var(--accent-green)",
    verticalAlign: "middle",
  },
  roleBlock: { display: "flex", flexDirection: "column", gap: 4 },
  role: {
    fontFamily: "var(--font-serif)", fontSize: 22, lineHeight: 1.15,
    letterSpacing: "-0.3px", color: "var(--ink)", margin: 0, fontWeight: 400,
  },
  subRoles: {
    display: "flex", flexDirection: "column", gap: 2,
    marginTop: 6, paddingLeft: 0,
  },
  subRole: {
    fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--body)",
    display: "flex", alignItems: "baseline", gap: 8,
  },
  subRoleBar: {
    color: "var(--mute)", fontFamily: "var(--font-mono)", fontSize: 11,
  },
  orgBlock: { display: "flex", flexDirection: "column", gap: 4 },
  org: {
    fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink)",
    margin: 0,
  },
  place: {
    fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--mute)",
    margin: 0,
  },
  kind: {
    fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--mute)",
    letterSpacing: "0.5px", textTransform: "uppercase",
    padding: "4px 10px", borderRadius: 9999,
    boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
    background: "rgba(252,253,255,0.02)",
    whiteSpace: "nowrap",
  },
};

const experience = [
  {
    date: "Mar 2024 — Present",
    current: true,
    role: "Game Development",
    org: "RISTEK Fasilkom UI",
    place: "Universitas Indonesia",
    kind: "Student org",
    subs: [
      { y: "Feb 2026 — Present", t: "Director of Game Development" },
      { y: "Mar 2025 — Feb 2026", t: "Lead of Game Development" },
      { y: "Mar 2024 — Mar 2025", t: "Member of Game Development" },
    ],
  },
  {
    date: "Aug 2025 — Present",
    current: true,
    role: "Master Teacher",
    org: "Ruangguru",
    place: "Freelance",
    kind: "Teaching",
  },
  {
    date: "Jul 2025 — Present",
    current: true,
    role: "Teaching Assistant",
    org: "Computer Science · Universitas Indonesia",
    place: "Depok, Jawa Barat",
    kind: "Teaching",
    subs: [
      { y: "Feb 2026 — Present", t: "Introduction to Software Security" },
      { y: "Jul 2025 — Jan 2026", t: "Data Structures and Algorithms" },
      { y: "Jul 2025 — Jan 2026", t: "Introduction to Computer Organization" },
    ],
  },
  {
    date: "Jun 2024 — Dec 2025",
    role: "Art & Culture Department",
    org: "BEM Fasilkom UI",
    place: "Universitas Indonesia",
    kind: "Student org",
    subs: [
      { y: "Mar 2025 — Dec 2025", t: "Head Deputy of Art & Culture" },
      { y: "Jun 2024 — Dec 2024", t: "Staff of Art & Culture" },
    ],
  },
  {
    date: "Oct 2023 — Nov 2023",
    role: "Project Officer",
    org: "Gelar Karya Fasilkom UI 2023",
    place: "Universitas Indonesia",
    kind: "Event",
  },
  {
    date: "Sep 2022 — Mar 2025",
    role: "Political Journalist",
    org: "kataindonesia.com",
    place: "Freelance",
    kind: "Writing",
  },
];

function Experience() {
  return (
    <section id="experience" style={expStyles.section}>
      <div style={expStyles.glow} className="glow-breathe" />
      <div style={expStyles.inner}>
        <Reveal>
          <div style={expStyles.head}>
            <h2 style={expStyles.h}>Experience.</h2>
            <p style={expStyles.sub}>Teaching, student orgs, freelance writing. The stuff between projects.</p>
          </div>
        </Reveal>
        <div style={expStyles.list}>
          {experience.map((e, i) => (
            <Reveal key={i} delay={Math.min(i * 60, 360)}>
              <div style={expStyles.item}>
              <span style={expStyles.date}>
                {e.date}
                {e.current && <span style={expStyles.current} title="Current"></span>}
              </span>
              <div style={expStyles.roleBlock}>
                <h3 style={expStyles.role}>{e.role}</h3>
                {e.subs && (
                  <div style={expStyles.subRoles}>
                    {e.subs.map((s, j) => (
                      <div key={j} style={expStyles.subRole}>
                        <span style={expStyles.subRoleBar}>↳</span>
                        <span>{s.t} <span style={{ color: "var(--mute)" }}>· {s.y}</span></span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={expStyles.orgBlock}>
                <p style={expStyles.org}>{e.org}</p>
                <p style={expStyles.place}>{e.place}</p>
              </div>
              <span style={expStyles.kind}>{e.kind}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Experience };