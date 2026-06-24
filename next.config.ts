import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle into .next/standalone so the
  // Docker image we ship to Cloud Run can skip the entire node_modules
  // tree at runtime (image ends up ~80–120 MB instead of ~400+ MB).
  output: "standalone",

  // Small bandwidth win: compress HTML/JSON/JS responses at the edge.
  compress: true,

  // Strip the `X-Powered-By: Next.js` header — tiny security polish.
  poweredByHeader: false,

  images: {
    // Local /public images only, plus Next's built-in optimizer.
    // If we ever pull remote hero images, add `remotePatterns` here.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
