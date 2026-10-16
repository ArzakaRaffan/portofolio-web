"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { SectionHead } from "./About";
import { PixelBand } from "./PixelBand";
import { Clock, EASE, Magnetic, Scramble, SplitReveal } from "./ui";
import { profile } from "@/lib/data";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <Magnetic strength={0.35}>
      <button
        type="button"
        onClick={copy}
        className="group relative grid h-36 w-36 place-items-center overflow-hidden rounded-full bg-accent text-ink md:h-44 md:w-44"
        aria-live="polite"
      >
        <span className="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-500 ease-out group-hover:translate-y-0" aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "y" : "n"}
            className="relative font-mono text-[12px] uppercase tracking-[0.08em]"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {copied ? "Copied ✓" : "Copy email"}
          </motion.span>
        </AnimatePresence>
      </button>
    </Magnetic>
  );
}

export function Contact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const markY = useTransform(scrollYProgress, [0.3, 1], ["60%", "0%"]);

  return (
    <footer ref={ref} id="contact" className="relative bg-ink text-paper">
      <PixelBand mode="in" className="bottom-full" />
      <div className="frame pt-28 md:pt-40">
        <SectionHead index="05" title="Contact" note="Open to projects and collaboration" inverted />

        <div className="mt-14 grid grid-cols-1 items-end gap-12 md:mt-24 md:grid-cols-[1fr_auto]">
          <div>
            <SplitReveal
              as="h2"
              text="Let’s build something."
              className="block max-w-[12ch] text-[clamp(52px,9vw,148px)] font-medium leading-[0.9] tracking-[-0.055em]"
            />
            <a
              href={`mailto:${profile.email}`}
              className="mt-10 inline-flex items-center gap-3 border-b border-line-inv pb-2 text-lg transition-colors duration-300 hover:border-accent hover:text-accent md:text-2xl"
            >
              <Scramble text={profile.email} hover />
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <CopyEmail />
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-line-inv pt-6 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <span className="label text-paper/50">Elsewhere</span>
            {profile.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="w-fit text-[15px] text-paper/80 hover:text-accent">
                <Scramble text={s.label} hover />
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="label text-paper/50">Games</span>
            <a href={profile.gamesUrl} target="_blank" rel="noopener noreferrer" className="w-fit text-[15px] text-paper/80 hover:text-accent">
              <Scramble text="Play my games ↗" hover />
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="label text-paper/50">Local time</span>
            <span className="text-[15px] text-paper/80">{profile.city} · <Clock /></span>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <span className="label text-paper/50">© {new Date().getFullYear()} {profile.name}</span>
            <a href="#top" className="w-fit text-[15px] text-paper/80 hover:text-accent">
              <Scramble text="Back to top ↑" hover />
            </a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark rises as the page ends */}
      <div className="mt-16 overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ y: markY }}
          className="select-none whitespace-nowrap text-center text-[14.5vw] font-medium leading-[0.8] tracking-[-0.065em] text-paper"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          variants={{ show: { transition: { staggerChildren: 0.04 } } }}
        >
          {[...`${profile.short}.`].map((c, i, arr) => (
            <motion.span
              key={i}
              className={`inline-block ${i === arr.length - 1 ? "text-accent" : ""}`}
              variants={{ hidden: { y: "100%", rotate: 8 }, show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE } } }}
              whileHover={{ y: "-12%", color: "#FF4D00", transition: { duration: 0.25, ease: EASE } }}
            >
              {c === " " ? " " : c}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
