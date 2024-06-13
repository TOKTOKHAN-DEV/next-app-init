import { Box, Text } from '@chakra-ui/react'

import { Section } from '../../common/simple'
import { GeneratedIcons } from './components/GeneratedIcons'

export const Examples = () => {
  return (
    <Box>
      <Text>여러가지 예제를 등록하여 협업을 수월히 진행해보세요.</Text>
      <Section title="Generated Icons" contents={<GeneratedIcons />} />
    </Box>
  )
}
