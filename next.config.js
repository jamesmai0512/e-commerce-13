/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },

  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['loremflickr.com', 'raw.githubusercontent.com'],
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    return config
  },
}

module.exports = nextConfig
