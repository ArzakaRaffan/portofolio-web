"use client";
import React from "react";
import { motion } from "framer-motion";
import { Icon, StatusPill } from "./Icons";
import { Reveal } from "./Animations";
import { cn } from "@/lib/utils";

const TYPES = ["Project", "Question", "Collab", "Just saying hi"];

function Contact() {
  const [type,  setType]  = React.useState("Project");
  const [sent,  setSent]  = React.useState(false);
  const [focus, setFocus] = React.useState("");

  const inputCls = (key) => cn(
    "bg-canvas border-0 rounded-lg text-ink h-10 px-3 font-ui text-sm outline-none w-full",
    "shadow-border transition-shadow duration-100",
    focus === key && "shadow-[inset_0_0_0_1px_rgba(252,253,255,0.16),0_0_0_3px_rgba(59,158,255,0.25)]"
  );

  return (
    <section id="contact" className="relative py-[120px] overflow-hidden border-t border-hairline-strong">
      <div className="absolute pointer-events-none"
           style={{ inset: "-20% -10% 60% -10%", background: "radial-gradient(closest-side at 70% 30%, rgba(255,89,0,0.22), transparent 65%)", filter: "blur(80px)", zIndex: 0 }} />

      <div className="relative z-10 max-w-container mx-auto px-8">
        <div className="grid gap-16 items-start" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }} data-grid="contact">

          {/* Left — copy */}
          <Reveal scale={0.98}>
            <div className="flex flex-col gap-[22px]">
              <span className="font-ui text-[11px] text-mute tracking-[0.7px] uppercase flex items-center gap-2.5">
                <span className="w-6 h-px bg-mute" /> Contact
              </span>
              <h2 className="font-display text-[76.8px] leading-none tracking-[-0.768px] text-ink m-0 font-normal" id="contact-h">
                Let&rsquo;s build<br />
                <em className="italic">something</em> together.
              </h2>
              <p className="text-[18px] leading-relaxed text-body m-0 max-w-[460px] font-ui">
                Whether you&rsquo;ve got a question, a project to share, or just want to talk about pixel art,
                email is the fastest way. I read everything.
              </p>
              <a href="mailto:arzakaraffan@gmail.com"
                 className="inline-flex items-center gap-2.5 font-mono text-[16px] text-ink w-fit
                            pb-1 border-b border-hairline-bright no-underline">
                <Icon name="mail" size={16} /> arzakaraffan@gmail.com
              </a>
            </div>
          </Reveal>

          {/* Right — form card */}
          <Reveal delay={140} scale={0.98}>
            <form
              className="bg-surface-card rounded-xl shadow-border p-7 flex flex-col gap-4"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              {sent ? (
                <div className="flex flex-col gap-3 py-6 px-1">
                  <Icon name="check" size={28} />
                  <div className="font-display text-[28px] tracking-[-0.4px] text-ink">Thanks, message received.</div>
                  <p className="text-[14px] text-body m-0 leading-relaxed">
                    Got it. I&rsquo;ll get back to you soon, usually within a day.
                  </p>
                  <button type="button" className="btn btn--ghost btn--pill self-start mt-2"
                          onClick={() => setSent(false)}>Send another</button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3" data-grid="contact-name-email">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-ui text-[11px] text-mute tracking-[0.5px] uppercase">Name</span>
                      <input className={inputCls("name")} placeholder="Sam Rivera"
                             onFocus={() => setFocus("name")} onBlur={() => setFocus("")} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-ui text-[11px] text-mute tracking-[0.5px] uppercase">Email</span>
                      <input className={inputCls("email")} placeholder="sam@example.com"
                             onFocus={() => setFocus("email")} onBlur={() => setFocus("")} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="font-ui text-[11px] text-mute tracking-[0.5px] uppercase">Subject</span>
                    <input className={inputCls("proj")} placeholder="What&rsquo;s it about?"
                           onFocus={() => setFocus("proj")} onBlur={() => setFocus("")} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="font-ui text-[11px] text-mute tracking-[0.5px] uppercase">Type</span>
                    <div className="flex gap-2 flex-wrap">
                      {TYPES.map((b) => (
                        <span key={b}
                              className={cn(
                                "font-ui text-[12px] px-3 py-1.5 rounded-full cursor-pointer select-none transition-all duration-100",
                                type === b
                                  ? "text-primary-on bg-primary-white"
                                  : "text-body shadow-border hover:shadow-border-bright"
                              )}
                              onClick={() => setType(b)}>{b}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="font-ui text-[11px] text-mute tracking-[0.5px] uppercase">Tell me more</span>
                    <textarea
                      className={cn(
                        "bg-canvas border-0 rounded-lg text-ink min-h-[110px] px-3 py-2.5 font-ui text-sm outline-none resize-y w-full",
                        "shadow-border transition-shadow duration-100",
                        focus === "msg" && "shadow-[inset_0_0_0_1px_rgba(252,253,255,0.16),0_0_0_3px_rgba(59,158,255,0.25)]"
                      )}
                      placeholder="What are you working on?"
                      onFocus={() => setFocus("msg")} onBlur={() => setFocus("")}
                    />
                  </div>

                  <div className="flex justify-between items-center mt-1.5 gap-3 flex-wrap">
                    <p className="font-mono text-[11px] text-mute m-0">Usually replies in a day · No bots, just me</p>
                    <motion.button
                      type="submit"
                      className="inline-flex items-center gap-2 h-10 px-[18px] bg-primary-white text-primary-on border-0
                                 rounded-full font-ui text-sm font-medium cursor-pointer"
                      whileHover={{ background: "var(--surface-light)" }}
                      transition={{ duration: 0.1 }}
                    >
                      Send message <Icon name="arrow-right" size={14} />
                    </motion.button>
                  </div>
                </>
              )}
            </form>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

export { Contact };
