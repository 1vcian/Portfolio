/** @type {import('next').NextConfig} */

// The site is served from https://1vcian.me/Portfolio/ (GitHub Pages project site),
// so every asset has to be prefixed. Components read it via lib/site.ts.
const basePath = "/Portfolio";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: `${basePath}/`,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

module.exports = nextConfig;
