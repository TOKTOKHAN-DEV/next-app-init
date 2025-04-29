import { Dialog, DialogRootProps } from '@chakra-ui/react'

interface ModalBasisProps extends Omit<DialogRootProps, 'children'> {
  trigger: React.ReactNode
  content: React.ReactNode
  title?: string
  description?: string
}
export const ModalBasis = ({
  trigger,
  content,
  title,
  description,
  ...props
}: ModalBasisProps) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="background.basic.1">
          <Dialog.CloseTrigger w="40px" h="40px" />
          {title && (
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
          )}
          <Dialog.Body>
            {description && (
              <Dialog.Description>{description}</Dialog.Description>
            )}
            {content}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
