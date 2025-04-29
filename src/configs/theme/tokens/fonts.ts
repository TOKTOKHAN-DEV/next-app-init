import { defineTokens } from '@chakra-ui/react'

import { pretendard } from '@/generated/fonts/next-fonts'

export const fonts = defineTokens.fonts({
  heading: {
    value: pretendard.style.fontFamily,
  },
  body: {
    value: pretendard.style.fontFamily,
  },
})
