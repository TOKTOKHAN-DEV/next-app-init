import { SyncedStorageFactory } from '@toktokhan-fe/react-web'

export type TodoType = {
  text: string
}

export const {
  connector: todoConnector, //
  storage: todoStorage,
} = SyncedStorageFactory.createLocal<TodoType[]>('todo')
