import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Default imageSizes jumps 384 -> 640, too big a gap for ~360-460px
    // grid cards (product/service/blog cards) - this fills it in.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 480],
  },
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
