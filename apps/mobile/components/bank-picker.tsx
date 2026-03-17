import { useState } from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type { BankProvider } from '@/domain/types'
import { ALL_BANKS, BANK_LABELS, BANK_COLORS } from '@/domain/constants'
import { BorderRadius, Spacing, MD3Colors } from '@/constants/theme'

type Props = {
  value?: BankProvider
  onChange: (b: BankProvider) => void
  error?: string
}

export function BankPicker({ value, onChange, error }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedLabel = value ? BANK_LABELS[value] : 'Select payment method'

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.trigger, error && styles.triggerError]}
        onPress={() => setIsOpen((open) => !open)}>
        <Text style={[styles.triggerText, !value && styles.placeholder]}>{selectedLabel}</Text>
        <MaterialIcons
          name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color={MD3Colors.textSecondary}
        />
      </Pressable>
      {isOpen && (
        <View style={styles.menu}>
          {ALL_BANKS.map((bank) => {
            const selected = value === bank
            const color = BANK_COLORS[bank]
            return (
              <Pressable
                key={bank}
                style={[styles.option, selected && { backgroundColor: `${color}22` }]}
                onPress={() => {
                  onChange(bank)
                  setIsOpen(false)
                }}>
                <Text style={[styles.label, { color }, selected && styles.selectedLabel]}>
                  {BANK_LABELS[bank]}
                </Text>
              </Pressable>
            )
          })}
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.md },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: MD3Colors.outline,
    borderRadius: BorderRadius.md,
    backgroundColor: '#fff',
    minHeight: 52,
    paddingHorizontal: Spacing.md,
  },
  triggerError: {
    borderColor: MD3Colors.error,
  },
  triggerText: {
    fontSize: 15,
    color: MD3Colors.textPrimary,
    fontWeight: '500',
  },
  placeholder: {
    color: MD3Colors.textSecondary,
    fontWeight: '400',
  },
  menu: {
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: MD3Colors.outline,
    borderRadius: BorderRadius.md,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  option: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: MD3Colors.outline,
  },
  label: { fontSize: 14, fontWeight: '600' },
  selectedLabel: {
    fontWeight: '700',
  },
  error: { color: '#D32F2F', fontSize: 12, marginTop: 4 },
})
