import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["eventstailor.com", "admin.eventstailor.com"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://admin.eventstailor.com/api/v1/:path*', // Proxy to backend API
      },
    ];
  },
};

export default nextConfig;
