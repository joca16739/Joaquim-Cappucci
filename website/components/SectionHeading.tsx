export default function SectionHeading({
  eyebrow,
  title,
  intro,
  accent = "text-gold",
  center = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  accent?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`font-display text-sm font-bold uppercase tracking-[0.25em] ${accent}`}>{eyebrow}</p>
      <h2 className="mt-2 font-display text-4xl font-extrabold uppercase leading-[0.95] sm:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-white/80">{intro}</p>}
    </div>
  );
}
