import type { NextConfig } from "next";
import createMDX from '@next/mdx';

// Force cache invalidation - removed hero buttons - 2025-11-25
const nextConfig: NextConfig = {
  /* Fix workspace root detection for monorepo structure */
  outputFileTracingRoot: __dirname,
  /* MDX Support */
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  /* Performance optimizations */
  compress: true,
  poweredByHeader: false,

  /* Enable ESLint during build for production quality */
  eslint: {
    ignoreDuringBuilds: false,
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
        hostname: '*.apicdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'iismet.com',
      },
    ],
  },

  /* Security headers */
  async headers() {
    // Allow framing from Sanity Studio and Vercel for Presentation Tool
    const frameAncestors = "frame-ancestors 'self' https://*.sanity.studio https://*.sanity.io https://sanity.io https://www.sanity.io https://*.vercel.app https://vercel.live";

    return [
      {
        // Studio routes - no restrictive security headers (Studio is a full SPA)
        source: '/studio/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: frameAncestors
          },
        ],
      },
      {
        // API routes for draft mode - allow iframe from Sanity
        source: '/api/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: frameAncestors
          },
        ],
      },
      {
        // All site routes - frameable by Sanity Presentation Tool
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
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          },
          {
            key: 'Content-Security-Policy',
            value: frameAncestors
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
