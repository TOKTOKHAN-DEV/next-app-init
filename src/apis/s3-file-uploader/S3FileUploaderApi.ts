import { AsyncFnReturn } from '@toktokhan-dev/universal'

import fetchExtended from '@/configs/fetch/fetch-extend'

import { ContentType, HttpClient, RequestParams } from '../@http-client'

export class S3FileUploaderApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  private _createPresignedUrl = (variables: {
    name: string
    params?: RequestParams
  }) =>
    this.request<{ url: string }>({
      path: `/v1/presigned_url/`,
      method: 'POST',
      body: variables.name,
      type: ContentType.Json,
      format: 'json',
      ...variables?.params,
    })

  private _uploadFileToS3 = (variables: {
    url: string
    file: File
    params?: RequestParams
  }) =>
    this.request<void>({
      path: variables.url,
      method: 'PUT',
      body: variables.file,
      headers: { 'Content-Type': variables.file.type },
      ...variables?.params,
    })

  uploadFileToS3 = async (variables: {
    file: File
    params?: RequestParams
  }) => {
    const { file } = variables
    const { url } = await this._createPresignedUrl({ name: file.name })
    await this._uploadFileToS3({ url, file })
    const { origin, pathname } = new URL(url)
    return { file, url: origin + pathname }
  }

  uploadFilesToS3 = async (variables: {
    files: File[]
    params?: RequestParams
  }) => {
    const { files } = variables
    const settled = await Promise.allSettled(
      files.map((file) => this.uploadFileToS3({ file })),
    )

    const fulfilled = settled.filter(
      (v) => v.status === 'fulfilled',
    ) as PromiseFulfilledResult<AsyncFnReturn<typeof this.uploadFileToS3>>[]

    const rejected = settled.filter(
      (v) => v.status === 'rejected',
    ) as PromiseRejectedResult[]

    return {
      fulfilled,
      rejected,
    }
  }
}

const s3FileUploaderApi = new S3FileUploaderApi({
  customFetch: fetchExtended,
})

export default s3FileUploaderApi
