"use client";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useIntroDone } from "./Preloader";
import { EASE, Scramble } from "./ui";
import { profile } from "@/lib/data";
import { Logo } from "./Logo";

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
        <a href="#top" className="group flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.08em]" aria-label={`${profile.short}, back to top`}>
          {/* Remount once the intro clears so the caret draws in as the nav slides down */}
          <Logo key={ready ? "on" : "off"} mono draw={ready} delay={0.2} className="h-6 w-6 transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110" />
          <Scramble text={profile.short} hover className="hidden sm:inline" />
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
