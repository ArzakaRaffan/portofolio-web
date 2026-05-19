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

const studyData = {
  overview: "A portfolio platform for all Fasilkom UI students — SSO login, file uploads, and a full content review pipeline. Built across 14 weeks as Proyek Perangkat Lunak (PPL) with a team of five.",
  tech: ["Django DRF", "Next.js", "PostgreSQL", "Kubernetes", "JWT cookies", "RBAC", "Prometheus", "Grafana", "Sentry", "SonarQube"],
  contributions: [
    {
      icon: "🔐",
      title: "Auth & RBAC",
      body: "Built JWT cookie-based authentication and a three-tier permission system — IsMahasiswa, IsDosen, IsAdmin. Every API endpoint protected with custom DRF permission classes; roles enforced at the serializer layer too.",
    },
    {
      icon: "🧪",
      title: "Testing",
      body: "Wrote unit and integration tests with pytest and the DRF test client. Reached 95% line coverage. Set up coverage reporting in the CI pipeline so every PR surfaced regressions instantly.",
    },
  ],
  monitoring: {
    body: "Integrated Prometheus metrics into the Django backend, built Grafana dashboards tracking request latency and error rates, and wired Sentry for real-time error capture across both frontend and backend.",
    tools: [
      { label: "Prometheus", detail: "custom metrics endpoint" },
      { label: "Grafana", detail: "latency + error dashboards" },
      { label: "Sentry", detail: "frontend + backend errors" },
    ],
  },
  outcomes: [
    "Passed SonarQube quality gate — 95% line coverage",
    "Zero auth regressions through the full sprint cycle",
    "Full observability stack live: Prometheus → Grafana → Sentry",
  ],
  url: "https://staging-gallery.ppl.cs.ui.ac.id/inventory",
};

const projects = [
  {
    kind: "Game", kindColor: "#11ff99", year: 2026, solo: false,
    title: "Let Neigh Out",
    desc: "A reskin of Let Meow Out, shown at Harmoni Imlek Nusantara in Lapangan Banteng, Jakarta. Same engine, new horse.",
    img: "/assets/projects/let-neigh-out.png",
    stack: "Godot · Aseprite",
    url: "https://samueltaniel.itch.io/let-neigh-out",
    award: "Champion · Garena GJ3 '26",
  },
  {
    kind: "Game", kindColor: "#11ff99", year: 2026, solo: false,
    title: "Let Meow Out",
    desc: "A cat got stuck inside a handheld console. Your job is to get it out. Cozy pixel puzzler, and a game jam champion.",
    img: "/assets/projects/let-meow-out.png",
    stack: "Godot · Aseprite",
    url: "https://viscasa.itch.io/let-meow-out",
    award: "Champion · Garena GJ3 '26",
  },
  {
    kind: "Game", kindColor: "#11ff99", year: 2025, solo: false,
    title: "Alien Brawl",
    desc: "Two players, one couch, one purple planet. My first finished game, and somehow still my favorite.",
    img: "/assets/projects/alien-brawl.png",
    stack: "Godot · Aseprite",
    url: "https://viscasa.itch.io/alien-brawl",
    award: "1st Runner-up · Garena GJ2 '25",
  },
  {
    kind: "Web", kindColor: "#3b9eff", year: 2024, solo: false,
    title: "Gallery Fasilkom",
    desc: "A portfolio platform for Fasilkom UI students. SSO login, uploads, the whole pipeline, built with the PPL team.",
    img: "/assets/projects/gallery-fasilkom.png",
    stack: "Next.js · Django · Postgres",
    url: "https://staging-gallery.ppl.cs.ui.ac.id/inventory",
    caseStudy: true,
  },
  {
    kind: "Web", kindColor: "#3b9eff", year: 2024, solo: true,
    title: "UI Women in Business",
    desc: "Marketing site for the UIWIB student community. Tried to make it feel more like a brand than a club page.",
    img: "/assets/projects/uiwib.png",
    stack: "Next.js · TypeScript",
    url: "https://uiwomeninbusiness.com",
  },
  {
    kind: "Game", kindColor: "#11ff99", year: 2025, solo: true,
    title: "Soul Swap",
    desc: "Solo game jam submission for my Game Development course at Fasilkom UI. About swapping souls between robots.",
    img: "/assets/projects/soul-swap.png",
    stack: "Godot · Aseprite",
    url: "https://heisenbergers.itch.io/soulswap",
  },
  {
    kind: "Game", kindColor: "#11ff99", year: 2025, solo: false,
    title: "MIL Arcade",
    desc: "Built for the UNESCO Youth Hackathon 2025. A small arcade game about Media and Information Literacy.",
    img: "/assets/projects/mil-arcade.png",
    stack: "Godot · Figma",
    url: "https://heisenbergers.itch.io/mil-unesco",
  },
  {
    kind: "Game", kindColor: "#11ff99", year: 2025, solo: false,
    title: "CleaNet",
    desc: "A little hero with a megaphone, cleaning up a circuit-board world. Pixel art at its most colorful.",
    img: "/assets/projects/cleanet.png",
    stack: "Godot · Aseprite",
    url: "https://heisenbergers.itch.io/cleanet",
  },
  {
    kind: "Game", kindColor: "#11ff99", year: 2025, solo: false,
    title: "Adit & The Miraculous Toad",
    desc: "A cozy 2D adventure in Bahasa Indonesia about a boy, a frog, and a journey worth taking.",
    img: "/assets/projects/adit.png",
    stack: "Godot · Aseprite",
    url: "https://heisenbergers.itch.io/adit-and-the-miraculous-toad-the-green-journey",
  },
];

