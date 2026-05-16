"use client";
import React from "react";
import { Icon } from "./Icons";
import { Reveal } from "./Animations";

const workStyles = {
  section: { position: "relative", padding: "56px 0 96px", overflow: "hidden" },
  glow: {
    position: "absolute", inset: "-20% -10% 60% -10%",
    background: "radial-gradient(closest-side at 80% 20%, rgba(0,117,255,0.20), transparent 65%)",
    filter: "blur(70px)", pointerEvents: "none", zIndex: 0,
  },
  inner: { position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 32px" },
  head: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, gap: 24, flexWrap: "wrap" },
  title: {
    fontFamily: "var(--font-serif)", fontSize: 56, lineHeight: 1.0,
    letterSpacing: "-0.96px", color: "var(--ink)", margin: 0, fontWeight: 400,
  },
  sub: { fontSize: 15, color: "var(--mute)", fontFamily: "var(--font-sans)", maxWidth: 320, margin: 0, lineHeight: 1.5 },

  filterRow: {
    display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap",
    paddingBottom: 20, borderBottom: "1px solid var(--hairline)",
  },
  filter: {
    fontFamily: "var(--font-ui)", fontSize: 13,
    padding: "8px 16px", borderRadius: 9999,
    color: "var(--body)", background: "transparent",
    boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
    cursor: "pointer", userSelect: "none",
    transition: "all 160ms cubic-bezier(0.16,1,0.3,1)",
    display: "inline-flex", alignItems: "center", gap: 8,
  },
  filterActive: {
    color: "var(--primary-on)", background: "var(--primary-white)",
    boxShadow: "none",
  },
  count: {
    fontFamily: "var(--font-mono)", fontSize: 10, opacity: 0.65,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
  },
  card: {
    background: "var(--surface-card)",
    borderRadius: 12,
    boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
    overflow: "hidden",
    transition: "box-shadow 240ms cubic-bezier(0.16,1,0.3,1)",
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
  },
  visual: {
    position: "relative",
    aspectRatio: "16 / 10",
    overflow: "hidden",
    background: "var(--surface-deep)",
    borderBottom: "1px solid var(--hairline-strong)",
  },
  img: {
    width: "100%", height: "100%",
    objectFit: "cover", objectPosition: "center",
    display: "block",
    transition: "transform 600ms cubic-bezier(0.16,1,0.3,1)",
    imageRendering: "auto",
  },
  shade: {
    position: "absolute", inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
    pointerEvents: "none",
  },
  topBadges: {
    position: "absolute", top: 12, left: 12, right: 12,
    display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8,
  },
  badge: {
    fontFamily: "var(--font-ui)", fontSize: 10,
    color: "var(--ink)",
    letterSpacing: "0.5px", textTransform: "uppercase",
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    padding: "5px 10px", borderRadius: 9999,
    boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
    display: "inline-flex", alignItems: "center", gap: 7,
  },
  awardBadge: {
    fontFamily: "var(--font-ui)", fontSize: 10,
    color: "#0a0a0c",
    letterSpacing: "0.5px", textTransform: "uppercase",
    background: "#ffc53d",
    padding: "5px 10px", borderRadius: 9999,
    display: "inline-flex", alignItems: "center", gap: 6,
    fontWeight: 500,
  },
  badgeDot: { width: 6, height: 6, borderRadius: "50%" },

  copy: { padding: "18px 20px 22px", display: "flex", flexDirection: "column", gap: 8, flex: 1 },
  meta: {
    fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--mute)",
    letterSpacing: "0.6px", textTransform: "uppercase",
  },
  h: {
    fontFamily: "var(--font-serif)", fontSize: 22, lineHeight: 1.2,
    letterSpacing: "-0.3px", color: "var(--ink)", margin: 0, fontWeight: 400,
  },
  desc: { fontSize: 13, lineHeight: 1.55, color: "var(--body)", margin: 0 },
  footer: {
    marginTop: "auto", paddingTop: 10,
    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
  },
  stack: { fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--mute)", letterSpacing: "0.3px" },
  more: {
    display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12,
    color: "var(--ink)", fontFamily: "var(--font-ui)", fontWeight: 500,
  },
};

