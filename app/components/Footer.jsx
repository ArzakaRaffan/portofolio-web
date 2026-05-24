"use client";
import { Icon, StatusPill } from "./Icons";

const pages = [
  { href: "#work",     label: "Selected work" },
  { href: "#skills",   label: "Skills" },
  { href: "#about",    label: "About" },
  { href: "#contact",  label: "Contact" },
];

const socials = [
  { n: "github",   url: "https://github.com/ArzakaRaffan/" },
  { n: "linkedin", url: "https://www.linkedin.com/in/arzakaraffan/" },
  { n: "external", url: "https://heisenbergers.itch.io/" },
  { n: "mail",     url: "mailto:arzakaraffan@gmail.com" },
];

const elsewhere = [
  { href: "https://github.com/ArzakaRaffan/",          label: "GitHub" },
  { href: "https://www.linkedin.com/in/arzakaraffan/", label: "LinkedIn" },
  { href: "https://heisenbergers.itch.io/",             label: "itch.io · heisenbergers" },
  { href: "mailto:arzakaraffan@gmail.com",              label: "Email" },
];

function Footer() {
  return (
    <footer className="border-t border-hairline-strong pt-16 pb-12 bg-canvas">
      <div className="max-w-container mx-auto px-8 flex flex-col gap-14">

        {/* Top grid */}
        <div className="grid gap-12" style={{ gridTemplateColumns: "minmax(0,1.6fr) repeat(2,minmax(0,1fr))" }} data-grid="footer">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-[360px]">
            <p className="font-display text-[36px] text-ink leading-[1.1] tracking-[-0.6px] m-0">
              Made this thing<br />
              <em className="italic">between classes.</em>
            </p>
            <p className="text-[13px] text-ash leading-relaxed m-0">
              A small site, no tracking, no popups. If you&rsquo;ve scrolled this far,
              you&rsquo;re probably someone I&rsquo;d enjoy working with.
            </p>
            <div className="mt-2">
              <StatusPill tone="green">All systems operational</StatusPill>
            </div>
          </div>

          {/* Pages */}
          <div className="flex flex-col gap-2.5">
            <div className="font-ui text-[11px] text-mute tracking-[0.6px] uppercase mb-1.5">Pages</div>
            {pages.map((p) => (
              <a key={p.href} href={p.href}
                 className="text-[14px] text-ash font-ui no-underline hover:text-ink transition-colors duration-100">
                {p.label}
              </a>
            ))}
          </div>

          {/* Elsewhere */}
          <div className="flex flex-col gap-2.5">
            <div className="font-ui text-[11px] text-mute tracking-[0.6px] uppercase mb-1.5">Elsewhere</div>
            {elsewhere.map((e) => (
              <a key={e.label} href={e.href}
                 target={e.href.startsWith("http") ? "_blank" : undefined}
                 rel={e.href.startsWith("http") ? "noopener noreferrer" : undefined}
                 className="text-[14px] text-ash font-ui no-underline hover:text-ink transition-colors duration-100">
                {e.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-center flex-wrap gap-4 pt-6 border-t border-hairline">
          <span className="font-mono text-[11px] text-ash">© 2026 Arzaka Raffan Mawardi.</span>
          <div className="flex gap-1">
            {socials.map((s) => (
              <a key={s.n} href={s.url}
                 target={s.url.startsWith("http") ? "_blank" : undefined}
                 rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                 className="w-9 h-9 rounded-full grid place-items-center text-ash
                            shadow-[inset_0_0_0_1px_transparent] hover:text-ink
                            hover:shadow-border transition-all duration-100">
                <Icon name={s.n} size={16} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export { Footer };
