import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useExpenseStore } from '@/store/expense-store'
import { groupExpensesByDate } from '@/store/selectors'
import type { Expense } from '@/domain/types'

export type GroupedSection = { date: string; data: Expense[] }

export function useGroupedExpenses(): GroupedSection[] {
  const expenses = useExpenseStore(useShallow((state) => state.getFilteredExpenses()))

  return useMemo(() => {
    const grouped = groupExpensesByDate(expenses)
    return Object.entries(grouped)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, data]) => ({ date, data }))
  }, [expenses])
}
