import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          900: "#020814",
          800: "#0A1C2F",
        },
        extropic: {
          blue: "#6AC6FF",
          teal: "#4CDDD0",
          purple: "#7F9CFF",
          sky: "#A7DDFF",
        },
        ember: {
          900: "#030D1B",
          800: "#071A32",
          700: "#0D2948",
          600: "#15365D",
        },
        gild: {
          500: "#5FBFFB",
          400: "#8CD0FF",
          300: "#C5E6FF",
        },
      },
      backgroundImage: {
        "noise-texture": "radial-gradient(circle at 20% 20%, rgba(90, 184, 255, 0.35), transparent 45%), radial-gradient(circle at 80% 10%, rgba(92, 178, 210, 0.25), transparent 40%), radial-gradient(circle at 50% 80%, rgba(127, 206, 255, 0.2), transparent 45%)",
        "hero-ridge": "linear-gradient(135deg, rgba(10,30,52,0.85) 0%, rgba(3,12,26,0.95) 60%), radial-gradient(circle at 10% 20%, rgba(76,161,255,0.25) 0%, transparent 55%), radial-gradient(circle at 80% 15%, rgba(94,213,255,0.3) 0%, transparent 50%)",
        "golden-glow": "radial-gradient(circle at 50% 50%, rgba(126,196,255,0.18), transparent 55%)",
      },
      boxShadow: {
        glow: "0 30px 120px rgba(111, 195, 255, 0.45)",
        ember: "0 40px 120px rgba(63, 129, 211, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
