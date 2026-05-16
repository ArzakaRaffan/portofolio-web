"use client";
import React from "react";
import { Icon, StatusPill } from "./Icons";

const contactStyles = {
  section: { position: "relative", padding: "120px 0", overflow: "hidden", borderTop: "1px solid var(--hairline-strong)" },
  glow: {
    position: "absolute", inset: "-20% -10% 60% -10%",
    background: "radial-gradient(closest-side at 70% 30%, rgba(255,89,0,0.22), transparent 65%)",
    filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
  },
  inner: { position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 32px" },
  grid: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 64, alignItems: "start" },
  left: { display: "flex", flexDirection: "column", gap: 22 },
  eyebrow: {
    fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--mute)",
    letterSpacing: "0.7px", textTransform: "uppercase",
    display: "flex", alignItems: "center", gap: 10,
  },
  eyebrowLine: { width: 24, height: 1, background: "var(--mute)" },
  h: {
    fontFamily: "var(--font-serif)", fontSize: 76.8, lineHeight: 1.0,
    letterSpacing: "-0.768px", color: "var(--ink)", margin: 0, fontWeight: 400,
  },
  p: { fontSize: 18, lineHeight: 1.55, color: "var(--body)", margin: 0, maxWidth: 460 },
  mailto: {
    display: "inline-flex", alignItems: "center", gap: 10,
    fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--ink)",
    paddingBottom: 4, borderBottom: "1px solid var(--hairline-bright)",
    width: "fit-content",
  },
  card: {
    background: "var(--surface-card)", borderRadius: 12,
    boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
    padding: 28, display: "flex", flexDirection: "column", gap: 16,
  },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: {
    fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--mute)",
    letterSpacing: "0.5px", textTransform: "uppercase",
  },
  input: {
    background: "var(--canvas)", border: 0,
    boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
    borderRadius: 8, color: "var(--ink)", height: 40,
    padding: "0 12px", fontFamily: "var(--font-sans)", fontSize: 14,
    outline: "none", transition: "box-shadow 120ms ease",
  },
  textarea: {
    background: "var(--canvas)", border: 0,
    boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
    borderRadius: 8, color: "var(--ink)", minHeight: 110,
    padding: "10px 12px", fontFamily: "var(--font-sans)", fontSize: 14,
    outline: "none", resize: "vertical", transition: "box-shadow 120ms ease",
  },
  budgets: { display: "flex", gap: 8, flexWrap: "wrap" },
  chip: {
    fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--body)",
    padding: "6px 12px", borderRadius: 9999,
    boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
    cursor: "pointer", userSelect: "none",
    transition: "all 120ms ease", background: "transparent",
  },
  chipActive: {
    color: "var(--primary-on)", background: "var(--primary-white)",
    boxShadow: "none",
  },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6, gap: 12, flexWrap: "wrap" },
  submit: {
    display: "inline-flex", alignItems: "center", gap: 8,
    height: 40, padding: "0 18px",
    background: "var(--primary-white)", color: "var(--primary-on)",
    border: 0, borderRadius: 9999,
    fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500,
    letterSpacing: "-0.1px", cursor: "pointer",
    transition: "background 120ms ease",
  },
  hint: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--mute)", margin: 0 },
};

function Contact() {
  const [budget, setBudget] = React.useState("Project");
  const [sent, setSent] = React.useState(false);
  const [focus, setFocus] = React.useState("");

  const fieldStyle = (key) => ({
    ...contactStyles.input,
    boxShadow: focus === key
      ? "inset 0 0 0 1px var(--hairline-bright), 0 0 0 3px rgba(59,158,255,0.25)"
      : "inset 0 0 0 1px var(--hairline-strong)",
  });
  const taStyle = focus === "msg"
    ? { ...contactStyles.textarea, boxShadow: "inset 0 0 0 1px var(--hairline-bright), 0 0 0 3px rgba(59,158,255,0.25)" }
    : contactStyles.textarea;

  return (
    <section id="contact" style={contactStyles.section}>
      <div style={contactStyles.glow} />
      <div style={contactStyles.inner}>
        <div style={contactStyles.grid} data-grid="contact">
          <div style={contactStyles.left}>
            <span style={contactStyles.eyebrow}><span style={contactStyles.eyebrowLine}></span> Contact</span>
            <h2 style={contactStyles.h}>
              Let&rsquo;s build<br/>
              <em style={{ fontStyle: "italic" }}>something</em> together.
            </h2>
            <p style={contactStyles.p}>
              Whether you&rsquo;ve got a question, a project to share, or just want to talk about pixel art,
              email is the fastest way. I read everything.
            </p>
            <a href="mailto:arzakaraffan@gmail.com" style={contactStyles.mailto}>
              <Icon name="mail" size={16} /> arzakaraffan@gmail.com
            </a>
          </div>
          <form style={contactStyles.card} onSubmit={(e) => { e.preventDefault(); setSent(true); }} data-grid="contact-form">
            {sent ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "24px 4px" }}>
                <Icon name="check" size={28} />
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, letterSpacing: "-0.4px" }}>Thanks, message received.</div>
                <p style={{ fontSize: 14, color: "var(--body)", margin: 0, lineHeight: 1.55 }}>
                  Got it. I&rsquo;ll get back to you soon, usually within a day.
                </p>
                <button type="button" className="btn btn--ghost btn--pill" style={{ alignSelf: "flex-start", marginTop: 8 }}
                        onClick={() => setSent(false)}>Send another</button>
              </div>
            ) : (
              <React.Fragment>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={contactStyles.field}>
                    <span style={contactStyles.label}>Name</span>
                    <input style={fieldStyle("name")} placeholder="Sam Rivera"
                           onFocus={() => setFocus("name")} onBlur={() => setFocus("")} />
                  </div>
                  <div style={contactStyles.field}>
                    <span style={contactStyles.label}>Email</span>
                    <input style={fieldStyle("email")} placeholder="sam@example.com"
                           onFocus={() => setFocus("email")} onBlur={() => setFocus("")} />
                  </div>
                </div>
                <div style={contactStyles.field}>
                  <span style={contactStyles.label}>Subject</span>
                  <input style={fieldStyle("proj")} placeholder="What&rsquo;s it about?"
                         onFocus={() => setFocus("proj")} onBlur={() => setFocus("")} />
                </div>
                <div style={contactStyles.field}>
                  <span style={contactStyles.label}>Type</span>
                  <div style={contactStyles.budgets}>
                    {["Project", "Question", "Collab", "Just saying hi"].map((b) => (
                      <span key={b} style={{ ...contactStyles.chip, ...(budget === b ? contactStyles.chipActive : {}) }}
                            onClick={() => setBudget(b)}>{b}</span>
                    ))}
                  </div>
                </div>
                <div style={contactStyles.field}>
                  <span style={contactStyles.label}>Tell me more</span>
                  <textarea style={taStyle} placeholder="What are you working on?"
                            onFocus={() => setFocus("msg")} onBlur={() => setFocus("")} />
                </div>
                <div style={contactStyles.row}>
                  <p style={contactStyles.hint}>Usually replies in a day · No bots, just me</p>
                  <button type="submit" style={contactStyles.submit}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-light)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--primary-white)")}>
                    Send message <Icon name="arrow-right" size={14} />
                  </button>
                </div>
              </React.Fragment>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export { Contact };