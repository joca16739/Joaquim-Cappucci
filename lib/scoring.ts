/** Points awarded per correct answer in each quiz phase. */
export const TEST_POINTS_PER_QUESTION = 1;
export const FINAL_POINTS_PER_QUESTION = 2;

/** Riddle points depending on how many hints were used (index = hints used). */
export const RIDDLE_POINTS = [10, 7, 4] as const;
export const RIDDLE_MAX = RIDDLE_POINTS[0];

export function riddlePoints(hintsUsed: number): number {
  return RIDDLE_POINTS[Math.min(hintsUsed, RIDDLE_POINTS.length - 1)];
}

/** Lowercase, strip accents, punctuation and leading articles. */
export function normaliseAnswer(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/₂/g, "2")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(a|an|the|it is|its|it s|i am|im|i m)\s+/, "")
    .replace(/^(a|an|the)\s+/, "");
}

export function isRiddleAnswerCorrect(input: string, accepted: string[]): boolean {
  const guess = normaliseAnswer(input);
  if (!guess) return false;
  return accepted.some((a) => {
    const target = normaliseAnswer(a);
    return guess === target || ` ${guess} `.includes(` ${target} `);
  });
}

export function medalFor(percent: number): { label: string; className: string } {
  if (percent >= 85) return { label: "Gold", className: "text-gold" };
  if (percent >= 65) return { label: "Silver", className: "text-slate-200" };
  if (percent >= 40) return { label: "Bronze", className: "text-amber-600" };
  return { label: "Participant", className: "text-leaf" };
}
