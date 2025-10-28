import { Button, ButtonProps, Icon, Spinner, Text } from '@chakra-ui/react'

const NaverIcon = () => (
  <Icon boxSize="24px">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15.2053 12.633L8.53148 3H3V21H8.79474V11.3655L15.4685 21H21V3H15.2053V12.633Z"
        fill="white"
      />
    </svg>
  </Icon>
)

const NaverLoginFullButton = (props: ButtonProps) => {
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
      bg="#03C75A"
      _hover={{
        bg: '#00B450',
      }}
      _active={{
        bg: '#00B450',
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
          <NaverIcon />
          <Text textStyle="pre-body-4" color="grey.0">
            네이버로 로그인
          </Text>
        </>
      )}
      {props.loading && <Spinner boxSize="16px" color="grey.0" />}
    </Button>
  )
}

const NaverLoginIconButton = (props: ButtonProps) => {
  return (
    <Button
      variant="unstyled"
      w="40px"
      h="40px"
      display="flex"
      flexShrink={0}
      alignItems="center"
      justifyContent="center"
      bg="#03C75A"
      borderRadius="full"
      p="8px"
      _hover={{
        bg: '#00B450',
      }}
      _active={{
        bg: '#00B450',
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
      <NaverIcon />
    </Button>
  )
}

export const NaverLoginButton = {
  Full: NaverLoginFullButton,
  Icon: NaverLoginIconButton,
}
