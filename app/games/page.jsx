"use client";
import React from "react";
import { motion } from "framer-motion";
import { Icon } from "../components/Icons";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Animations";
import { cn } from "@/lib/utils";

const games = [
  {
    id: "let-meow-out", title: "Let Meow Out", year: 2026,
    award: "Champion · Garena GJ3 '26",
    desc: "A cat got stuck inside a handheld console. Your job is to get it out. Cozy pixel puzzler, and a game jam champion.",
    img: "/assets/projects/let-meow-out.png", stack: "Godot · Aseprite",
    url: "https://viscasa.itch.io/let-meow-out", embedId: "4271290",
    embedUploadUrl: "https://itch.io/embed-upload/16552477?color=333333",
  },
  {
    id: "let-neigh-out", title: "Let Neigh Out", year: 2026,
    award: "Champion · Garena GJ3 '26",
    desc: "A reskin of Let Meow Out, shown at Harmoni Imlek Nusantara in Lapangan Banteng, Jakarta. Same engine, new horse.",
    img: "/assets/projects/let-neigh-out.png", stack: "Godot · Aseprite",
    url: "https://samueltaniel.itch.io/let-neigh-out", embedId: "4308826",
    embedUploadUrl: "https://itch.io/embed-upload/16564759?color=333333",
  },
  {
    id: "alien-brawl", title: "Alien Brawl", year: 2025,
    award: "1st Runner-up · Garena GJ2 '25",
    desc: "Two players, one couch, one purple planet. My first finished game, and somehow still my favorite.",
    img: "/assets/projects/alien-brawl.png", stack: "Godot · Aseprite",
    url: "https://viscasa.itch.io/alien-brawl", embedId: "3272359",
    embedUploadUrl: "https://itch.io/embed-upload/12736154?color=43276f",
  },
  {
    id: "cleanet", title: "CleaNet", year: 2025,
    desc: "A little hero with a megaphone, cleaning up a circuit-board world. Pixel art at its most colorful.",
    img: "/assets/projects/cleanet.png", stack: "Godot · Aseprite",
    url: "https://heisenbergers.itch.io/cleanet", embedId: "2829859",
    embedUploadUrl: "https://itch.io/embed-upload/10901717?color=cc5353",
  },
  {
    id: "adit", title: "Adit & The Miraculous Toad", year: 2025,
    desc: "A cozy 2D adventure in Bahasa Indonesia about a boy, a frog, and a journey worth taking.",
    img: "/assets/projects/adit.png", stack: "Godot · Aseprite",
    url: "https://heisenbergers.itch.io/adit-and-the-miraculous-toad-the-green-journey", embedId: "2829900",
    embedUploadUrl: "https://itch.io/embed-upload/10901857?color=000000",
  },
];

const popupOpts = "width=640,height=460,menubar=no,toolbar=no,location=no,status=no,resizable=yes";

