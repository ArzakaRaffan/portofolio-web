"use client";
import React from "react";
import { Reveal } from "./Animations";

const row1 = [
  { name: "Next.js",    slug: "nextdotjs" },
  { name: "React",      slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind",   slug: "tailwindcss" },
  { name: "HTML",       slug: "html5" },
  { name: "CSS",        slug: "css3" },
  { name: "Python",     slug: "python" },
  { name: "Django",     slug: "django" },
];

const row2 = [
  { name: "Java",        slug: "openjdk" },
  { name: "Spring Boot", slug: "springboot" },
  { name: "Node.js",     slug: "nodedotjs" },
  { name: "PostgreSQL",  slug: "postgresql" },
  { name: "AWS",         slug: "amazonwebservices" },
  { name: "Docker",      slug: "docker" },
  { name: "Git",         slug: "git" },
  { name: "Godot",       slug: "godotengine" },
  { name: "Figma",       slug: "figma" },
];

const groups = [
  {
    eyebrow: "Frontend",
    title: "The part people see.",
    note: "React-flavored everything. I care a lot about how a button feels when you click it.",
  },
  {
    eyebrow: "Backend",
    title: "The part that breaks at 2am.",
    note: "APIs, databases, the boring-but-important stuff. Django, Spring, and the occasional Node detour.",
  },
  {
    eyebrow: "Games & Design",
    title: "The part I do for fun.",
    note: "Godot for everything that moves. Figma when something needs to be drawn first.",
  },
];

function LogoMarquee({ items, direction = "left", speed = 35 }) {
  const ref = React.useRef(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const children = [...ref.current.children];
    children.forEach((c) => ref.current.appendChild(c.cloneNode(true)));
    setReady(true);
  }, []);

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]">
      <div
        ref={ref}
        className="flex w-max gap-3"
        style={
          ready
            ? {
                animation: `scroll ${speed}s linear infinite ${direction === "right" ? "reverse" : "forwards"}`,
              }
            : undefined
        }
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-surface-card shadow-border flex-shrink-0 group cursor-default"
          >
            <img
              src={`https://cdn.simpleicons.org/${item.slug}/fcfdff`}
              alt={item.name}
              className="w-[18px] h-[18px] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-150"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="font-mono text-[11px] text-mute tracking-[0.2px] group-hover:text-ink transition-colors duration-150 whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-[120px] overflow-hidden border-t border-hairline-strong">
      {/* Glow */}
      <div
        className="absolute pointer-events-none animate-breathe"
        style={{
          inset: "-30% -10% 50% -10%",
          background:
            "radial-gradient(closest-side at 30% 30%, rgba(0,117,255,0.22), transparent 60%), " +
            "radial-gradient(closest-side at 85% 70%, rgba(34,255,153,0.12), transparent 60%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-container mx-auto px-8">
        {/* Header */}
        <Reveal>
          <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
            <h2 className="font-display text-[56px] leading-none tracking-[-0.96px] text-ink m-0 font-normal">
              What I work with.
            </h2>
            <p className="text-[15px] text-mute max-w-[320px] m-0 leading-relaxed">
              Three lanes. The good projects touch all three at once.
            </p>
          </div>
        </Reveal>

        {/* Marquee rows */}
        <Reveal delay={60}>
          <div className="flex flex-col gap-3 mb-14">
            <LogoMarquee items={row1} direction="left"  speed={30} />
            <LogoMarquee items={row2} direction="right" speed={25} />
          </div>
        </Reveal>

        {/* Description cards */}
        <div className="grid grid-cols-3 gap-4" data-grid="skills-grid">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <div className="bg-surface-card rounded-xl shadow-border p-6 flex flex-col gap-3">
                <div className="font-ui text-[11px] text-mute tracking-[0.6px] uppercase flex items-center gap-2.5">
                  <span>{g.eyebrow}</span>
                  <span className="flex-1 h-px bg-hairline-strong" />
                </div>
                <h3 className="font-display text-[22px] leading-[1.2] tracking-[-0.3px] text-ink m-0 font-normal">
                  {g.title}
                </h3>
                <p className="text-[13px] text-body leading-relaxed m-0">{g.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Skills };
