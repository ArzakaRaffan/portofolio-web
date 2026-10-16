"use client";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useIntroDone } from "./Preloader";
import { EASE, Scramble } from "./ui";
import { profile } from "@/lib/data";

const LINKS = [["Work", "#work"], ["About", "#about"], ["Highlights", "#highlights"], ["Contact", "#contact"]];

export function Nav() {
  const ready = useIntroDone();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 200 && y > prev);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 text-paper mix-blend-difference"
      initial={{ y: "-100%" }}
      animate={{ y: ready && !hidden ? "0%" : "-100%" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <nav className="frame flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" className="font-mono text-[12px] uppercase tracking-[0.08em]">
          <Scramble text={profile.short} hover />
        </a>
        <ul className="flex gap-5 md:gap-8">
          {LINKS.map(([label, href], i) => (
            <li key={href} className={i === 2 ? "hidden md:block" : undefined}>
              <a href={href} className="font-mono text-[12px] uppercase tracking-[0.08em]">
                <Scramble text={label} hover />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
