/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'lcnaotinxwcrzvjmuohd.supabase.co',
      'www.tcdb.com', // ✅ add this if you plan to display TCDB images
    ],
  },
  // Remove invalid `matcher` key (it's not valid at this level in Next config)
};

module.exports = nextConfig;