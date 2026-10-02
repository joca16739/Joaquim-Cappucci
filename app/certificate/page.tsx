"use client";

import { Button, LinkButton } from "@/components/Button";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import PageShell from "@/components/PageShell";
import { getLevelInfo, getSchoolYear } from "@/lib/data";
import { medalFor } from "@/lib/scoring";
import { totalScore, useOlympiad } from "@/lib/store";
import { useStepGuard } from "@/lib/useStepGuard";

export default function CertificatePage() {
  const allowed = useStepGuard("results");
  const { progress } = useOlympiad();

  if (!allowed || !progress.level) return <PageShell><Loading /></PageShell>;

  const { score, max } = totalScore(progress);
  const percent = Math.round((score / max) * 100);
  const medal = medalFor(percent);
  const level = getLevelInfo(progress.level);
  const year = getSchoolYear(progress.schoolYearId);
  const date = new Date(progress.completedAt ?? Date.now()).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <PageShell>
      <article className="relative overflow-hidden rounded-3xl bg-white p-2 text-navy shadow-2xl print:break-inside-avoid print:shadow-none">
        <div className="rounded-[1.25rem] border-4 border-double border-gold p-6 text-center sm:p-10 print:p-6">
          <div className="absolute inset-x-0 top-0 flex h-2">
            <span className="flex-1 bg-leaf" />
            <span className="flex-1 bg-water" />
            <span className="flex-1 bg-gold" />
            <span className="flex-1 bg-torch" />
          </div>
          <Logo size={96} className="mx-auto" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-water">Sustainable Olympiad</p>
          <h1 className="mt-2 font-serif text-3xl font-black sm:text-5xl">Certificate of Completion</h1>
          <p className="mt-6 text-navy/70 print:mt-3">This certificate is proudly awarded to</p>
          <p className="mt-2 border-b-2 border-gold/60 pb-2 font-serif text-3xl font-bold italic sm:text-4xl">
            {progress.studentName || "Olympiad Participant"}
          </p>
          <p className="mx-auto mt-6 max-w-lg text-navy/80">
            for successfully completing all three phases of the Sustainable Olympiad — Test, Riddle and Final Test — in{" "}
            <strong>{level.name}</strong>
            {year ? ` (${year.label})` : ""}, showing commitment to a more sustainable world.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-2 text-sm print:mt-5">
            <div>
              <p className="text-2xl font-black">
                {score}/{max}
              </p>
              <p className="text-navy/60">Total score</p>
            </div>
            <div>
              <p className="text-2xl font-black">{medal.label === "Participant" ? "🌱" : "🏅"}</p>
              <p className="text-navy/60">{medal.label === "Participant" ? "Green Participant" : `${medal.label} medal`}</p>
            </div>
            <div>
              <p className="text-2xl font-black">{percent}%</p>
              <p className="text-navy/60">{date}</p>
            </div>
          </div>

          <p className="mt-8 text-xs text-navy/60 print:mt-5">
            PORTO talks · &ldquo;The world as seen by the students&rdquo; · SDG 4 Quality Education
          </p>
        </div>
      </article>

      <div className="no-print mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button variant="primary" onClick={() => window.print()}>
          🖨️ Print certificate
        </Button>
        <LinkButton href="/results" variant="ghost">
          ← Back to results
        </LinkButton>
      </div>
    </PageShell>
  );
}
