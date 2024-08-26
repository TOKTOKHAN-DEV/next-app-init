'use client'

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react'

import { TokGuide } from './components/TokGuide'

export const TokGuideDrawer = (props: Partial<DrawerProps>) => {
  return (
    <Drawer
      size="md"
      placement="right"
      isOpen={false}
      onClose={() => {}}
      {...props}
    >
      <DrawerOverlay />
      <DrawerContent bg="background.basic.1">
        <DrawerCloseButton w="40px" h="40px" />
        <DrawerBody>
          <TokGuide />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
