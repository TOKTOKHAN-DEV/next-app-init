// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const isProd = process.env.NODE_ENV === 'production'
const removeConsole = (() => {
  const isServer = typeof window === 'undefined'
  const isClient = !isServer
  if (!isProd) return false
  if (isClient) return { exclude: ['error'] }
  if (isServer) return false
})()
module.exports = withBundleAnalyzer({
  // images: {
  //   domains: ['example.com'], // remote 이미지를 next image 로 랜더링하고싶다면 도메인을 설정해주세요
  // },
  swcMinify: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV !== 'production',
    },
  },
  compiler: {
    removeConsole,
  },
  modularizeImports: {
    'lodash-es': {
      transform: 'lodash-es/{{member}}',
      preventFullImport: true,
    },
    'lodash/fp': {
      transform: 'lodash/fp/{{member}}',
      preventFullImport: true,
    },
  },
  async headers() {
    return [
      {
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, no-cache, max-age=0, must-revalidate',
          },
        ],

        source: '/:path*',
      },
      {
        source: '/fonts/pretendard/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=86400',
          },
        ],
      },
      {
        source: '/videos/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=86400',
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        hostname: '*.s3.*.amazonaws.com',
      },
      {
        hostname: 'via.placeholder.com',
      },
    ],
  },
  experimental: {
    typedRoutes: true,
    optimizePackageImports: [
      '@chakra-ui/react',
      '@charkra-ui/layout',
      '@emotion/react',
      'react-select',
    ],
    webVitalsAttribution: ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'INP'],
  },
})
