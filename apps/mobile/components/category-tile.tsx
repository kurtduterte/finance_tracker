import { Pressable, Text, StyleSheet, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type { ExpenseCategory } from '@/domain/types'
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/domain/constants'
import { CategoryColors, MD3Colors, BorderRadius, Spacing } from '@/constants/theme'

type Props = {
  category: ExpenseCategory
  selected: boolean
  onSelect: (c: ExpenseCategory) => void
}

export function CategoryTile({ category, selected, onSelect }: Props) {
  const cat = CategoryColors[category] ?? CategoryColors.general

  return (
    <Pressable
      style={styles.tile}
      onPress={() => onSelect(category)}
      android_ripple={{ color: cat.bg }}>
      <View style={[
        styles.circle,
        { backgroundColor: selected ? cat.icon : cat.bg },
      ]}>
        <MaterialIcons
          name={CATEGORY_ICONS[category] as keyof typeof MaterialIcons.glyphMap}
          size={22}
          color={selected ? '#fff' : cat.icon}
        />
      </View>
      <Text style={[styles.label, { color: selected ? cat.icon : MD3Colors.textPrimary }]}>
        {CATEGORY_LABELS[category]}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    aspectRatio: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    gap: Spacing.xs,
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 10, textAlign: 'center', fontWeight: '600' },
})
