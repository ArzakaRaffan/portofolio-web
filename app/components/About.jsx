"use client";
import { motion } from "framer-motion";
import { Reveal } from "./Animations";

function WordReveal({ text, className }) {
  const words = text.split(" ");
  return (
    <motion.h2
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          variants={{
            hidden:  { opacity: 0, filter: "blur(10px)", y: 10 },
            visible: {
              opacity: 1, filter: "blur(0px)", y: 0,
              transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

function About() {
  return (
    <section id="about" className="relative py-[120px] overflow-hidden border-t border-hairline-strong">
      <div
        className="absolute pointer-events-none animate-breathe"
        style={{ inset: "-20% -10% 60% -10%", background: "radial-gradient(closest-side at 20% 30%, rgba(34,255,153,0.14), transparent 60%)", filter: "blur(60px)", zIndex: 0 }}
      />

      <div
        className="relative z-10 max-w-container mx-auto px-8 grid gap-14 items-start"
        style={{ gridTemplateColumns: "minmax(0,220px) minmax(0,1fr)" }}
        data-grid="about"
      >
        {/* Sidebar */}
        <Reveal>
          <aside className="flex flex-col gap-[18px]">
            <div className="w-full aspect-square bg-surface-card rounded-xl shadow-border relative overflow-hidden portrait-container">
              <img
                src="/assets/portrait.jpeg"
                alt="Arzaka Raffan Mawardi"
                className="absolute inset-0 w-full h-full object-cover object-[center_30%] portrait-img"
                style={{ filter: "saturate(0.95) contrast(1.02)" }}
              />
            </div>
            <div className="flex flex-col gap-1 font-mono text-[11px] text-mute tracking-[0.3px]">
              {[["Based in", "Depok, ID"], ["Studying", "CS · UI '23"], ["Email", "arzakaraffan"]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <span className="text-mute">{k}</span>
                  <span className="text-ink text-right">{v}</span>
                </div>
              ))}
            </div>
          </aside>
        </Reveal>

        {/* Body */}
        <div className="flex flex-col gap-[22px]">
          <Reveal>
            <span className="font-ui text-[11px] text-mute tracking-[0.7px] uppercase flex items-center gap-2.5">
              <span className="w-6 h-px bg-mute" /> About
            </span>
          </Reveal>

          {/* Word-reveal heading — the Aceternity-style effect */}
          <WordReveal
            text="Student by day, full-stack by night, indie game dev on weekends."
            className="font-display text-[56px] leading-[1.05] tracking-[-0.96px] text-ink m-0 font-normal"
          />

          <Reveal delay={80}>
            <p className="text-[18px] leading-relaxed text-body m-0 font-ui">
              I&rsquo;m a seventh-semester CS student at <span className="hl hl--blue">Universitas Indonesia</span>.
              Most weeks I&rsquo;m juggling lectures, a side project, and one half-finished game I keep telling myself I&rsquo;ll get back to.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-[18px] leading-relaxed text-body m-0 font-ui">
              I help run RISTEK&rsquo;s Game Development division, TA a few CS courses, and occasionally write articles about politics.
              I like building things people actually use, and I&rsquo;d like to keep being surprised by what I get to work on.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export { About };
