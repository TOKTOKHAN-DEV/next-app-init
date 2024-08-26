'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'

import {
  ContainerProps,
  Grid,
  GridItem,
  GridItemProps,
  keyframes,
} from '@chakra-ui/react'

import { LAYOUT } from '@/constants/layout'

import HomeFooter from './components/HomeFooter'
import HomeHeader from './components/HomeHeader'

interface HomeLayoutProps {
  header?: ReactNode
  footer?: ReactNode
  content?: ReactNode
  containerProps?: ContainerProps
}
const bounceAnimation = keyframes`
  0% {  transform: translateY(-100px); }
  60% {  transform: translateY(10px); }
  80% {  transform: translateY(-5px); }
  100% {  transform: translateY(0px); }
`
const HomeLayout = ({
  //
  header = <HomeHeader />,
  footer = <HomeFooter />,
  containerProps,
  content,
}: HomeLayoutProps) => {
  const [isScroll, setIsScroll] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScroll(window.scrollY > 66)
  }, [])

  const scrollConfig: GridItemProps =
    isScroll ?
      {
        top: `-10px`,
        h: `calc(${LAYOUT.HEADER.HEIGHT} + 10px)`,
        boxShadow: 'card',
        pt: '10px',
        animation: `${bounceAnimation} 0.8s`,
      }
    : {
        top: 0,
        h: LAYOUT.HEADER.HEIGHT,
        boxShadow: 'none',
        pt: '0',
        animation: 'none',
      }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

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
        pt={isScroll ? '10px' : '0'}
        {...scrollConfig}
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
        {content}
      </GridItem>
      <GridItem area={'footer'} as={'footer'} h={'100%'} w={'100%'} py={'30px'}>
        {footer}
      </GridItem>
    </Grid>
  )
}

export default HomeLayout
