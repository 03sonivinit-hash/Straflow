import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: ".",
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
