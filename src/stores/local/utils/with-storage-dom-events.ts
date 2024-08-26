import { IWithSetter } from '@toktokhan-dev/zustand-react'

import { Mutate, StoreApi, UseBoundStore } from 'zustand'

type StoreWithPersist = UseBoundStore<
  Mutate<StoreApi<IWithSetter<any>>, [['zustand/persist', any]]>
>

/**
 *
 * zustand의 persist middleware를 사용하여 스토리지 이벤트가 발생할 때 상태를 다시 로드(rehydrate)하기 위해 필요한 함수입니다.
 * storage event 는 다른 윈도우 탭에서 스토리지가 업데이트 될 때 발생합니다.
 * @see https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#how-can-i-rehydrate-on-storage-event
 */
export const withStorageDOMEvents = (store: StoreWithPersist) => {
  if (typeof window === 'undefined') return

  const handleStorage = (e: StorageEvent) => {
    if (e.key === store.persist.getOptions().name && e.newValue) {
      store.persist.rehydrate()
    }
  }
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener('storage', handleStorage)
  }
}
