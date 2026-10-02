export type LevelId = 1 | 2 | 3 | 4;

export interface Question {
  question: string;
  options: string[];
  /** Index of the correct option in `options`. */
  answer: number;
  explanation: string;
}

export interface Riddle {
  text: string;
  hints: string[];
  /** Accepted answers (compared after normalisation). */
  answers: string[];
  solution: string;
  explanation: string;
}

export interface LevelContent {
  level: LevelId;
  test: Question[];
  riddle: Riddle;
  final: Question[];
}

export interface SchoolYear {
  id: string;
  label: string;
  level: LevelId;
}

export interface LevelInfo {
  level: LevelId;
  name: string;
  audience: string;
  color: "leaf" | "water" | "gold" | "torch";
}

export interface PhaseResult {
  score: number;
  max: number;
}

export interface RiddleResult extends PhaseResult {
  hintsUsed: number;
  solved: boolean;
}

export interface Progress {
  studentName: string;
  schoolYearId: string | null;
  level: LevelId | null;
  test: PhaseResult | null;
  riddle: RiddleResult | null;
  final: PhaseResult | null;
  completedAt: string | null;
}
