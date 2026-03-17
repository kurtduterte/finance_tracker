'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { useExpenseStore } from '@/store/expense-store'
import { useSync } from '@/hooks/use-sync'

export default function AccountPage() {
  const { user, signOut } = useAuthStore()
  const expenses = useExpenseStore((s) => s.expenses)
  const { syncState, triggerSync } = useSync()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  const pending = expenses.filter((e) => e.syncStatus === 'pending').length
  const failed = expenses.filter((e) => e.syncStatus === 'failed').length
  const synced = expenses.filter((e) => e.syncStatus === 'synced').length

  async function handleSignOut() {
    setSigningOut(true)
    await signOut()
    router.replace('/login')
  }

  const syncLabel =
    syncState === 'syncing' ? 'Syncing...' :
    syncState === 'success' ? 'Synced!' :
    syncState === 'error' ? 'Sync failed' : 'Sync Now'

  return (
    <div className="flex flex-col">
      <div className="px-5 pt-12 pb-6" style={{ backgroundColor: '#7B61FF' }}>
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
          <span className="material-symbols-rounded text-white text-[32px]">person</span>
        </div>
        <p className="text-white font-semibold text-lg">{user?.email}</p>
        <p className="text-white/60 text-xs mt-0.5">Finance Tracker</p>
      </div>

      <div className="px-5 py-6 flex flex-col gap-4">
        {/* Sync status */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-sm font-bold text-navy mb-3">Sync Status</h2>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex flex-col items-center gap-1 bg-yellow-50 rounded-xl py-3">
              <span className="text-lg font-bold" style={{ color: '#D97706' }}>{pending}</span>
              <span className="text-[10px] text-muted">Pending</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-green-50 rounded-xl py-3">
              <span className="text-lg font-bold" style={{ color: '#059669' }}>{synced}</span>
              <span className="text-[10px] text-muted">Synced</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-red-50 rounded-xl py-3">
              <span className="text-lg font-bold" style={{ color: '#DC2626' }}>{failed}</span>
              <span className="text-[10px] text-muted">Failed</span>
            </div>
          </div>

          <button
            onClick={() => triggerSync()}
            disabled={syncState === 'syncing'}
            className="w-full h-11 rounded-xl text-white text-sm font-semibold transition-opacity disabled:opacity-60"
            style={{ backgroundColor: '#7B61FF' }}
          >
            {syncLabel}
          </button>
        </div>

        {/* App info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-navy">Total Expenses</span>
            <span className="text-sm font-semibold text-navy">{expenses.length}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-navy">Version</span>
            <span className="text-sm text-muted">1.0.0</span>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="h-12 rounded-2xl border text-sm font-semibold transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ borderColor: '#EF4444', color: '#EF4444' }}
        >
          <span className="material-symbols-rounded text-[18px]">logout</span>
          {signingOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </div>
  )
}
