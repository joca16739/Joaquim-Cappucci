import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1a3263",
          dark: "#12244a",
          light: "#24427f",
        },
        leaf: "#3fae49",
        water: "#2f9be0",
        gold: "#f2b632",
        torch: "#e03a3e",
      },
      fontFamily: {
        sans: ["\"Segoe UI\"", "system-ui", "-apple-system", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
