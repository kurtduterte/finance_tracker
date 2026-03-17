'use client'

import { useMemo } from 'react'
import { useExpenseStore } from '@/store/expense-store'
import { computeFinancialSummary } from '@/store/selectors'

export function useFinancialSummary(applyFilters = false) {
  const expenses = useExpenseStore((state) =>
    applyFilters ? state.getFilteredExpenses() : state.expenses
  )
  return useMemo(() => computeFinancialSummary(expenses), [expenses])
}
