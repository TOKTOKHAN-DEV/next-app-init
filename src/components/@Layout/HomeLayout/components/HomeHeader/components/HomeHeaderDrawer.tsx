import { ChakraProps, DrawerProps, Text } from '@chakra-ui/react'

import DrawerBasis from '@/components/@Drawer/DrawerBasis'

interface HomeHeaderDrawerProps extends Omit<DrawerProps, 'children'> {
  bodyProps?: ChakraProps
}

const HomeHeaderDrawer = ({ bodyProps, ...props }: HomeHeaderDrawerProps) => {
  return (
    <DrawerBasis //
      header={'header'}
      body={<Text>body</Text>}
      footer={<Text>footer</Text>}
      styles={{
        header: { bg: 'background.basic.1' },
        content: { bg: 'background.basic.1' },
        body: { ...bodyProps },
      }}
      {...props}
    />
  )
}

export default HomeHeaderDrawer
