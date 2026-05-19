"use client";
import React from "react";
import { Icon } from "./Icons";

const navStyles = {
  shell: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    transition: "background 240ms cubic-bezier(0.16,1,0.3,1), backdrop-filter 240ms cubic-bezier(0.16,1,0.3,1), border-color 240ms",
    borderBottom: "1px solid transparent",
  },
  shellScrolled: {
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid var(--hairline-strong)",
  },
  row: {
    height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
    maxWidth: 1200, margin: "0 auto", padding: "0 32px",
  },
  brand: {
    display: "flex", alignItems: "center", gap: 10,
    fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--ink)",
    letterSpacing: "-0.4px",
  },
  brandMark: {
    width: 26, height: 26, borderRadius: 7,
    background: "var(--ink)", color: "var(--primary-on)",
    display: "grid", placeItems: "center",
    fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 400,
    letterSpacing: "-0.5px",
  },
  links: {
    display: "flex", alignItems: "center", gap: 28,
    fontFamily: "var(--font-ui)", fontSize: 14,
  },
  link: {
    color: "var(--body)", transition: "color 120ms ease",
    cursor: "pointer",
  },
  cta: {
    display: "inline-flex", alignItems: "center", gap: 8,
    height: 36, padding: "0 16px",
    background: "var(--primary-white)", color: "var(--primary-on)",
    borderRadius: 9999, fontSize: 13, fontWeight: 500,
    letterSpacing: "-0.1px",
  },
  burger: {
    display: "none", background: "transparent", border: 0, color: "var(--ink)",
    padding: 8, cursor: "pointer",
  },
  drawer: {
    position: "fixed", inset: "64px 0 0 0", zIndex: 49,
    background: "rgba(0,0,0,0.94)", backdropFilter: "blur(20px)",
    padding: "32px 24px", display: "flex", flexDirection: "column", gap: 20,
  },
  drawerLink: {
    fontFamily: "var(--font-serif)", fontSize: 32, color: "var(--ink)",
    letterSpacing: "-0.6px",
  },
};

function Nav({ onCTAClick }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onResize = () => setIsMobile(window.innerWidth <= 767);
    onScroll(); onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const items = [
    { href: "#work", label: "Work" },
    { href: "#highlights", label: "Highlights" },
    { href: "#experience", label: "Experience" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <React.Fragment>
      <nav style={{ ...navStyles.shell, ...(scrolled ? navStyles.shellScrolled : {}) }}>
        <div style={navStyles.row}>
          <a href="#top" style={navStyles.brand} aria-label="Home">
            <span style={navStyles.brandMark}>A</span>
          </a>
          {!isMobile && (
            <div style={navStyles.links}>
              {items.map((it) => (
                <a key={it.href} href={it.href} style={navStyles.link}
                   onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                   onMouseLeave={(e) => (e.currentTarget.style.color = "var(--body)")}>
                  {it.label}
                </a>
              ))}
              <a href="#contact" style={navStyles.cta} onClick={(e) => { e.preventDefault(); onCTAClick && onCTAClick(); }}>
                Get in touch <Icon name="arrow-right" size={14} />
              </a>
            </div>
          )}
          {isMobile && (
            <button style={{ ...navStyles.burger, display: "block" }} onClick={() => setOpen(!open)} aria-label="Menu">
              <Icon name={open ? "x" : "menu"} size={22} />
            </button>
          )}
        </div>
      </nav>
      {isMobile && open && (
        <div style={navStyles.drawer} className="nav-drawer-in">
          {items.map((it) => (
            <a key={it.href} href={it.href} style={navStyles.drawerLink} onClick={() => setOpen(false)}>
              {it.label}
            </a>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

export { Nav };