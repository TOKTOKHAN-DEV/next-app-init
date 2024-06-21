import { useOauthPopupCallback } from '@toktokhan-dev/react-web'

import Splash from '@/components/Splash'

const PopupCallback = () => {
  useOauthPopupCallback({
    onSuccess: (res) => {
      res.closePopup()
      // mutate({ token: data?.token, socialType: data?.socialType })
    },
    onFail: () => {
      console.log('failed to login')
    },
  })

  return <Splash />
}

export default PopupCallback
