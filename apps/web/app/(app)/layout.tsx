'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { BottomNav } from '@/components/bottom-nav'
import { SyncBanner } from '@/components/sync-banner'
import { useSync } from '@/hooks/use-sync'

function AppShell({ children }: { children: React.ReactNode }) {
  const { syncState } = useSync()

  return (
    <>
      <SyncBanner syncState={syncState} />
      <main className="pb-16 min-h-dvh bg-background">
        {children}
      </main>
      <BottomNav />
    </>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/login')
    }
  }, [loading, session, router])

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background">
        <span className="material-symbols-rounded text-[48px] animate-spin" style={{ color: '#7B61FF' }}>
          progress_activity
        </span>
      </div>
    )
  }

  if (!session) return null

  return <AppShell>{children}</AppShell>
}
