import { Button, ButtonProps, Icon, Spinner, Text } from '@chakra-ui/react'

const GoogleIcon = () => (
  <Icon boxSize="24px">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20.8197 12.2046C20.8197 11.5664 20.7624 10.9527 20.6561 10.3636H12.1797V13.845H17.0233C16.8147 14.97 16.1806 15.9232 15.2274 16.5614V18.8196H18.1361C19.8379 17.2527 20.8197 14.9455 20.8197 12.2046Z"
        fill="#4285F4"
      />
      <path
        d="M12.1795 21C14.6095 21 16.6467 20.1941 18.1358 18.8195L15.2272 16.5613C14.4213 17.1013 13.3904 17.4204 12.1795 17.4204C9.83536 17.4204 7.85127 15.8372 7.14354 13.71H4.13672V16.0418C5.61763 18.9832 8.66127 21 12.1795 21Z"
        fill="#34A853"
      />
      <path
        d="M7.14379 13.7101C6.96379 13.1701 6.86151 12.5933 6.86151 12.0001C6.86151 11.4069 6.96379 10.8301 7.14379 10.2901V7.95825H4.13696C3.50696 9.21241 3.17913 10.5966 3.17969 12.0001C3.17969 13.4524 3.52742 14.8269 4.13696 16.0419L7.14379 13.7101Z"
        fill="#FBBC04"
      />
      <path
        d="M12.1795 6.57955C13.5008 6.57955 14.6872 7.03364 15.6199 7.92546L18.2013 5.34409C16.6426 3.89182 14.6054 3 12.1795 3C8.66127 3 5.61763 5.01682 4.13672 7.95819L7.14354 10.29C7.85127 8.16274 9.83536 6.57955 12.1795 6.57955Z"
        fill="#EA4335"
      />
    </svg>
  </Icon>
)

const GoogleLoginFullButton = (props: ButtonProps) => {
  return (
    <Button
      variant="unstyled"
      type="button"
      minW="280px"
      h="48px"
      p="8px"
      alignItems="center"
      columnGap="8px"
      border="1px solid"
      borderColor="grey.2"
      borderRadius="10px"
      justifyContent="center"
      bg="#ffffff"
      _hover={{
        bg: '#EAEBEC',
      }}
      _active={{
        bg: '#EAEBEC',
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
          <GoogleIcon />
          <Text textStyle="pre-body-4" color="grey.9">
            Google로 로그인
          </Text>
        </>
      )}
      {props.loading && <Spinner boxSize="16px" color="grey.9" />}
    </Button>
  )
}

const GoogleLoginIconButton = (props: ButtonProps) => {
  return (
    <Button
      variant="unstyled"
      w="40px"
      h="40px"
      display="flex"
      flexShrink={0}
      alignItems="center"
      justifyContent="center"
      bg="#ffffff"
      border="1px solid"
      borderColor="grey.2"
      borderRadius="full"
      p="8px"
      _hover={{
        bg: '#EAEBEC',
      }}
      _active={{
        bg: '#EAEBEC',
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
      <GoogleIcon />
    </Button>
  )
}

export const GoogleLoginButton = {
  Full: GoogleLoginFullButton,
  Icon: GoogleLoginIconButton,
}
