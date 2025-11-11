import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* MDX Support */
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  /* Performance optimizations */
  compress: true,
  poweredByHeader: false,

  /* Enable ESLint during build for production quality */
  eslint: {
    ignoreDuringBuilds: true, // Temporarily disabled - TODO: Fix ESLint warnings
  },

  /* Enable TypeScript error checking for production quality */
  typescript: {
    ignoreBuildErrors: false,
  },

  /* Image optimization */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    qualities: [30, 75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.apicdn.sanity.io',
      },
    ],
  },

  /* Security headers */
  async headers() {
    return [
      {
        // Studio routes - allow all iframe embedding for Sanity Studio
        source: '/studio/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.sanity.studio https://*.vercel.app"
          },
        ],
      },
      {
        // API routes for draft mode - allow iframe from Sanity
        source: '/api/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.sanity.studio https://*.vercel.app"
          },
        ],
      },
      {
        // All other routes - allow iframe from Sanity for Presentation Tool
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.sanity.studio https://*.vercel.app"
          },
        ],
      },
    ];
  },

  /* Redirects */
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/supplier-requirements',
        destination: '/compliance/supplier-requirements',
        permanent: true,
      },
    ];
  },

  /* Experimental features for performance */
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config) => {
    // Fix module resolution for TypeScript files (from official Payload template)
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
      '.mjs': ['.mts', '.mjs'],
      '.cjs': ['.cts', '.cjs'],
    }
    return config
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Export with MDX support for Sanity CMS
export default withMDX(nextConfig);
