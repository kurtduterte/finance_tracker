import { View, Pressable, Text, StyleSheet } from 'react-native'
import type { PaymentType } from '@/domain/types'
import { PAYMENT_TYPE_LABELS } from '@/domain/constants'
import { MD3Colors, BorderRadius, Spacing } from '@/constants/theme'

type Props = {
  value: PaymentType
  onChange: (t: PaymentType) => void
}

export function PaymentTypeToggle({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {(['cash', 'online'] as PaymentType[]).map((type) => (
        <Pressable
          key={type}
          style={[styles.option, value === type && styles.selected]}
          onPress={() => onChange(type)}>
          <Text style={[styles.label, value === type && styles.selectedLabel]}>
            {PAYMENT_TYPE_LABELS[type]}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: MD3Colors.surfaceVariant, borderRadius: BorderRadius.full, padding: 4, marginBottom: Spacing.md },
  option: { flex: 1, paddingVertical: Spacing.sm, alignItems: 'center', borderRadius: BorderRadius.full },
  selected: { backgroundColor: MD3Colors.primary },
  label: { fontSize: 14, fontWeight: '600', color: '#555' },
  selectedLabel: { color: MD3Colors.onPrimary },
})
