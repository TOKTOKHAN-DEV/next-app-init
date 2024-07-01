import { ReactNode } from 'react'

import { Metadata, Viewport } from 'next'

import { sanitize } from 'isomorphic-dompurify'

import { TokGuideDrawer } from '@/components/@Drawer/TokGuideDrawer'
import { SideBtn } from '@/components/@Drawer/TokGuideDrawer/components/SideBtn'
import HomeLayout from '@/components/@Layout/HomeLayout'
import { OpenBtn } from '@/components/OpenBtn'
import ToggleColorModeButton from '@/components/ToggleColorModeButton'
import { ENV } from '@/configs/env'
import AppProvider from '@/providers/AppProvider'

// import { GoogleAnalytics } from "@next/third-parties/google";
import '../../public/fonts/pretendard/css/pretendardvariable-dynamic-subset.css'

/**
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

/**
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  ...(ENV.DOMAIN && { metadataBase: new URL(ENV.DOMAIN) }),
  title: {
    default: '똑똑한 개발자',
    template: `%s | 똑똑한 개발자`,
  },
  description: '디지털프로덕트의 TOKTOK한 경험',
  applicationName: '똑똑한 개발자',
  keywords: ['똑똑한 개발자', '디지털프로덕트의 TOKTOK한 경험', '...'],
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/120.png', sizes: '120x120' },
    { rel: 'apple-touch-icon', url: '/icons/152.png', sizes: '152x152' },
    { rel: 'apple-touch-icon', url: '/icons/167.png', sizes: '167x167' },
    { rel: 'apple-touch-icon', url: '/icons/180.png', sizes: '180x180' },
    { rel: 'apple-touch-icon', url: '/icons/192.png', sizes: '192x192' },
    { rel: 'apple-touch-icon', url: '/icons/384.png', sizes: '384x384' },
    { rel: 'apple-touch-icon', url: '/icons/512.png', sizes: '512x512' },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon.ico',
    },
  ],
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'ko-KR',
    siteName: '똑똑한 개발자',
    title: {
      default: '똑똑한 개발자',
      template: `똑똑한 개발자 | %s`,
    },
    description: '디지털프로덕트의 TOKTOK한 경험',
    images: [
      {
        url: '/images/new_og.png',
        width: 600,
        height: 315,
        alt: 'Og Image Alt',
        type: 'image/png',
      },
    ],
    url: ENV.DOMAIN,
  },
  twitter: {
    card: 'summary_large_image',
    images: `/images/new_og.png`,
    title: '똑똑한 개발자',
    description: '디지털프로덕트의 TOKTOK한 경험',
    site: '@site',
  },
  appleWebApp: {
    capable: true,
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
}

const redirectIEtoEdge = () => {
  const script = `
    if (/MSIE d|Trident.*rv:/.test(navigator.userAgent)) {
      window.location = 'microsoft-edge:' + window.location;
      setTimeout(function() {
        window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
      }, 1);
    }
  `

  return {
    __html: sanitize(script),
  }
}

/**
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts
 */
export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <script dangerouslySetInnerHTML={redirectIEtoEdge()} />
        {/* <GoogleAnalytics gaId={ENV.GA_KEY || ""} /> */}
      </head>
      <body>
        <AppProvider>
          <HomeLayout content={children} />
          <ToggleColorModeButton />
          <OpenBtn target={<TokGuideDrawer />} button={<SideBtn />} />
        </AppProvider>
      </body>
    </html>
  )
}
