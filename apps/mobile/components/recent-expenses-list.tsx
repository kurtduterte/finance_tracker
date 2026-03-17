import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useExpenseStore } from '@/store/expense-store'
import { useShallow } from 'zustand/react/shallow'
import { ExpenseCard } from './expense-card'
import { EmptyState } from './empty-state'
import { MD3Colors, Spacing } from '@/constants/theme'

export function RecentExpensesList() {
  const expenses = useExpenseStore(useShallow((s) => s.expenses.slice(0, 5)))
  const router = useRouter()

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        {expenses.length > 0 && (
          <Pressable onPress={() => router.push('/(tabs)/history')}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        )}
      </View>
      {expenses.length === 0 ? (
        <EmptyState
          icon="receipt-long"
          title="No expenses yet"
          message="Tap + to add your first expense"
        />
      ) : (
        expenses.map((e) => (
          <ExpenseCard
            key={e.id}
            expense={e}
            onPress={() => router.push(`/expense/${e.id}`)}
          />
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  title: { fontSize: 16, fontWeight: '700', color: MD3Colors.textPrimary },
  seeAll: { fontSize: 13, fontWeight: '600', color: MD3Colors.primary },
})
