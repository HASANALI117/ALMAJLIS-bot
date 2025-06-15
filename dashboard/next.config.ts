import type { NextConfig } from "next";
import { config } from "dotenv";
config({ path: "../.env" });

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_FRONTEND_URL: process.env.FRONTEND_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false, // Disable StrictMode
};

export default nextConfig;
