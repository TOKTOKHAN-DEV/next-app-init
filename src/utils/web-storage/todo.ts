import { SyncedStorageFactory } from '@toktokhan-dev/react-web'

export type TodoType = {
  text: string
}

export const {
  connector: todoConnector, //
  storage: todoStorage,
} = SyncedStorageFactory.createLocal<TodoType[]>('todo')
