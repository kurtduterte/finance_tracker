import { View, Pressable, Text, StyleSheet } from 'react-native'
import type { BankProvider } from '@/domain/types'
import { ALL_BANKS, BANK_LABELS, BANK_COLORS } from '@/domain/constants'
import { BorderRadius, Spacing } from '@/constants/theme'

type Props = {
  value?: BankProvider
  onChange: (b: BankProvider) => void
  error?: string
}

export function BankPicker({ value, onChange, error }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {ALL_BANKS.map((bank) => {
          const selected = value === bank
          const color = BANK_COLORS[bank]
          return (
            <Pressable
              key={bank}
              style={[styles.option, { borderColor: color }, selected && { backgroundColor: color }]}
              onPress={() => onChange(bank)}>
              <Text style={[styles.label, { color: selected ? '#fff' : color }]}>
                {BANK_LABELS[bank]}
              </Text>
            </Pressable>
          )
        })}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.md },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  option: { width: '30%', paddingVertical: Spacing.sm, alignItems: 'center', borderRadius: BorderRadius.md, borderWidth: 2 },
  label: { fontSize: 13, fontWeight: '700' },
  error: { color: '#D32F2F', fontSize: 12, marginTop: 4 },
})
