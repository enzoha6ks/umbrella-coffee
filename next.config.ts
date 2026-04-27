import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
}

export default nextConfig