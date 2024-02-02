/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  experimental: {
    appDocumentPreloading: false,
  },
};

module.exports = nextConfig;
