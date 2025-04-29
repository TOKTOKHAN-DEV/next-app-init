import { defineSemanticTokens } from '@chakra-ui/react'

import { colors as generated } from '@/generated/tokens/colors'

export const colors = defineSemanticTokens.colors({
  ...generated,
})
