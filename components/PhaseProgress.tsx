const phases = [
  { n: 1, label: "Test" },
  { n: 2, label: "Riddle" },
  { n: 3, label: "Final Test" },
];

/** Phase 1 → 2 → 3 tracker. `current` is the active phase; 4 means all done. */
export default function PhaseProgress({ current }: { current: 1 | 2 | 3 | 4 }) {
  const percent = Math.min(((current - 1) / phases.length) * 100, 100);
  return (
    <div className="mb-6" aria-label={`Phase ${Math.min(current, 3)} of 3`}>
      <div className="mb-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-leaf via-water to-gold transition-all duration-500"
          style={{ width: `${percent === 0 ? 4 : percent}%` }}
        />
      </div>
      <ol className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
        {phases.map((p) => {
          const done = p.n < current;
          const active = p.n === current;
          return (
            <li key={p.n} className="flex flex-col items-center gap-1">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-bold ${
                  done
                    ? "border-leaf bg-leaf text-white"
                    : active
                      ? "border-gold bg-gold text-navy"
                      : "border-white/30 text-white/60"
                }`}
              >
                {done ? "✓" : p.n}
              </span>
              <span className={active ? "font-semibold text-gold" : "text-white/70"}>
                Phase {p.n} · {p.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
