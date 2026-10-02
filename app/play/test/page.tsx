"use client";

import Loading from "@/components/Loading";
import PageShell from "@/components/PageShell";
import PhaseProgress from "@/components/PhaseProgress";
import Quiz from "@/components/Quiz";
import { getLevelContent, getLevelInfo } from "@/lib/data";
import { TEST_POINTS_PER_QUESTION } from "@/lib/scoring";
import { useOlympiad } from "@/lib/store";
import { useStepGuard } from "@/lib/useStepGuard";

export default function TestPage() {
  const allowed = useStepGuard("test");
  const { progress, saveTest } = useOlympiad();

  if (!allowed || !progress.level) return <PageShell><Loading /></PageShell>;
  const content = getLevelContent(progress.level);

  return (
    <PageShell>
      <PhaseProgress current={progress.test ? 2 : 1} />
      <Quiz
        title="Phase 1 · Test"
        intro={`${getLevelInfo(progress.level).name}: answer ${content.test.length} questions about sustainability. Each correct answer is worth ${TEST_POINTS_PER_QUESTION} point.`}
        questions={content.test}
        pointsPerQuestion={TEST_POINTS_PER_QUESTION}
        onComplete={saveTest}
        nextHref="/play/riddle"
        nextLabel="Go to Phase 2 · Riddle"
      />
    </PageShell>
  );
}
