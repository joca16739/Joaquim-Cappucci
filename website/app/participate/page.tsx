import type { Metadata } from "next";
import { Award, Backpack, Building2, HandHeart, Landmark, Megaphone, Presentation, School, Trophy, Users } from "lucide-react";
import SiteLogo from "@/components/SiteLogo";
import { Button, IconBadge, PageHeader, Section, SectionTitle } from "@/components/ui";
import { isPlaceholder, registerHref, site } from "../site";

export const metadata: Metadata = { title: "Participate" };

const partners = [
  { icon: School, name: "Schools" },
  { icon: Landmark, name: "Governments" },
  { icon: HandHeart, name: "NGOs" },
];
const channels = [
  { icon: Megaphone, name: "Campaigns" },
  { icon: Presentation, name: "Workshops" },
  { icon: Trophy, name: "The Olympiad" },
];

function SampleCertificate() {
  return (
    <figure className="relative mx-auto w-full max-w-lg">
      <span className="absolute -right-2 -top-3 z-10 rotate-6 rounded-full bg-water px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-soft">
        Sample
      </span>
      <div className="rotate-[-1.5deg] rounded-3xl bg-white p-2 shadow-lift">
        <div className="rounded-[1.25rem] border-4 border-double border-gold px-5 py-7 text-center sm:px-8">
          <div className="flex justify-center">
            <SiteLogo className="w-16" />
          </div>
          <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.25em] text-water-deep">Sustainable Olympiad</p>
          <p className="mt-1 text-2xl font-black text-forest sm:text-3xl">Certificate</p>
          <p className="mt-4 text-sm text-ink-soft">This certificate is awarded to</p>
          <p className="mx-auto mt-1 w-fit border-b-2 border-gold px-4 pb-1 text-xl font-black italic text-ink sm:text-2xl">
            [Participant Name]
          </p>
          <p className="mx-auto mt-4 max-w-xs text-sm text-ink-soft">
            for taking part in the Sustainable Olympiad · Level [LEVEL]
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4 text-xs font-bold text-ink-soft">
            <span>{site.date}</span>
            <span className="inline-flex items-center gap-1 text-gold-deep">
              <Award className="h-4 w-4" aria-hidden /> SDG 4
            </span>
            <span>PORTO talks</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

export default function Participate() {
  return (
    <>
      <PageHeader
        eyebrow="Participate"
        title="Join the Sustainable Olympiad"
        intro="For students, schools and partners."
        icon={Users}
      />

      <Section className="grid gap-6 lg:grid-cols-2">
        <article className="flex flex-col rounded-3xl bg-white p-6 shadow-soft sm:p-8">
          <IconBadge icon={Backpack} tone="leaf" />
          <h2 className="mt-4 text-3xl font-black text-forest">For students</h2>
          <p className="mt-2 flex-1 text-lg leading-relaxed">
            Choose your level by school year and follow the 3 phases: Test, Riddle and Final Test.
          </p>
          <Button href="/how-it-works/" variant="secondary" className="mt-6 self-start">
            See levels and phases
          </Button>
        </article>

        <article id="schools" className="flex flex-col rounded-3xl bg-forest p-6 text-white shadow-lift sm:p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <Building2 className="h-6 w-6" aria-hidden />
          </span>
          <h2 className="mt-4 text-3xl font-black">For schools</h2>
          <p className="mt-2 flex-1 text-lg leading-relaxed text-white/90">Register your students.</p>
          <div className="mt-6 flex flex-col items-start gap-2">
            <Button href={registerHref} variant="light">
              Register your school
            </Button>
            {isPlaceholder(site.registerUrl) && (
              <span className="rounded-md bg-white/15 px-2 py-1 font-mono text-xs">
                Registration link: {site.registerUrl}
              </span>
            )}
          </div>
        </article>
      </Section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <SectionTitle
            eyebrow="Partners"
            title="Working together"
            intro="Schools, governments and NGOs, through campaigns, workshops and the Olympiad."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <ul className="grid gap-3">
              {partners.map(({ icon: Icon, name }) => (
                <li key={name} className="flex items-center gap-4 rounded-3xl bg-leaf-soft px-5 py-4">
                  <Icon className="h-7 w-7 text-forest" aria-hidden />
                  <span className="text-xl font-black text-forest">{name}</span>
                </li>
              ))}
            </ul>
            <ul className="grid gap-3">
              {channels.map(({ icon: Icon, name }) => (
                <li key={name} className="flex items-center gap-4 rounded-3xl bg-water-soft px-5 py-4">
                  <Icon className="h-7 w-7 text-water-deep" aria-hidden />
                  <span className="text-xl font-black text-water-deep">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Section className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="Certificates" title="A certificate for every participant" />
          <p className="max-w-[55ch] text-lg leading-relaxed">
            Every participant receives a certificate that can be used for future opportunities.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-soft px-4 py-2 font-extrabold text-gold-deep">
            <Award className="h-5 w-5" aria-hidden /> Certificates for all
          </p>
        </div>
        <SampleCertificate />
      </Section>
    </>
  );
}
