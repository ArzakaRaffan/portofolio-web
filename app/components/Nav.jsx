"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./Icons";
import { cn } from "@/lib/utils";

const items = [
  { href: "#work",       label: "Work" },
  { href: "#highlights", label: "Highlights" },
  { href: "#experience", label: "Experience" },
  { href: "#about",      label: "About" },
  { href: "#contact",    label: "Contact" },
];

function Nav({ onCTAClick }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen]         = React.useState(false);
  const [mobile, setMobile]     = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onResize = () => setMobile(window.innerWidth <= 767);
    onScroll(); onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-[240ms]",
        scrolled && "bg-black/60 backdrop-blur-xl border-b border-hairline-strong"
      )}>
        <div className="h-16 flex items-center justify-between max-w-container mx-auto px-8">
          {/* Brand */}
          <a href="#top" aria-label="Home"
             className="flex items-center gap-2.5 font-display text-xl text-ink tracking-tight no-underline">
            <span className="w-[26px] h-[26px] rounded-[7px] bg-ink text-primary-on grid place-items-center font-display text-[15px] leading-none">
              A
            </span>
          </a>

          {/* Desktop links */}
          {!mobile && (
            <div className="flex items-center gap-7 font-ui text-sm">
              {items.map((it) => (
                <a key={it.href} href={it.href}
                   className="text-body hover:text-ink transition-colors duration-100 no-underline">
                  {it.label}
                </a>
              ))}
              <a href="/games"
                 className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-medium
                            bg-accent-green/10 text-accent-green shadow-[inset_0_0_0_1px_rgba(17,255,153,0.22)]
                            no-underline transition-all duration-150 hover:bg-accent-green/20">
                ▶ Play
              </a>
              <a href="#contact"
                 className="inline-flex items-center gap-2 h-9 px-4 bg-primary-white text-primary-on
                            rounded-full text-[13px] font-medium no-underline
                            hover:bg-surface-light transition-colors duration-100"
                 onClick={(e) => { e.preventDefault(); onCTAClick?.(); }}>
                Get in touch <Icon name="arrow-right" size={14} />
              </a>
            </div>
          )}

          {/* Mobile burger */}
          {mobile && (
            <button className="bg-transparent border-0 text-ink p-2 cursor-pointer"
                    onClick={() => setOpen(!open)} aria-label="Menu">
              <Icon name={open ? "x" : "menu"} size={22} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-[49] bg-black/95 backdrop-blur-xl px-6 pt-8 flex flex-col gap-5"
          >
            {items.map((it) => (
              <a key={it.href} href={it.href}
                 className="font-display text-[32px] text-ink tracking-tight no-underline"
                 onClick={() => setOpen(false)}>
                {it.label}
              </a>
            ))}
            <a href="/games"
               className="font-display text-[32px] text-accent-green tracking-tight no-underline"
               onClick={() => setOpen(false)}>
              ▶ Play
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { Nav };
