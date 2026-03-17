import { createClient } from '@supabase/supabase-js'
import type { Expense } from '@/domain/types'

const MISSING_SUPABASE_ENV_MESSAGE =
  'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or EXPO_PUBLIC_SUPABASE_URL with EXPO_PUBLIC_SUPABASE_ANON_KEY).'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.EXPO_PUBLIC_SUPABASE_KEY

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
const fallbackSupabaseUrl = 'https://placeholder.supabase.co'
const fallbackSupabaseAnonKey = 'placeholder-anon-key'

const webStorage = {
  getItem: (key: string): string | null => {
    try {
      return typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
    } catch {
      return null
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') window.localStorage.setItem(key, value)
    } catch {}
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined') window.localStorage.removeItem(key)
    } catch {}
  },
}

export const supabase = createClient(
  supabaseUrl ?? fallbackSupabaseUrl,
  supabaseAnonKey ?? fallbackSupabaseAnonKey,
  {
    auth: {
      storage: webStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
)

export type SyncResult = { success: true } | { success: false; error: string }

export function getSupabaseConfigError(): string | null {
  return isSupabaseConfigured ? null : MISSING_SUPABASE_ENV_MESSAGE
}

export function assertSupabaseConfigured(): void {
  const error = getSupabaseConfigError()
  if (error) throw new Error(error)
}

export async function upsertExpenses(expenses: Expense[]): Promise<SyncResult> {
  const configError = getSupabaseConfigError()
  if (configError) return { success: false, error: configError }

  const { data: sessionData } = await supabase.auth.getSession()
  const session = sessionData?.session
  if (!session) return { success: false, error: 'Not authenticated' }

  const { error } = await supabase.from('expenses').upsert(
    expenses.map((e) => ({
      id: e.id,
      user_id: session.user.id,
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

export async function deleteExpenses(ids: string[]): Promise<SyncResult> {
  const configError = getSupabaseConfigError()
  if (configError) return { success: false, error: configError }

  const { data: sessionData } = await supabase.auth.getSession()
  const session = sessionData?.session
  if (!session) return { success: false, error: 'Not authenticated' }

  const { error } = await supabase
    .from('expenses')
    .delete()
    .in('id', ids)
    .eq('user_id', session.user.id)

  if (error) return { success: false, error: error.message }
  return { success: true }
}
