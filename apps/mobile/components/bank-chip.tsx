import { View, Text, StyleSheet } from 'react-native'
import { CurrencyText } from './currency-text'
import { MD3Colors, BorderRadius, Spacing } from '@/constants/theme'
import type { BankProvider } from '@/domain/types'
import { BANK_LABELS, BANK_COLORS } from '@/domain/constants'

type Props = {
  bank: BankProvider | 'cash'
  amount: number
}

const labelMap: Record<BankProvider | 'cash', string> = { ...BANK_LABELS, cash: 'Cash' }
const colorMap: Record<BankProvider | 'cash', string> = { ...BANK_COLORS, cash: MD3Colors.cash }

export function BankChip({ bank, amount }: Props) {
  const color = colorMap[bank]
  return (
    <View style={[styles.chip, { borderColor: color }]}>
      <Text style={[styles.label, { color }]}>{labelMap[bank]}</Text>
      <CurrencyText amount={amount} size="sm" style={{ color }} />
    </View>
  )
}

const styles = StyleSheet.create({
  chip: { borderWidth: 1.5, borderRadius: BorderRadius.full, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, alignItems: 'center', marginRight: Spacing.sm, minWidth: 90 },
  label: { fontSize: 11, fontWeight: '700', marginBottom: 2 },
})
