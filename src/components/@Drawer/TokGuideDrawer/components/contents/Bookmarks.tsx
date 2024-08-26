import { Box, Text } from '@chakra-ui/react'

import { Link, LinkTags, Section } from '../common/simple'

export const Bookmarks = () => {
  return (
    <Box>
      <Text>개발시 필요한 다양한 링크를 북마크 해두세요.</Text>
      <Section
        title="Package"
        contents={
          <>
            <Text>내부적으로 사용하는 패키지들의 문서를 확인해보세요.</Text>
            <LinkTags
              data={[
                {
                  text: 'react',
                  href: 'https://react.dev/',
                },
                {
                  text: 'next',
                  href: 'https://nextjs.org/docs',
                },
                {
                  text: 'chakra-ui',
                  href: 'https://v2.chakra-ui.com/',
                },
                {
                  text: 'react-hook-form',
                  href: 'https://react-hook-form.com/',
                },
                {
                  text: 'axios',
                  href: 'https://axios-http.com/kr/docs/intro',
                },
                {
                  text: 'react-query',
                  href: 'https://tanstack.com/query/latest/docs/framework/react/overview',
                },
                {
                  text: 'toktokhan-dev',
                  href: 'https://toktokhan-dev-docs.vercel.app/',
                },
                {
                  text: 'dayjs',
                  href: 'https://day.js.org/docs/en/installation/installation',
                },
                {
                  text: 'lodash',
                  href: 'https://lodash.com/docs/4.17.15',
                },
                {
                  text: '@toktokhan-dev/universal',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/universal',
                },
                {
                  text: '@toktokhan-dev/react-universal',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/react-universal',
                },
                {
                  text: '@toktokhan-dev/react-web',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/react-web',
                },
                {
                  text: '@toktokhan-dev/chakra',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/chakra',
                },
                {
                  text: '@toktokhan-dev/zustand-with-setter',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/zustand-with-setter',
                },
                {
                  text: '@toktokhan-dev/zustand-create-store-context',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/zustand-create-store-context',
                },
              ]}
            />
          </>
        }
      />
      <Section
        title="Guide"
        contents={
          <>
            <Text>
              컨벤션, 소셜로그인, 스테이트 관리 등 개발시 필요한 규칙과
              노하우들을 확인해보세요
            </Text>
            <LinkTags
              data={[
                {
                  text: 'convention',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/category/convention',
                },
                {
                  text: 'git-flow',
                  href: '',
                },
                {
                  text: 'toktoken',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/docs/toktoken/Introduction',
                },
                {
                  text: 'tokit',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/docs/tokit/Overview',
                },
                {
                  text: 'social-login',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/docs/auth/Social_Login/Overview',
                },
                {
                  text: 'refresh-token',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/docs/auth/Refresh',
                },
                {
                  text: 'state-management:zustand',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/category/store-zustand-guide',
                },
              ]}
            />
          </>
        }
      />
      <Section
        title="CLI"
        contents={
          <>
            <Text>
              다양한 명령어를 통해, theme, openapi, img path 등 여러가지 파일을
              생성 할 수 있습니다.
              <br />
              자세한 내용은 <Link>여기</Link>
              참고해주세요.
            </Text>
            <LinkTags
              data={[
                {
                  text: 'tokript',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Overview',
                },
                {
                  text: 'gen:theme',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-theme-chakra',
                },
                {
                  text: 'gen:api',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-api-react-query',
                },
                {
                  text: 'gen:img',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-img',
                },
                {
                  text: 'gen:route',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-route-next-page',
                },
                {
                  text: 'gen:icon-chakra',
                  href: 'https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-icon-chakra',
                },
              ]}
            />
          </>
        }
      />
      <Section
        title="Useful"
        contents={
          <>
            <Text>
              개발시 도움이 될 수 있는 유용한 사이트들을 참고해보세요.
            </Text>
            <LinkTags
              data={[
                {
                  text: 'css-generator',
                  href: 'https://www.cssportal.com/css-triangle-generator/',
                },
                {
                  text: 'regex-tester',
                  href: 'https://regexr.com/5mhou',
                },
              ]}
            />
          </>
        }
      />
    </Box>
  )
}
