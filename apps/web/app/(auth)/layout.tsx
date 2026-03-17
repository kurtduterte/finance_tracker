'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!loading && session) {
      router.replace('/home')
    }
  }, [loading, session, router])

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background">
        <span className="material-symbols-rounded text-primary text-[48px] animate-spin">
          progress_activity
        </span>
      </div>
    )
  }

  if (session) return null

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-background px-6">
      {children}
    </div>
  )
}
