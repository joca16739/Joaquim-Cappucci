import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "light";

const buttonStyles: Record<Variant, string> = {
  primary: "bg-forest text-white shadow-soft hover:bg-forest-dark hover:shadow-lift",
  secondary: "border-2 border-forest/25 bg-white text-forest hover:border-leaf hover:bg-leaf-soft",
  light: "bg-white text-forest shadow-soft hover:bg-leaf-soft",
};

/** Rounded pill button. Internal paths use client-side navigation; full URLs open in a new tab. */
export function Button({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-extrabold transition duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-water/40 ${buttonStyles[variant]} ${className}`;
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Soft wave used as a divider between bands of colour. */
export function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block h-10 w-full sm:h-16 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        fill="currentColor"
        d="M0 48 C 180 8, 360 8, 540 36 S 900 76, 1080 44 S 1320 10, 1440 30 L1440 80 L0 80 Z"
      />
    </svg>
  );
}

/** Green title band at the top of each inner page. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  icon: LucideIcon;
}) {
  return (
    <header className="relative overflow-hidden bg-forest text-white">
      <LeafShape className="absolute -right-10 -top-6 h-48 w-48 rotate-12 text-white/[0.07] sm:h-64 sm:w-64" />
      <LeafShape className="absolute -left-12 bottom-0 h-32 w-32 -rotate-45 text-leaf/20" />
      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-12 sm:pb-12 sm:pt-16">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-bold">
          <Icon className="h-4 w-4" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/90">{intro}</p>}
      </div>
      <Wave className="text-sand" />
    </header>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-8 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-water-deep">{eyebrow}</p>}
      <h2 className="mt-1 text-3xl font-black leading-tight text-forest sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 text-lg leading-relaxed text-ink-soft">{intro}</p>}
    </div>
  );
}

/** Round icon chip used on cards. */
export function IconBadge({ icon: Icon, tone = "leaf" }: { icon: LucideIcon; tone?: "leaf" | "water" | "gold" | "forest" }) {
  const tones = {
    leaf: "bg-leaf-soft text-forest",
    water: "bg-water-soft text-water-deep",
    gold: "bg-gold-soft text-gold-deep",
    forest: "bg-forest text-white",
  };
  return (
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tones[tone]}`}>
      <Icon className="h-6 w-6" aria-hidden />
    </span>
  );
}

/** A simple leaf silhouette for background decoration. */
export function LeafShape({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={`pointer-events-none ${className}`}>
      <path
        fill="currentColor"
        d="M50 4 C 82 18, 96 50, 82 78 C 72 96, 50 98, 50 98 C 50 98, 28 96, 18 78 C 4 50, 18 18, 50 4 Z"
      />
      <path d="M50 14 L50 92" stroke="white" strokeOpacity="0.35" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 py-14 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}
