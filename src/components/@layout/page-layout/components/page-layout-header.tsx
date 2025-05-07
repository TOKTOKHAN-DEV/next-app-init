'use client'

import Link from 'next/link'

import { Flex, IconButton, Text } from '@chakra-ui/react'

import { DrawerBasis as PageLayoutDrawer } from '@/components/@drawer/drawer-basis'
import { LAYOUT } from '@/constants/layout'
import { LogoIcon, MenuIcon } from '@/generated/icons/MyIcons'
import { ROUTES } from '@/generated/path/routes'

export const PageLayoutHeader = () => {
  return (
    <>
      <Flex //
        as="header"
        px={{ base: '16px', md: '80px' }}
        alignItems="center"
        justifyContent="space-between"
        position="fixed"
        zIndex="sticky"
        transition="all 0.3s"
        w="100%"
        h={LAYOUT.HEADER.HEIGHT}
      >
        <Link href={ROUTES.MAIN}>
          <LogoIcon boxSize={'74px'} color={'brand.primary.500'} />
        </Link>

        <PageLayoutDrawer
          size="md"
          trigger={
            <IconButton aria-label="menu">
              <MenuIcon boxSize={'24px'} />
            </IconButton>
          }
          content={<Text>body</Text>}
        />
      </Flex>
    </>
  )
}
