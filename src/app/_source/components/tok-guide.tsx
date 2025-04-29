'use client'

import { Box, Tabs, Text } from '@chakra-ui/react'

import { Bookmarks } from './contents/bookmarks'
import { Examples } from './contents/example'
import { State } from './contents/state'

export const TokGuide = () => {
  return (
    <Box>
      <Text textStyle="pre-heading-01">Tok Guide</Text>
      <Text mt="24px">
        환영합니다. 해당 보일러템플릿은 똑똑한개발자에서 제공하는 여러 모듈로
        이루어져 있습니다.
      </Text>
      <Tabs.Root defaultValue="members" variant="plain">
        <Tabs.List bg="bg.muted" rounded="l3" p="1">
          <Tabs.Trigger value="members">Members</Tabs.Trigger>
          <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
          <Tabs.Trigger value="tasks">Settings</Tabs.Trigger>
          <Tabs.Indicator rounded="l2" />
        </Tabs.List>
        <Tabs.Content value="members">
          <Bookmarks />
        </Tabs.Content>
        <Tabs.Content value="projects">
          <Examples />
        </Tabs.Content>
        <Tabs.Content value="tasks">
          <State />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}
