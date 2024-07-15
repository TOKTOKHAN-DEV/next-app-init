import {
  SyncedStorageFactory,
  useSyncWebStorage,
} from '@toktokhan-dev/react-web'

import { COOKIE_KEYS } from '@/constants/cookie-keys'

export const {
  connector: accessConnector, //
  storage: accessStorage,
} = SyncedStorageFactory.createCookie<string>(COOKIE_KEYS.AUTH.ACCESS)

export const useAccessStorage = () => useSyncWebStorage(accessConnector)
