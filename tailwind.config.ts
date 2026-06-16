import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep near-black greenish ink — base do FlowTune
        ink: {
          DEFAULT: "#0A0C0A",
          900: "#070907",
          800: "#0B0E0B",
          700: "#0F120F",
          600: "#141814",
        },
        surface: {
          DEFAULT: "#0F120F",
          raised: "#141814",
          glass: "rgba(255,255,255,0.03)",
        },
        // Verde esmeralda — accent assinatura
        emerald: {
          bright: "#5BF59B",
          DEFAULT: "#34E27E",
          mid: "#25C46A",
          deep: "#0E5A2E",
          ink: "#0B3D1E",
        },
        line: "rgba(255,255,255,0.07)",
        "line-strong": "rgba(255,255,255,0.12)",
        cloud: "#EDEFED",
        mist: "#9AA09A",
        faint: "#5A605A",
      },
      fontFamily: {
        sans: ["var(--font-urbanist)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at center, rgba(52,226,126,0.35) 0%, rgba(52,226,126,0.08) 35%, transparent 70%)",
        "green-fade":
          "linear-gradient(180deg, rgba(52,226,126,0) 0%, rgba(52,226,126,0.12) 60%, rgba(52,226,126,0.45) 100%)",
        "card-sheen":
          "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 40%, transparent 100%)",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(52,226,126,0.45)",
        "glow-sm": "0 0 24px -6px rgba(52,226,126,0.5)",
        card: "0 24px 70px -28px rgba(0,0,0,0.8)",
        "inner-line": "inset 0 0 0 1px rgba(255,255,255,0.06)",
      },
      keyframes: {
        "flow-dash": {
          to: { strokeDashoffset: "-24" },
        },
        "pulse-node": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(0.92)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "glow-breathe": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.85" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "flow-dash": "flow-dash 1s linear infinite",
        "pulse-node": "pulse-node 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "glow-breathe": "glow-breathe 5s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
