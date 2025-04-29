import { Drawer, DrawerRootProps, Portal } from '@chakra-ui/react'

interface DrawerBasisProps extends Omit<DrawerRootProps, 'children'> {
  trigger: React.ReactNode
  content: React.ReactNode
  title?: string
  description?: string
}
export const DrawerBasis = ({
  trigger,
  content,
  title,
  description,
  ...props
}: DrawerBasisProps) => {
  return (
    <Drawer.Root {...props}>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.CloseTrigger w="40px" h="40px" />
          <Drawer.Content bg="background.basic.1">
            {title && (
              <Drawer.Header>
                <Drawer.Title>{title}</Drawer.Title>
              </Drawer.Header>
            )}
            <Drawer.Body>
              {description && (
                <Drawer.Description>{description}</Drawer.Description>
              )}
              {content}
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
