/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        unoptimized: true, // For Vercel deployment
    },
    async redirects() {
        return [
            {
                source: '/product',
                destination: '/products',
                permanent: true,
            },
        ]
    },
    // Enable experimental features for better performance
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client'],
    },
    // Ensure proper output for Vercel
    output: 'standalone',
}

module.exports = nextConfig
