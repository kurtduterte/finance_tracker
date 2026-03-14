import { View, Text, StyleSheet } from 'react-native'
import dayjs from 'dayjs'
import { CurrencyText } from './currency-text'
import { useFinancialSummary } from '@/hooks/use-financial-summary'
import { MD3Colors, BorderRadius, Spacing, Shadow } from '@/constants/theme'

export function TotalCard() {
  const { grandTotal } = useFinancialSummary()
  const month = dayjs().format('MMMM YYYY')

  return (
    <View style={[styles.card, Shadow.card]}>
      <Text style={styles.label}>Total Expenses</Text>
      <Text style={styles.month}>{month}</Text>
      <CurrencyText amount={grandTotal} size="xl" style={styles.amount} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: MD3Colors.primary, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.md, alignItems: 'center' },
  label: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '500' },
  month: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: Spacing.sm },
  amount: { color: '#fff', fontSize: 36, fontWeight: '800' },
})
