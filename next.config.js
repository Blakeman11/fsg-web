/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lcnaotinxwcrzvjmuohd.supabase.co'],
  },
  // 🔁 Enable middleware matcher for /cart
  matcher: ['/cart'],
};

module.exports = nextConfig;