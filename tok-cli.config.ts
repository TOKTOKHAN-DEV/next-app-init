import { RootConfig } from '@toktokhan-dev/cli'
import { commit } from '@toktokhan-dev/cli-plugin-commit'
import { genApi } from '@toktokhan-dev/cli-plugin-gen-api-react-query'
import { genImg } from '@toktokhan-dev/cli-plugin-gen-img'
import { genTheme } from '@toktokhan-dev/cli-plugin-gen-theme-chakra'

const config: RootConfig<{
  plugins: [typeof genImg, typeof genApi, typeof genTheme, typeof commit]
}> = {
  plugins: [genImg, genApi, genTheme, commit],
  'gen:img': {
    oneDepth: true,
  },
  'gen:api': {
    swaggerSchemaUrl: 'https://sales-api-dev.pluuug.com/openapi.json/',
    httpClientType: 'fetch',
    instancePath: '@/configs/fetch/fetch-extend',
  },
  'gen:theme': {},
}
export default config
