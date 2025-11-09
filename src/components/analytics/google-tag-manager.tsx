'use client'

import { GoogleTagManager as NextGoogleTagManager } from '@next/third-parties/google'

import { ENV } from '@/configs/env'

/**
 * Google Tag Manager 컴포넌트
 * 환경 변수 NEXT_PUBLIC_GTM_KEY가 설정된 경우에만 렌더링됩니다.
 *
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-tag-manager
 */
export function GoogleTagManager() {
  if (!ENV.GTM_KEY) {
    return null
  }

  return <NextGoogleTagManager gtmId={ENV.GTM_KEY} />
}
