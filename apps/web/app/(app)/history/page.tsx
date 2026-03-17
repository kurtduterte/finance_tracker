'use client'

import { useState } from 'react'
import { useExpenseStore } from '@/store/expense-store'
import { groupExpensesByDate } from '@/store/selectors'
import { ExpenseCard } from '@/components/expense-card'
import type { ExpenseCategory, PaymentType } from '@/domain/types'
import { ALL_CATEGORIES, ALL_PAYMENT_TYPES, CATEGORY_LABELS, PAYMENT_TYPE_LABELS } from '@/domain/constants'
import dayjs from 'dayjs'

export default function HistoryPage() {
  const expenses = useExpenseStore((s) => s.expenses)
  const deleteExpense = useExpenseStore((s) => s.deleteExpense)
  const [filterCategory, setFilterCategory] = useState<ExpenseCategory | ''>('')
  const [filterPayment, setFilterPayment] = useState<PaymentType | ''>('')

  const filtered = expenses.filter((e) => {
    if (filterCategory && e.category !== filterCategory) return false
    if (filterPayment && e.paymentType !== filterPayment) return false
    return true
  })

  const grouped = groupExpensesByDate(filtered)
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <div className="flex flex-col">
      <div className="px-5 pt-12 pb-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-navy">History</h1>

        {/* Filter chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as ExpenseCategory | '')}
            className="shrink-0 h-8 rounded-full border border-border px-3 text-xs font-medium outline-none"
            style={{ color: filterCategory ? '#7B61FF' : '#6B7280' }}
          >
            <option value="">All Categories</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
            ))}
          </select>

          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value as PaymentType | '')}
            className="shrink-0 h-8 rounded-full border border-border px-3 text-xs font-medium outline-none"
            style={{ color: filterPayment ? '#7B61FF' : '#6B7280' }}
          >
            <option value="">All Payment Types</option>
            {ALL_PAYMENT_TYPES.map((p) => (
              <option key={p} value={p}>{PAYMENT_TYPE_LABELS[p]}</option>
            ))}
          </select>

          {(filterCategory || filterPayment) && (
            <button
              onClick={() => { setFilterCategory(''); setFilterPayment('') }}
              className="shrink-0 h-8 rounded-full bg-red-50 text-red-500 px-3 text-xs font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="px-5 py-4 flex flex-col gap-4">
        {dates.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <span className="material-symbols-rounded text-[48px] text-muted">history</span>
            <p className="text-sm text-muted mt-2">No expenses found</p>
          </div>
        ) : (
          dates.map((date) => (
            <div key={date}>
              <p className="text-xs font-semibold text-muted mb-2">
                {dayjs(date).format('dddd, MMMM D, YYYY')}
              </p>
              <div className="flex flex-col gap-2">
                {grouped[date].map((exp) => (
                  <ExpenseCard key={exp.id} expense={exp} onDelete={deleteExpense} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
