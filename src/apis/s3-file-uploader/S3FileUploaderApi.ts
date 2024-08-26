import { HttpClient } from '../@http-client'

export class S3FileUploaderApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description
   * 미리 할당된 S3 URL로 파일을 업로드합니다.
   * presigned url api 를 통해 받은 url 과 fields 를 사용하여 파일을 업로드합니다.
   *
   * @example - FormData Example
   *
   * ```
   *  const { fields, url } = await presignedUrlApi.presignedUrlCreate({
   *   data: {
   *     fileName: name,
   *     fileType: mime,
   *   },
   * })
   *
   * const formData = new FormData()
   *
   * Object.entries(fields).forEach(([key, value]) => formData.append(key, value))
   * formData.append('Content-Type', file.type)
   * formData.append('file', file)
   *
   * await s3FileUploaderApi.uploadFileToS3({ url, formData })
   * ```
   */
  uploadFileToS3 = async (params: {
    url: string
    formData: FormData
  }): Promise<void> => {
    await this.request({
      method: 'POST',
      path: params.url,
      body: params.formData,
    })
  }
}
