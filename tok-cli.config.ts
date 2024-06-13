import { RootConfig } from '@toktokhan-fe/cli'
import { genApi } from '@toktokhan-fe/cli-plugin-gen-api-react-query'
import { genImg } from '@toktokhan-fe/cli-plugin-gen-img'
import { genSitemap } from '@toktokhan-fe/cli-plugin-gen-sitemap-next-page'
import { genTheme } from '@toktokhan-fe/cli-plugin-gen-theme-chakra'

const config: RootConfig<{
  plugins: [typeof genImg, typeof genApi, typeof genTheme, typeof genSitemap]
}> = {
  plugins: [genImg, genApi, genTheme, genSitemap],
  'gen:img': {
    oneDepth: true,
  },
  'gen:api': {
    swaggerSchemaUrl: 'https://sales-api-dev.pluuug.com/openapi.json/',
    httpClientType: 'fetch',
    instancePath: '@/configs/fetch/fetch-extend',
  },
  'gen:theme': {},
  'gen:sitemap': {
    domain: 'http://localhost:3000',
    input: './src/app',
    output: './src/app/sitemap.xml',
    routeMapper: { '/board/[id]': 'board/sitemap.xml' },
    includes: ['/**/page.{ts,tsx}'],
    routerType: 'app',
    ignored: [
      '**/api/**',
      '**/_source/**',
      '**/error/**',
      '**/not-found/**',
      '**/layout/**',
      '**/template/**',
      '**/_*.{js,tsx}',
      '**/\\(*\\)/**', // route groups
      '**/\\[\\[.*\\]\\]/**', // dynamic routes
      '**/\\[.*\\]/**', // // dynamic routes
      '**/@*/**', // parallel routes
      '**/\\(\\.\\.*\\)/**', // intercepting routes
      '**/\\(\\.\\.\\)[a-zA-Z0-9_-]+/**', // intercepting routes
    ],
  },
}
export default config
