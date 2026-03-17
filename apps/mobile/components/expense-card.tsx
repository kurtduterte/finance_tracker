import { Pressable, View, Text, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import dayjs from 'dayjs'
import type { Expense } from '@/domain/types'
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/domain/constants'
import { CategoryColors, MD3Colors, BorderRadius, Spacing, Shadow } from '@/constants/theme'

type Props = {
  expense: Expense
  onPress?: () => void
}

export function ExpenseCard({ expense, onPress }: Props) {
  const cat = CategoryColors[expense.category] ?? CategoryColors.general
  const dateLabel = dayjs(expense.date).format('D MMMM YYYY')

  return (
    <Pressable
      style={[styles.card, Shadow.card]}
      onPress={onPress}
      android_ripple={{ color: MD3Colors.primaryContainer }}>
      <View style={[styles.iconCircle, { backgroundColor: cat.bg }]}>
        <MaterialIcons
          name={CATEGORY_ICONS[expense.category] as keyof typeof MaterialIcons.glyphMap}
          size={20}
          color={cat.icon}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{CATEGORY_LABELS[expense.category]}</Text>
        <Text style={styles.date}>{dateLabel}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>
          -₱{expense.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
        </Text>
        <MaterialIcons name="chevron-right" size={18} color={MD3Colors.textSecondary} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  category: { fontSize: 14, fontWeight: '600', color: MD3Colors.textPrimary },
  date: { fontSize: 12, color: MD3Colors.textSecondary, marginTop: 3 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  amount: { fontSize: 14, fontWeight: '700', color: '#F44336' },
})
