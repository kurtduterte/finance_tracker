import { View, StyleSheet } from 'react-native'
import { CategoryTile } from './category-tile'
import type { ExpenseCategory } from '@/domain/types'
import { ALL_CATEGORIES } from '@/domain/constants'

type Props = {
  value: ExpenseCategory
  onChange: (c: ExpenseCategory) => void
}

export function CategoryGrid({ value, onChange }: Props) {
  const rows: ExpenseCategory[][] = []
  for (let i = 0; i < ALL_CATEGORIES.length; i += 4) {
    rows.push(ALL_CATEGORIES.slice(i, i + 4))
  }
  return (
    <View style={styles.container}>
      {rows.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map((cat) => (
            <CategoryTile key={cat} category={cat} selected={value === cat} onSelect={onChange} />
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  row: { flexDirection: 'row' },
})
