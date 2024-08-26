import {
  SyncedStorageFactory,
  useSyncWebStorage,
} from '@toktokhan-dev/react-web'

export const {
  connector: colorModeConnector, //
  storage: colorModeStorage,
} = SyncedStorageFactory.createCookie<string>('chakra-ui-color-mode')

export const useColorModeStorage = () => useSyncWebStorage(colorModeConnector)
