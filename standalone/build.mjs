// Builds self-contained HTML files that open in any browser with a double click
// (no server or install needed). Output: standalone/dist/.
//
//   npm run build:standalone      (from the repo root)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(here, "..");
const dist = path.join(here, "dist");
fs.mkdirSync(dist, { recursive: true });

function documentFrom({ title, head = "", body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
${head}
</head>
<body>
${body}
</body>
</html>
`;
}

/* ---------- Competition (the playable Olympiad) ---------- */
const css = execFileSync(
  path.join(root, "node_modules/.bin/tailwindcss"),
  ["-c", path.join(here, "tailwind.competition.cjs"), "-i", "-", "--minify"],
  { input: "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n", encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] },
);
const levels = JSON.parse(fs.readFileSync(path.join(root, "data/levels.json"), "utf8"));
const data = { schoolYears: levels.schoolYears, levels: levels.levels, content: {} };
for (const n of [1, 2, 3, 4]) {
  data.content[n] = JSON.parse(fs.readFileSync(path.join(root, `data/level-${n}.json`), "utf8"));
}
const template = fs.readFileSync(path.join(here, "competition.template.html"), "utf8")
  .replace("<title>Sustainable Olympiad</title>\n", "");
const competition = template
  .replace("__TAILWIND__", () => css)
  .replace("__DATA__", () => JSON.stringify(data).replace(/</g, "\\u003c"));
fs.writeFileSync(
  path.join(dist, "Sustainable-Olympiad-Competition.html"),
  documentFrom({ title: "Sustainable Olympiad – Competition", body: competition }),
);

/* ---------- Official website (from the Next.js static export) ---------- */
const out = path.join(root, "website/out");
if (!fs.existsSync(path.join(out, "index.html"))) {
  throw new Error("Build the website first: npm --prefix website run build");
}
const html = fs.readFileSync(path.join(out, "index.html"), "utf8");
const cssDir = path.join(out, "_next/static/css");
const siteCss = fs.readdirSync(cssDir).sort().map((f) => fs.readFileSync(path.join(cssDir, f), "utf8")).join("");
const fontHref = html.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com[^"]+)"/)[1];
// Embed the logo so the file works from disk; without it, show the placeholder box.
const logoPath = path.join(root, "website/public/logo.png");
const logoSrc = fs.existsSync(logoPath)
  ? `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`
  : null;
const withLogo = (s) => (logoSrc ? s.replaceAll('"/logo.png"', `"${logoSrc}"`) : s);
const iconLinks = logoSrc ? `<link rel="icon" href="${logoSrc}">\n<link rel="apple-touch-icon" href="${logoSrc}">` : "";
const siteBody = html
  .match(/<body[^>]*>([\s\S]*)<\/body>/)[1]
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "") // the static page needs no Next.js runtime
  .replace(/<!--[\s\S]*?-->/g, "");
fs.writeFileSync(
  path.join(dist, "Sustainable-Olympiad-Website.html"),
  documentFrom({
    title: "Sustainable Olympiad",
    head: `<meta name="theme-color" content="#0b2f5e">
${iconLinks}
<link rel="stylesheet" href="${fontHref}">
<style>${siteCss}</style>`,
    body: `<div class="font-sans">${withLogo(siteBody)}</div>
<script>
  // No logo file embedded: swap broken logo images for a placeholder.
  document.querySelectorAll('img[src="/logo.png"]').forEach(function (img) {
    var box = img.parentElement;
    box.className = box.className.replace("bg-white", "border-2 border-dashed border-white/40 bg-navy-deep");
    box.innerHTML = '<span style="font-size:.55rem;font-weight:600;letter-spacing:.08em;color:rgba(255,255,255,.6)">LOGO</span>';
  });
  // Close the mobile menu after choosing a section.
  document.querySelectorAll("#mobile-menu a").forEach(function (a) {
    a.addEventListener("click", function () { document.getElementById("mobile-menu").removeAttribute("open"); });
  });
</script>`,
  }),
);

/* ---------- ZIP with both pages and the read-me ---------- */
const zip = path.join(dist, "Sustainable-Olympiad.zip");
fs.rmSync(zip, { force: true });
execFileSync("zip", ["-q", "-X", zip, "Sustainable-Olympiad-Website.html", "Sustainable-Olympiad-Competition.html", "Como-abrir.txt"], { cwd: dist });

for (const f of fs.readdirSync(dist)) console.log("wrote", path.join("standalone/dist", f));
