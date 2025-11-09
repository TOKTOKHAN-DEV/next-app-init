'use client'

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google'

import { ENV } from '@/configs/env'

/**
 * Google Analytics 컴포넌트
 * 환경 변수 NEXT_PUBLIC_GA_KEY가 설정된 경우에만 렌더링됩니다.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-analytics
 */
export function GoogleAnalytics() {
  if (!ENV.GA_KEY) {
    return null
  }

  return <NextGoogleAnalytics gaId={ENV.GA_KEY} />
}
