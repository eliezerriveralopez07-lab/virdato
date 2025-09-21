// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Make sure Next doesn't try to bundle the DB driver for RSC/server routes.
  // This fixes "Can't resolve 'postgres'" when building on Vercel.
  experimental: {
    serverComponentsExternalPackages: ['postgres'],
  },
};

export default nextConfig;
