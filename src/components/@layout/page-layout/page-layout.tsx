'use client'

import { PropsWithChildren } from 'react'

import type { ContainerProps } from '@chakra-ui/react/container'
import { Grid, GridItem } from '@chakra-ui/react/grid'

import { LAYOUT } from '@/constants/layout'

interface PageLayoutProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  containerProps?: ContainerProps
}

export const PageLayout = ({
  //
  header = <></>,
  footer = <></>,
  containerProps,
  children,
}: PropsWithChildren<PageLayoutProps>) => {
  return (
    <Grid
      w={'100%'}
      minW={'100%'}
      minH={'100vh'}
      pos={'relative'}
      gridAutoColumns={'1fr'}
      bg={'background.basic.1'}
      gridTemplateRows={`${LAYOUT.HEADER.HEIGHT} 1fr auto`}
      templateAreas={`"header" "main" "footer"`}
    >
      <GridItem
        area={'header'}
        as={'header'}
        position="sticky"
        zIndex="sticky"
        w={'100%'}
        display="flex"
        justifyContent={'center'}
      >
        {header}
      </GridItem>
      <GridItem
        as={'main'}
        area={'main'}
        w={'100%'}
        minW={'100%'}
        {...containerProps}
      >
        {children}
      </GridItem>
      <GridItem area={'footer'} as={'footer'} h={'100%'} w={'100%'} py={'30px'}>
        {footer}
      </GridItem>
    </Grid>
  )
}
