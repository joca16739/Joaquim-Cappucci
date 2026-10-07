import Link from "next/link";
import { GraduationCap, Mail } from "lucide-react";
import { isPlaceholder, nav, site } from "@/app/site";
import SiteLogo from "./SiteLogo";
import { Wave } from "./ui";

export default function Footer() {
  const emailSet = !isPlaceholder(site.email);
  return (
    <footer className="mt-auto text-white">
      <Wave className="text-forest-dark" />
      <div className="bg-forest-dark">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-10 pt-4 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="flex items-start gap-4">
            <SiteLogo className="w-16" ring="ring-2 ring-white/30" />
            <div>
              <p className="text-lg font-black">Sustainable Olympiad – a PORTO talks project</p>
              <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold">
                <GraduationCap className="h-4 w-4 text-gold" aria-hidden />
                SDG 4 – Quality Education
              </p>
            </div>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-semibold text-white/85">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm">
            <p className="font-extrabold uppercase tracking-wider text-white/60">Contact</p>
            <p className="mt-2 inline-flex items-center gap-2 font-semibold">
              <Mail className="h-4 w-4 text-leaf" aria-hidden />
              {emailSet ? (
                <a href={`mailto:${site.email}`} className="hover:underline">
                  {site.email}
                </a>
              ) : (
                <span className="select-all">{site.email}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
