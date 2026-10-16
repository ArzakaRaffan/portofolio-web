"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, Reveal, Scramble } from "./ui";
import { AsciiPortrait } from "./AsciiPortrait";
import { bio, profile, statement, toolkit } from "@/lib/data";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

export function SectionHead({ index, title, note, inverted }) {
  return (
    <div className={`grid grid-cols-2 gap-4 border-t pt-3 md:grid-cols-4 ${inverted ? "border-line-inv" : "border-line"}`}>
      <Scramble className={`label ${inverted ? "text-paper/60" : ""}`} text={`// ${index}`} />
      <Scramble className={`label ${inverted ? "text-paper" : "text-ink"}`} text={title} delay={0.1} />
      {note && <span className={`label col-span-2 hidden text-right md:block ${inverted ? "text-paper/60" : ""}`}>{note}</span>}
    </div>
  );
}

export function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");

  return (
    <section id="about" className="frame py-28 md:py-40">
      <SectionHead index="01" title="About" note="Who, what, how" />

      <p ref={ref} className="mt-12 max-w-[22ch] text-[clamp(32px,5.2vw,76px)] font-medium leading-[1.02] tracking-[-0.035em] md:mt-20" aria-label={statement}>
        <span aria-hidden="true">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
          ))}
        </span>
      </p>

      <div className="mt-20 grid grid-cols-1 gap-10 md:mt-32 md:grid-cols-12">
        <motion.div
          className="marks relative aspect-[4/5] bg-tile text-ink md:col-span-5"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <AsciiPortrait src={profile.portrait} alt={profile.name} />
        </motion.div>

        <div className="flex flex-col gap-12 md:col-span-6 md:col-start-7">
          <div className="flex flex-col gap-5">
            <Scramble className="label text-ink" text={profile.name} />
            {bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="max-w-[52ch] text-lg leading-relaxed text-ink-2 md:text-xl">{p}</p>
              </Reveal>
            ))}
          </div>

          <div>
            <Scramble className="label" text="// Toolkit" />
            <dl className="mt-4">
              {toolkit.map(([k, v], i) => (
                <Reveal key={k} delay={i * 0.06} y={8}>
                  <div className="group grid grid-cols-[120px_1fr] gap-4 border-t border-line py-4 transition-colors duration-300 hover:bg-tile md:grid-cols-[180px_1fr]">
                    <dt className="label pl-1 text-ink">{k}</dt>
                    <dd className="text-[15px] text-ink-2 transition-transform duration-300 ease-out group-hover:translate-x-2">{v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
