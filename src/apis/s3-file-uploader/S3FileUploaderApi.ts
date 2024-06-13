import { AsyncFnReturn } from '@toktokhan-fe/universal'

import { AxiosInstance } from 'axios'

import instance from '@/configs/axios/instance'

export class S3FileUploaderApi {
  axios: AxiosInstance = instance
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios
  }

  private _createPresignedUrl = async (
    name: string,
  ): Promise<{ url: string }> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/v1/presigned_url/`,
      data: { name },
    })
    return data
  }

  private _uploadFileToS3 = async (params: { url: string; file: File }) => {
    const { url, file } = params
    await this.axios({
      method: 'PUT',
      url,
      data: file,
      headers: { 'Content-Type': file.type },
    })
  }

  uploadFileToS3 = async (params: {
    file: File
  }): Promise<{ url: string; file: File }> => {
    const { file } = params

    const { url } = await this._createPresignedUrl(file.name)
    await this._uploadFileToS3({ url, file })
    const { origin, pathname } = new URL(url)

    return { file, url: origin + pathname }
  }

  uploadFilesToS3 = async (params: { files: File[] }) => {
    const { files } = params
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

const s3FileUploaderApi = new S3FileUploaderApi()

export default s3FileUploaderApi
