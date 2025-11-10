'use client'

import { useEffect, useState } from 'react'

import { LinkCallback } from './link-callback'
import { PopupCallback } from './popup-callback'

export const SocialCallback = () => {
  const [isPopup, setIsPopup] = useState(true)

  useEffect(() => {
    if (!window.opener) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPopup(false)
    }
  }, [isPopup])

  return isPopup ? <PopupCallback /> : <LinkCallback />
}
