"use client";
import React from "react";

const { useState, useEffect } = React;

// Inline SVG icons (Lucide, stroke 1.5)
function Icon({ name, size = 20 }) {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.5,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "arrow-right": return (
      <svg {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    );
    case "arrow-left": return (
      <svg {...props}><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
    );
    case "arrow-up-right": return (
      <svg {...props}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
    );
    case "menu": return (
      <svg {...props}><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></svg>
    );
    case "x": return (
      <svg {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    );
    case "github": return (
      <svg {...props}><path d="M15 22v-4a4 4 0 0 0-1.1-2.8 5 5 0 0 0 .8-6.7 5 5 0 0 0-8.5 0 5 5 0 0 0 .8 6.7A4 4 0 0 0 6 18v4"/><path d="M9 18c-4 0-5-2-5-4"/></svg>
    );
    case "linkedin": return (
      <svg {...props}><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v2"/><circle cx="6" cy="6" r="1.5"/><path d="M6 9v12"/></svg>
    );
    case "x-twitter": return (
      <svg {...props}><path d="M4 4h4l12 16h-4z"/><path d="M4 20 10.5 13"/><path d="M13.5 11 20 4"/></svg>
    );
    case "mail": return (
      <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
    );
    case "copy": return (
      <svg {...props}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    );
    case "check": return (
      <svg {...props}><path d="M20 6 9 17l-5-5"/></svg>
    );
    case "external": return (
      <svg {...props}><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>
    );
    case "dot": return (
      <svg {...props}><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>
    );
    default: return null;
  }
}

// Status pill — a 6px dot + label
function StatusPill({ tone = "green", children }) {
  const colors = {
    green: { dot: "#11ff99", shadow: "0 0 8px #11ff99" },
    yellow: { dot: "#ffc53d", shadow: "0 0 8px #ffc53d" },
    red: { dot: "#ff2047", shadow: "0 0 6px #ff2047" },
  };
  const c = colors[tone] || colors.green;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "var(--surface-card)",
      boxShadow: "inset 0 0 0 1px var(--hairline-strong)",
      borderRadius: 9999, padding: "5px 12px",
      fontSize: 12, color: "var(--body)",
      fontFamily: "var(--font-ui)", letterSpacing: "-0.1px",
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: c.dot, boxShadow: c.shadow,
      }} />
      {children}
    </span>
  );
}

export { Icon, StatusPill };