const FILTERS = ["All", "Games", "Web"];

function CaseStudyModal({ onClose }) {
  const s = studyData;
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
      onClick={onClose}
    >
      <div
        className="modal-panel-in"
        style={{
          background: "var(--surface-card)",
          boxShadow: "inset 0 0 0 1px var(--hairline-bright)",
          borderRadius: 16, maxWidth: 640, width: "100%",
          maxHeight: "88vh", overflowY: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div style={{ position: "relative", aspectRatio: "16 / 8", overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
          <img
            src="/assets/projects/gallery-fasilkom.png"
            alt="Gallery Fasilkom"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.65) 100%)" }} />
          <button
            style={{
              position: "absolute", top: 14, right: 14,
              background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
              border: "none", borderRadius: "50%", width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--ink)",
              boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
            }}
            onClick={onClose}
          >
            <Icon name="x" size={14} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px 36px" }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--mute)", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 10 }}>
              2024 · Web Platform · Team project
            </div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 30, fontWeight: 400, letterSpacing: "-0.5px", color: "var(--ink)", margin: 0, lineHeight: 1.1 }}>
              Gallery Fasilkom
            </h3>
          </div>

          {/* Overview */}
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--body)", marginBottom: 28, marginTop: 0 }}>
            {s.overview}
          </p>

          {/* Stack */}
          <section style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, letterSpacing: "0.7px", textTransform: "uppercase", color: "var(--mute)", marginBottom: 12 }}>
              Stack
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {s.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--body)",
                    background: "rgba(252,253,255,0.04)",
                    boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
                    borderRadius: 6, padding: "4px 10px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* My Contributions */}
          <section style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, letterSpacing: "0.7px", textTransform: "uppercase", color: "var(--mute)", marginBottom: 14 }}>
              My Contributions
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {s.contributions.map((c) => (
                <div
                  key={c.title}
                  style={{
                    background: "rgba(252,253,255,0.02)",
                    boxShadow: "inset 0 0 0 1px var(--hairline)",
                    borderRadius: 10, padding: "15px 18px",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
                    {c.icon} {c.title}
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--body)", margin: 0 }}>
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Testing & Monitoring — dedicated section */}
          <section style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, letterSpacing: "0.7px", textTransform: "uppercase", color: "var(--mute)", marginBottom: 14 }}>
              Testing &amp; Monitoring
            </div>
            <div
              style={{
                background: "rgba(17,255,153,0.03)",
                boxShadow: "inset 0 0 0 1px rgba(17,255,153,0.10)",
                borderRadius: 10, padding: "18px 20px",
              }}
            >
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 10 }}>
                📊 Observability Stack
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--body)", margin: "0 0 16px" }}>
                {s.monitoring.body}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {s.monitoring.tools.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      background: "rgba(17,255,153,0.05)",
                      boxShadow: "inset 0 0 0 1px rgba(17,255,153,0.13)",
                      borderRadius: 8, padding: "8px 12px",
                    }}
                  >
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent-green)", marginBottom: 2 }}>
                      {m.label}
                    </div>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--mute)" }}>
                      {m.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Outcomes */}
          <section style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, letterSpacing: "0.7px", textTransform: "uppercase", color: "var(--mute)", marginBottom: 14 }}>
              Outcomes
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {s.outcomes.map((o) => (
                <li key={o} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--body)", lineHeight: 1.55 }}>
                  <span style={{ color: "var(--accent-green)", flexShrink: 0, marginTop: 1 }}>
                    <Icon name="check" size={14} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </section>

          {/* Footer links */}
          <div style={{ display: "flex", gap: 10 }}>
            <a
              href={s.url} target="_blank" rel="noopener noreferrer"
              className="btn btn--primary"
              style={{ fontSize: 13, height: 36, padding: "0 16px", gap: 6 }}
            >
              Visit Project <Icon name="arrow-up-right" size={12} />
            </a>
            <button
              onClick={onClose}
              className="btn btn--ghost"
              style={{ fontSize: 13, height: 36, padding: "0 16px" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectedWork() {
  const [filter, setFilter] = React.useState("All");
  const [hov, setHov] = React.useState(-1);
  const [openStudy, setOpenStudy] = React.useState(false);

  React.useEffect(() => {
    if (!openStudy) return;
    const handler = (e) => { if (e.key === "Escape") setOpenStudy(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openStudy]);

  React.useEffect(() => {
    document.body.style.overflow = openStudy ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openStudy]);

  const counts = {
    All: projects.length,
    Games: projects.filter((p) => p.kind === "Game").length,
    Web: projects.filter((p) => p.kind === "Web").length,
  };
  const visible = filter === "All" ? projects : projects.filter((p) =>
    (filter === "Games" && p.kind === "Game") || (filter === "Web" && p.kind === "Web")
  );

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
          {visible.map((p, i) => {
            const cardStyle = {
              ...workStyles.card,
              animationDelay: `${i * 60}ms`,
              boxShadow: hov === i
                ? "inset 0 0 0 1px var(--hairline-bright)"
                : "inset 0 0 0 1px var(--hairline-strong)",
            };

            const inner = (
              <>
                <div style={workStyles.visual}>
                  <img src={p.img} alt={p.title} style={{
                    ...workStyles.img,
                    transform: hov === i ? "scale(1.03)" : "scale(1.0)",
                  }} />
                  <div style={workStyles.shade} />
                  <div style={workStyles.topBadges}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={workStyles.badge}>
                        <span style={{ ...workStyles.badgeDot, background: p.kindColor, boxShadow: `0 0 8px ${p.kindColor}` }} />
                        {p.kind}
                      </span>
                      <span style={{ ...workStyles.badge, color: p.solo ? "var(--accent-green)" : "var(--mute)" }}>
                        {p.solo ? "Solo" : "Team"}
                      </span>
                    </div>
                    {p.award && (
                      <span style={workStyles.awardBadge}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" /></svg>
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
                    {p.caseStudy ? (
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <a
                          href={p.url} target="_blank" rel="noopener noreferrer"
                          style={{ ...workStyles.more, color: "var(--mute)" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Visit <Icon name="external" size={11} />
                        </a>
                        <span style={{ color: "var(--stone)", fontSize: 10 }}>·</span>
                        <span style={workStyles.more}>
                          Case Study <Icon name="arrow-up-right" size={12} />
                        </span>
                      </div>
                    ) : (
                      <span style={workStyles.more}>Visit <Icon name="arrow-up-right" size={12} /></span>
                    )}
                  </div>
                </div>
              </>
            );

            if (p.caseStudy) {
              return (
                <div key={p.title} className="card-fade-in"
                     style={cardStyle}
                     onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)}
                     onClick={() => setOpenStudy(true)}>
                  {inner}
                </div>
              );
            }

            return (
              <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer"
                 className="card-fade-in"
                 style={cardStyle}
                 onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)}>
                {inner}
              </a>
            );
          })}
        </div>
      </div>

      {openStudy && <CaseStudyModal onClose={() => setOpenStudy(false)} />}
    </section>
  );
}

export { SelectedWork };
