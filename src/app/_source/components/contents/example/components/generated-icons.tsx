import { Box, Code, SimpleGrid, Text } from '@chakra-ui/react'

import * as GenIconComponents from '@/generated/icons/MyIcons'

export const GeneratedIcons = () => {
  return (
    <Box>
      <Text>
        <Code>gen:icon</Code> 을 통해 만들어진 icon 입니다. 색상이{' '}
        <b>파란 색상</b>이 아니라면 색상이 정적으로 들어가 있는건 아닌지 확인해
        주세요. <Code>prop</Code> 을 통해 제어하려면 <b>정적인 색상 대신</b>{' '}
        <Code>currentColor</Code> 를 넣어줄 수 있습니다.{' '}
      </Text>
      <SimpleGrid columns={2} gap="20px" mt="20px">
        {Object.entries(GenIconComponents).map(([key, Icon]) => (
          <Box key={key}>
            <Icon color="blue" />
            <Text>{key}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
