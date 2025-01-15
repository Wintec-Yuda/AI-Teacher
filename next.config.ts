import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Nonaktifkan linting selama build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
