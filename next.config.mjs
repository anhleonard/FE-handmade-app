/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "salt.tikicdn.com",
      },
      {
        protocol: "https",
        hostname: "buffer.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
