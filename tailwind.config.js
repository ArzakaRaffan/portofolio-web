/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F2F1EC",
        tile: "#E8E6DF",
        ink: "#0E0E0E",
        "ink-2": "#4F4D48",
        "ink-3": "#8A877F",
        line: "rgba(14,14,14,0.12)",
        "line-inv": "rgba(242,241,236,0.14)",
        accent: "#FF4D00",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { frame: "1360px" },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        in: "cubic-bezier(0.7, 0, 0.84, 0)",
      },
    },
  },
  plugins: [],
};
