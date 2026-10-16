"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { SectionHead } from "./About";
import { PixelBand } from "./PixelBand";
import { EASE, Reveal } from "./ui";
import { projects } from "@/lib/data";

// Project thumbnail props: looping muted video (poster = image) when available, else the image.
const media = (p) =>
  p.video ? { src: p.video, poster: p.img, autoPlay: true, muted: true, loop: true, playsInline: true } : { src: p.img, alt: "" };

const FILTERS =[["All", () => true], ["Web", (p) => p.kind === "Web"], ["Games", (p) => p.kind === "Game"]];

/** Floating preview that follows the cursor over the list; images slide like a film strip. */
/**
 * Large floating preview that trails the cursor and leans into its velocity.
 * Switching rows wipes the next image up over the previous one.
 */
function Preview({ active, list, x, y }) {
  const sx = useSpring(x, { stiffness: 170, damping: 24, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 170, damping: 24, mass: 0.7 });
  const rotate = useSpring(useTransform(useVelocity(x), [-2500, 2500], [-9, 9]), { stiffness: 200, damping: 30 });
  const last = useRef({ p: null, i: 0 });
  const shown = active !== null && !!list[active];
  if (shown) last.current = { p: list[active], i: active };
  const { p, i } = last.current;
  const Media = p?.video ? motion.video : motion.img;

  return (
    <motion.div className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block" style={{ x: sx, y: sy }} aria-hidden="true">
      <motion.div
        className="w-[clamp(420px,34vw,620px)]"
        style={{ rotate, x: "-50%", y: "-50%" }}
        initial={false}
        animate={{ scale: shown ? 1 : 0.6, opacity: shown ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          <AnimatePresence initial={false}>
            {shown && (
              <motion.div
                key={p.title}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 1, transition: { duration: 0.7 } }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Media
                  {...media(p)}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, ease: EASE }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between gap-4 bg-accent px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink">
          <span>{p && `${String(i + 1).padStart(2, "0")} / ${p.title}`}</span>
          <span>{p && `${p.kind} · ${p.year}`}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CaseStudy({ study, url }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0, transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } }}
      transition={{ duration: 0.6, ease: EASE }}
      className="overflow-hidden"
    >
      <div className="grid grid-cols-1 gap-8 pb-10 pt-2 md:grid-cols-12">
        <p className="text-[15px] leading-relaxed text-paper/70 md:col-span-4 md:col-start-2">{study.overview}</p>
        <div className="flex flex-col md:col-span-6 md:col-start-7">
          {study.points.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[120px_1fr] gap-4 border-t border-line-inv py-3">
              <span className="label text-paper">{k}</span>
              <span className="text-sm leading-relaxed text-paper/70">{v}</span>
            </div>
          ))}
          <ul className="mt-4 flex flex-wrap gap-2">
            {study.outcomes.map((o) => (
              <li key={o} className="border border-line-inv px-2 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-paper/80">
                <span className="text-accent">✓</span> {o}
              </li>
            ))}
          </ul>
          <a href={url} target="_blank" rel="noopener noreferrer" className="label mt-6 self-start text-accent underline-offset-4 hover:underline">
            Visit project ↗
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Row({ p, i, onHover, open, onToggle }) {
  const inner = (
    <>
      <span className="label hidden text-paper/50 md:block">{String(i + 1).padStart(2, "0")}</span>
      <span className="flex min-w-0 flex-col gap-3 md:flex-row md:items-baseline md:gap-6">
        {p.video
          ? <video {...media(p)} className="aspect-[16/10] w-full object-cover md:hidden" />
          : <img src={p.img} alt="" className="aspect-[16/10] w-full object-cover md:hidden" />}
        <span className="truncate text-[clamp(28px,4.4vw,64px)] font-medium leading-none tracking-[-0.04em] transition-transform duration-500 ease-out group-hover:translate-x-3">
          {p.title}
        </span>
        {p.award && (
          <span className="shrink-0 self-start bg-accent px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink md:self-auto">
            ★ {p.award}
          </span>
        )}
      </span>
      <span className="label hidden text-paper/60 lg:block">{p.stack}</span>
      <span className="label hidden text-paper/60 md:block">{p.kind} · {p.solo ? "Solo" : "Team"}</span>
      <span className="label flex items-center justify-end gap-3 text-paper/60">
        {p.year}
        <span className={`inline-block text-paper transition-transform duration-500 ease-out ${p.study ? (open ? "rotate-45" : "") : "group-hover:rotate-45"}`}>
          {p.study ? "+" : "↗"}
        </span>
      </span>
    </>
  );
  const cls = "row group grid transition-opacity duration-300 w-full grid-cols-[1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[48px_1fr_160px_auto] lg:grid-cols-[48px_1fr_200px_160px_auto] md:py-8";

  return (
    <motion.li
      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
      className="border-t border-line-inv"
      onPointerEnter={(e) => e.pointerType === "mouse" && onHover(i)}
      onPointerLeave={() => onHover(null)}
    >
      {p.study ? (
        <button type="button" className={cls} onClick={onToggle} aria-expanded={open}>{inner}</button>
      ) : (
        <a className={cls} href={p.url} target="_blank" rel="noopener noreferrer">{inner}</a>
      )}
      {p.study && <AnimatePresence initial={false}>{open && <CaseStudy study={p.study} url={p.url} />}</AnimatePresence>}
    </motion.li>
  );
}

export function Work() {
  const [f, setF] = useState(0);
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const list = projects.filter(FILTERS[f][1]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Rows lean with scroll speed.
  const { scrollY } = useScroll();
  const skewY = useSpring(useTransform(useVelocity(scrollY), [-3000, 3000], [-3, 3]), { stiffness: 300, damping: 40 });

  return (
    <section id="work" className="relative bg-ink py-28 text-paper md:py-40" onPointerMove={(e) => { mx.set(e.clientX); my.set(e.clientY); }}>
      <PixelBand mode="in" className="bottom-full" />
      <PixelBand mode="out" className="top-full" />
      <div className="frame">
        <SectionHead index="02" title="Selected work" note={`${projects.length} projects · 2024—26`} inverted />

        <div className="mt-12 flex flex-wrap items-end justify-between gap-8 md:mt-20">
          <Reveal>
            <h2 className="max-w-[16ch] text-[clamp(36px,5vw,72px)] font-medium leading-[1] tracking-[-0.04em]">
              Websites for real users. <span className="text-paper/40">Games that win jams.</span>
            </h2>
          </Reveal>
          <div className="flex gap-1 border border-line-inv p-1" role="tablist" aria-label="Filter projects">
            {FILTERS.map(([label, fn], i) => (
              <button
                key={label}
                role="tab"
                aria-selected={f === i}
                onClick={() => { setF(i); setOpen(false); }}
                className={`relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-300 ${f === i ? "text-ink" : "text-paper/70 hover:text-paper"}`}
              >
                {f === i && <motion.span layoutId="filter" className="absolute inset-0 bg-paper" transition={{ duration: 0.5, ease: EASE }} />}
                <span className="relative">{label} <sup>{projects.filter(fn).length}</sup></span>
              </button>
            ))}
          </div>
        </div>

        <motion.ul
          key={f}
          className="mt-14 border-b border-line-inv [&:hover_.row]:opacity-35 [&_li:hover_.row]:!opacity-100"
          style={{ skewY }}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        >
          {list.map((p, i) => (
            <Row key={p.title} p={p} i={i} onHover={setActive} open={open} onToggle={() => setOpen((o) => !o)} />
          ))}
        </motion.ul>
      </div>
      <Preview active={active} list={list} x={mx} y={my} />
    </section>
  );
}
