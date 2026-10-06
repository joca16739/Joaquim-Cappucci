import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // One static page: `next build` writes it to `out/`, ready for any static host.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
