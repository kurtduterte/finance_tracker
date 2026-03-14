import { useEffect, useRef, useCallback, useState } from 'react'
import { subscribeToNetwork } from '@/services/network-adapter'
import { syncPendingExpenses } from '@/services/sync-service'

export type SyncState = 'idle' | 'syncing' | 'success' | 'error'

export function useSync() {
  const [syncState, setSyncState] = useState<SyncState>('idle')
  const isSyncing = useRef(false)

  const triggerSync = useCallback(async () => {
    if (isSyncing.current) return
    isSyncing.current = true
    setSyncState('syncing')

    const result = await syncPendingExpenses()

    isSyncing.current = false
    setSyncState(result.failed > 0 ? 'error' : 'success')
    setTimeout(() => setSyncState('idle'), 3000)
  }, [])

  useEffect(() => {
    const unsubscribe = subscribeToNetwork(async (status) => {
      if (status.isConnected && status.isInternetReachable) {
        await triggerSync()
      }
    })
    return unsubscribe
  }, [triggerSync])

  return { syncState, triggerSync }
}
