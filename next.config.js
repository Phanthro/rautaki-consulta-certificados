/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
      serverActions: {
        bodySizeLimit: '2mb',
      },
    },
    env: {
      PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_AVALON_CLIENTE_IP
    }

  }

module.exports = nextConfig
