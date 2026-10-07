import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#2E7D32", dark: "#1F5E23" },
        leaf: { DEFAULT: "#7CB342", soft: "#E6F2D6" },
        water: { DEFAULT: "#0288D1", deep: "#01579B", soft: "#E1F2FB" },
        gold: { DEFAULT: "#F2B705", deep: "#8A6400", soft: "#FDF3D0" },
        sand: { DEFAULT: "#F7F4EC", dark: "#EDE7D8" },
        ink: { DEFAULT: "#1B3A2F", soft: "#4A6359" },
      },
      fontFamily: {
        sans: ["Nunito", "ui-rounded", '"SF Pro Rounded"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(27,58,47,0.06), 0 8px 24px -8px rgba(27,58,47,0.14)",
        lift: "0 2px 4px rgba(27,58,47,0.06), 0 18px 40px -12px rgba(27,58,47,0.22)",
      },
      keyframes: {
        "page-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "page-in": "page-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
