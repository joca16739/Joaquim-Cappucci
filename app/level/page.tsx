"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import PageShell from "@/components/PageShell";
import { getLevelContent, getLevelInfo, schoolYears } from "@/lib/data";
import { useOlympiad } from "@/lib/store";

const ring: Record<string, string> = {
  leaf: "ring-leaf bg-leaf/15",
  water: "ring-water bg-water/15",
  gold: "ring-gold bg-gold/15",
  torch: "ring-torch bg-torch/15",
};
const text: Record<string, string> = {
  leaf: "text-leaf",
  water: "text-water",
  gold: "text-gold",
  torch: "text-torch",
};

export default function LevelPage() {
  const { start, progress, ready } = useOlympiad();
  const router = useRouter();
  const [name, setName] = useState("");
  const [yearId, setYearId] = useState<string | null>(null);

  // Prefill the name if the student played before.
  const savedName = ready ? progress.studentName : "";
  useEffect(() => {
    if (savedName) setName(savedName);
  }, [savedName]);

  const year = schoolYears.find((y) => y.id === yearId);
  const level = year ? getLevelInfo(year.level) : null;
  const content = year ? getLevelContent(year.level) : null;

  function begin() {
    if (!year) return;
    start(name, year.id, year.level);
    router.push("/play/test");
  }

  return (
    <PageShell>
      <h1 className="text-3xl font-black sm:text-4xl">Choose your school year</h1>
      <p className="mt-2 text-white/75">We&apos;ll place you in the right level automatically.</p>

      <label className="mt-6 block">
        <span className="text-sm font-semibold text-white/80">Your name (for the certificate, optional)</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          placeholder="e.g. Maria Silva"
          className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-navy-light px-4 py-3 text-white placeholder:text-white/40 focus:border-water focus:outline-none"
        />
      </label>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {schoolYears.map((y) => {
          const selected = y.id === yearId;
          const info = getLevelInfo(y.level);
          return (
            <button
              key={y.id}
              type="button"
              onClick={() => setYearId(y.id)}
              aria-pressed={selected}
              className={`rounded-2xl p-4 text-left ring-2 transition ${
                selected ? ring[info.color] : "bg-white/5 ring-white/10 hover:ring-white/40"
              }`}
            >
              <span className="block text-base font-bold leading-tight">{y.label}</span>
              <span className={`mt-1 block text-xs font-semibold ${text[info.color]}`}>{info.name}</span>
            </button>
          );
        })}
      </div>

      {level && content && (
        <div className={`mt-8 rounded-3xl p-6 ring-2 ${ring[level.color]}`}>
          <p className="text-sm uppercase tracking-widest text-white/70">You have been placed in</p>
          <p className={`mt-1 text-4xl font-black ${text[level.color]}`}>{level.name}</p>
          <p className="mt-1 text-white/80">{level.audience}</p>
          <ul className="mt-4 grid gap-1 text-sm text-white/85">
            <li>① Test · {content.test.length} questions</li>
            <li>② Riddle · up to 2 hints</li>
            <li>③ Final Test · {content.final.length} harder questions</li>
          </ul>
          <Button onClick={begin} className="mt-6 w-full sm:w-auto">
            Begin Phase 1 →
          </Button>
        </div>
      )}
    </PageShell>
  );
}
