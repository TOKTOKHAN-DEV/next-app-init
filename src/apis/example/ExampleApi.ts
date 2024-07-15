import fetchExtended from '@/configs/fetch/fetch-extend'

import { ContentType, HttpClient, RequestParams } from '../@http-client'
import { CreateExampleDto } from './types/dto/create-example-dto'
import { GetExampleDto } from './types/dto/get-example-dto'
import { UpdateExampleDto } from './types/dto/update-example-dto'
import { ExampleModel } from './types/model/example'

export class ExampleApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  getList = (variables?: { query?: GetExampleDto; params?: RequestParams }) =>
    this.request<ExampleModel[]>({
      path: `/v1/example/`,
      method: 'GET',
      query: variables?.query,
      secure: true,
      format: 'json',
      ...variables?.params,
    })

  getById = (variables: { id: string; params?: RequestParams }) =>
    this.request<ExampleModel>({
      path: `/v1/example/${variables.id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables?.params,
    })

  create = (variables: { data: CreateExampleDto; params?: RequestParams }) =>
    this.request<ExampleModel>({
      path: `/v1/example/`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables?.params,
    })

  update = (variables: {
    id: string
    data: UpdateExampleDto
    params?: RequestParams
  }) =>
    this.request<ExampleModel>({
      path: `/v1/example/${variables.id}`,
      method: 'PUT',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables?.params,
    })

  delete = (variables: { id: string; params?: RequestParams }) =>
    this.request<void>({
      path: `/v1/example/${variables.id}`,
      method: 'DELETE',
      secure: true,
      ...variables?.params,
    })
}

const exampleApi = new ExampleApi({
  customFetch: fetchExtended,
})

export default exampleApi
