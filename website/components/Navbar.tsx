"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { nav, registerHref } from "@/app/site";
import SiteLogo from "./SiteLogo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

export default function Navbar() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);

  // Close the mobile menu whenever the tab changes.
  useEffect(() => {
    menu.current?.removeAttribute("open");
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Sustainable Olympiad – Home">
          <SiteLogo className="w-11" priority />
          <span className="whitespace-nowrap text-lg font-black leading-none text-forest">
            Sustainable <span className="text-water">Olympiad</span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="whitespace-nowrap rounded-full px-3 py-2 text-[0.92rem] font-bold text-ink-soft transition hover:bg-leaf-soft hover:text-forest aria-[current=page]:bg-forest aria-[current=page]:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Link
          href={registerHref}
          className="ml-auto hidden whitespace-nowrap rounded-full bg-gold px-4 py-2 text-sm font-extrabold text-ink shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift sm:inline-flex lg:ml-2"
        >
          Register your school
        </Link>

        <details ref={menu} id="mobile-menu" className="group relative ml-auto sm:ml-0 lg:hidden">
          <summary
            aria-label="Menu"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-white text-forest hover:bg-leaf-soft"
          >
            <Menu className="h-5 w-5 group-open:hidden" aria-hidden />
            <X className="hidden h-5 w-5 group-open:block" aria-hidden />
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 top-14 w-[min(18rem,calc(100vw-2rem))] rounded-3xl border border-ink/10 bg-white p-2 shadow-lift"
          >
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="block rounded-2xl px-4 py-3 font-bold text-ink hover:bg-leaf-soft aria-[current=page]:bg-forest aria-[current=page]:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1 sm:hidden">
                <Link
                  href={registerHref}
                  className="block rounded-2xl bg-gold px-4 py-3 text-center font-extrabold text-ink"
                >
                  Register your school
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
