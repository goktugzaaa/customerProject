import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow accessing the dev server from local network (mobile device)
  allowedDevOrigins: ["192.168.1.4", "localhost"],
};

export default nextConfig;
