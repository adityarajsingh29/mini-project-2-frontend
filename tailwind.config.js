/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Design tokens — "terminal midnight" palette grounded in the
        // GitHub commit-graph / terminal vernacular this dashboard analyzes.
        ink: {
          DEFAULT: "#0B0E14",
          raised: "#131826",
          card: "#1B2233",
          line: "#262E42",
        },
        paper: {
          DEFAULT: "#F7F8FA",
          raised: "#FFFFFF",
          card: "#FFFFFF",
          line: "#E4E7EF",
        },
        signal: {
          DEFAULT: "#4FD1C5",
          soft: "#2DD4BF33",
        },
        spark: {
          DEFAULT: "#F5A623",
          soft: "#F5A62333",
        },
        danger: "#F0576B",
        muted: "#8B93A7",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(79, 209, 197, 0.15), 0 8px 30px -8px rgba(79, 209, 197, 0.25)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.4s ease-out both",
        pulseSoft: "pulseSoft 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
