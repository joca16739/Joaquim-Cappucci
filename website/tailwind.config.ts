import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0b2f5e",
          deep: "#071f40",
          soft: "#123d75",
          line: "#2a5591",
        },
        leaf: "#3fae49",
        water: "#2f9be0",
        gold: "#f2b632",
        torch: "#e03a3e",
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Arial Narrow"', "Impact", "sans-serif"],
        sans: ["Barlow", "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
