import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray package-lock.json exists
  // in the parent directory, which otherwise confuses root inference).
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
