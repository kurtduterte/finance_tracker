import { Pressable, View, Text, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type { Expense } from '@/domain/types'
import { CATEGORY_LABELS, CATEGORY_ICONS, BANK_LABELS, BANK_COLORS } from '@/domain/constants'
import { CurrencyText } from './currency-text'
import { SyncStatusDot } from './sync-status-dot'
import { MD3Colors, BorderRadius, Spacing, Shadow } from '@/constants/theme'
import { useThemeColor } from '@/hooks/use-theme-color'

type Props = {
  expense: Expense
  onPress?: () => void
}

export function ExpenseCard({ expense, onPress }: Props) {
  const bg = useThemeColor({ light: '#fff', dark: '#1e1e1e' }, 'background')
  const color = useThemeColor({}, 'text')
  const bankColor = expense.bank ? BANK_COLORS[expense.bank] : MD3Colors.cash

  return (
    <Pressable
      style={[styles.card, Shadow.card, { backgroundColor: bg }]}
      onPress={onPress}
      android_ripple={{ color: MD3Colors.primaryContainer }}>
      <View style={[styles.iconCircle, { backgroundColor: MD3Colors.primaryContainer }]}>
        <MaterialIcons
          name={CATEGORY_ICONS[expense.category] as keyof typeof MaterialIcons.glyphMap}
          size={20}
          color={MD3Colors.primary}
        />
      </View>
      <View style={styles.info}>
        <Text style={[styles.category, { color }]}>{CATEGORY_LABELS[expense.category]}</Text>
        {expense.note ? (
          <Text style={styles.note} numberOfLines={1}>{expense.note}</Text>
        ) : null}
        <View style={[styles.badge, { backgroundColor: bankColor + '22' }]}>
          <Text style={[styles.badgeText, { color: bankColor }]}>
            {expense.paymentType === 'cash' ? 'Cash' : BANK_LABELS[expense.bank!]}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <CurrencyText amount={expense.amount} size="sm" />
        <SyncStatusDot status={expense.syncStatus} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm, gap: Spacing.sm },
  iconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, gap: 2 },
  category: { fontSize: 14, fontWeight: '600' },
  note: { fontSize: 12, color: MD3Colors.cash },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: BorderRadius.full, marginTop: 2 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  right: { alignItems: 'flex-end', gap: 4 },
})
