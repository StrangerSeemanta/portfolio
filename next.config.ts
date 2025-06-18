import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
};

export default nextConfig;
