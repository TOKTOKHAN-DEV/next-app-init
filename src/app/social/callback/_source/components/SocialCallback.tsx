'use client'

import { useEffect, useState } from 'react'

import LinkCallback from './LinkCallback'
import PopupCallback from './PopupCallback'

export default function SocialCallback() {
  const [isPopup, setIsPopup] = useState(true)
  useEffect(() => {
    if (!window.opener) {
      setIsPopup(false)
    }
  }, [isPopup])

  return isPopup ? <PopupCallback /> : <LinkCallback />
}
