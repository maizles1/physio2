import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: '/appointment',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Keep optimizer cache bounded so replaced /public images get fresh variants sooner.
    minimumCacheTTL: 604800, // 7 days (was 1y; paired with blog static headers)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  experimental: {
    optimizePackageImports: ['@/components'],
  },
  async headers() {
    const isProd = process.env.NODE_ENV === 'production'
    const baseHeaders = [
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
    ]
    if (isProd) {
      baseHeaders.push({
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains',
      })
    }
    return [
      {
        source: '/:path*',
        headers: [
          ...baseHeaders,
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://pagead2.googlesyndication.com https://tagassistant.google.com",
              "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://pagead2.googlesyndication.com https://tagassistant.google.com",
              "style-src 'self' 'unsafe-inline'",
              "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagassistant.google.com",
              "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.google.com https://www.google.co.il https://www.googleadservices.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://td.doubleclick.net https://pagead2.googlesyndication.com https://google.com https://*.google.com https://*.googleusercontent.com https://img.youtube.com https:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://www.google.com https://www.google.co.il https://googleads.g.doubleclick.net https://td.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://maps.googleapis.com https://www.googleapis.com https://api.web3forms.com https://*.google-analytics.com https://*.analytics.google.com",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://td.doubleclick.net https://www.googletagmanager.com https://bid.g.doubleclick.net https://tagassistant.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
      {
        // Blog images are replaced in place; avoid immutable 1y cache so updates propagate.
        source: '/images/blog/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
