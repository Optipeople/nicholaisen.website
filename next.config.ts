import type { NextConfig } from "next";
import { redirects as wpRedirects } from "./src/lib/redirects";

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async redirects() {
    return wpRedirects;
  },
};

export default config;
