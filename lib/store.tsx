"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { LevelId, PhaseResult, Progress, RiddleResult } from "./types";

const STORAGE_KEY = "sustainable-olympiad:progress";

const emptyProgress: Progress = {
  studentName: "",
  schoolYearId: null,
  level: null,
  test: null,
  riddle: null,
  final: null,
  completedAt: null,
};

interface Store {
  progress: Progress;
  /** False until progress has been restored from localStorage. */
  ready: boolean;
  start: (studentName: string, schoolYearId: string, level: LevelId) => void;
  saveTest: (result: PhaseResult) => void;
  saveRiddle: (result: RiddleResult) => void;
  saveFinal: (result: PhaseResult) => void;
  reset: () => void;
}

const OlympiadContext = createContext<Store | null>(null);

export function OlympiadProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProgress({ ...emptyProgress, ...JSON.parse(saved) });
    } catch {
      // Storage unavailable or corrupt: start fresh.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore: progress just won't survive a reload.
    }
  }, [progress, ready]);

  const start = useCallback((studentName: string, schoolYearId: string, level: LevelId) => {
    setProgress({ ...emptyProgress, studentName: studentName.trim(), schoolYearId, level });
  }, []);
  const saveTest = useCallback((test: PhaseResult) => setProgress((p) => ({ ...p, test })), []);
  const saveRiddle = useCallback((riddle: RiddleResult) => setProgress((p) => ({ ...p, riddle })), []);
  const saveFinal = useCallback(
    (final: PhaseResult) =>
      setProgress((p) => ({ ...p, final, completedAt: new Date().toISOString() })),
    [],
  );
  const reset = useCallback(() => setProgress(emptyProgress), []);

  const value = useMemo(
    () => ({ progress, ready, start, saveTest, saveRiddle, saveFinal, reset }),
    [progress, ready, start, saveTest, saveRiddle, saveFinal, reset],
  );

  return <OlympiadContext.Provider value={value}>{children}</OlympiadContext.Provider>;
}

export function useOlympiad(): Store {
  const ctx = useContext(OlympiadContext);
  if (!ctx) throw new Error("useOlympiad must be used inside <OlympiadProvider>");
  return ctx;
}

export function totalScore(p: Progress): { score: number; max: number } {
  const phases = [p.test, p.riddle, p.final].filter(Boolean) as PhaseResult[];
  return phases.reduce(
    (acc, r) => ({ score: acc.score + r.score, max: acc.max + r.max }),
    { score: 0, max: 0 },
  );
}
