import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { redirects as wpRedirects } from "./src/lib/redirects";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async redirects() {
    return wpRedirects;
  },
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
};

export default withNextIntl(config);
