// @delete:file
// @delete:folder
import fetchExtended from '@/configs/fetch/fetch-extend'

import { HttpClient, RequestParams } from '../@http-client'
import { TodoType } from './types/model/todo'

export class TodoApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags todos
   * @name TodoType
   * @summary todo 목록 조회
   * @request GET:/todos
   * @secure
   */
  todoList = (variables?: { query?: {}; params?: RequestParams }) =>
    this.request<TodoType[]>({
      path: `/todos`,
      method: 'GET',
      query: variables?.query,
      secure: true,
      format: 'json',
      ...variables?.params,
      next: {
        tags: ['TODO_LIST'],
        ...variables?.params?.next,
      },
    })

  /**
   * No description
   *
   * @tags todo
   * @name TodoRetrieve
   * @summary todo 상세 조회
   * @request GET:/todo/{id}
   * @secure
   */
  todoRetrieve = (variables: { id: number; params?: RequestParams }) =>
    this.request<TodoType>({
      path: `/todos/${variables.id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables.params,
    })
}

export const todoApi = new TodoApi({
  customFetch: fetchExtended,
})

//
