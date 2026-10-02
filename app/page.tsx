"use client";

import { LinkButton } from "@/components/Button";
import Logo from "@/components/Logo";
import { useOlympiad } from "@/lib/store";
import { currentStep, stepHref } from "@/lib/useStepGuard";

const phases = [
  { n: 1, title: "Test", text: "10 multiple-choice questions about sustainability and the environment.", color: "text-leaf" },
  { n: 2, title: "Riddle", text: "An environmental riddle to solve with knowledge and creativity.", color: "text-water" },
  { n: 3, title: "Final Test", text: "A tougher final challenge to complete the competition.", color: "text-gold" },
];

export default function Home() {
  const { progress, ready } = useOlympiad();
  const step = ready ? currentStep(progress) : "level";
  const inProgress = ready && step !== "level";

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center px-4 py-10 text-center sm:py-16">
      <Logo size={180} className="drop-shadow-xl" />
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
        PORTO talks · The world as seen by the students
      </p>
      <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">Sustainable Olympiad</h1>
      <p className="mt-5 max-w-xl text-lg text-white/85">
        A school competition created by students, for students. Test what you know about recycling, water, energy,
        climate and biodiversity — and prove that you are ready to protect our planet.
      </p>
      <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
        <span className="h-2 w-2 rounded-full bg-torch" /> Supporting SDG 4 · Quality Education
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/level" className="px-10 py-4 text-lg">
          {inProgress ? "Start over" : "Start"}
        </LinkButton>
        {inProgress && (
          <LinkButton href={stepHref[step]} variant="secondary" className="px-10 py-4 text-lg">
            Continue
          </LinkButton>
        )}
      </div>

      <section className="mt-14 grid w-full gap-4 text-left sm:grid-cols-3">
        {phases.map((p) => (
          <div key={p.n} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className={`text-sm font-bold uppercase tracking-wider ${p.color}`}>Phase {p.n}</p>
            <h2 className="mt-1 text-xl font-bold">{p.title}</h2>
            <p className="mt-2 text-sm text-white/75">{p.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 w-full rounded-2xl bg-white/5 p-5 text-left ring-1 ring-white/10">
        <h2 className="text-lg font-bold">Four levels, one goal</h2>
        <ul className="mt-3 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
          <li><span className="font-bold text-leaf">Level 1</span> · 5th and 6th grade</li>
          <li><span className="font-bold text-water">Level 2</span> · 7th and 8th grade</li>
          <li><span className="font-bold text-gold">Level 3</span> · 9th grade and 1st year of High School</li>
          <li><span className="font-bold text-torch">Level 4</span> · 2nd and 3rd year of High School</li>
        </ul>
      </section>
    </main>
  );
}
