import fetchHelper, {
  FetchArgs,
  FetchHelperDefaultOptions,
} from './fetch-helper'

export type FetchHelperJson = typeof fetchHelperJson

export type FetchHelperJsonDefaultOptions = FetchHelperDefaultOptions & {
  jsonParser?: typeof JSON.parse
}

// RequestInit의 대안으로 사용합니다.
export type JsonRequestInit = Omit<NonNullable<FetchArgs[1]>, 'body'> & {
  body?: object
}

// Response의 대안으로 사용합니다.
export type ResponseGenericBody<T> = Omit<
  Awaited<ReturnType<typeof fetch>>,
  keyof Body | 'clone'
> & {
  body: T
}

export type JsonResponse<T> = T extends object
  ? ResponseGenericBody<T>
  : ResponseGenericBody<string>

// axios의 기본 JSON parser 와 비슷한 동작을 수행합니다.
// https://github.com/axios/axios/blob/21a5ad34c4a5956d81d338059ac0dd34a19ed094/lib/defaults/index.js#L25
const parseJsonSafely = (
  text: string,
  jsonParser = JSON.parse,
): object | string => {
  try {
    return jsonParser(text)
  } catch (e) {
    if ((e as Error).name !== 'SyntaxError') {
      throw e
    }

    return text.trim()
  }
}

// 고차 함수를 작성하여 요청 본문을 직렬화하고 응답 본문을 역직렬화 해 주세요.
const fetchHelperJson = (args?: FetchHelperJsonDefaultOptions) => {
  const fetch = fetchHelper(args)

  return async <T>(
    url: FetchArgs[0],
    init?: JsonRequestInit,
  ): Promise<JsonResponse<T>> => {
    const headers = new Headers(init?.headers)
    headers.get('Content-Type') ||
      headers.set('Content-Type', 'application/json')

    const isNoStore = init?.method !== 'GET' || init?.cache !== 'force-cache'

    const response = await fetch(url, {
      ...init,
      headers,
      body: init?.body && JSON.stringify(init.body),
      method: init?.method || 'POST',
      cache: isNoStore ? 'no-store' : init?.cache,
    })

    const body = parseJsonSafely(await response.text(), args?.jsonParser) as T

    return {
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      type: response.type,
      url: response.url,
      body,
    } as JsonResponse<T>
  }
}

export default fetchHelperJson