const projects = [
  {
    kind: "Game",
    kindColor: "#11ff99",
    year: 2026,
    title: "Let Neigh Out",
    desc: "A reskin of Let Meow Out, shown at Harmoni Imlek Nusantara in Lapangan Banteng, Jakarta. Same engine, new horse.",
    img: "/assets/projects/let-neigh-out.png",
    stack: "Godot · Aseprite",
    url: "https://samueltaniel.itch.io/let-neigh-out",
    award: "Champion · Garena GJ3 ’26",
  },
  {
    kind: "Game",
    kindColor: "#11ff99",
    year: 2026,
    title: "Let Meow Out",
    desc: "A cat got stuck inside a handheld console. Your job is to get it out. Cozy pixel puzzler, and a game jam champion.",
    img: "/assets/projects/let-meow-out.png",
    stack: "Godot · Aseprite",
    url: "https://viscasa.itch.io/let-meow-out",
    award: "Champion · Garena GJ3 ’26",
  },
  {
    kind: "Game",
    kindColor: "#11ff99",
    year: 2025,
    title: "Alien Brawl",
    desc: "Two players, one couch, one purple planet. My first finished game, and somehow still my favorite.",
    img: "/assets/projects/alien-brawl.png",
    stack: "Godot · Aseprite",
    url: "https://viscasa.itch.io/alien-brawl",
    award: "1st Runner-up · Garena GJ2 ’25",
  },
  {
    kind: "Web",
    kindColor: "#3b9eff",
    year: 2024,
    title: "Gallery Fasilkom",
    desc: "A portfolio platform for Fasilkom UI students. SSO login, uploads, the whole pipeline, built with the PPL team.",
    img: "/assets/projects/gallery-fasilkom.png",
    stack: "Next.js · Django · Postgres",
    url: "https://staging-gallery.ppl.cs.ui.ac.id/inventory",
  },
  {
    kind: "Web",
    kindColor: "#3b9eff",
    year: 2024,
    title: "UI Women in Business",
    desc: "Marketing site for the UIWIB student community. Tried to make it feel more like a brand than a club page.",
    img: "/assets/projects/uiwib.png",
    stack: "Next.js · TypeScript",
    url: "https://uiwomeninbusiness.com",
  },
  {
    kind: "Game",
    kindColor: "#11ff99",
    year: 2025,
    title: "Soul Swap",
    desc: "Solo game jam submission for my Game Development course at Fasilkom UI. About swapping souls between planets.",
    img: "/assets/projects/soul-swap.png",
    stack: "Godot · Aseprite",
    url: "https://heisenbergers.itch.io/soulswap",
  },
  {
    kind: "Game",
    kindColor: "#11ff99",
    year: 2025,
    title: "MIL Arcade",
    desc: "Built for the UNESCO Youth Hackathon 2025. A small arcade game about Media and Information Literacy.",
    img: "/assets/projects/mil-arcade.png",
    stack: "Godot · Figma",
    url: "https://heisenbergers.itch.io/mil-unesco",
  },
  {
    kind: "Game",
    kindColor: "#11ff99",
    year: 2025,
    title: "CleaNet",
    desc: "A little hero with a megaphone, cleaning up a circuit-board world. Pixel art at its most colorful.",
    img: "/assets/projects/cleanet.png",
    stack: "Godot · Aseprite",
    url: "https://heisenbergers.itch.io/cleanet",
  },
  {
    kind: "Game",
    kindColor: "#11ff99",
    year: 2025,
    title: "Adit & The Miraculous Toad",
    desc: "A cozy 2D adventure in Bahasa Indonesia about a boy, a frog, and a journey worth taking.",
    img: "/assets/projects/adit.png",
    stack: "Godot · Aseprite",
    url: "https://heisenbergers.itch.io/adit-and-the-miraculous-toad-the-green-journey",
  },
];

const FILTERS = ["All", "Games", "Web"];

function SelectedWork() {
  const [filter, setFilter] = React.useState("All");
  const [hov, setHov] = React.useState(-1);

  const counts = {
    All: projects.length,
    Games: projects.filter((p) => p.kind === "Game").length,
    Web: projects.filter((p) => p.kind === "Web").length,
  };
  const visible = filter === "All" ? projects : projects.filter((p) => p.kind === filter.slice(0, -1) || (filter === "Web" && p.kind === "Web") || (filter === "Games" && p.kind === "Game"));

  return (
    <section id="work" style={workStyles.section}>
      <div style={workStyles.glow} className="glow-breathe" />
      <div style={workStyles.inner}>
        <Reveal>
          <div style={workStyles.head}>
            <h2 style={workStyles.title}>The work.</h2>
            <p style={workStyles.sub}>A mix of student projects, jam games, and the occasional thing built for a community.</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div style={workStyles.filterRow}>
            {FILTERS.map((f) => (
              <button key={f}
                      style={{ ...workStyles.filter, ...(filter === f ? workStyles.filterActive : {}) }}
                      onClick={() => setFilter(f)}>
                {f} <span style={workStyles.count}>{counts[f]}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div style={workStyles.grid} data-grid="work-grid" key={filter}>
          {visible.map((p, i) => (
            <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer"
               className="card-fade-in"
               style={{
                 ...workStyles.card,
                 animationDelay: `${i * 60}ms`,
                 boxShadow: hov === i
                   ? "inset 0 0 0 1px var(--hairline-bright)"
                   : "inset 0 0 0 1px var(--hairline-strong)",
               }}
               onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)}>
              <div style={workStyles.visual}>
                <img src={p.img} alt={p.title} style={{
                  ...workStyles.img,
                  transform: hov === i ? "scale(1.03)" : "scale(1.0)",
                }} />
                <div style={workStyles.shade}></div>
                <div style={workStyles.topBadges}>
                  <span style={workStyles.badge}>
                    <span style={{ ...workStyles.badgeDot, background: p.kindColor, boxShadow: `0 0 8px ${p.kindColor}` }}></span>
                    {p.kind}
                  </span>
                  {p.award && (
                    <span style={workStyles.awardBadge}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
                      Award
                    </span>
                  )}
                </div>
              </div>
              <div style={workStyles.copy}>
                <div style={workStyles.meta}>{p.year} · {p.award || p.kind}</div>
                <h3 style={workStyles.h}>{p.title}</h3>
                <p style={workStyles.desc}>{p.desc}</p>
                <div style={workStyles.footer}>
                  <span style={workStyles.stack}>{p.stack}</span>
                  <span style={workStyles.more}>Visit <Icon name="arrow-up-right" size={12} /></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export { SelectedWork };