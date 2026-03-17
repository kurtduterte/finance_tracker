import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useExpenseStore } from '@/store/expense-store'
import { computeFinancialSummary } from '@/store/selectors'

export function useFinancialSummary(applyFilters = false) {
  const expenses = useExpenseStore(
    useShallow((state) => (applyFilters ? state.getFilteredExpenses() : state.expenses))
  )

  return useMemo(() => computeFinancialSummary(expenses), [expenses])
}
