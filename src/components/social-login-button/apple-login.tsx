import { Button, ButtonProps, Icon, Spinner, Text } from '@chakra-ui/react'

const AppleIcon = () => (
  <Icon boxSize="24px">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19.5342 7.98235C18.2171 8.76471 17.4036 10.1059 17.4036 11.5961C17.4036 13.2725 18.4495 14.8 20.0379 15.4333C19.7279 16.402 19.2631 17.2961 18.682 18.1157C17.8297 19.2706 16.9387 20.4627 15.6215 20.4627C14.3044 20.4627 13.917 19.7176 12.3674 19.7176C10.8566 19.7176 10.3142 20.5 9.07456 20.5C7.83489 20.5 6.98262 19.4196 6.01413 18.0784C4.73573 16.2157 3.99968 14.0549 3.96094 11.7824C3.96094 8.09412 6.44027 6.11961 8.9196 6.11961C10.2367 6.11961 11.3215 6.93922 12.135 6.93922C12.9098 6.93922 14.1494 6.08235 15.6215 6.08235C17.1711 6.0451 18.6432 6.75294 19.5342 7.98235ZM14.9242 4.51765C15.5828 3.77255 15.9315 2.84118 15.9702 1.87255C15.9702 1.76078 15.9702 1.61176 15.9315 1.5C14.808 1.61176 13.762 2.13333 13.026 2.95294C12.3674 3.66078 11.98 4.5549 11.9413 5.52353C11.9413 5.63529 11.9413 5.74706 11.98 5.85882C12.0575 5.85882 12.1737 5.89608 12.2512 5.89608C13.2972 5.82157 14.2657 5.3 14.9242 4.51765Z"
        fill="white"
      />
    </svg>
  </Icon>
)

const AppleLoginFullButton = (props: ButtonProps) => {
  return (
    <Button
      variant="unstyled"
      type="button"
      minW="280px"
      h="48px"
      p="8px"
      alignItems="center"
      columnGap="8px"
      borderRadius="10px"
      justifyContent="center"
      bg="#232323"
      _hover={{
        bg: '#000000',
      }}
      _active={{
        bg: '#000000',
      }}
      _disabled={{
        opacity: 0.4,
      }}
      _loading={{
        pointerEvents: 'none',
        opacity: 0.4,
      }}
      {...props}
    >
      {!props.loading && (
        <>
          <AppleIcon />
          <Text textStyle="pre-body-4" color="grey.0">
            Apple로 로그인
          </Text>
        </>
      )}
      {props.loading && <Spinner boxSize="16px" color="grey.0" />}
    </Button>
  )
}

const AppleLoginIconButton = (props: ButtonProps) => {
  return (
    <Button
      variant="unstyled"
      w="40px"
      h="40px"
      display="flex"
      flexShrink={0}
      alignItems="center"
      justifyContent="center"
      bg="#232323"
      borderRadius="full"
      p="8px"
      _hover={{
        bg: '#000000',
      }}
      _active={{
        bg: '#000000',
      }}
      _disabled={{
        opacity: 0.4,
      }}
      _loading={{
        pointerEvents: 'none',
        opacity: 0.4,
      }}
      {...props}
    >
      <AppleIcon />
    </Button>
  )
}

export const AppleLoginButton = {
  Full: AppleLoginFullButton,
  Icon: AppleLoginIconButton,
}
