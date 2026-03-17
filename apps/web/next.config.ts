import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const isDevelopment = process.env.NODE_ENV === "development";

const withPWA = withPWAInit({
  dest: "public",
  disable: isDevelopment,
  cacheOnFrontEndNav: !isDevelopment,
  aggressiveFrontEndNavCaching: false,
});

const nextConfig: NextConfig = {};

export default withPWA(nextConfig);
