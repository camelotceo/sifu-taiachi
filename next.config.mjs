/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GROQ_API_KEY: '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'
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com', 'placeholder.svg'],
    unoptimized: true,
  },
}

export default nextConfig
