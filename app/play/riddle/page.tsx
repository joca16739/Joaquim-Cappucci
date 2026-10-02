"use client";

import { useState } from "react";
import { Button, LinkButton } from "@/components/Button";
import Loading from "@/components/Loading";
import PageShell from "@/components/PageShell";
import PhaseProgress from "@/components/PhaseProgress";
import { getLevelContent } from "@/lib/data";
import { isRiddleAnswerCorrect, RIDDLE_MAX, riddlePoints } from "@/lib/scoring";
import { useOlympiad } from "@/lib/store";
import { useStepGuard } from "@/lib/useStepGuard";

export default function RiddlePage() {
  const allowed = useStepGuard("riddle");
  const { progress, saveRiddle } = useOlympiad();
  const [guess, setGuess] = useState("");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [wrongTries, setWrongTries] = useState(0);
  const [outcome, setOutcome] = useState<"solved" | "revealed" | null>(null);

  if (!allowed || !progress.level) return <PageShell><Loading /></PageShell>;
  const { riddle } = getLevelContent(progress.level);
  const worth = riddlePoints(hintsUsed);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!guess.trim() || outcome) return;
    if (isRiddleAnswerCorrect(guess, riddle.answers)) {
      setOutcome("solved");
      saveRiddle({ score: worth, max: RIDDLE_MAX, hintsUsed, solved: true });
    } else {
      setWrongTries((n) => n + 1);
    }
  }

  function reveal() {
    setOutcome("revealed");
    saveRiddle({ score: 0, max: RIDDLE_MAX, hintsUsed, solved: false });
  }

  return (
    <PageShell>
      <PhaseProgress current={outcome ? 3 : 2} />
      <h1 className="text-2xl font-black sm:text-3xl">Phase 2 · Riddle</h1>
      <p className="mt-2 text-white/75">
        Use your knowledge and creativity! Solve it without hints for {RIDDLE_MAX} points. Each hint lowers the prize.
      </p>

      <figure className="mt-6 rounded-3xl bg-gradient-to-br from-water/25 to-leaf/20 p-6 ring-1 ring-white/15 sm:p-8">
        <span aria-hidden className="text-4xl">🧩</span>
        <blockquote className="mt-3 whitespace-pre-line text-lg font-medium leading-relaxed sm:text-xl">
          {riddle.text}
        </blockquote>
      </figure>

      {riddle.hints.slice(0, hintsUsed).map((h, i) => (
        <p key={i} className="mt-3 rounded-2xl bg-gold/15 p-4 ring-1 ring-gold/50">
          <span className="font-bold text-gold">Hint {i + 1}:</span> {h}
        </p>
      ))}

      {outcome ? (
        <section
          className={`mt-6 rounded-3xl p-6 text-center ring-2 ${outcome === "solved" ? "bg-leaf/15 ring-leaf" : "bg-white/5 ring-white/20"}`}
        >
          <p className="text-sm uppercase tracking-widest text-white/70">
            {outcome === "solved" ? "Riddle solved! 🎉" : "The answer was"}
          </p>
          <p className="mt-2 text-4xl font-black">{riddle.solution}</p>
          <p className="mt-3 text-white/85">{riddle.explanation}</p>
          <p className="mt-4 text-2xl font-bold">
            +{outcome === "solved" ? worth : 0}
            <span className="text-base text-white/60"> / {RIDDLE_MAX} points</span>
          </p>
          <LinkButton href="/play/final" className="mt-6">
            Go to Phase 3 · Final Test →
          </LinkButton>
        </section>
      ) : (
        <>
          <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Type your answer…"
              aria-label="Your answer"
              autoComplete="off"
              className="flex-1 rounded-2xl border-2 border-white/20 bg-navy-light px-4 py-3 text-lg text-white placeholder:text-white/40 focus:border-water focus:outline-none"
            />
            <Button type="submit" disabled={!guess.trim()}>
              Submit answer
            </Button>
          </form>
          {wrongTries > 0 && (
            <p className="mt-3 text-torch" role="status">
              Not quite — try again! ({wrongTries} {wrongTries === 1 ? "attempt" : "attempts"})
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setHintsUsed((n) => n + 1)}
              disabled={hintsUsed >= riddle.hints.length}
            >
              💡 Get a hint ({riddle.hints.length - hintsUsed} left)
            </Button>
            <span className="text-sm text-white/70">
              Currently worth <strong className="text-gold">{worth} points</strong>
            </span>
            <button type="button" onClick={reveal} className="ml-auto text-sm text-white/50 underline hover:text-white">
              Give up and reveal (0 points)
            </button>
          </div>
        </>
      )}
    </PageShell>
  );
}
