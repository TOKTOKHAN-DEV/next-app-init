import { SyncedStorageFactory } from '@toktokhan-dev/react-web'

export type TokenType = {
  access: string
  refresh: string
}

export const {
  connector: tokenConnector, //
  storage: tokenStorage,
} = SyncedStorageFactory.createLocal<TokenType>('token')
