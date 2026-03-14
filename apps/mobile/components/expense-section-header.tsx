import { View, Text, StyleSheet } from 'react-native'
import dayjs from 'dayjs'
import { CurrencyText } from './currency-text'
import { useThemeColor } from '@/hooks/use-theme-color'
import { Spacing, MD3Colors } from '@/constants/theme'
import type { Expense } from '@/domain/types'

function formatSectionDate(date: string) {
  const d = dayjs(date)
  const today = dayjs().format('YYYY-MM-DD')
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
  if (date === today) return 'Today'
  if (date === yesterday) return 'Yesterday'
  return d.format('ddd, MMM D')
}

type Props = { date: string; expenses: Expense[] }

export function ExpenseSectionHeader({ date, expenses }: Props) {
  const color = useThemeColor({}, 'text')
  const dayTotal = expenses.reduce((s, e) => s + e.amount, 0)

  return (
    <View style={styles.row}>
      <Text style={[styles.date, { color }]}>{formatSectionDate(date)}</Text>
      <CurrencyText amount={dayTotal} size="sm" />
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, backgroundColor: 'transparent' },
  date: { fontSize: 13, fontWeight: '700', color: MD3Colors.cash },
})
