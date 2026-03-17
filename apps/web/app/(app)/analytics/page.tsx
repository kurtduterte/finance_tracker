'use client'

import { useFinancialSummary } from '@/hooks/use-financial-summary'
import { ALL_CATEGORIES, ALL_BANKS, CATEGORY_LABELS, CATEGORY_COLORS, BANK_LABELS, BANK_COLORS } from '@/domain/constants'

export default function AnalyticsPage() {
  const summary = useFinancialSummary()

  const maxCategory = Math.max(...ALL_CATEGORIES.map((c) => summary.categoryTotals[c]), 1)
  const maxBank = Math.max(...ALL_BANKS.map((b) => summary.bankTotals[b]), 1)

  return (
    <div className="flex flex-col">
      <div className="px-5 pt-12 pb-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-navy">Analytics</h1>
      </div>

      <div className="px-5 py-6 flex flex-col gap-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-muted">Total</p>
            <p className="text-lg font-bold text-navy mt-1">
              ₱{summary.grandTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-muted">Cash</p>
            <p className="text-lg font-bold text-navy mt-1">
              ₱{summary.cashTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-sm font-bold text-navy mb-4">By Category</h2>
          <div className="flex flex-col gap-3">
            {ALL_CATEGORIES.map((cat) => {
              const amount = summary.categoryTotals[cat]
              const pct = (amount / maxCategory) * 100
              const colors = CATEGORY_COLORS[cat]
              return (
                <div key={cat}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-navy">{CATEGORY_LABELS[cat]}</span>
                    <span className="text-xs text-muted">
                      ₱{amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: colors.icon }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bank breakdown */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-sm font-bold text-navy mb-4">By Bank / Wallet</h2>
          <div className="flex flex-col gap-3">
            {ALL_BANKS.map((bank) => {
              const amount = summary.bankTotals[bank]
              const pct = (amount / maxBank) * 100
              return (
                <div key={bank}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-navy">{BANK_LABELS[bank]}</span>
                    <span className="text-xs text-muted">
                      ₱{amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: BANK_COLORS[bank] }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
