"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHead } from "./About";
import { EASE, Scramble, Tilt } from "./ui";
import { highlights } from "@/lib/data";

/** Slot-machine roll for a leading digit ("1st" rolls 0→1), scramble for words. */
function BigValue({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const m = value.match(/^(\d)(.*)$/);
  if (!m) return <Scramble text={value} />;
  const digit = Number(m[1]);
  return (
    <span ref={ref} aria-label={value} className="inline-flex">
      <span aria-hidden="true" className="relative inline-block h-[1em] overflow-hidden">
        {/* Invisible final digit sizes the column so "1st" isn't spaced like "0st" */}
        <span className="invisible">{digit}</span>
        <motion.span
          className="absolute inset-x-0 top-0 flex flex-col items-center"
          initial={{ y: "0em" }}
          animate={inView ? { y: `-${digit + 10}em` } : undefined}
          transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
        >
          {Array.from({ length: digit + 11 }, (_, i) => <span key={i} className="h-[1em] leading-[1em]">{i % 10}</span>)}
        </motion.span>
      </span>
      <span aria-hidden="true">{m[2]}</span>
    </span>
  );
}

export function Highlights() {
  return (
    <section id="highlights" className="frame py-28 md:py-40">
      <SectionHead index="03" title="Highlights" note="Awards, IP, press" />

      <div className="mt-12 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
        {highlights.map((h, i) => {
          const Tag = h.url ? "a" : "div";
          return (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              className="border-b border-r border-line"
            >
              <Tilt className="h-full">
              <Tag
                {...(h.url ? { href: h.url, target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden p-5 md:min-h-[380px] md:p-6"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-out group-hover:scale-y-100" aria-hidden="true" />
                <span
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(255,77,0,0.35), transparent 70%)" }}
                  aria-hidden="true"
                />
                <span className="relative flex justify-between">
                  <span className="label transition-colors duration-500 group-hover:text-paper/60">Fig. {String(i + 1).padStart(2, "0")}</span>
                  <span className="label text-accent">{h.kind}</span>
                </span>
                <span className="relative text-[clamp(72px,8vw,128px)] font-medium leading-none tracking-[-0.06em] transition-colors duration-500 group-hover:text-paper">
                  <BigValue value={h.big} />
                </span>
                <span className="relative flex flex-col gap-1.5">
                  <span className="text-lg font-medium leading-tight tracking-[-0.01em] transition-colors duration-500 group-hover:text-paper">{h.label}</span>
                  <span className="label transition-colors duration-500 group-hover:text-paper/60">{h.meta}</span>
                  {h.url && (
                    <span className="label mt-2 text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100">View document ↗</span>
                  )}
                </span>
              </Tag>
              </Tilt>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
