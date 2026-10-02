"use client";

import Loading from "@/components/Loading";
import PageShell from "@/components/PageShell";
import PhaseProgress from "@/components/PhaseProgress";
import Quiz from "@/components/Quiz";
import { getLevelContent } from "@/lib/data";
import { FINAL_POINTS_PER_QUESTION } from "@/lib/scoring";
import { useOlympiad } from "@/lib/store";
import { useStepGuard } from "@/lib/useStepGuard";

export default function FinalPage() {
  const allowed = useStepGuard("final");
  const { progress, saveFinal } = useOlympiad();

  if (!allowed || !progress.level) return <PageShell><Loading /></PageShell>;
  const content = getLevelContent(progress.level);

  return (
    <PageShell>
      <PhaseProgress current={progress.final ? 4 : 3} />
      <Quiz
        title="Phase 3 · Final Test"
        intro={`The last challenge! These ${content.final.length} questions are harder, so each one is worth ${FINAL_POINTS_PER_QUESTION} points.`}
        questions={content.final}
        pointsPerQuestion={FINAL_POINTS_PER_QUESTION}
        onComplete={saveFinal}
        nextHref="/results"
        nextLabel="See my results"
      />
    </PageShell>
  );
}
