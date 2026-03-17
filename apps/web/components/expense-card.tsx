import type { Expense } from '@/domain/types'
import { CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_COLORS, BANK_LABELS, PAYMENT_TYPE_LABELS } from '@/domain/constants'

type Props = {
  expense: Expense
  onDelete?: (id: string) => void
}

const SYNC_DOT: Record<string, string> = {
  pending: '#F59E0B',
  synced: '#22C55E',
  failed: '#EF4444',
}

export function ExpenseCard({ expense, onDelete }: Props) {
  const colors = CATEGORY_COLORS[expense.category]
  const icon = CATEGORY_ICONS[expense.category]

  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm">
      {/* Category icon */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: colors.bg }}
      >
        <span className="material-symbols-rounded text-[20px]" style={{ color: colors.icon }}>
          {icon}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-navy truncate">
          {CATEGORY_LABELS[expense.category]}
        </p>
        <p className="text-xs text-muted truncate">
          {expense.paymentType === 'online' && expense.bank
            ? BANK_LABELS[expense.bank]
            : PAYMENT_TYPE_LABELS[expense.paymentType]}
          {expense.note ? ` · ${expense.note}` : ''}
        </p>
      </div>

      {/* Amount + sync */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <p className="text-sm font-bold text-navy">
          ₱{expense.amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: SYNC_DOT[expense.syncStatus] }}
          title={expense.syncStatus}
        />
      </div>

      {/* Delete button */}
      {onDelete && (
        <button
          onClick={() => onDelete(expense.id)}
          className="ml-1 text-gray-300 hover:text-red-400 transition-colors"
          aria-label="Delete expense"
        >
          <span className="material-symbols-rounded text-[18px]">delete</span>
        </button>
      )}
    </div>
  )
}
