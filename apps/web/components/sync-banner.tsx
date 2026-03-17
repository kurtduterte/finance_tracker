'use client'

import type { SyncState } from '@/hooks/use-sync'

type Props = {
  syncState: SyncState
}

const BANNER_CONFIG: Record<
  Exclude<SyncState, 'idle'>,
  { bg: string; icon: string; text: string }
> = {
  syncing: { bg: '#7B61FF', icon: 'sync', text: 'Syncing...' },
  success: { bg: '#22C55E', icon: 'check_circle', text: 'Synced!' },
  error: { bg: '#EF4444', icon: 'error', text: 'Sync failed — will retry' },
}

export function SyncBanner({ syncState }: Props) {
  if (syncState === 'idle') return null

  const config = BANNER_CONFIG[syncState]

  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex items-center gap-2 px-4 py-2 z-50 text-white text-sm font-medium"
      style={{ backgroundColor: config.bg }}
    >
      <span
        className={`material-symbols-rounded text-[18px] ${syncState === 'syncing' ? 'animate-spin' : ''}`}
      >
        {config.icon}
      </span>
      {config.text}
    </div>
  )
}
