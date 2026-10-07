# Sustainable Olympiad – official website

Website of the Sustainable Olympiad, a sustainability and environmental education competition for
students, created by the PORTO talks project ("The world as seen by the students") and connected to
SDG 4 – Quality Education.

Next.js (App Router) + TypeScript + Tailwind CSS + lucide-react icons. Each tab is its own route with a
shared navbar and footer; the site is exported as static HTML (`out/`) and can be hosted anywhere.

| Tab | Route |
| --- | --- |
| Home | `/` |
| About | `/about` |
| Objectives | `/objectives` |
| How it works | `/how-it-works` |
| Why it matters | `/why-it-matters` |
| Participate | `/participate` |
| FAQ | `/faq` |

```bash
cd website
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to out/
```

## Before going live

1. **Fill in the placeholders** in `app/site.ts`:
   - `registerUrl` – registration link (`[LINK]`). Until it is set, every "Register your school" button
     goes to the For Schools block on the Participate page, which shows the placeholder.
   - `date` – when the Olympiad takes place (`[DATE]`, shown in the FAQ and on the sample certificate).
   - `email` – contact address (`[EMAIL]`, shown in the footer).
2. **Add the official logo** as `public/logo.png`. It appears in the navbar (links to Home), large in the
   Home hero, in the footer, on the sample certificate and as the favicon, always on a white circle so
   its white background looks clean on any colour. Until the file exists, a "Logo" placeholder is shown.
   The PORTO talks logo on the About page is still a placeholder.

## Design

Colours live in `tailwind.config.ts`: forest green `#2E7D32` (primary), leaf green `#7CB342`, water blue
`#0288D1`, medal gold `#F2B705`, sand `#F7F4EC` (background), deep green `#1B3A2F` (text). Font: Nunito.

## Deploying on Vercel

Import the repository and set **Root Directory** to `website`.
