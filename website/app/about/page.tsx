import type { Metadata } from "next";
import { Award, BookOpen, Check, GraduationCap, Lightbulb, Sparkles, Users } from "lucide-react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { Button, IconBadge, PageHeader, Section, SectionTitle } from "@/components/ui";

export const metadata: Metadata = { title: "About" };

const pillars = [
  { icon: Lightbulb, title: "Test knowledge", text: "About sustainability and the environment.", tone: "leaf" as const },
  { icon: Sparkles, title: "Solve challenges", text: "With creativity.", tone: "water" as const },
  { icon: Award, title: "Earn certificates", text: "That open doors to future opportunities.", tone: "gold" as const },
];

const sdg = [
  "Inclusive, equitable and quality education",
  "Improving access to education",
  "Reaching people in vulnerable situations",
];

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="What is the Sustainable Olympiad?" icon={BookOpen} />

      <Section className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <SectionTitle eyebrow="What it is" title="An Olympic format to teach environmental issues" />
          <p className="max-w-[62ch] text-lg leading-relaxed text-ink">
            The Sustainable Olympiad uses an Olympic competition format to teach environmental issues. Students test
            their knowledge about sustainability and the environment, solve challenges with creativity, and earn
            certificates that open doors to future opportunities.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {pillars.map(({ icon, title, text, tone }) => (
              <li key={title} className="rounded-3xl bg-white p-5 shadow-soft">
                <IconBadge icon={icon} tone={tone} />
                <p className="mt-3 text-lg font-black text-forest">{title}</p>
                <p className="text-sm text-ink-soft">{text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <SectionTitle eyebrow="Who created it" title="A PORTO talks project" />
            <div className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-soft sm:flex-row sm:items-center">
              <ImagePlaceholder label="PORTO talks logo" shape="rect" className="h-20 w-36" />
              <div>
                <p className="text-lg leading-relaxed">
                  The Sustainable Olympiad was created by the <strong>PORTO talks</strong> project:
                </p>
                <p className="mt-1 text-xl font-black italic text-water-deep">&ldquo;The world as seen by the students&rdquo;</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="h-fit overflow-hidden rounded-3xl bg-white shadow-lift lg:sticky lg:top-24">
          <div className="bg-water px-6 py-6 text-white">
            <GraduationCap className="h-9 w-9" aria-hidden />
            <p className="mt-2 text-4xl font-black leading-none">SDG 4</p>
            <p className="text-xl font-extrabold">Quality Education</p>
          </div>
          <ul className="grid gap-3 p-6">
            {sdg.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-forest">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-ink/10 p-6 pt-5">
            <Button href="/objectives/" variant="secondary" className="w-full">
              <Users className="h-4 w-4" aria-hidden />
              See our objectives
            </Button>
          </div>
        </aside>
      </Section>
    </>
  );
}
