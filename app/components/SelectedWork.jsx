"use client";
import React from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Icon } from "./Icons";
import { Reveal } from "./Animations";
import { cn } from "@/lib/utils";

/* ─── Case study data ─────────────────────────────────────────────────── */
const studyData = {
  overview: "A portfolio platform for all Fasilkom UI students — SSO login, file uploads, and a full content review pipeline. Built across 14 weeks as Proyek Perangkat Lunak (PPL) with a team of five.",
  tech: ["Django DRF", "Next.js", "PostgreSQL", "Kubernetes", "JWT cookies", "RBAC", "Prometheus", "Grafana", "Sentry", "SonarQube"],
  contributions: [
    { icon: "🔐", title: "Auth & RBAC", body: "Built JWT cookie-based authentication and a three-tier permission system — IsMahasiswa, IsDosen, IsAdmin. Every API endpoint protected with custom DRF permission classes; roles enforced at the serializer layer too." },
    { icon: "🧪", title: "Testing",     body: "Wrote unit and integration tests with pytest and the DRF test client. Reached 95% line coverage. Set up coverage reporting in the CI pipeline so every PR surfaced regressions instantly." },
  ],
  monitoring: {
    body: "Integrated Prometheus metrics into the Django backend, built Grafana dashboards tracking request latency and error rates, and wired Sentry for real-time error capture across both frontend and backend.",
    tools: [
      { label: "Prometheus", detail: "custom metrics endpoint" },
      { label: "Grafana",    detail: "latency + error dashboards" },
      { label: "Sentry",     detail: "frontend + backend errors" },
    ],
  },
  outcomes: [
    "Passed SonarQube quality gate — 95% line coverage",
    "Zero auth regressions through the full sprint cycle",
    "Full observability stack live: Prometheus → Grafana → Sentry",
  ],
  url: "https://staging-gallery.ppl.cs.ui.ac.id/inventory",
};

/* ─── Projects data ───────────────────────────────────────────────────── */
const projects = [
  {
    kind: "Game", kindColor: "#11ff99", year: 2026, solo: false,
    title: "Let Neigh Out",
    desc: "A reskin of Let Meow Out, shown at Harmoni Imlek Nusantara in Lapangan Banteng, Jakarta. Same engine, new horse.",
    img: "/assets/projects/let-neigh-out.png", stack: "Godot · Aseprite",
    url: "https://samueltaniel.itch.io/let-neigh-out", award: "Champion · Garena GJ3 '26",
    embed: "https://itch.io/embed-upload/16564759?color=333333",
  },
  {
    kind: "Game", kindColor: "#11ff99", year: 2026, solo: false,
    title: "Let Meow Out",
    desc: "A cat got stuck inside a handheld console. Your job is to get it out. Cozy pixel puzzler, and a game jam champion.",
    img: "/assets/projects/let-meow-out.png", stack: "Godot · Aseprite",
    url: "https://viscasa.itch.io/let-meow-out", award: "Champion · Garena GJ3 '26",
    embed: "https://itch.io/embed-upload/16552477?color=333333",
  },
  {
    kind: "Game", kindColor: "#11ff99", year: 2025, solo: false,
    title: "Alien Brawl",
    desc: "Two players, one couch, one purple planet. My first finished game, and somehow still my favorite.",
    img: "/assets/projects/alien-brawl.png", stack: "Godot · Aseprite",
    url: "https://viscasa.itch.io/alien-brawl", award: "1st Runner-up · Garena GJ2 '25",
    embed: "https://itch.io/embed-upload/12736154?color=43276f",
  },
  {
    kind: "Web", kindColor: "#3b9eff", year: 2024, solo: false,
    title: "Gallery Fasilkom",
    desc: "A portfolio platform for Fasilkom UI students. SSO login, uploads, the whole pipeline, built with the PPL team.",
    img: "/assets/projects/gallery-fasilkom.png", stack: "Next.js · Django · Postgres",
    url: "https://staging-gallery.ppl.cs.ui.ac.id/inventory", caseStudy: true,
  },
  {
    kind: "Web", kindColor: "#3b9eff", year: 2024, solo: true,
    title: "UI Women in Business",
    desc: "Marketing site for the UIWIB student community. Tried to make it feel more like a brand than a club page.",
    img: "/assets/projects/uiwib.png", stack: "Next.js · TypeScript",
    url: "https://uiwomeninbusiness.com",
  },
  {
    kind: "Game", kindColor: "#11ff99", year: 2025, solo: true,
    title: "Soul Swap",
    desc: "Solo game jam submission for my Game Development course at Fasilkom UI. About swapping souls between robots.",
    img: "/assets/projects/soul-swap.png", stack: "Godot · Aseprite",
    url: "https://heisenbergers.itch.io/soulswap",
  },
  {
    kind: "Game", kindColor: "#11ff99", year: 2025, solo: false,
    title: "MIL Arcade",
    desc: "Built for the UNESCO Youth Hackathon 2025. A small arcade game about Media and Information Literacy.",
    img: "/assets/projects/mil-arcade.png", stack: "Godot · Figma",
    url: "https://heisenbergers.itch.io/mil-unesco",
  },
  {
    kind: "Game", kindColor: "#11ff99", year: 2025, solo: false,
    title: "CleaNet",
    desc: "A little hero with a megaphone, cleaning up a circuit-board world. Pixel art at its most colorful.",
    img: "/assets/projects/cleanet.png", stack: "Godot · Aseprite",
    url: "https://heisenbergers.itch.io/cleanet",
    embed: "https://itch.io/embed-upload/10901717?color=cc5353",
  },
  {
    kind: "Game", kindColor: "#11ff99", year: 2025, solo: false,
    title: "Adit & The Miraculous Toad",
    desc: "A cozy 2D adventure in Bahasa Indonesia about a boy, a frog, and a journey worth taking.",
    img: "/assets/projects/adit.png", stack: "Godot · Aseprite",
    url: "https://heisenbergers.itch.io/adit-and-the-miraculous-toad-the-green-journey",
    embed: "https://itch.io/embed-upload/10901857?color=000000",
  },
];

