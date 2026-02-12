/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'https://dev-parts-plumbing.pantheonsite.io/graphql',
      },
    ];
  },
};

export default nextConfig;
