import { useExpenseStore } from '@/store/expense-store'
import { upsertExpenses, deleteExpenses } from './supabase-adapter'

export async function syncPendingExpenses(): Promise<{ synced: number; failed: number }> {
  const store = useExpenseStore.getState()
  const pending = store.getPendingExpenses()
  const pendingDeletes = store.getPendingDeletes()

  if (pending.length === 0 && pendingDeletes.length === 0) {
    return { synced: 0, failed: 0 }
  }

  let synced = 0
  let failed = 0

  if (pending.length > 0) {
    const result = await upsertExpenses(pending)
    if (result.success) {
      pending.forEach((e) => store.markSynced(e.id))
      synced += pending.length
    } else {
      pending.forEach((e) => store.markFailed(e.id))
      failed += pending.length
    }
  }

  if (pendingDeletes.length > 0) {
    const result = await deleteExpenses(pendingDeletes)
    if (result.success) {
      pendingDeletes.forEach((id) => store.clearPendingDelete(id))
      synced += pendingDeletes.length
    } else {
      failed += pendingDeletes.length
    }
  }

  return { synced, failed }
}
