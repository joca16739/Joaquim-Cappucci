import type { Metadata } from "next";
import { Bird, Droplets, Leaf, Medal, Recycle, Route, Thermometer, Zap } from "lucide-react";
import { Button, PageHeader, Section, SectionTitle } from "@/components/ui";
import { levels, phases, topics } from "../site";

export const metadata: Metadata = { title: "How it works" };

const topicIcons = [Recycle, Droplets, Zap, Thermometer, Bird, Leaf];

export default function HowItWorks() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Four levels, three phases"
        intro="Students compete in the level that matches their school year and go through three phases."
        icon={Route}
      />

      <Section>
        <SectionTitle eyebrow="Levels" title="Find your level" />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((l) => (
            <li key={l.n} className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-soft ring-2 ring-gold/60">
              <Medal className="absolute right-4 top-4 h-7 w-7 text-gold" aria-hidden />
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-gold-deep">Level</p>
              <p className="text-7xl font-black leading-none text-forest">{l.n}</p>
              <p className="mt-4 rounded-2xl bg-gold-soft px-3 py-2 font-bold leading-snug text-ink">{l.grades}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[1fr_1.4fr]">
          <SectionTitle
            eyebrow="Phases"
            title="Three phases, in order"
            intro="Every level goes through the same three phases to complete the competition."
          />
          <ol className="relative grid gap-8">
            <span aria-hidden className="absolute bottom-6 left-[1.6rem] top-6 w-1 rounded-full bg-gradient-to-b from-water via-water to-water/30" />
            {phases.map((p) => (
              <li key={p.n} className="relative flex gap-5">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-water text-2xl font-black text-white shadow-soft ring-4 ring-white">
                  {p.n}
                </span>
                <div className="flex-1 rounded-3xl bg-water-soft p-5">
                  <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-water-deep">Phase {p.n}</p>
                  <h3 className="text-2xl font-black text-forest">{p.name}</h3>
                  <p className="mt-1 text-ink">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section>
        <SectionTitle eyebrow="Topics covered" title="What students explore" />
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {topics.map((t, i) => {
            const Icon = topicIcons[i];
            return (
              <li key={t} className="flex flex-col items-center gap-3 rounded-3xl bg-white px-3 py-6 text-center shadow-soft">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-leaf-soft text-forest">
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <span className="font-extrabold leading-tight text-forest">{t}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button href="/participate/">How to participate</Button>
        </div>
      </Section>
    </>
  );
}