function GameCard({ game, index }) {
  const [hov, setHov] = React.useState(false);

  return (
    <Reveal delay={index * 80}>
      <div
        id={game.id}
        className="grid gap-10 items-start"
        style={{ gridTemplateColumns: "1fr 1fr", scrollMarginTop: 72 }}
        data-game={game.id}
      >
        {/* Left — image + info */}
        <div className="flex flex-col gap-0">
          {/* Thumbnail */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-deep shadow-border mb-5">
            <img src={game.img} alt={game.title} className="w-full h-full object-cover block" />
            <div className="absolute inset-0 pointer-events-none"
                 style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)" }} />
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
              <span className="font-ui text-[10px] text-ink tracking-[0.5px] uppercase inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-full"
                    style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", boxShadow: "inset 0 0 0 1px rgba(252,253,255,0.10)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" style={{ boxShadow: "0 0 8px #11ff99" }} />
                Game
              </span>
              {game.award && (
                <span className="font-ui text-[10px] text-[#0a0a0c] tracking-[0.5px] uppercase bg-accent-yellow inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-full font-medium">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
                  Award
                </span>
              )}
            </div>
          </div>

          <div className="font-mono text-[10px] text-mute tracking-[0.6px] uppercase mb-2">
            {game.year}{game.award ? ` · ${game.award}` : ""}
          </div>
          <h2 className="font-display text-[32px] leading-[1.15] tracking-[-0.5px] text-ink m-0 mb-3 font-normal">{game.title}</h2>
          <p className="text-[14px] leading-[1.65] text-body m-0 mb-4">{game.desc}</p>
          <div className="font-mono text-[10px] text-stone tracking-[0.3px] mb-5">{game.stack}</div>

          <motion.a
            href={game.url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-full text-[12px] font-ui font-medium
                       bg-surface-elevated text-ink shadow-border no-underline self-start"
            whileHover={{ boxShadow: "inset 0 0 0 1px rgba(252,253,255,0.16)" }}
            transition={{ duration: 0.16 }}
          >
            View on itch.io <Icon name="arrow-up-right" size={11} />
          </motion.a>
        </div>

        {/* Right — embed + play */}
        <div className="flex flex-col gap-4">
          <div className="font-mono text-[10px] text-stone tracking-[0.6px] uppercase pt-1">itch.io</div>
          <div className="rounded-xl overflow-hidden shadow-border bg-surface-deep">
            <iframe
              frameBorder="0"
              src={`https://itch.io/embed/${game.embedId}?dark=true&linkback=true`}
              width="100%" height="167"
              style={{ display: "block" }}
              title={game.title}
            />
          </div>

          {game.embedUploadUrl && (
            <div className="rounded-xl p-6 flex flex-col gap-3.5"
                 style={{ background: "rgba(17,255,153,0.04)", boxShadow: "inset 0 0 0 1px rgba(17,255,153,0.12)" }}>
              <p className="font-ui text-[13px] font-medium text-ink m-0">Play in your browser</p>
              <p className="font-ui text-[12px] text-mute leading-relaxed m-0">
                This game has a browser build. Opens in a small window — no download needed.
              </p>
              <motion.button
                className="inline-flex items-center gap-2 h-[38px] px-[18px] rounded-full text-[13px]
                           font-ui font-medium bg-accent-green text-black border-0 cursor-pointer self-start"
                whileHover={{ opacity: 0.85 }}
                onClick={() => window.open(game.embedUploadUrl, `play-${game.id}`, popupOpts)}
              >
                ▶ Play now
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function GamesPage() {
  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-hairline-strong">
        <div className="h-12 flex items-center justify-between max-w-container mx-auto px-8">
          <a href="/" className="flex items-center gap-2.5 font-display text-xl text-ink tracking-tight no-underline" aria-label="Home">
            <span className="w-[26px] h-[26px] rounded-[7px] bg-ink text-primary-on grid place-items-center font-display text-[15px] leading-none">A</span>
          </a>
          <a href="/"
             className="inline-flex items-center gap-1.5 font-ui text-[13px] text-mute no-underline hover:text-ink transition-colors">
            <Icon name="arrow-left" size={13} /> Back to portfolio
          </a>
        </div>
      </nav>

      <div className="pt-12 min-h-screen">
        {/* Hero */}
        <section className="relative py-[72px] pb-14 overflow-hidden">
          <div className="absolute pointer-events-none animate-breathe"
               style={{ inset: "-30% -10% 40% -10%", background: "radial-gradient(closest-side at 20% 50%, rgba(17,255,153,0.12), transparent 65%)", filter: "blur(80px)" }} />
          <div className="relative z-10 max-w-container mx-auto px-8">
            <div className="font-mono text-[11px] text-accent-green tracking-[1px] uppercase mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-accent-green" /> Godot · Aseprite
            </div>
            <h1 className="font-display text-[72px] leading-none tracking-[-1.2px] text-ink m-0 mb-4 font-normal">Games.</h1>
            <p className="text-[16px] text-body max-w-[480px] m-0 leading-relaxed font-ui">
              A collection of games I&rsquo;ve made — jam submissions, hackathon builds, and a couple of champions.
              All built in Godot, all drawn in Aseprite.
            </p>
          </div>
        </section>

        {/* Game list */}
        <div className="max-w-container mx-auto px-8 pb-24">
          <hr className="h-px bg-hairline-strong border-0 mb-12" />
          {games.map((game, i) => (
            <React.Fragment key={game.id}>
              <GameCard game={game} index={i} />
              {i < games.length - 1 && (
                <hr className="h-px bg-hairline-strong border-0 my-[72px]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
