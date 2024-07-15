import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

import { ENV } from '@/configs/env'

const API_KEY = ENV['X_API_KEY']

/**
 *
 * @param revalidateName
 * @param id
 * @description 캐시된 데이터를 갱신시켜 주는 api 입니다.
 */
async function handleValidRequest(
  revalidateName: string | string[],
  id: string | null,
) {
  const revalidateTargetName =
    typeof revalidateName === 'string' ? revalidateName : (
      revalidateName.join('/')
    )

  if (id) {
    revalidateTag(`${revalidateTargetName}${id}`)
    revalidateTag(revalidateTargetName)
  } else {
    revalidateTag(revalidateTargetName)
  }

  return new Response(JSON.stringify({}), {
    status: 200,
    statusText: 'success',
  })
}

async function handleInvalidRequest() {
  return new Response(JSON.stringify({}), {
    status: 401,
    statusText: 'unauthorized',
  })
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      revalidateName: string | string[]
    }
  },
) {
  const isValidApiKey = req.headers.get('X-API-KEY') === API_KEY

  if (!isValidApiKey) {
    return handleInvalidRequest()
  }

  const { revalidateName } = params

  if (!revalidateName) {
    return new Response(JSON.stringify({}), {
      status: 400,
      statusText: 'bad request',
    })
  }

  const searchParams = new URLSearchParams(req.nextUrl.searchParams)
  const id = searchParams.get('id')

  return handleValidRequest(revalidateName, id)
}
