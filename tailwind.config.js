/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas:         "#000000",
        ink:            "#fcfdff",
        body:           "rgba(252,253,255,0.86)",
        charcoal:       "rgba(252,253,255,0.70)",
        mute:           "#a1a4a5",
        ash:            "#888e90",
        stone:          "#464a4d",
        "surface-card":     "#0a0a0c",
        "surface-elevated": "#101012",
        "surface-deep":     "#06060a",
        "surface-light":    "#f1f7fe",
        "primary-white":    "#fcfdff",
        "primary-on":       "#000000",
        "accent-orange":    "#ff801f",
        "accent-yellow":    "#ffc53d",
        "accent-blue":      "#3b9eff",
        "accent-green":     "#11ff99",
        "accent-red":       "#ff2047",
        "hairline":         "rgba(252,253,255,0.06)",
        "hairline-strong":  "rgba(252,253,255,0.10)",
        "hairline-bright":  "rgba(252,253,255,0.16)",
      },
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        ui:      ['"TT Commons"', "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono:    ['"Geist Mono"', '"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        border:        "inset 0 0 0 1px rgba(252,253,255,0.10)",
        "border-bright":"inset 0 0 0 1px rgba(252,253,255,0.16)",
        "border-dim":   "inset 0 0 0 1px rgba(252,253,255,0.06)",
        focus:          "0 0 0 3px rgba(59,158,255,0.25)",
      },
      animation: {
        blink:   "blink 1.1s steps(1,end) infinite",
        breathe: "breathe 9s ease-in-out infinite",
        pulse2:  "pulse2 2s ease-in-out infinite",
        scroll:  "scroll var(--animation-duration,40s) var(--animation-direction,forwards) linear infinite",
        aurora:  "aurora 60s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 50%":   { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        breathe: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.78", transform: "scale(1.05)" },
        },
        pulse2: {
          "0%, 100%": { boxShadow: "0 0 8px currentColor" },
          "50%":      { boxShadow: "0 0 14px currentColor" },
        },
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to:   { backgroundPosition: "350% 50%, 350% 50%" },
        },
      },
      maxWidth: { container: "1200px" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
