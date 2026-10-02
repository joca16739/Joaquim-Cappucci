"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useOlympiad } from "./store";
import type { Progress } from "./types";

export type Step = "level" | "test" | "riddle" | "final" | "results";

export const stepHref: Record<Step, string> = {
  level: "/level",
  test: "/play/test",
  riddle: "/play/riddle",
  final: "/play/final",
  results: "/results",
};

/** The step the student should be on, given their saved progress. */
export function currentStep(p: Progress): Step {
  if (!p.level) return "level";
  if (!p.test) return "test";
  if (!p.riddle) return "riddle";
  if (!p.final) return "final";
  return "results";
}

/**
 * Checks once (after progress loads) that the student is allowed on `step`,
 * otherwise redirects them to the step they should be on. Phases must be
 * played in order and can't be replayed without starting over.
 */
export function useStepGuard(step: Step): boolean {
  const { progress, ready } = useOlympiad();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!ready || checked) return;
    setChecked(true);
    const expected = currentStep(progress);
    if (expected === step) setAllowed(true);
    else router.replace(stepHref[expected]);
  }, [ready, checked, progress, step, router]);

  return allowed;
}
