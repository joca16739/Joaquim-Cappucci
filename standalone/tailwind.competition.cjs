// Tailwind config for the standalone competition page (same colours as the Next.js prototype).
module.exports = {
  content: [__dirname + "/competition.template.html"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1a3263", dark: "#12244a", light: "#24427f" },
        leaf: "#3fae49",
        water: "#2f9be0",
        gold: "#f2b632",
        torch: "#e03a3e",
      },
    },
  },
};
