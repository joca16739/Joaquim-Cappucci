import {
  Award,
  Bird,
  BookOpen,
  Droplets,
  FlaskConical,
  Globe2,
  HandHeart,
  Landmark,
  Leaf,
  Lightbulb,
  Plus,
  Recycle,
  School,
  Sparkles,
  Sprout,
  Thermometer,
  Trophy,
  Zap,
} from "lucide-react";
import Button from "@/components/Button";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Nav from "@/components/Nav";
import SiteLogo from "@/components/SiteLogo";
import SectionHeading from "@/components/SectionHeading";
import { isPlaceholder, levels, phases, registerHref, site } from "./site";

const colorText = { leaf: "text-leaf", water: "text-water", gold: "text-gold", torch: "text-torch" };
const colorBg = { leaf: "bg-leaf", water: "bg-water", gold: "bg-gold", torch: "bg-torch" };
type Accent = keyof typeof colorText;

/** Four coloured lanes, the site's running-track motif. */
function Lanes({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex h-2 w-full ${className}`}>
      <span className="flex-1 bg-leaf" />
      <span className="flex-1 bg-water" />
      <span className="flex-1 bg-gold" />
      <span className="flex-1 bg-torch" />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Track lanes circling the logo */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-4 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full border-[14px] border-leaf/15" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-16 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full border-[14px] border-water/15" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-28 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border-[14px] border-gold/15" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-12 text-center sm:pt-16 lg:pb-28">
        <div className="relative">
          <div aria-hidden className="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-gold/45 via-water/25 to-leaf/45 blur-2xl" />
          <div className="relative rounded-full bg-gradient-to-br from-gold via-[#f7d27a] to-[#c98f12] p-1.5 shadow-2xl">
            <SiteLogo className="w-44 sm:w-56" ring="" priority />
          </div>
        </div>

        <p className="mt-8 inline-flex items-center justify-center gap-x-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/85">
          <span className="hidden h-2 w-2 shrink-0 rounded-full bg-leaf sm:inline-block" />
          PORTO talks · The world as seen by the students
        </p>
        <h1 className="mt-5 font-display text-[3.6rem] font-extrabold uppercase leading-[0.85] tracking-tight sm:text-8xl lg:text-[7.5rem]">
          Sustainable
          <span className="block italic text-gold">Olympiad</span>
        </h1>
        <p className="mt-6 max-w-xl text-xl font-medium leading-snug text-white/90 sm:text-2xl">
          Quality Education for a Sustainable Future
        </p>
        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button href={registerHref}>Register your school</Button>
          <Button href="#how-it-works" variant="outline">
            How it works
          </Button>
        </div>
        <p className="mt-8 inline-flex items-center gap-3 text-sm text-white/70">
          <span className="rounded-md bg-torch px-2 py-1 font-display text-base font-bold leading-none">SDG 4</span>
          Quality Education
        </p>
      </div>
      <Lanes />
    </section>
  );
}

function About() {
  const pillars = [
    { icon: Lightbulb, title: "Test your knowledge", text: "About sustainability and the environment.", color: "leaf" as Accent },
    { icon: Sparkles, title: "Solve challenges", text: "Using knowledge and creativity.", color: "water" as Accent },
    { icon: Award, title: "Earn certificates", text: "That open doors to future opportunities.", color: "gold" as Accent },
  ];
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div>
          <SectionHeading eyebrow="About the Olympiad" title="An Olympic format for environmental learning" accent="text-leaf" />
          <div className="max-w-[62ch] space-y-4 text-lg leading-relaxed text-white/85">
            <p>
              The Sustainable Olympiad uses an Olympic competition format to teach environmental issues. Students test
              their knowledge about sustainability and the environment, solve challenges using creativity, and earn
              certificates that open doors to future opportunities.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text, color }) => (
              <li key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <Icon className={`h-6 w-6 ${colorText[color]}`} aria-hidden />
                <p className="mt-3 font-display text-xl font-bold uppercase leading-tight">{title}</p>
                <p className="mt-1 text-sm text-white/70">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="overflow-hidden rounded-3xl bg-white text-navy shadow-2xl">
          <div className="bg-torch px-6 py-5 text-white">
            <p className="font-display text-6xl font-extrabold leading-none">SDG 4</p>
            <p className="mt-1 font-display text-2xl font-bold uppercase">Quality Education</p>
          </div>
          <div className="p-6">
            <p className="text-lg leading-relaxed">
              The Sustainable Olympiad is aligned with SDG 4: <strong>inclusive, equitable and quality education for everyone.</strong>
            </p>
            <div className="mt-5 flex items-center gap-4 border-t border-navy/10 pt-5">
              <div className="flex h-14 w-28 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-navy/30 p-1 text-center text-[0.55rem] font-semibold uppercase leading-tight tracking-wider text-navy/50">
                PORTO talks logo
              </div>
              <p className="text-sm text-navy/75">
                A PORTO talks project: <em>&ldquo;The world as seen by the students&rdquo;</em>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Objectives() {
  const objectives = [
    { icon: BookOpen, text: "Increase environmental knowledge among students", color: "leaf" as Accent },
    { icon: FlaskConical, text: "Improve science education and student engagement", color: "water" as Accent },
    { icon: Sprout, text: "Encourage genuine interest in sustainability", color: "gold" as Accent },
    { icon: Trophy, text: "Identify and develop new talents", color: "torch" as Accent },
    { icon: Award, text: "Create opportunities through certificates", color: "leaf" as Accent },
    { icon: Globe2, text: "Promote sustainability and environmental skills", color: "water" as Accent },
  ];
  return (
    <section id="objectives" className="bg-navy-deep py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Our objectives" title="What the Olympiad sets out to do" accent="text-water" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map(({ icon: Icon, text, color }) => (
            <li
              key={text}
              className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-navy p-6 transition hover:-translate-y-1 hover:border-white/25"
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorBg[color]} text-navy-deep`}>
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <p className="pt-1 text-lg font-semibold leading-snug">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Levels() {
  return (
    <section id="levels" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Who can participate"
          title="Four levels"
          intro="Students compete in the level that matches their school year."
          accent="text-gold"
        />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((l) => (
            <li key={l.n} className="relative overflow-hidden rounded-2xl bg-white text-navy shadow-xl">
              {/* Styled like a race bib */}
              <div className={`flex items-center justify-between px-5 py-2 ${colorBg[l.color]}`}>
                <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-navy-deep">Level</span>
                <span aria-hidden className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-navy-deep/40" />
                  <span className="h-2 w-2 rounded-full bg-navy-deep/40" />
                </span>
              </div>
              <div className="px-5 pb-6 pt-3">
                <p className={`font-display text-8xl font-extrabold leading-none ${l.color === "gold" ? "text-[#c98f12]" : colorText[l.color]}`}>
                  {l.n}
                </p>
                <p className="mt-3 text-lg font-bold leading-snug">{l.grades}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ring = ["border-leaf", "border-water", "border-gold"];
  const text = ["text-leaf", "text-water", "text-gold"];
  return (
    <section id="how-it-works" className="bg-navy-deep py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="How it works"
          title="Three phases"
          intro="Every level goes through the same three phases, in order."
          accent="text-leaf"
        />
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
          {/* Track line: vertical on phones, horizontal from tablet up */}
          <div aria-hidden className="absolute bottom-4 left-7 top-4 w-1 rounded-full bg-gradient-to-b from-leaf via-water to-gold md:hidden" />
          <div aria-hidden className="absolute left-[16%] right-[16%] top-7 hidden h-1 rounded-full bg-gradient-to-r from-leaf via-water to-gold md:block" />
          {phases.map((p, i) => (
            <li key={p.n} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span
                className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 bg-navy-deep font-display text-3xl font-extrabold ${ring[i]}`}
              >
                {p.n}
              </span>
              <div className="pt-1 md:pt-0">
                <p className={`font-display text-sm font-bold uppercase tracking-[0.2em] ${text[i]}`}>Phase {p.n}</p>
                <h3 className="font-display text-3xl font-extrabold uppercase">{p.name}</h3>
                <p className="mt-2 max-w-xs text-white/80">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Medal() {
  return (
    <svg viewBox="0 0 200 240" className="h-auto w-48 sm:w-60" role="img" aria-label="Medal">
      <path d="M62 0 H96 L118 96 H84 Z" fill="#3fae49" />
      <path d="M138 0 H104 L82 96 H116 Z" fill="#2f9be0" />
      <circle cx="100" cy="158" r="74" fill="#c98f12" />
      <circle cx="100" cy="158" r="64" fill="#f2b632" />
      <circle cx="100" cy="158" r="50" fill="none" stroke="#c98f12" strokeWidth="3" strokeDasharray="5 6" />
      <path d="M100 124 C100 124 82 147 82 160 A18 18 0 0 0 118 160 C118 147 100 124 100 124 Z" fill="#0b2f5e" />
      <path d="M100 138 C100 138 92 150 92 158 A8 8 0 0 0 108 158 C108 150 100 138 100 138 Z" fill="#2f9be0" />
    </svg>
  );
}

function Certificates() {
  return (
    <section id="certificates" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[auto_1fr]">
        <div className="flex justify-center md:order-2 md:justify-end">
          <Medal />
        </div>
        <div className="md:order-1">
          <SectionHeading eyebrow="Certificates" title="Your effort counts" accent="text-gold" />
          <p className="max-w-[55ch] text-xl leading-relaxed text-white/85">
            Participants receive <strong className="text-gold">certificates</strong> that can be used for future
            opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}

function Topics() {
  const topics = [
    { icon: Recycle, name: "Recycling", color: "leaf" as Accent },
    { icon: Droplets, name: "Water", color: "water" as Accent },
    { icon: Zap, name: "Energy", color: "gold" as Accent },
    { icon: Thermometer, name: "Climate change", color: "torch" as Accent },
    { icon: Bird, name: "Biodiversity", color: "leaf" as Accent },
    { icon: Leaf, name: "Sustainable practices", color: "water" as Accent },
  ];
  return (
    <section id="topics" className="bg-navy-deep py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Topics covered" title="What students explore" accent="text-water" />
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {topics.map(({ icon: Icon, name, color }) => (
            <li
              key={name}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-navy px-3 py-6 text-center transition hover:border-white/25"
            >
              <Icon className={`h-10 w-10 ${colorText[color]}`} strokeWidth={1.75} aria-hidden />
              <span className="font-display text-xl font-bold uppercase leading-tight">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Schools() {
  const partners = [
    { icon: School, name: "Schools" },
    { icon: Landmark, name: "Governments" },
    { icon: HandHeart, name: "NGOs" },
  ];
  return (
    <section id="schools" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-soft to-navy-deep p-6 ring-1 ring-white/10 sm:p-12">
          <Lanes className="absolute inset-x-0 top-0" />
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-torch">For schools</p>
              <h2 className="mt-2 font-display text-4xl font-extrabold uppercase leading-[0.95] sm:text-5xl">
                Bring the Olympiad to your school
              </h2>
              <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-white/85">
                Register your students and give them the chance to test their knowledge about sustainability and the
                environment, solve challenges with creativity and earn certificates for the future.
              </p>
              <div className="mt-8 flex flex-col items-start gap-3">
                <Button href={registerHref}>Register your school</Button>
                {isPlaceholder(site.registerUrl) && (
                  <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-xs text-white/70">
                    Registration link: {site.registerUrl}
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-white/60">Partners</p>
              <ul className="mt-4 grid gap-3">
                {partners.map(({ icon: Icon, name }) => (
                  <li key={name} className="flex items-center gap-4 rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10">
                    <Icon className="h-7 w-7 text-gold" aria-hidden />
                    <span className="font-display text-2xl font-bold uppercase">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const faqs: { q: string; a: React.ReactNode }[] = [
    {
      q: "Who can participate?",
      a: (
        <>
          <p>Students from 5th grade to the 3rd year of High School, in four levels:</p>
          <ul className="mt-3 grid gap-1.5">
            {levels.map((l) => (
              <li key={l.n}>
                <strong className={l.color === "gold" ? "text-gold" : colorText[l.color]}>Level {l.n}:</strong> {l.grades}
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
          <p>There are three phases:</p>
          <ul className="mt-3 grid gap-1.5">
            {phases.map((p) => (
              <li key={p.n}>
                <strong>
                  Phase {p.n} – {p.name}:
                </strong>{" "}
                {p.text.charAt(0).toLowerCase() + p.text.slice(1)}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      q: "Do participants get a certificate?",
      a: <p>Yes. Participants receive certificates that can be used for future opportunities.</p>,
    },
    { q: "When does it happen?", a: <p>{site.date}</p> },
  ];

  return (
    <section id="faq" className="bg-navy-deep py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" accent="text-gold" center />
        <div className="grid gap-3">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group rounded-2xl border border-white/10 bg-navy transition open:border-white/25"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-lg font-bold sm:px-6">
                {f.q}
                <Plus className="h-5 w-5 shrink-0 text-gold transition group-open:rotate-45" aria-hidden />
              </summary>
              <div className="px-5 pb-5 leading-relaxed text-white/80 sm:px-6">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const emailSet = !isPlaceholder(site.email);
  return (
    <footer className="border-t border-white/10 bg-navy-deep">
      <Lanes />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-3">
          <SiteLogo className="w-16" />
          <ImagePlaceholder label="PORTO talks logo" shape="rect" className="h-16 w-28 text-[0.55rem]" />
        </div>
        <p className="text-sm text-white/75 md:flex-1">
          Sustainable Olympiad · a PORTO talks project · SDG 4 – Quality Education
        </p>
        <p className="text-sm text-white/75">
          Contact:{" "}
          {emailSet ? (
            <a href={`mailto:${site.email}`} className="font-semibold text-white underline-offset-4 hover:underline">
              {site.email}
            </a>
          ) : (
            <span className="font-mono text-white/90">{site.email}</span>
          )}
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Objectives />
        <Levels />
        <HowItWorks />
        <Certificates />
        <Topics />
        <Schools />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
