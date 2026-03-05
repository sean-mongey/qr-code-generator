import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: process.env.NODE_ENV === "production" ? "/qr-code-generator" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/qr-code-generator/" : "",
};

export default nextConfig;
