import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static site: `next build` writes every page to `out/`, ready for any static host.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
