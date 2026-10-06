"use client";

import { Menu, X } from "lucide-react";
import { useRef } from "react";
import { nav, registerHref } from "@/app/site";
import ImagePlaceholder from "./ImagePlaceholder";

export default function Nav() {
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => menu.current?.removeAttribute("open");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <a href="#top" className="flex items-center gap-2.5">
          <ImagePlaceholder label="Logo" className="w-10 !p-0 text-[0.5rem]" />
          <span className="whitespace-nowrap font-display text-xl font-extrabold uppercase leading-none tracking-wide">
            Sustainable <span className="text-gold">Olympiad</span>
          </span>
        </a>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={registerHref}
          className="ml-auto hidden rounded-full bg-torch px-5 py-2 font-display text-base font-bold uppercase tracking-wide transition hover:bg-[#ec4448] sm:inline-flex lg:ml-2"
        >
          Register
        </a>

        <details ref={menu} id="mobile-menu" className="group relative ml-auto sm:ml-0 lg:hidden">
          <summary
            aria-label="Open menu"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/25 hover:bg-white/10"
          >
            <Menu className="h-5 w-5 group-open:hidden" aria-hidden />
            <X className="hidden h-5 w-5 group-open:block" aria-hidden />
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 top-12 w-64 rounded-2xl border border-white/15 bg-navy-deep p-2 shadow-2xl"
          >
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="block rounded-xl px-4 py-3 font-semibold text-white/85 hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-1 sm:hidden">
                <a
                  href={registerHref}
                  onClick={close}
                  className="block rounded-xl bg-torch px-4 py-3 text-center font-display text-lg font-bold uppercase tracking-wide"
                >
                  Register your school
                </a>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
