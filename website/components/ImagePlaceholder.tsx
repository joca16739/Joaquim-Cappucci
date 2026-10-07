/** Dashed box marking where an image goes until the real file is added. */
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
      className={`flex shrink-0 items-center justify-center border-2 border-dashed border-forest/40 bg-white p-2 text-center text-[0.65rem] font-bold uppercase leading-tight tracking-wider text-forest/70 ${
        shape === "circle" ? "aspect-square rounded-full" : "rounded-xl"
      } ${className}`}
    >
      {label}
    </div>
  );
}
