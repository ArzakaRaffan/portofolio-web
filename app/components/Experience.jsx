"use client";
import { Reveal } from "./Animations";

const experience = [
  {
    date: "Mar 2024 — Present", current: true,
    role: "Game Development", org: "RISTEK Fasilkom UI", place: "Universitas Indonesia", kind: "Student org",
    subs: [
      { y: "Feb 2026 — Present",      t: "Director of Game Development" },
      { y: "Mar 2025 — Feb 2026",     t: "Lead of Game Development" },
      { y: "Mar 2024 — Mar 2025",     t: "Member of Game Development" },
    ],
  },
  {
    date: "Aug 2025 — Present", current: true,
    role: "Master Teacher", org: "Ruangguru", place: "Freelance", kind: "Teaching",
  },
  {
    date: "Jul 2025 — Present", current: true,
    role: "Teaching Assistant", org: "Computer Science · Universitas Indonesia", place: "Depok, Jawa Barat", kind: "Teaching",
    subs: [
      { y: "Feb 2026 — Present",      t: "Introduction to Software Security" },
      { y: "Jul 2025 — Jan 2026",     t: "Data Structures and Algorithms" },
      { y: "Jul 2025 — Jan 2026",     t: "Introduction to Computer Organization" },
    ],
  },
  {
    date: "Jun 2024 — Dec 2025",
    role: "Art & Culture Department", org: "BEM Fasilkom UI", place: "Universitas Indonesia", kind: "Student org",
    subs: [
      { y: "Mar 2025 — Dec 2025",     t: "Head Deputy of Art & Culture" },
      { y: "Jun 2024 — Dec 2024",     t: "Staff of Art & Culture" },
    ],
  },
  {
    date: "Oct 2023 — Nov 2023",
    role: "Project Officer", org: "Gelar Karya Fasilkom UI 2023", place: "Universitas Indonesia", kind: "Event",
  },
  {
    date: "Sep 2022 — Mar 2025",
    role: "Political Journalist", org: "kataindonesia.com", place: "Freelance", kind: "Writing",
  },
];

function Experience() {
  return (
    <section id="experience" className="relative py-[120px] overflow-hidden border-t border-hairline-strong">
      <div className="absolute pointer-events-none animate-breathe"
           style={{ inset: "-30% -10% 50% -10%", background: "radial-gradient(closest-side at 80% 20%, rgba(255,89,0,0.18), transparent 65%)", filter: "blur(80px)", zIndex: 0 }} />

      <div className="relative z-10 max-w-container mx-auto px-8">
        <Reveal>
          <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
            <h2 className="font-display text-[56px] leading-none tracking-[-0.96px] text-ink m-0 font-normal">Experience.</h2>
            <p className="text-[15px] text-mute max-w-[320px] m-0 leading-relaxed">
              Teaching, student orgs, freelance writing. The stuff between projects.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {experience.map((e, i) => (
            <Reveal key={i} delay={Math.min(i * 60, 360)}>
              <div
                data-grid="exp-item"
                className="grid gap-7 py-6 border-t border-hairline-strong items-baseline"
                style={{ gridTemplateColumns: "160px minmax(0,1.4fr) minmax(0,1fr) auto" }}
              >
                {/* Date */}
                <span className="font-mono text-[12px] text-mute tracking-[0.3px]">
                  {e.date}
                  {e.current && (
                    <span className="inline-block ml-1.5 w-1.5 h-1.5 rounded-full bg-accent-green align-middle"
                          style={{ boxShadow: "0 0 8px var(--accent-green)" }} title="Current" />
                  )}
                </span>

                {/* Role */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-[22px] leading-[1.15] tracking-[-0.3px] text-ink m-0 font-normal">{e.role}</h3>
                  {e.subs && (
                    <div className="flex flex-col gap-0.5 mt-1.5">
                      {e.subs.map((s, j) => (
                        <div key={j} className="flex items-baseline gap-2 font-ui text-[13px] text-body">
                          <span className="font-mono text-[11px] text-mute">↳</span>
                          <span>{s.t} <span className="text-mute">· {s.y}</span></span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Org */}
                <div className="flex flex-col gap-1">
                  <p className="font-ui text-[14px] text-ink m-0">{e.org}</p>
                  <p className="font-ui text-[12px] text-mute m-0">{e.place}</p>
                </div>

                {/* Kind tag */}
                <span className="font-mono text-[10px] text-mute tracking-[0.5px] uppercase px-2.5 py-1 rounded-full shadow-border bg-surface-card/50 whitespace-nowrap">
                  {e.kind}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Experience };
