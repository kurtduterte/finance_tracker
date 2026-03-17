'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
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
    const handleOnline = () => triggerSync()
    window.addEventListener('online', handleOnline)

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && navigator.onLine) {
        triggerSync()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('online', handleOnline)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [triggerSync])

  return { syncState, triggerSync }
}
