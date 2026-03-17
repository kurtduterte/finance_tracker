'use client'

import { create } from 'zustand'
import type { Session, User } from '@supabase/supabase-js'
import { assertSupabaseConfigured, getSupabaseConfigError, supabase } from '@/lib/supabase'
import { useExpenseStore } from './expense-store'

type AuthStore = {
  session: Session | null
  user: User | null
  loading: boolean
  initialize: () => () => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  user: null,
  loading: true,

  initialize: () => {
    const configError = getSupabaseConfigError()
    if (configError) {
      set({ session: null, user: null, loading: false })
      return () => {}
    }

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null, loading: false })
    })
    return () => data.subscription.unsubscribe()
  },

  signIn: async (email, password) => {
    assertSupabaseConfigured()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  },

  signUp: async (email, password) => {
    assertSupabaseConfigured()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
  },

  signOut: async () => {
    assertSupabaseConfigured()
    await supabase.auth.signOut()
    useExpenseStore.setState({ expenses: [], pendingDeletes: [] })
  },
}))
