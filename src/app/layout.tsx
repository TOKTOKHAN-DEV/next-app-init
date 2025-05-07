import { Metadata, Viewport } from 'next'

import { TokGuide } from '@/app/_source/components/tok-guide'
import { TokGuideTriggerButton } from '@/app/_source/components/tok-guide-trigger-button'
import { DrawerBasis as TokGuideDrawer } from '@/components/@drawer/drawer-basis'
import { PageLayout } from '@/components/@layout/page-layout'
import { ColorModeButton } from '@/components/ui/color-mode'
import { Provider as ThemeProvider } from '@/components/ui/provider'
import { ENV } from '@/configs/env'
import { pretendard } from '@/generated/fonts/next-fonts'
import { AppProvider } from '@/providers/app-provider'

// import { GoogleAnalytics } from "@next/third-parties/google";

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
    default: '똑똑한개발자',
    template: `%s | 똑똑한개발자`,
  },
  description: '디지털프로덕트의 TOKTOK한 경험',
  applicationName: '똑똑한개발자',
  keywords: ['똑똑한개발자', '디지털프로덕트의 TOKTOK한 경험', '...'],
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
    locale: 'ko',
    siteName: '똑똑한개발자',
    title: {
      default: '똑똑한개발자',
      template: `똑똑한개발자 | %s`,
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
    title: '똑똑한개발자',
    description: '디지털프로덕트의 TOKTOK한 경험',
    site: '@site',
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
}

/**
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable}`}
      suppressHydrationWarning
    >
      <head>{/* <GoogleAnalytics gaId={ENV.GA_KEY || ""} /> */}</head>
      <body>
        <AppProvider>
          <ThemeProvider>
            <PageLayout>
              {children}
              <ColorModeButton />
              <TokGuideDrawer
                size="md"
                trigger={<TokGuideTriggerButton />}
                content={<TokGuide />}
              />
            </PageLayout>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  )
}
