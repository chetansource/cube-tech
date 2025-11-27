import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Docker deployment
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cube-highways.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'tryeasel.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
