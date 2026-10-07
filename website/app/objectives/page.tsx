import type { Metadata } from "next";
import { Award, BookOpen, FlaskConical, Globe2, Sprout, Target, Trophy } from "lucide-react";
import { IconBadge, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Objectives" };

const objectives = [
  { icon: BookOpen, text: "Increase environmental knowledge among students", tone: "leaf" as const },
  { icon: FlaskConical, text: "Improve science education and student engagement", tone: "water" as const },
  { icon: Sprout, text: "Encourage genuine interest in sustainability", tone: "leaf" as const },
  { icon: Trophy, text: "Identify and develop new talents", tone: "gold" as const },
  { icon: Globe2, text: "Promote sustainability and environmental skills", tone: "water" as const },
  { icon: Award, text: "Create opportunities through certificates", tone: "gold" as const },
];

export default function Objectives() {
  return (
    <>
      <PageHeader
        eyebrow="Objectives"
        title="What the Olympiad sets out to do"
        intro="Six objectives guide the Sustainable Olympiad."
        icon={Target}
      />
      <Section>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map(({ icon, text, tone }) => (
            <li
              key={text}
              className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-lift"
            >
              <IconBadge icon={icon} tone={tone} />
              <p className="text-xl font-extrabold leading-snug text-forest">{text}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
