import { useMutation } from '@tanstack/react-query'
import {
  // assertItemOf,
  // removeStr,
  createS3UploadFlow,
} from '@toktokhan-dev/universal'

import fetchExtended from '@/configs/fetch/fetch-extend'
// import { presignedUrlApi } from '@/generated/apis/PresignedUrl/PresignedUrl.query'
import { UseMutationParams } from '@/types/module/react-query/use-mutation-params'

import { S3FileUploaderApi } from './S3FileUploaderApi'

const s3FileUploaderApi = new S3FileUploaderApi({
  customFetch: fetchExtended,
})

/**
 * presigned url s3 Flow
 *
 * @description
 * createUploadFlow 함수는 S3 파일 업로드를 위한 플로우를 생성합니다.
 * 해당 함수는 prepareUpload 와 uploadFileToS3 두개의 함수를 받아 연속 실행하는 함수를 반환합니다.
 *
 * - prepareUpload: 파일을 업로드하기 전에 필요한 정보를 준비합니다. (주로 presigned url 을 생성하는 역할을 수행합니다.)
 * - uploadFileToS3: S3에 파일을 업로드합니다.
 *
 * 반환되는 함수는 prepareUpload 함수의 parameter type 을 input type 으로 가지며, uploadFileToS3 함수의 return type 을 반환합니다.
 *
 * @example
 * ```
 * // input
 * prepareUpload: async (number) => { someField: string };
 * uploadFileToS3: async ({ someField: string }) => stirng;
 *
 * // output
 * uploadFile : (number) => string;
 * uploadFiles: (number[]) => { fulfilled: string[], rejected: PromiseRejectedResult[] }
 * ```
 *
 */

export const { uploadFile, uploadFiles } = createS3UploadFlow({
  prepareUpload: async (file: File) => {
    throw Error('not implemented s3 file uploader prepare logic')
    // const { name, type } = file
    // const [mime] = type.split('/')
    // assertItemOf(
    //   ['image', 'audio', 'text', 'video', 'application'] as const,
    //   mime,
    // )
    // const { fields, url } = await presignedUrlApi.presignedUrlControllerCreate({
    //   data: {
    //     fileName: name,
    //     fileType: mime,
    //   },
    // })
    // const formData = new FormData()
    // Object.entries(fields).forEach(([k, v]) => formData.append(k, v))
    // formData.append('Content-Type', file.type)
    // formData.append('file', file)
    // return {
    //   url,
    //   formData,
    //   fields,
    //   file,
    // }
  },
  uploadFileToS3: async ({ url, formData, file, fields }) => {
    // await s3FileUploaderApi.uploadFileToS3({ url, formData })
    // const removeMedia = removeStr(/\/?_media\//g)
    // return {
    //   /**
    //    * file 의 s3 full url 입니다.
    //    */
    //   url: url + fields.key,
    //   /**
    //    * 파일의 s3 path 입니다. 똑개 서버로 image 경로를 업로드 할 때 사용됩니다.
    //    * 똑똑한 개발자의 서버는 s3 파일의 경로를 단순 string 으로 저장하지 않고, 특별한 field 로 구분하여 저장하기 때문에,
    //    * 이후 서버로 요청 할때 해당 path 값을 사용하여 요청을 보내야 합니다.
    //    *
    //    * 특별한 field 로 구분하여 저장 하는 이유는 admin 페이지의 file field 구분, 파일의 실 사용 여부를 판단하기 위해 사용됩니다.
    //    */
    //   path: removeMedia(fields.key),
    //   fields,
    //   file,
    // }
  },
})

export const useUploadFileToS3Mutation = (
  params?: UseMutationParams<typeof uploadFile>,
) => {
  return useMutation({
    mutationFn: uploadFile,
    ...params?.options,
  })
}

export const useUploadFilesToS3Mutation = (
  params?: UseMutationParams<typeof uploadFiles>,
) => {
  return useMutation({
    mutationFn: uploadFiles,
    ...params?.options,
  })
}
