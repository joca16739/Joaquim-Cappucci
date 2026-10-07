"use client";

import { useEffect, useRef, useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

/** Path of the official logo inside /public. */
export const LOGO_SRC = "/logo.png";

/**
 * The official logo on a white circle, so its white background sits cleanly
 * on any colour. Falls back to a placeholder while /public/logo.png is missing.
 */
export default function SiteLogo({
  className = "",
  ring = "ring-1 ring-ink/10",
  priority = false,
}: {
  /** Size classes, e.g. "w-10". The logo is always square. */
  className?: string;
  ring?: string;
  priority?: boolean;
}) {
  const img = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // The image may have failed before React attached onError.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <ImagePlaceholder label="Logo" className={`${className} !p-0 text-[0.5rem]`} />;

  return (
    <span
      className={`inline-flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-soft ${ring} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={LOGO_SRC}
        alt="Sustainable Olympiad logo"
        onError={() => setFailed(true)}
        loading={priority ? "eager" : "lazy"}
        className="h-full w-full object-contain p-[9%]"
      />
    </span>
  );
}
