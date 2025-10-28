import { Button, ButtonProps, Icon, Spinner, Text } from '@chakra-ui/react'

const KakaoIcon = () => (
  <Icon boxSize="24px">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.61871C6.48 2.61871 2 6.09871 2 10.3787C2 13.0487 3.73 15.3787 6.37 16.7987L5.26 20.8687C5.23906 20.9497 5.24337 21.0351 5.27235 21.1135C5.30134 21.192 5.35362 21.2597 5.42217 21.3075C5.49073 21.3554 5.57228 21.3812 5.6559 21.3814C5.73952 21.3816 5.8212 21.3562 5.89 21.3087L10.75 18.0787C11.16 18.0787 11.58 18.1487 12 18.1487C17.52 18.1487 22 14.6687 22 10.3787C22 6.08871 17.52 2.61871 12 2.61871Z"
        fill="black"
      />
    </svg>
  </Icon>
)

const KakaoLoginFullButton = (props: ButtonProps) => {
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
      bg="#FAE100"
      _hover={{
        bg: '#F1D900',
      }}
      _active={{
        bg: '#F1D900',
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
          <KakaoIcon />
          <Text textStyle="pre-body-4" color="#000">
            카카오톡으로 로그인
          </Text>
        </>
      )}
      {props.loading && <Spinner boxSize="16px" color="white" />}
    </Button>
  )
}

const KakaoLoginIconButton = (props: ButtonProps) => {
  return (
    <Button
      variant="unstyled"
      w="40px"
      h="40px"
      display="flex"
      flexShrink={0}
      alignItems="center"
      justifyContent="center"
      bg="#FAE100"
      borderRadius="full"
      p="8px"
      _hover={{
        bg: '#F1D900',
      }}
      _active={{
        bg: '#F1D900',
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
      <KakaoIcon />
    </Button>
  )
}

export const KakaoLoginButton = {
  Full: KakaoLoginFullButton,
  Icon: KakaoLoginIconButton,
}
