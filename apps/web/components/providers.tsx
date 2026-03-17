'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'

export function Providers({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((s) => s.initialize)

  useEffect(() => {
    const unsubscribe = initialize()
    return unsubscribe
  }, [initialize])

  return <>{children}</>
}
