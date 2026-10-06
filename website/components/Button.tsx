type Variant = "primary" | "outline";

const styles: Record<Variant, string> = {
  primary:
    "bg-torch text-white shadow-lg shadow-torch/30 hover:-translate-y-0.5 hover:bg-[#ec4448] hover:shadow-torch/40",
  outline: "border-2 border-white/40 text-white hover:-translate-y-0.5 hover:border-white hover:bg-white/10",
};

export default function Button({
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
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-lg font-bold uppercase tracking-wide transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/60 ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
