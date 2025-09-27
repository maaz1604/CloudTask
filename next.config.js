/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  // Remove deprecated appDir option as it's now the default in Next.js 14
}

module.exports = nextConfig