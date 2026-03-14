import { View, Text, StyleSheet, FlatList } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useFinancialSummary } from '@/hooks/use-financial-summary'
import { CATEGORY_LABELS, CATEGORY_ICONS, ALL_CATEGORIES } from '@/domain/constants'
import { CurrencyText } from './currency-text'
import { MD3Colors, BorderRadius, Spacing } from '@/constants/theme'
import type { ExpenseCategory } from '@/domain/types'

export function CategoryBreakdown() {
  const { categoryTotals, grandTotal } = useFinancialSummary()
  const items = ALL_CATEGORIES.filter((c) => categoryTotals[c] > 0)

  return (
    <FlatList
      data={items}
      keyExtractor={(c) => c}
      scrollEnabled={false}
      renderItem={({ item: cat }) => (
        <CategoryRow
          category={cat}
          amount={categoryTotals[cat]}
          grandTotal={grandTotal}
        />
      )}
    />
  )
}

function CategoryRow({ category, amount, grandTotal }: { category: ExpenseCategory; amount: number; grandTotal: number }) {
  const pct = grandTotal > 0 ? amount / grandTotal : 0

  return (
    <View style={styles.row}>
      <MaterialIcons name={CATEGORY_ICONS[category] as keyof typeof MaterialIcons.glyphMap} size={18} color={MD3Colors.primary} style={styles.icon} />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.label}>{CATEGORY_LABELS[category]}</Text>
          <CurrencyText amount={amount} size="sm" />
        </View>
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${pct * 100}%` }]} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  icon: { marginRight: Spacing.sm },
  info: { flex: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { fontSize: 13, fontWeight: '500', color: '#333' },
  barBg: { height: 4, backgroundColor: MD3Colors.outline, borderRadius: BorderRadius.full },
  barFill: { height: 4, backgroundColor: MD3Colors.primary, borderRadius: BorderRadius.full },
})
