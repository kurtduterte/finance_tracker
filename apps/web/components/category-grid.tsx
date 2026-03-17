import type { ExpenseCategory } from '@/domain/types'
import { ALL_CATEGORIES, CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_COLORS } from '@/domain/constants'

type Props = {
  selected?: ExpenseCategory
  onSelect: (category: ExpenseCategory) => void
}

export function CategoryGrid({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {ALL_CATEGORIES.map((cat) => {
        const colors = CATEGORY_COLORS[cat]
        const isSelected = selected === cat
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all"
            style={{
              backgroundColor: isSelected ? '#7B61FF' : colors.bg,
              outline: isSelected ? '2px solid #7B61FF' : 'none',
            }}
          >
            <span
              className="material-symbols-rounded text-[24px]"
              style={{ color: isSelected ? '#FFFFFF' : colors.icon }}
            >
              {CATEGORY_ICONS[cat]}
            </span>
            <span
              className="text-[10px] font-medium text-center leading-tight"
              style={{ color: isSelected ? '#FFFFFF' : '#374151' }}
            >
              {CATEGORY_LABELS[cat]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
