/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/:slug',
        destination: '/website/:slug',
      },
    ];
  },
};

export default nextConfig;
