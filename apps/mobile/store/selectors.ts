import type { Expense, FinancialSummary, BankTotals, CategoryTotals } from '@/domain/types'
import { ALL_CATEGORIES } from '@/domain/constants'

export function computeFinancialSummary(expenses: Expense[]): FinancialSummary {
  const bankTotals: BankTotals = { gcash: 0, maya: 0, maribank: 0 }
  const categoryTotals = ALL_CATEGORIES.reduce(
    (acc, cat) => ({ ...acc, [cat]: 0 }),
    {} as CategoryTotals
  )

  let grandTotal = 0
  let cashTotal = 0
  let onlineTotal = 0

  for (const expense of expenses) {
    grandTotal += expense.amount
    categoryTotals[expense.category] += expense.amount

    if (expense.paymentType === 'cash') {
      cashTotal += expense.amount
    } else if (expense.paymentType === 'online' && expense.bank) {
      bankTotals[expense.bank] += expense.amount
      onlineTotal += expense.amount
    }
  }

  return { grandTotal, bankTotals, categoryTotals, cashTotal, onlineTotal }
}

export function groupExpensesByDate(
  expenses: Expense[]
): Record<string, Expense[]> {
  return expenses.reduce<Record<string, Expense[]>>((groups, expense) => {
    const date = expense.date
    return {
      ...groups,
      [date]: [...(groups[date] ?? []), expense],
    }
  }, {})
}
