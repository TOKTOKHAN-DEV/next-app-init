import {
  SyncedStorageFactory,
  useSyncWebStorage,
} from '@toktokhan-dev/react-web'

import { COOKIE_KEYS } from '@/constants/cookie-keys'

export const {
  connector: refreshConnector, //
  storage: refreshStorage,
} = SyncedStorageFactory.createCookie<string>(COOKIE_KEYS.AUTH.REFRESH)

export const useRefreshStorage = () => useSyncWebStorage(refreshConnector)
