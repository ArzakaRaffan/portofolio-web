"use client";
import { motion } from "framer-motion";
import { SectionHead } from "./About";
import { EASE } from "./ui";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="frame pb-28 md:pb-40">
      <SectionHead index="04" title="Experience" note="Teaching, orgs, writing" />

      <ol className="mt-12 md:mt-20">
        {experience.map((e, i) => (
          <motion.li
            key={e.role + e.org}
            className="group relative"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          >
            {/* Hairline draws in left to right */}
            <motion.span
              className="absolute inset-x-0 top-0 h-px origin-left bg-line"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease: EASE, delay: i * 0.05 } } }}
              aria-hidden="true"
            />
            <motion.div
              className="grid grid-cols-1 gap-3 py-6 transition-colors duration-300 group-hover:bg-tile md:grid-cols-12 md:gap-6 md:px-2 md:py-8"
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.1 + i * 0.05 } } }}
            >
              <span className="label flex items-center gap-2 md:col-span-2">
                {e.current && (
                  <span className="relative flex h-2 w-2" aria-label="Current">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                )}
                {e.date}
              </span>
              <div className="md:col-span-5">
                <h3 className="text-2xl font-medium tracking-[-0.025em] transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-3xl">{e.role}</h3>
                {e.subs && (
                  <ul className="mt-3 flex flex-col gap-1">
                    {e.subs.map(([t, y]) => (
                      <li key={t} className="flex gap-2 text-sm text-ink-2">
                        <span className="font-mono text-ink-3">↳</span>{t}<span className="text-ink-3">· {y}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <span className="text-[15px] md:col-span-3">{e.org}</span>
              <span className="label md:col-span-2 md:text-right">{e.kind}</span>
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
