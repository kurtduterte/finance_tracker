'use client'

import { useExpenseStore } from '@/store/expense-store'
import { useFinancialSummary } from '@/hooks/use-financial-summary'
import { ExpenseCard } from '@/components/expense-card'
import { useAuthStore } from '@/store/auth-store'

export default function HomePage() {
  const user = useAuthStore((s) => s.user)
  const expenses = useExpenseStore((s) => s.expenses)
  const deleteExpense = useExpenseStore((s) => s.deleteExpense)
  const summary = useFinancialSummary()

  const recent = expenses.slice(0, 5)
  const greeting = user?.email?.split('@')[0] ?? 'there'

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-6" style={{ backgroundColor: '#7B61FF' }}>
        <p className="text-white/70 text-sm">Hello, {greeting}</p>
        <h1 className="text-white text-3xl font-bold mt-1">
          ₱{summary.grandTotal.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h1>
        <p className="text-white/70 text-xs mt-1">Total Expenses</p>
      </div>

      {/* Wallet card */}
      <div className="mx-5 -mt-4 bg-white rounded-2xl p-4 shadow-md flex justify-between">
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-rounded text-[20px]" style={{ color: '#6B7280' }}>
            payments
          </span>
          <p className="text-xs text-muted">Cash</p>
          <p className="text-sm font-bold text-navy">
            ₱{summary.cashTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="w-px bg-border" />
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-rounded text-[20px]" style={{ color: '#6B7280' }}>
            account_balance_wallet
          </span>
          <p className="text-xs text-muted">Online</p>
          <p className="text-sm font-bold text-navy">
            ₱{summary.onlineTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="w-px bg-border" />
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-rounded text-[20px]" style={{ color: '#6B7280' }}>
            receipt_long
          </span>
          <p className="text-xs text-muted">Count</p>
          <p className="text-sm font-bold text-navy">{expenses.length}</p>
        </div>
      </div>

      {/* Recent expenses */}
      <div className="px-5 mt-6">
        <h2 className="text-base font-bold text-navy mb-3">Recent Expenses</h2>
        {recent.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <span className="material-symbols-rounded text-[48px] text-muted">
              receipt_long
            </span>
            <p className="text-sm text-muted mt-2">No expenses yet</p>
            <p className="text-xs text-muted">Tap + to add your first expense</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {recent.map((exp) => (
              <ExpenseCard key={exp.id} expense={exp} onDelete={deleteExpense} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
