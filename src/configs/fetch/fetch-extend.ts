import { ENV } from '@/configs/env'

import { fetchHelperInterceptors } from './fetch-interceptors'

const fetchExtended = fetchHelperInterceptors({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  // baseUrl: ENV.API_BASE_URL
  headers: {
    'Content-Type': 'application/json',
  },
})

export default fetchExtended
