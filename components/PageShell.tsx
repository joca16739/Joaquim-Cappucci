import Link from "next/link";
import Logo from "./Logo";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col print:block print:min-h-0">
      <header className="no-print border-b border-white/10">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-wide">
            <Logo size={36} />
            <span>Sustainable Olympiad</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:py-10 print:max-w-none print:p-0">{children}</main>
      <footer className="no-print border-t border-white/10 py-4 text-center text-xs text-white/50">
        PORTO talks · &ldquo;The world as seen by the students&rdquo; · SDG 4 Quality Education
      </footer>
    </div>
  );
}
