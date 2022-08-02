/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['https://www.sanity.io/'],
  },
};

module.exports = nextConfig;
