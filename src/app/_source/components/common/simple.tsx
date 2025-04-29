import { Box, Link as ChakraLink, Code, Flex, Text } from '@chakra-ui/react'

export const GuideSection = (props: {
  title: string
  contents: React.ReactNode
}) => {
  return (
    <Box mt="24px">
      <Text textStyle="pre-heading-02">{props.title}</Text>
      <Box mt="12px">{props.contents}</Box>
    </Box>
  )
}

export const GuideLinkTags = (props: {
  data: { text: string; href: string }[]
}) => {
  return (
    <Flex wrap="wrap" gap="8px" mt="20px">
      {props.data.map((item, idx) => (
        <Code key={idx}>
          <ChakraLink target="_blank" href={item.href} textDecor="underline">
            <Text>{item.text}</Text>
          </ChakraLink>
        </Code>
      ))}
    </Flex>
  )
}
