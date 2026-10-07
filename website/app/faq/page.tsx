import type { Metadata } from "next";
import Link from "next/link";
import { CircleHelp, Plus } from "lucide-react";
import { PageHeader, Section } from "@/components/ui";
import { isPlaceholder, levels, phases, registerHref, site, topics } from "../site";

export const metadata: Metadata = { title: "FAQ" };

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export default function Faq() {
  const faqs: { q: string; a: React.ReactNode }[] = [
    {
      q: "Who can participate?",
      a: (
        <>
          <p>Students from 5th grade to the 3rd year of High School, in four levels:</p>
          <ul className="mt-3 grid gap-1.5">
            {levels.map((l) => (
              <li key={l.n}>
                <strong className="text-gold-deep">Level {l.n}:</strong> {l.grades}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      q: "How many phases are there?",
      a: (
        <>
          <p>Three phases, in order:</p>
          <ul className="mt-3 grid gap-1.5">
            {phases.map((p) => (
              <li key={p.n}>
                <strong className="text-water-deep">
                  Phase {p.n} – {p.name}:
                </strong>{" "}
                {lower(p.text)}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      q: "What topics are covered?",
      a: <p>{topics.slice(0, -1).join(", ") + " and " + lower(topics[topics.length - 1])}.</p>,
    },
    {
      q: "Do participants get a certificate?",
      a: <p>Yes. Every participant receives a certificate that can be used for future opportunities.</p>,
    },
    { q: "When does it happen?", a: <p>{site.date}</p> },
    {
      q: "How can my school join?",
      a: (
        <p>
          Register your students here:{" "}
          {isPlaceholder(site.registerUrl) ? (
            <span className="font-mono">{site.registerUrl}</span>
          ) : (
            <a href={site.registerUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-water-deep underline">
              registration form
            </a>
          )}
          . More details on the{" "}
          <Link href={isPlaceholder(site.registerUrl) ? registerHref : "/participate/"} className="font-bold text-water-deep underline">
            Participate
          </Link>{" "}
          page.
        </p>
      ),
    },
  ];

  return (
    <>
      <PageHeader eyebrow="FAQ" title="Frequently asked questions" icon={CircleHelp} />
      <Section className="max-w-3xl">
        <div className="grid gap-3">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group rounded-3xl bg-white shadow-soft ring-1 ring-ink/5 transition open:ring-leaf/60"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-lg font-extrabold text-forest sm:px-6">
                {f.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-forest transition group-open:rotate-45 group-open:bg-forest group-open:text-white">
                  <Plus className="h-5 w-5" aria-hidden />
                </span>
              </summary>
              <div className="px-5 pb-5 leading-relaxed text-ink sm:px-6">{f.a}</div>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
