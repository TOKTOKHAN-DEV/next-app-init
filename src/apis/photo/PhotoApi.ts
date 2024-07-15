// @delete:file
// @delete:folder
import fetchExtended from '@/configs/fetch/fetch-extend'

import { HttpClient, RequestParams } from '../@http-client'
import { PhotoType } from './types/model/photo'

export class PhotoApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags photo
   * @name PhotoList
   * @summary Photo 목록 조회
   * @request GET:/photos
   * @secure
   */
  photoList = (variables?: { query?: {}; params?: RequestParams }) =>
    this.request<PhotoType[]>({
      path: `/photos`,
      method: 'GET',
      query: variables?.query,
      secure: true,
      format: 'json',
      ...variables?.params,
      next: {
        tags: ['PHOTO_LIST'],
        ...variables?.params?.next,
      },
    })

  /**
   * No description
   *
   * @tags photo
   * @name PhotoRetrieve
   * @summary Photo 상세 조회
   * @request GET:/photos/{id}
   * @secure
   */
  photoRetrieve = (variables: { id: number; params?: RequestParams }) =>
    this.request<PhotoType>({
      path: `/photos/${variables.id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables.params,
    })
}

export const photoApi = new PhotoApi({
  customFetch: fetchExtended,
})

//
