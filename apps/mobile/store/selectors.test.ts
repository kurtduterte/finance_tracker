import { describe, expect, it } from 'vitest'
import type { Expense } from '@/domain/types'
import { computeFinancialSummary, groupExpensesByDate } from './selectors'

const makeExpense = (overrides: Partial<Expense>): Expense => ({
  id: 'id-1',
  amount: 100,
  category: 'general',
  paymentType: 'cash',
  date: '2026-03-18',
  syncStatus: 'pending',
  createdAt: '2026-03-18T00:00:00.000Z',
  updatedAt: '2026-03-18T00:00:00.000Z',
  ...overrides,
})

describe('computeFinancialSummary', () => {
  it('computes totals for cash and online expenses by bank and category', () => {
    const expenses: Expense[] = [
      makeExpense({ id: '1', amount: 200, category: 'food', paymentType: 'cash' }),
      makeExpense({
        id: '2',
        amount: 500,
        category: 'bills',
        paymentType: 'online',
        bank: 'gcash',
      }),
      makeExpense({
        id: '3',
        amount: 300,
        category: 'bills',
        paymentType: 'online',
        bank: 'maya',
      }),
    ]

    const summary = computeFinancialSummary(expenses)

    expect(summary.grandTotal).toBe(1000)
    expect(summary.cashTotal).toBe(200)
    expect(summary.onlineTotal).toBe(800)
    expect(summary.bankTotals.gcash).toBe(500)
    expect(summary.bankTotals.maya).toBe(300)
    expect(summary.bankTotals.maribank).toBe(0)
    expect(summary.bankTotals.shopeepay).toBe(0)
    expect(summary.bankTotals.grabpay).toBe(0)
    expect(summary.bankTotals.unionbank).toBe(0)
    expect(summary.categoryTotals.food).toBe(200)
    expect(summary.categoryTotals.bills).toBe(800)
  })

  it('does not count online totals if bank is missing', () => {
    const expenses: Expense[] = [
      makeExpense({ id: '1', amount: 250, paymentType: 'online', bank: undefined }),
    ]

    const summary = computeFinancialSummary(expenses)

    expect(summary.grandTotal).toBe(250)
    expect(summary.onlineTotal).toBe(0)
  })
})

describe('groupExpensesByDate', () => {
  it('groups expenses under their date keys preserving insertion order per date', () => {
    const first = makeExpense({ id: '1', date: '2026-03-17', amount: 100 })
    const second = makeExpense({ id: '2', date: '2026-03-18', amount: 200 })
    const third = makeExpense({ id: '3', date: '2026-03-17', amount: 300 })

    const grouped = groupExpensesByDate([first, second, third])

    expect(Object.keys(grouped)).toEqual(['2026-03-17', '2026-03-18'])
    expect(grouped['2026-03-17']).toEqual([first, third])
    expect(grouped['2026-03-18']).toEqual([second])
  })
})
