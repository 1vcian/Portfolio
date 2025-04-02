/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: '',
  assetPrefix: '',
};

// Only add basePath and assetPrefix for production builds (GitHub Pages deployment)
if (process.env.NODE_ENV === 'production') {
  nextConfig.basePath = '/Portfolio';
  nextConfig.assetPrefix = '/Portfolio/';
}

module.exports = nextConfig;