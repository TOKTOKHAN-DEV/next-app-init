import { useOauthPopupCallback } from '@toktokhan-dev/react-web'

import { Splash } from '@/components/splash'

import { OauthCallback } from '../types'

export const PopupCallback = () => {
  useOauthPopupCallback<OauthCallback>({
    onSuccess: (res) => {
      console.log('succeed to login', res)
      // res?.closePopup({
      //   code: 'extra data',
      // })
    },
    onFail: (res) => {
      console.log('failed to login', res)
      // res?.closePopup()
    },
  })
  return <Splash />
}
