import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/vedic-library",
  assetPrefix: "/vedic-library/",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;
