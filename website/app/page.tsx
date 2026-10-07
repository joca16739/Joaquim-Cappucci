import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CircleHelp,
  Droplets,
  GraduationCap,
  Layers,
  ListChecks,
  Route,
  Target,
  Users,
} from "lucide-react";
import SiteLogo from "@/components/SiteLogo";
import { Button, IconBadge, LeafShape, Section, SectionTitle, Wave } from "@/components/ui";
import { registerHref } from "./site";

const highlights = [
  { icon: Layers, value: "4", label: "levels", tone: "bg-gold-soft text-gold-deep" },
  { icon: ListChecks, value: "3", label: "phases", tone: "bg-water-soft text-water-deep" },
  { icon: Award, value: "Certificates", label: "for all", tone: "bg-leaf-soft text-forest" },
];

const teasers = [
  { href: "/about/", icon: BookOpen, title: "About", text: "An Olympic competition format to teach environmental issues.", tone: "leaf" as const },
  { href: "/objectives/", icon: Target, title: "Objectives", text: "Six goals, from environmental knowledge to new talents.", tone: "water" as const },
  { href: "/how-it-works/", icon: Route, title: "How it works", text: "Four levels by school year and three phases.", tone: "gold" as const },
  { href: "/why-it-matters/", icon: Droplets, title: "Why it matters", text: "Why education is key to sustainable solutions.", tone: "water" as const },
  { href: "/participate/", icon: Users, title: "Participate", text: "For students, schools and partners.", tone: "leaf" as const },
  { href: "/faq/", icon: CircleHelp, title: "FAQ", text: "Quick answers about levels, phases and certificates.", tone: "gold" as const },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-sand">
        <LeafShape className="absolute -left-16 top-16 h-56 w-56 -rotate-[30deg] text-leaf/15" />
        <LeafShape className="absolute -right-10 top-4 h-44 w-44 rotate-[35deg] text-forest/10" />
        <LeafShape className="absolute bottom-10 right-[12%] hidden h-20 w-20 rotate-[70deg] text-water/15 sm:block" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 pt-10 text-center sm:pb-20 sm:pt-14">
          <div className="relative">
            <div aria-hidden className="absolute inset-0 -m-5 rounded-full bg-gradient-to-br from-leaf/40 via-water/25 to-gold/40 blur-2xl" />
            <div className="relative rounded-full bg-gradient-to-br from-gold via-[#ffd862] to-[#d39d00] p-1.5 shadow-lift">
              <SiteLogo className="w-40 sm:w-52" ring="" priority />
            </div>
          </div>

          <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-forest px-4 py-1.5 text-sm font-extrabold text-white shadow-soft">
            <GraduationCap className="h-4 w-4 text-gold" aria-hidden />
            SDG 4 – Quality Education
          </p>
          <h1 className="mt-5 text-5xl font-black leading-[1.02] tracking-tight text-forest sm:text-7xl">
            Sustainable <span className="text-water">Olympiad</span>
          </h1>
          <p className="mt-4 max-w-xl text-xl font-bold text-ink sm:text-2xl">Quality Education for a Sustainable Future</p>
          <p className="mt-2 text-sm font-semibold text-ink-soft">
            A PORTO talks project · &ldquo;The world as seen by the students&rdquo;
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href="/how-it-works/">How it works</Button>
            <Button href={registerHref} variant="secondary">
              Register your school
            </Button>
          </div>

          <ul className="mt-10 grid w-full grid-cols-3 gap-2 sm:max-w-2xl sm:gap-4">
            {highlights.map(({ icon: Icon, value, label, tone }) => (
              <li key={label} className="flex flex-col items-center rounded-3xl bg-white px-2 py-4 shadow-soft sm:px-4">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${tone}`}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className={`mt-2 font-black leading-tight text-forest ${value.length > 3 ? "text-base sm:text-2xl" : "text-2xl"}`}>{value}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-ink-soft sm:text-sm">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Teasers */}
      <Section>
        <SectionTitle eyebrow="Explore" title="Everything about the Olympiad" center />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teasers.map(({ href, icon, title, text, tone }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full items-start gap-4 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-lift hover:ring-leaf/50"
              >
                <IconBadge icon={icon} tone={tone} />
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 text-xl font-black text-forest">
                    {title}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                  <span className="mt-1 block text-ink-soft">{text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Call to action */}
      <section className="text-forest">
        <Wave />
        <div className="bg-forest">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 pb-14 pt-6 text-center text-white sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-3xl font-black">Bring the Olympiad to your school</h2>
              <p className="mt-1 text-white/85">Register your students and let them compete for a sustainable future.</p>
            </div>
            <Button href={registerHref} variant="light" className="shrink-0">
              Register your school
            </Button>
          </div>
        </div>
        <Wave flip className="text-forest" />
      </section>
    </>
  );
}
