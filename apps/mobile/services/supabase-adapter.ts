import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Expense } from '@/domain/types'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Web-compatible storage for Supabase auth
const webStorage = {
  getItem: (key: string) => {
    try {
      return typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem(key)
        : null
    } catch {
      return null
    }
  },
  setItem: (key: string, value: string) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value)
      }
    } catch {}
  },
  removeItem: (key: string) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key)
      }
    } catch {}
  },
}

// Use appropriate storage based on platform
const storage = typeof window !== 'undefined' ? webStorage : AsyncStorage

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export type SyncResult =
  | { success: true }
  | { success: false; error: string }

export async function upsertExpenses(expenses: Expense[]): Promise<SyncResult> {
  const { error } = await supabase.from('expenses').upsert(
    expenses.map((e) => ({
      id: e.id,
      amount: e.amount,
      category: e.category,
      payment_type: e.paymentType,
      bank: e.bank ?? null,
      date: e.date,
      note: e.note ?? null,
      created_at: e.createdAt,
      updated_at: e.updatedAt,
    })),
    { onConflict: 'id' }
  )

  if (error) return { success: false, error: error.message }
  return { success: true }
}
