import type { Metadata } from "next";
import {
  BarChart3,
  Bird,
  Brain,
  Droplets,
  Handshake,
  Trophy,
  Lightbulb,
  Microscope,
  Recycle,
  ShieldCheck,
  Sprout,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import { PageHeader, Section, SectionTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Why it matters" };

const benefits = [
  { icon: Recycle, text: "Promotes sustainability" },
  { icon: Brain, text: "Improves abilities" },
  { icon: Handshake, text: "Sustainability requires cooperation" },
  { icon: Sprout, text: "Supports environmental change" },
  { icon: Bird, text: "Protects biodiversity" },
  { icon: TrendingUp, text: "Increases productivity" },
  { icon: ShieldCheck, text: "Reduces environmental damage" },
  { icon: Lightbulb, text: "Promotes sustainable techniques" },
];

export default function WhyItMatters() {
  return (
    <>
      <PageHeader
        eyebrow="Why it matters"
        title="Education is the key to sustainable solutions"
        icon={Droplets}
      />

      <Section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1 text-sm font-extrabold text-gold-deep">
            <TriangleAlert className="h-4 w-4" aria-hidden />
            The problem
          </span>
          <p className="mt-4 text-lg leading-relaxed">
            Communities with limited access to education face more environmental problems. Without good education and
            training, people lack the skills needed to develop sustainable techniques.
          </p>
        </article>
        <article className="rounded-3xl bg-water-soft p-6 shadow-soft ring-1 ring-water/20 sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-extrabold text-water-deep">
            <Microscope className="h-4 w-4" aria-hidden />
            What studies show · World Bank and UNESCO
          </span>
          <ul className="mt-4 grid gap-3 text-lg leading-relaxed">
            <li className="flex gap-3">
              <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-water" />
              Low access to education makes it harder to adapt and to implement sustainable practices.
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-water" />
              Education provides the knowledge and skills that lead to sustainable solutions.
            </li>
          </ul>
        </article>
      </Section>

      <section className="bg-forest text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <p className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.18em] text-gold">
            <BarChart3 className="h-4 w-4" aria-hidden />
            Our numbers
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15">
              <p className="text-6xl font-black tabular-nums text-gold sm:text-7xl">358</p>
              <p className="mt-2 text-xl font-extrabold">university students surveyed</p>
              <p className="text-white/80">Likert-scale questionnaire</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15">
              <p className="text-6xl font-black tabular-nums text-gold sm:text-7xl">119</p>
              <p className="mt-2 text-xl font-extrabold">studies analysed</p>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionTitle eyebrow="Benefits" title="Benefits of education for sustainability" />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, text }) => (
            <li key={text} className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-leaf-soft text-forest">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <span className="font-extrabold leading-snug text-forest">{text}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="!pt-0">
        <div className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-lift ring-2 ring-gold/50 sm:flex-row sm:items-center sm:p-8">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
            <Trophy className="h-8 w-8" aria-hidden />
          </span>
          <div>
            <h2 className="text-2xl font-black text-forest sm:text-3xl">Why olympiads?</h2>
            <p className="mt-1 text-lg leading-relaxed">
              Scientific olympiads improve science education, increase student engagement and help discover new talents.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
