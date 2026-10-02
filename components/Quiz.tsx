"use client";

import { useState } from "react";
import { shuffleQuestion } from "@/lib/shuffle";
import type { PhaseResult, Question } from "@/lib/types";
import { Button, LinkButton } from "./Button";

const letters = ["A", "B", "C", "D", "E"];

export default function Quiz({
  title,
  intro,
  questions,
  pointsPerQuestion,
  onComplete,
  nextHref,
  nextLabel,
}: {
  title: string;
  intro: string;
  questions: Question[];
  pointsPerQuestion: number;
  onComplete: (result: PhaseResult) => void;
  nextHref: string;
  nextLabel: string;
}) {
  // Shuffle once per attempt so answers aren't always in the same position.
  const [items] = useState(() => questions.map(shuffleQuestion));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const max = items.length * pointsPerQuestion;

  if (finished) {
    const score = correct * pointsPerQuestion;
    const percent = Math.round((correct / items.length) * 100);
    return (
      <section className="rounded-3xl bg-white/5 p-6 text-center ring-1 ring-white/10 sm:p-10">
        <p className="text-sm uppercase tracking-widest text-gold">{title} complete</p>
        <p className="mt-4 text-6xl font-black">
          {score}
          <span className="text-2xl text-white/60"> / {max}</span>
        </p>
        <p className="mt-2 text-white/80">
          {correct} of {items.length} correct ({percent}%)
        </p>
        <p className="mt-4 text-lg">
          {percent >= 80
            ? "Outstanding! You're a true guardian of the planet. 🌍"
            : percent >= 50
              ? "Well done! You know a lot about sustainability. 🌱"
              : "Good effort! Every answer is a chance to learn something new. 💧"}
        </p>
        <LinkButton href={nextHref} className="mt-8">
          {nextLabel} →
        </LinkButton>
      </section>
    );
  }

  const q = items[index];
  const answered = picked !== null;
  const isLast = index === items.length - 1;

  function choose(i: number) {
    if (answered) return;
    setPicked(i);
    if (i === q.answer) setCorrect((c) => c + 1);
  }

  function next() {
    if (isLast) {
      // `correct` already includes this question's result.
      onComplete({ score: correct * pointsPerQuestion, max });
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  }

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-black sm:text-3xl">{title}</h1>
        <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">
          {index + 1} / {items.length}
        </span>
      </div>
      {index === 0 && !answered && <p className="mb-4 text-white/70">{intro}</p>}

      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-water transition-all"
          style={{ width: `${((index + (answered ? 1 : 0)) / items.length) * 100}%` }}
        />
      </div>

      <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-8">
        <h2 className="mb-5 text-lg font-bold leading-snug sm:text-xl">{q.question}</h2>
        <ul className="grid gap-3">
          {q.options.map((opt, i) => {
            let style = "border-white/20 bg-navy-light hover:border-water hover:bg-water/10";
            if (answered) {
              if (i === q.answer) style = "border-leaf bg-leaf/25";
              else if (i === picked) style = "border-torch bg-torch/25";
              else style = "border-white/10 bg-navy-light opacity-60";
            }
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => choose(i)}
                  disabled={answered}
                  className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition sm:p-4 ${style}`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold ${
                      answered && i === q.answer ? "bg-leaf" : answered && i === picked ? "bg-torch" : "bg-white/10"
                    }`}
                  >
                    {answered && i === q.answer ? "✓" : answered && i === picked ? "✗" : letters[i]}
                  </span>
                  <span>{opt}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {answered && (
          <div
            className={`mt-5 rounded-2xl p-4 ${picked === q.answer ? "bg-leaf/15 ring-1 ring-leaf/50" : "bg-torch/15 ring-1 ring-torch/50"}`}
            role="status"
          >
            <p className="font-bold">{picked === q.answer ? "Correct! 🎉" : "Not quite."}</p>
            <p className="mt-1 text-white/85">{q.explanation}</p>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-white/60">
          Score: {correct * pointsPerQuestion} / {max}
        </span>
        <Button onClick={next} disabled={!answered}>
          {isLast ? "See my score" : "Next question"} →
        </Button>
      </div>
    </section>
  );
}
