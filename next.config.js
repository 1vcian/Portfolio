/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: '/Portfolio',
  assetPrefix: '/Portfolio/',
};

// Always use basePath and assetPrefix to ensure all resources are properly referenced
// This ensures images and files in public folder are correctly accessed

module.exports = nextConfig;