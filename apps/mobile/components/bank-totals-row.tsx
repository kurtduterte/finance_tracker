import { ScrollView, StyleSheet } from 'react-native'
import { BankChip } from './bank-chip'
import { useFinancialSummary } from '@/hooks/use-financial-summary'
import { Spacing } from '@/constants/theme'

export function BankTotalsRow() {
  const { bankTotals, cashTotal } = useFinancialSummary()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row} contentContainerStyle={styles.content}>
      <BankChip bank="cash" amount={cashTotal} />
      <BankChip bank="gcash" amount={bankTotals.gcash} />
      <BankChip bank="maya" amount={bankTotals.maya} />
      <BankChip bank="maribank" amount={bankTotals.maribank} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: { marginBottom: Spacing.md },
  content: { paddingHorizontal: Spacing.md },
})
