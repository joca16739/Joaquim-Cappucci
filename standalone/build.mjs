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
// Every tab of the site goes into one file; a small script switches tabs by #hash.
const out = path.join(root, "website/out");
if (!fs.existsSync(path.join(out, "index.html"))) {
  throw new Error("Build the website first: npm --prefix website run build");
}
const routes = ["home", "about", "objectives", "how-it-works", "why-it-matters", "participate", "faq"];
const pageHtml = (r) => fs.readFileSync(path.join(out, r === "home" ? "index.html" : `${r}/index.html`), "utf8");
const stripNext = (s) => s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<!--[\s\S]*?-->/g, "");

const home = pageHtml("home");
const cssDir = path.join(out, "_next/static/css");
const siteCss = fs.readdirSync(cssDir).sort().map((f) => fs.readFileSync(path.join(cssDir, f), "utf8")).join("");
const fontHref = home.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com[^"]+)"/)[1];

// Embed the logo so the file works from disk; without it, show the placeholder box.
const logoPath = path.join(root, "website/public/logo.png");
const logoSrc = fs.existsSync(logoPath)
  ? `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`
  : null;
const withLogo = (s) => (logoSrc ? s.replaceAll('"/logo.png"', `"${logoSrc}"`) : s);
const iconLinks = logoSrc ? `<link rel="icon" href="${logoSrc}">\n<link rel="apple-touch-icon" href="${logoSrc}">` : "";

// Site links become hash links: "/about/" → "#about", "/participate/#schools" → "#participate--schools".
const toHash = (s) =>
  s.replace(/href="\/([a-z-]*)\/?(?:#([a-z-]+))?"/g, (_, route, anchor) => `href="#${route || "home"}${anchor ? `--${anchor}` : ""}"`);

const body = stripNext(home.match(/<body[^>]*>([\s\S]*)<\/body>/)[1]);
const navbar = body.match(/<header[\s\S]*?<\/header>/)[0];
const footer = body.match(/<footer[\s\S]*?<\/footer>/)[0];
const titles = {};
const pages = routes
  .map((r) => {
    const h = pageHtml(r);
    titles[r] = h.match(/<title>([^<]*)<\/title>/)[1];
    const main = stripNext(h.match(/<main id="page-content"[^>]*>([\s\S]*)<\/main>/)[1]);
    return `<div data-page="${r}"${r === "home" ? "" : " hidden"}>${main}</div>`;
  })
  .join("\n");

const siteBodyHtml = toHash(withLogo(`<div class="flex min-h-screen flex-col font-sans">
${navbar}
<main id="page-content" class="flex-1">
${pages}
</main>
${footer}
</div>`));

const siteScript = `<script>
  (function () {
    var titles = ${JSON.stringify(titles)};
    var menu = document.getElementById("mobile-menu");
    function show() {
      var parts = (location.hash.slice(1) || "home").split("--");
      var page = titles[parts[0]] ? parts[0] : "home";
      document.querySelectorAll("[data-page]").forEach(function (el) { el.hidden = el.getAttribute("data-page") !== page; });
      document.querySelectorAll("header a[href^='#']").forEach(function (a) {
        if (a.getAttribute("href") === "#" + page) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
      document.title = titles[page];
      if (menu) menu.removeAttribute("open");
      var target = parts[1] && document.getElementById(parts[1]);
      if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", show);
    show();
    // No logo file embedded: swap broken logo images for a placeholder.
    document.querySelectorAll('img[src="/logo.png"]').forEach(function (img) {
      var box = img.parentElement;
      box.className = box.className.replace("bg-white", "border-2 border-dashed border-forest/40 bg-white");
      box.innerHTML = '<span style="font-size:.55rem;font-weight:700;letter-spacing:.08em;color:rgba(46,125,50,.75)">LOGO</span>';
    });
  })();
</script>`;

fs.writeFileSync(
  path.join(dist, "Sustainable-Olympiad-Website.html"),
  documentFrom({
    title: "Sustainable Olympiad",
    head: `<meta name="theme-color" content="#2E7D32">
${iconLinks}
<link rel="stylesheet" href="${fontHref}">
<style>${siteCss}</style>`,
    body: `${siteBodyHtml}\n${siteScript}`,
  }),
);

// Optional: the same page without the document wrapper, for publishing as a claude.ai artifact.
if (process.env.ARTIFACT_OUT) {
  fs.writeFileSync(
    process.env.ARTIFACT_OUT,
    `<title>Sustainable Olympiad</title>\n<link rel="stylesheet" href="${fontHref}">\n<style>${siteCss}</style>\n${siteBodyHtml}\n${siteScript}\n`,
  );
}

/* ---------- ZIP with both pages and the read-me ---------- */
const zip = path.join(dist, "Sustainable-Olympiad.zip");
fs.rmSync(zip, { force: true });
execFileSync("zip", ["-q", "-X", zip, "Sustainable-Olympiad-Website.html", "Sustainable-Olympiad-Competition.html", "Como-abrir.txt"], { cwd: dist });

for (const f of fs.readdirSync(dist)) console.log("wrote", path.join("standalone/dist", f));
