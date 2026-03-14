import { Pressable, Text, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type { ExpenseCategory } from '@/domain/types'
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/domain/constants'
import { MD3Colors, BorderRadius, Spacing } from '@/constants/theme'

type Props = {
  category: ExpenseCategory
  selected: boolean
  onSelect: (c: ExpenseCategory) => void
}

export function CategoryTile({ category, selected, onSelect }: Props) {
  return (
    <Pressable
      style={[styles.tile, selected && styles.selected]}
      onPress={() => onSelect(category)}
      android_ripple={{ color: MD3Colors.primaryContainer }}>
      <MaterialIcons
        name={CATEGORY_ICONS[category] as keyof typeof MaterialIcons.glyphMap}
        size={24}
        color={selected ? MD3Colors.onPrimary : MD3Colors.primary}
      />
      <Text style={[styles.label, { color: selected ? MD3Colors.onPrimary : '#333' }]}>
        {CATEGORY_LABELS[category]}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: BorderRadius.md,
    backgroundColor: MD3Colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    gap: 4,
    padding: Spacing.sm,
  },
  selected: { backgroundColor: MD3Colors.primary },
  label: { fontSize: 10, textAlign: 'center', fontWeight: '500' },
})
