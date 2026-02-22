import type { NextConfig } from "next";

/**
 * Vedic Library – Phase 0 Stabilized Config
 * ------------------------------------------
 * - No static export
 * - No basePath
 * - No assetPrefix
 * - Ready for Vercel deployment
 * - Ready for database transition (Supabase later)
 */

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true, // Safe default for scripture site
  },

  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
