/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dev-parts-plumbing.pantheonsite.io',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: '://placeholder.com', // Good for fallbacks and testing layouts
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },

};

export default nextConfig;
