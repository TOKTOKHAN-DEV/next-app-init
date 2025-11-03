'use client'

import { PropsWithChildren, useCallback, useEffect, useState } from 'react'

import { ContainerProps, Grid, GridItem, GridItemProps } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

import { LAYOUT } from '@/constants/layout'

import { PageLayoutFooter } from './components/page-layout-footer'
import { PageLayoutHeader } from './components/page-layout-header'

interface PageLayoutProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  containerProps?: ContainerProps
}
const bounceAnimation = keyframes`
  0% {  transform: translateY(-100px); }
  60% {  transform: translateY(10px); }
  80% {  transform: translateY(-5px); }
  100% {  transform: translateY(0px); }
`

export const PageLayout = ({
  //
  header = <PageLayoutHeader />,
  footer = <PageLayoutFooter />,
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
        pt={'0'}
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
    </Grid>
  )
}
