/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lcnaotinxwcrzvjmuohd.supabase.co'],
  },
};

module.exports = nextConfig;