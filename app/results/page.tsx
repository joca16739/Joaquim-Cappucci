"use client";

import { useRouter } from "next/navigation";
import { Button, LinkButton } from "@/components/Button";
import Loading from "@/components/Loading";
import PageShell from "@/components/PageShell";
import PhaseProgress from "@/components/PhaseProgress";
import { getLevelInfo, getSchoolYear } from "@/lib/data";
import { medalFor } from "@/lib/scoring";
import { totalScore, useOlympiad } from "@/lib/store";
import { useStepGuard } from "@/lib/useStepGuard";

export default function ResultsPage() {
  const allowed = useStepGuard("results");
  const { progress, reset } = useOlympiad();
  const router = useRouter();

  if (!allowed || !progress.level || !progress.test || !progress.riddle || !progress.final) {
    return <PageShell><Loading /></PageShell>;
  }

  const { score, max } = totalScore(progress);
  const percent = Math.round((score / max) * 100);
  const medal = medalFor(percent);
  const level = getLevelInfo(progress.level);
  const year = getSchoolYear(progress.schoolYearId);

  const rows = [
    { label: "Phase 1 · Test", ...progress.test, color: "bg-leaf" },
    {
      label: "Phase 2 · Riddle",
      ...progress.riddle,
      color: "bg-water",
      note: progress.riddle.solved
        ? `${progress.riddle.hintsUsed} hint${progress.riddle.hintsUsed === 1 ? "" : "s"} used`
        : "Not solved",
    },
    { label: "Phase 3 · Final Test", ...progress.final, color: "bg-gold" },
  ];

  function playAgain() {
    reset();
    router.push("/level");
  }

  return (
    <PageShell>
      <PhaseProgress current={4} />
      <section className="text-center">
        <p className="text-sm uppercase tracking-widest text-gold">Competition complete</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          {progress.studentName ? `Congratulations, ${progress.studentName}!` : "Congratulations!"}
        </h1>
        <p className="mt-2 text-white/75">
          {level.name}
          {year ? ` · ${year.label}` : ""}
        </p>

        <div className="mx-auto mt-8 flex h-44 w-44 flex-col items-center justify-center rounded-full bg-white/5 ring-8 ring-gold/70">
          <span className="text-5xl font-black">{score}</span>
          <span className="text-white/60">of {max} points</span>
        </div>
        <p className={`mt-4 text-2xl font-black ${medal.className}`}>
          {medal.label === "Participant" ? "🌱 Green Participant" : `🏅 ${medal.label} medal`} · {percent}%
        </p>
      </section>

      <ul className="mt-8 grid gap-3">
        {rows.map((r) => (
          <li key={r.label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-bold">{r.label}</span>
              <span className="font-bold">
                {r.score} <span className="text-white/60">/ {r.max}</span>
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className={`h-full rounded-full ${r.color}`} style={{ width: `${(r.score / r.max) * 100}%` }} />
            </div>
            {"note" in r && r.note && <p className="mt-1 text-xs text-white/60">{r.note}</p>}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <LinkButton href="/certificate">🎓 View my certificate</LinkButton>
        <Button variant="ghost" onClick={playAgain}>
          Play again
        </Button>
      </div>
    </PageShell>
  );
}
