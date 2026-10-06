# Sustainable Olympiad

A web prototype of the **Sustainable Olympiad**, a school competition created by students for the
**PORTO talks** project — *"The world as seen by the students"*. The project addresses
**SDG 4 (Quality Education)**, and the olympiad is our intervention.

Built with Next.js (App Router), TypeScript and Tailwind CSS. All content lives in local JSON files
and progress is saved in the browser (`localStorage`) — no login or server database.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build: `npm run build && npm start`. Type check: `npm run typecheck`.

## How it works

1. **Home** – explanation and a *Start* button.
2. **Level selection** – the student enters their name (optional, used on the certificate) and picks
   their school year; they are placed in a level automatically:

   | Level | School years |
   | --- | --- |
   | 1 | 5th and 6th grade |
   | 2 | 7th and 8th grade |
   | 3 | 9th grade and 1st year of High School |
   | 4 | 2nd and 3rd year of High School |

3. **Phase 1 – Test**: 10 multiple-choice questions, 1 point each, with an explanation after every answer.
4. **Phase 2 – Riddle**: a text-answer riddle. 10 points without hints, 7 with one hint, 4 with two;
   giving up reveals the answer for 0 points. Unlimited attempts.
5. **Phase 3 – Final Test**: 10 harder questions, 2 points each.
6. **Results** – score per phase, total out of 40 and a medal (Gold ≥ 85%, Silver ≥ 65%, Bronze ≥ 40%).
7. **Certificate** – a printable completion certificate (prints on one A4 landscape page).

Phases must be played in order; a progress bar shows Phase 1 → 2 → 3. Answer options are shuffled on
each attempt. *Play again* on the results page clears progress.

## Editing the content

| File | Contents |
| --- | --- |
| `data/levels.json` | School years and which level each maps to |
| `data/level-1.json` … `level-4.json` | `test` (10 questions), `riddle`, `final` (10 questions) |

Question format — `answer` is the index of the correct option:

```json
{
  "question": "Which gas do trees take in from the air?",
  "options": ["Oxygen", "Helium", "Carbon dioxide", "Nitrogen"],
  "answer": 2,
  "explanation": "Trees absorb carbon dioxide and release the oxygen we breathe."
}
```

Riddle answers are matched case-insensitively, ignoring punctuation and leading articles
("The rainforest!" matches `rainforest`). Add alternative spellings to `answers`.

## Project structure

```
app/            Pages: /, /level, /play/test, /play/riddle, /play/final, /results, /certificate
components/     Logo (laurel, torch, water drop), Quiz, PhaseProgress, buttons, page shell
data/           Questions and riddles (JSON)
lib/            Types, data access, scoring rules, progress store, step guard
```

Scoring rules are in `lib/scoring.ts`; colours (navy `#1a3263`, leaf green, water blue, gold, torch red)
are in `tailwind.config.ts`.

## Official website

The Olympiad's public one-page website lives in [`website/`](website/README.md), a separate Next.js app.
