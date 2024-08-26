/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleFunctionProps } from '@chakra-ui/theme-tools'

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      fontFamily: `Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`,
      color: 'content.1',
      bg: 'background.basic.1',
    },
    '#__next': {
      minHeight: '100vh',
    },
  }),
}

export default styles
