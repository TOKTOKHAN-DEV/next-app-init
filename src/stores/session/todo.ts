import {
  SyncedStorageFactory,
  useSyncWebStorage,
} from '@toktokhan-fe/react-web'

export type TodoType = {
  text: string
}

export const {
  connector: todoConnector, //
  storage: todoStorage,
} = SyncedStorageFactory.createSession<TodoType[]>('todo')

export const useTodoStorage = () => useSyncWebStorage(todoConnector)
