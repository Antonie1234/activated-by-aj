import type { NextConfig } from "next";

const staticCacheHeader = {
  key: 'Cache-Control',
  value: 'public, max-age=31536000, immutable',
};

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  compress: true,
  generateEtags: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: '*.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'reflectmotion.com',
      },
      {
        protocol: 'https',
        hostname: 'www.reflectmotion.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      { source: '/:path*.jpg',  headers: [staticCacheHeader] },
      { source: '/:path*.jpeg', headers: [staticCacheHeader] },
      { source: '/:path*.png',  headers: [staticCacheHeader] },
      { source: '/:path*.webp', headers: [staticCacheHeader] },
      { source: '/:path*.svg',  headers: [staticCacheHeader] },
    ];
  },
};

export default nextConfig;