const FILTERS = ["All", "Games", "Web"];
const popupOpts = "width=640,height=460,menubar=no,toolbar=no,location=no,status=no,resizable=yes";

/* ─── Case Study Modal ────────────────────────────────────────────────── */
function CaseStudyModal({ onClose }) {
  const s = studyData;
  React.useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-surface-card shadow-border-bright rounded-2xl w-full max-w-[640px] max-h-[88vh] overflow-y-auto relative"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative aspect-[16/8] overflow-hidden rounded-t-2xl">
          <img src="/assets/projects/gallery-fasilkom.png" alt="Gallery Fasilkom"
               className="w-full h-full object-cover" />
          <div className="absolute inset-0"
               style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.65) 100%)" }} />
          <button
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center
                       border-0 cursor-pointer text-ink"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", boxShadow: "inset 0 0 0 1px rgba(252,253,255,0.10)" }}
            onClick={onClose}
          >
            <Icon name="x" size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pt-7 pb-9">
          <div className="mb-6">
            <div className="font-mono text-[10px] text-mute tracking-[0.6px] uppercase mb-2.5">2024 · Web Platform · Team project</div>
            <h3 className="font-display text-[30px] tracking-[-0.5px] text-ink m-0 leading-[1.1] font-normal">Gallery Fasilkom</h3>
          </div>
          <p className="text-[14px] leading-[1.7] text-body mb-7 mt-0">{s.overview}</p>

          {/* Stack */}
          <section className="mb-7">
            <div className="font-ui text-[11px] font-medium tracking-[0.7px] uppercase text-mute mb-3">Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {s.tech.map((t) => (
                <span key={t} className="font-mono text-[11px] text-body bg-surface-card/40 shadow-border rounded-md px-2.5 py-1">{t}</span>
              ))}
            </div>
          </section>

          {/* Contributions */}
          <section className="mb-7">
            <div className="font-ui text-[11px] font-medium tracking-[0.7px] uppercase text-mute mb-3.5">My Contributions</div>
            <div className="flex flex-col gap-2.5">
              {s.contributions.map((c) => (
                <div key={c.title} className="bg-surface-card/20 shadow-border-dim rounded-xl p-[15px_18px]">
                  <div className="font-ui text-[13px] font-medium text-ink mb-1.5">{c.icon} {c.title}</div>
                  <p className="text-[13px] leading-[1.65] text-body m-0">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Monitoring */}
          <section className="mb-7">
            <div className="font-ui text-[11px] font-medium tracking-[0.7px] uppercase text-mute mb-3.5">Testing &amp; Monitoring</div>
            <div className="rounded-xl p-[18px_20px]"
                 style={{ background: "rgba(17,255,153,0.03)", boxShadow: "inset 0 0 0 1px rgba(17,255,153,0.10)" }}>
              <div className="font-ui text-[13px] font-medium text-ink mb-2.5">📊 Observability Stack</div>
              <p className="text-[13px] leading-[1.65] text-body mb-4 m-0">{s.monitoring.body}</p>
              <div className="flex gap-2 flex-wrap">
                {s.monitoring.tools.map((m) => (
                  <div key={m.label} className="rounded-lg p-[8px_12px]"
                       style={{ background: "rgba(17,255,153,0.05)", boxShadow: "inset 0 0 0 1px rgba(17,255,153,0.13)" }}>
                    <div className="font-mono text-[11px] text-accent-green mb-0.5">{m.label}</div>
                    <div className="font-ui text-[11px] text-mute">{m.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Outcomes */}
          <section className="mb-8">
            <div className="font-ui text-[11px] font-medium tracking-[0.7px] uppercase text-mute mb-3.5">Outcomes</div>
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              {s.outcomes.map((o) => (
                <li key={o} className="flex gap-2.5 items-start text-[13px] text-body leading-relaxed">
                  <span className="text-accent-green flex-shrink-0 mt-0.5"><Icon name="check" size={14} /></span>
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <div className="flex gap-2.5">
            <a href={s.url} target="_blank" rel="noopener noreferrer"
               className="btn btn--primary" style={{ fontSize: 13, height: 36, padding: "0 16px", gap: 6 }}>
              Visit Project <Icon name="arrow-up-right" size={12} />
            </a>
            <button onClick={onClose} className="btn btn--ghost" style={{ fontSize: 13, height: 36, padding: "0 16px" }}>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Work Card ───────────────────────────────────────────────────────── */
function WorkCard({ p, i, onStudy }) {
  const [hov, setHov] = React.useState(false);
  const ref = React.useRef(null);

  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 400, damping: 40 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 400, damping: 40 });

  // Cursor spotlight
  const spotX = useMotionValue(0.5);
  const spotY = useMotionValue(0.5);
  const xPct  = useTransform(spotX, [0, 1], ["0%", "100%"]);
  const yPct  = useTransform(spotY, [0, 1], ["0%", "100%"]);
  const spotlight = useMotionTemplate`radial-gradient(200px circle at ${xPct} ${yPct}, rgba(255,255,255,0.04), transparent 70%)`;

  const handleMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
    spotX.set((e.clientX - left) / width);
    spotY.set((e.clientY - top) / height);
  };
  const handleLeave = () => {
    mouseX.set(0); mouseY.set(0);
    setHov(false);
  };

  const cardBase = cn(
    "bg-surface-card rounded-xl overflow-hidden flex flex-col no-underline text-inherit",
    "transition-shadow duration-[240ms] card-fade-in",
    p.embed && "cursor-pointer"
  );
  const cardStyle = {
    animationDelay: `${i * 60}ms`,
    boxShadow: hov ? "inset 0 0 0 1px rgba(252,253,255,0.16)" : "inset 0 0 0 1px rgba(252,253,255,0.10)",
  };

  const inner = (
    <>
      {/* Cursor spotlight overlay */}
      <motion.div className="absolute inset-0 pointer-events-none z-[5] rounded-xl" style={{ background: spotlight }} />

      {/* Visual */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-deep border-b border-hairline-strong">
        <img src={p.img} alt={p.title}
             className="w-full h-full object-cover block transition-transform duration-[600ms]"
             style={{ transform: hov ? "scale(1.03)" : "scale(1.0)" }} />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)" }} />

        {/* Play overlay */}
        {p.embed && (
          <motion.div
            className="absolute inset-0 z-[3] flex items-center justify-center"
            animate={{ opacity: hov ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-accent-green text-[16px]"
                 style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", border: "1.5px solid rgba(17,255,153,0.65)" }}>
              ▶
            </div>
          </motion.div>
        )}
        {p.embed && (
          <div className="absolute bottom-2.5 right-2.5 z-[2] font-ui text-[9px] text-accent-green tracking-[0.5px] uppercase px-2 py-1 rounded-full"
               style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", boxShadow: "inset 0 0 0 1px rgba(17,255,153,0.3)" }}>
            ▶ Playable
          </div>
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-[2]">
          <div className="flex gap-1.5">
            <span className="font-ui text-[10px] text-ink tracking-[0.5px] uppercase inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-full"
                  style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", boxShadow: "inset 0 0 0 1px rgba(252,253,255,0.10)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.kindColor, boxShadow: `0 0 8px ${p.kindColor}` }} />
              {p.kind}
            </span>
            <span className="font-ui text-[10px] tracking-[0.5px] uppercase inline-flex items-center px-2.5 py-[5px] rounded-full"
                  style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", boxShadow: "inset 0 0 0 1px rgba(252,253,255,0.10)", color: p.solo ? "var(--accent-green)" : "var(--mute)" }}>
              {p.solo ? "Solo" : "Team"}
            </span>
          </div>
          {p.award && (
            <span className="font-ui text-[10px] text-[#0a0a0c] tracking-[0.5px] uppercase bg-accent-yellow inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-full font-medium">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" /></svg>
              Award
            </span>
          )}
        </div>
      </div>

      {/* Copy */}
      <div className="p-[18px_20px_22px] flex flex-col gap-2 flex-1">
        <div className="font-mono text-[10px] text-mute tracking-[0.6px] uppercase">{p.year} · {p.award || p.kind}</div>
        <h3 className="font-display text-[22px] leading-[1.2] tracking-[-0.3px] text-ink m-0 font-normal">{p.title}</h3>
        <p className="text-[13px] leading-[1.55] text-body m-0">{p.desc}</p>
        <div className="mt-auto pt-2.5 flex justify-between items-center gap-3">
          <span className="font-mono text-[10px] text-stone tracking-[0.3px]">{p.stack}</span>
          {p.caseStudy ? (
            <div className="flex gap-2.5 items-center">
              <a href={p.url} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1 text-[12px] text-mute font-ui font-medium no-underline hover:text-ink transition-colors"
                 onClick={(e) => e.stopPropagation()}>
                Visit <Icon name="external" size={11} />
              </a>
              <span className="text-stone text-[10px]">·</span>
              <span className="inline-flex items-center gap-1 text-[12px] text-ink font-ui font-medium cursor-pointer">
                Case Study <Icon name="arrow-up-right" size={12} />
              </span>
            </div>
          ) : p.embed ? (
            <div className="flex gap-2 items-center">
              <span className="inline-flex items-center gap-1 text-[12px] text-accent-green font-ui font-medium cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); window.open(p.embed, `play-${p.title}`, popupOpts); }}>
                ▶ Play
              </span>
              <span className="text-stone text-[10px]">·</span>
              <a href={p.url} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1 text-[11px] text-mute font-ui font-medium no-underline hover:text-ink transition-colors"
                 onClick={(e) => e.stopPropagation()}>
                itch.io <Icon name="external" size={10} />
              </a>
            </div>
          ) : (
            <span className="inline-flex items-center gap-1 text-[12px] text-ink font-ui font-medium">
              Visit <Icon name="arrow-up-right" size={12} />
            </span>
          )}
        </div>
      </div>
    </>
  );

  const tiltWrapper = (child) => (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={handleLeave}
    >
      {child}
    </motion.div>
  );

  if (p.caseStudy) return tiltWrapper(
    <div className={cardBase} style={cardStyle} onClick={onStudy}>{inner}</div>
  );

  if (p.embed) return tiltWrapper(
    <div className={cardBase} style={cardStyle}
         onClick={() => window.open(p.embed, `play-${p.title}`, popupOpts)}>{inner}</div>
  );

  return tiltWrapper(
    <a href={p.url} target="_blank" rel="noopener noreferrer"
       className={cardBase} style={cardStyle}>{inner}</a>
  );
}

/* ─── Selected Work ───────────────────────────────────────────────────── */
function SelectedWork() {
  const [filter,    setFilter]    = React.useState("All");
  const [openStudy, setOpenStudy] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = openStudy ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openStudy]);

  const counts = {
    All:   projects.length,
    Games: projects.filter((p) => p.kind === "Game").length,
    Web:   projects.filter((p) => p.kind === "Web").length,
  };
  const visible = filter === "All" ? projects : projects.filter((p) =>
    (filter === "Games" && p.kind === "Game") || (filter === "Web" && p.kind === "Web")
  );

  return (
    <section id="work" className="relative py-14 pb-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute pointer-events-none animate-breathe"
           style={{ inset: "-20% -10% 60% -10%", background: "radial-gradient(closest-side at 80% 20%, rgba(0,117,255,0.20), transparent 65%)", filter: "blur(70px)", zIndex: 0 }} />

      <div className="relative z-10 max-w-container mx-auto px-8">
        <Reveal>
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
            <h2 className="font-display text-[56px] leading-none tracking-[-0.96px] text-ink m-0 font-normal">The work.</h2>
            <p className="text-[15px] text-mute max-w-[320px] m-0 leading-relaxed font-ui">
              A mix of student projects, jam games, and the occasional thing built for a community.
            </p>
          </div>
        </Reveal>

        {/* Games promo banner */}
        <Reveal delay={60}>
          <motion.a
            href="/games"
            className="flex justify-between items-center gap-4 px-[18px] py-[13px] rounded-xl mb-5 no-underline cursor-pointer"
            style={{ background: "rgba(17,255,153,0.04)", boxShadow: "inset 0 0 0 1px rgba(17,255,153,0.12)" }}
            whileHover={{ boxShadow: "inset 0 0 0 1px rgba(17,255,153,0.28)" }}
            transition={{ duration: 0.18 }}
          >
            <span className="flex items-center gap-2.5 font-ui text-[13px] text-body">
              <span className="text-accent-green text-[14px]">▶</span>
              <span>5 of my games are <strong className="text-ink font-medium">playable right here</strong> in your browser — no download needed</span>
            </span>
            <span className="font-ui text-[13px] text-accent-green flex-shrink-0 whitespace-nowrap">Open games page →</span>
          </motion.a>
        </Reveal>

        {/* Filters */}
        <Reveal delay={80}>
          <div className="flex gap-1.5 mb-7 flex-wrap pb-5 border-b border-hairline-strong">
            {FILTERS.map((f) => (
              <button key={f}
                      className={cn(
                        "font-ui text-[13px] px-4 py-2 rounded-full cursor-pointer select-none inline-flex items-center gap-2",
                        "transition-all duration-150",
                        filter === f
                          ? "text-primary-on bg-primary-white"
                          : "text-body bg-transparent shadow-border hover:shadow-border-bright"
                      )}
                      onClick={() => setFilter(f)}>
                {f} <span className="font-mono text-[10px] opacity-65">{counts[f]}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid with AnimatePresence for smooth filter transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-3 gap-4"
            data-grid="work-grid"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {visible.map((p, i) => (
              <WorkCard key={p.title} p={p} i={i} onStudy={() => setOpenStudy(true)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {openStudy && <CaseStudyModal onClose={() => setOpenStudy(false)} />}
      </AnimatePresence>
    </section>
  );
}

export { SelectedWork };
