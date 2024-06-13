import { ENV } from '@/configs/env'

import { fetchHelperInterceptors } from './fetch-interceptors'

const fetchExtended = fetchHelperInterceptors({
  baseUrl: ENV.API_BASE_URL,
})

export default fetchExtended
