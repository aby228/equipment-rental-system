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
    // async redirects() {
    //     return [
    //         {
    //             source: '/product',
    //             destination: '/products',
    //             permanent: true,
    //         },
    //     ]
    // },
}

module.exports = nextConfig
