# Sustainable Olympiad – official website

One-page website of the Sustainable Olympiad, a sustainability and environmental knowledge competition
for students, created by the PORTO talks project ("The world as seen by the students") and connected
to SDG 4 – Quality Education.

Next.js + TypeScript + Tailwind CSS. The page is exported as static HTML (`out/`), so it can be hosted
anywhere.

```bash
cd website
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to out/
```

## Before going live

1. **Fill in the placeholders** in `app/site.ts`:
   - `registerUrl` – registration link (`[LINK]`). Until it is set, the "Register" buttons scroll to
     the For Schools section, which shows the placeholder.
   - `date` – when the Olympiad takes place (`[DATE]`, shown in the FAQ).
   - `email` – contact address (`[EMAIL]`, shown in the footer).
2. **Add the official logo** as `public/logo.png`. It is used in the navbar, large in the hero, in the
   footer and as the favicon, always on a white circle so its white background looks clean on navy.
   Until the file exists, a placeholder is shown instead. The PORTO talks logo is still a placeholder
   (About card and footer).

## Deploying on Vercel

Import the repository and set **Root Directory** to `website`.
