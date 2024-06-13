/**
 * 고차 함수로 fetch를 확장합니다.
 *
 */

/**
 * fetch 함수의 args
 *
 * @throws {Error} 만약 fetch의 첫 번째 인자가 'Request' 객체인 경우에는 문자열과 URL만 지원됩니다.

 * @see {fetch, RequestInfo, Request}
 *
 * @public
 */
export type FetchArgs = [string | URL, RequestInit | undefined];

/**
 * `fetchHelper` 함수의 타입입니다.
 * 이는 사용자 지정 `fetchHelper` 함수를 작성하고자 하는 사람들에게 유용합니다.
 *
 * @public
 */
export type FetchHelper = typeof fetchHelper;

/**
 * `fetchHelper` 함수의 옵션입니다.
 *
 * @public
 */
export type FetchHelperDefaultOptions = {
  /**
   * fetchHelper 함수에서 사용될 fetch 함수입니다.
   * 제공되지 않으면 전역 스코프의 fetch 함수가 사용됩니다.
   * node-fetch, cross-fetch 등과 같은 어떤 fetch 구현체라도 사용할 수 있습니다.
   * 또한 fetchHelper에 의해 생성된 fetch 함수 또한 여기에서 사용할 수 있습니다.
   *
   * @public
   */
  fetch?: ReturnType<FetchHelper>;
  /**
   * fetch의 baseURL입니다.
   *
   * @public
   */
  baseUrl?: string | URL;
  /**
   * fetch의 기본 헤더입니다. 만약 fetch의 두 번째 인자가 headers 속성을 가지고 있지 않은 경우 사용됩니다.
   * 제공되고 fetch를 호출할 때 headers도 제공된 경우, 헤더가 병합됩니다.
   * 헤더의 우선순위는 requestInit.headers > defaultOptions.headers입니다. 중복된 헤더는 덮어쓰기 됩니다.
   *
   * @public
   */
  headers?: HeadersInit;
  interceptors?: {
    /**
     * Request interceptor. Request 전에 호출됩니다.
     *
     * @param requestArgs fetch 함수의 인자들입니다.
     * @param fetch {@link FetchHelperDefaultOptions['fetch']} 에서 제공한 `fetch` 입니다.
     *
     * @public
     */
    request?: (
      requestArgs: FetchArgs,
      fetch: NonNullable<FetchHelperDefaultOptions['fetch']>,
    ) => Promise<FetchArgs>;
    /**
     * Response interceptor. Response 후에 호출됩니다.
     *
     * @param response Response object 에서 받은 Response Object 입니다.
     * @param requestArgs fetch 함수의 인자들입니다.
     * @param fetch {@link FetchHelperDefaultOptions['fetch']} 에서 제공한 `fetch` 입니다.
     *
     * @public
     */
    response?: (
      response: Response,
      requestArgs: FetchArgs,
      fetch: NonNullable<FetchHelperDefaultOptions['fetch']>,
    ) => Promise<Response>;
  };
};

const applyDefaultOptions = (
  [input, requestInit]: FetchArgs,
  defaultOptions?: FetchHelperDefaultOptions,
): FetchArgs => {
  const headers = new Headers(defaultOptions?.headers);
  new Headers(requestInit?.headers).forEach((value, key) => {
    headers.set(key, value);
  });

  let inputToReturn: FetchArgs[0] = input;
  if (defaultOptions?.baseUrl) {
    inputToReturn = new URL(input, defaultOptions.baseUrl);
  }

  return [
    inputToReturn,
    {
      ...requestInit,
      headers,
    },
  ];
};

// Request 객체를 처리하려면 body를 ArrayBuffer로 읽어야 합니다.
const mergeRequestObjectWithRequestInit = async (
  request: Request,
  requestInit?: RequestInit,
): Promise<RequestInit> => {
  const mergedRequest = new Request(request, requestInit);
  const body = await new Response(mergedRequest.body).arrayBuffer();
  return {
    method: mergedRequest.method,
    headers: mergedRequest.headers,
    body: body,
    referrer: mergedRequest.referrer,
    referrerPolicy: mergedRequest.referrerPolicy,
    mode: mergedRequest.mode,
    credentials: mergedRequest.credentials,
    cache: mergedRequest.cache,
    redirect: mergedRequest.redirect,
    integrity: mergedRequest.integrity,
    keepalive: mergedRequest.keepalive,
    signal: mergedRequest.signal,
    window: requestInit?.window,
  };
};

const normalizeArgs = async (
  ...args: Parameters<typeof fetch>
): Promise<FetchArgs> => {
  let input: string | URL;
  let requestInit: RequestInit | undefined;
  if (args[0] instanceof Request) {
    input = args[0].url;
    requestInit = await mergeRequestObjectWithRequestInit(args[0], args[1]);
  } else {
    input = args[0];
    requestInit = args[1];
  }

  return [input, requestInit];
};

const fetchHelper =
  (defaultOptions?: FetchHelperDefaultOptions) =>
  async (...args: Parameters<typeof fetch>): Promise<Response> => {
    const defaultOptionAppliedArgs = applyDefaultOptions(
      await normalizeArgs(...args),
      defaultOptions,
    );

    // apply request interceptor
    const fetchProvided = defaultOptions?.fetch || fetch;
    let requestInterceptorAppliedArgs: FetchArgs;
    if (defaultOptions?.interceptors?.request) {
      requestInterceptorAppliedArgs =
        await defaultOptions?.interceptors?.request?.(
          defaultOptionAppliedArgs,
          fetchProvided,
        );
    } else {
      requestInterceptorAppliedArgs = defaultOptionAppliedArgs;
    }

    // api call
    const response = await fetchProvided(...requestInterceptorAppliedArgs);

    // apply response interceptor
    return (
      defaultOptions?.interceptors?.response?.(
        response,
        requestInterceptorAppliedArgs,
        fetchProvided,
      ) || response
    );
  };

export default fetchHelper;
