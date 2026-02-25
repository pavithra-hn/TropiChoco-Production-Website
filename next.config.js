/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: 'export',
    // basePath automatically handles asset paths too, so assetPrefix is not needed
    basePath: isProd ? '/TropiChoco-Production-Website' : '',
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
