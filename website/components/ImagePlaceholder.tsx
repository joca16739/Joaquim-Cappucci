/**
 * Dashed box marking where a logo image goes. Swap for
 * <img src="/your-logo.png" alt="…" /> once the file is in /public.
 */
export default function ImagePlaceholder({
  label,
  className = "",
  shape = "circle",
}: {
  label: string;
  className?: string;
  shape?: "circle" | "rect";
}) {
  return (
    <div
      role="img"
      aria-label={`${label} (placeholder)`}
      className={`flex shrink-0 items-center justify-center border-2 border-dashed border-white/40 bg-white/5 p-2 text-center text-[0.7rem] font-semibold uppercase leading-tight tracking-wider text-white/60 ${
        shape === "circle" ? "aspect-square rounded-full" : "rounded-xl"
      } ${className}`}
    >
      {label}
    </div>
  );
}
