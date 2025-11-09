'use client'

import { GoogleTagManager } from '@next/third-parties/google'

import { ENV } from '@/configs/env'

/**
 * Google Tag Manager 컴포넌트
 * 환경 변수 NEXT_PUBLIC_GTM_KEY가 설정된 경우에만 렌더링됩니다.
 *
 * GTM은 head와 body에 각각 스크립트를 삽입해야 하므로,
 * 이 컴포넌트는 head에 사용하고, body용 컴포넌트도 함께 제공됩니다.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-tag-manager
 */
export function GoogleTagManagerHead() {
  if (!ENV.GTM_KEY) {
    return null
  }

  return <GoogleTagManager gtmId={ENV.GTM_KEY} />
}
