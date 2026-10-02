import type { Question } from "./types";

/**
 * Returns a copy of the question with its options shuffled and `answer`
 * re-pointed at the correct option. Questions with an "All of the above"
 * style option keep their original order.
 */
export function shuffleQuestion(q: Question): Question {
  if (q.options.some((o) => /^(all|none) of the above/i.test(o))) return q;
  const order = q.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    answer: order.indexOf(q.answer),
  };
}
