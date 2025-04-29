import { defineTokens } from '@chakra-ui/react'
import { volumeUpObject } from '@toktokhan-dev/universal'

import { colorSchema } from '@/generated/tokens/colors'

export const colors = defineTokens.colors({
  ...(volumeUpObject('.', colorSchema) as Record<string, { value: string }>),
})
