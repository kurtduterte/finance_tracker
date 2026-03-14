import { useExpenseStore } from '@/store/expense-store'
import { upsertExpenses } from './supabase-adapter'

export async function syncPendingExpenses(): Promise<{ synced: number; failed: number }> {
  const store = useExpenseStore.getState()
  const pending = store.getPendingExpenses()

  if (pending.length === 0) return { synced: 0, failed: 0 }

  const result = await upsertExpenses(pending)

  if (result.success) {
    pending.forEach((e) => store.markSynced(e.id))
    return { synced: pending.length, failed: 0 }
  } else {
    pending.forEach((e) => store.markFailed(e.id))
    return { synced: 0, failed: pending.length }
  }
}
