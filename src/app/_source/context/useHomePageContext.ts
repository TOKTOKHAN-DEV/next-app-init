import { useState } from 'react'

import { createContextSelector } from '@toktokhan-dev/react-universal'

export const {
  Provider: HomePageProvider,
  useContext: useHomePageContext,
  withProvider: withHomePageProvider,
} = createContextSelector(() => {
  const [count, setCount] = useState(0)

  return { count, setCount }
})
