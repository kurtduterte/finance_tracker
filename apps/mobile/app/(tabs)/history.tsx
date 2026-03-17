import { SectionList, StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useGroupedExpenses } from '@/hooks/use-grouped-expenses'
import { ExpenseCard } from '@/components/expense-card'
import { ExpenseSectionHeader } from '@/components/expense-section-header'
import { EmptyState } from '@/components/empty-state'
import { MD3Colors, Spacing } from '@/constants/theme'
import type { Expense } from '@/domain/types'

export default function TransactionScreen() {
  const router = useRouter()
  const sections = useGroupedExpenses()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction</Text>
      </View>
      {sections.length === 0 ? (
        <EmptyState
          icon="receipt-long"
          title="No transactions"
          message="Your expense history will appear here"
          actionLabel="Add Expense"
          onAction={() => router.push('/(tabs)/add')}
        />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item: Expense) => item.id}
          renderSectionHeader={({ section }) => (
            <ExpenseSectionHeader date={section.date} expenses={section.data} />
          )}
          renderItem={({ item }: { item: Expense }) => (
            <ExpenseCard
              expense={item}
              onPress={() => router.push(`/expense/${item.id}`)}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: MD3Colors.background },
  header: { paddingHorizontal: Spacing.md, paddingTop: Spacing.sm, paddingBottom: Spacing.xs },
  title: { fontSize: 22, fontWeight: '800', color: MD3Colors.textPrimary },
  list: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },
})
