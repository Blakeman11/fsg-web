/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lcnaotinxwcrzvjmuohd.supabase.co',
        pathname: '/storage/v1/object/public/market-images/**',
      },
    ],
  },
};

export default nextConfig;