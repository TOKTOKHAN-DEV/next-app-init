'use client'

import { Link } from '@chakra-ui/next-js'
import { Flex, IconButton } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import { LogoIcon, MenuIcon } from 'generated/icons/MyIcons'

import { LAYOUT } from '@/constants/layout'
import { ROUTES } from '@/generated/path/routes'

import HomeHeaderDrawer from './components/HomeHeaderDrawer'
import {
  HOME_HEADER_VARIANTS,
  HomeHeaderVariantType,
} from './constants/variants'

interface HomeHeaderProps {
  variant?: HomeHeaderVariantType
}

const HomeHeader = ({ variant = 'light' }: HomeHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const cssByVariant = HOME_HEADER_VARIANTS[variant]
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
        {...cssByVariant.header}
      >
        <Link variant={'unstyled'} href={ROUTES.MAIN}>
          <LogoIcon boxSize={'74px'} color={'brand.primary.500'} />
        </Link>
        <IconButton //
          size={'xs'}
          color={cssByVariant.pointColor}
          icon={<MenuIcon w="24px" h="24px" />}
          onClick={onOpen}
          cursor="pointer"
          bg="transparent"
          aria-label="btn-toggle-drawer"
        />
      </Flex>
      <HomeHeaderDrawer
        isOpen={isOpen}
        onClose={onClose}
        bodyProps={cssByVariant.drawer}
      />
    </>
  )
}

export default HomeHeader
