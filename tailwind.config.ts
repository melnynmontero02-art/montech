import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#38BDF8",
          violet: "#A78BFA",
          cyan: "#22D3EE",
          deep: "#000008",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 3s infinite",
        "orb-1": "orb1 18s ease-in-out infinite",
        "orb-2": "orb2 22s ease-in-out infinite",
        "orb-3": "orb3 16s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        orb1: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(60px,-80px) scale(1.1)" },
          "66%": { transform: "translate(-40px,40px) scale(0.95)" },
        },
        orb2: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(-70px,50px) scale(1.05)" },
          "66%": { transform: "translate(50px,-60px) scale(1.1)" },
        },
        orb3: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(40px,60px)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
    },
  },
  plugins: [],
};

export default config;
