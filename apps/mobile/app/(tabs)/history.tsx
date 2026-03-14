import { SectionList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useGroupedExpenses } from '@/hooks/use-grouped-expenses'
import { useThemeColor } from '@/hooks/use-theme-color'
import { ExpenseCard } from '@/components/expense-card'
import { ExpenseSectionHeader } from '@/components/expense-section-header'
import { EmptyState } from '@/components/empty-state'
import { SectionHeader } from '@/components/section-header'
import { Spacing } from '@/constants/theme'
import type { Expense } from '@/domain/types'

export default function HistoryScreen() {
  const bg = useThemeColor({}, 'background')
  const router = useRouter()
  const sections = useGroupedExpenses()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <View style={styles.header}>
        <SectionHeader title="History" />
      </View>
      {sections.length === 0 ? (
        <EmptyState
          icon="receipt-long"
          title="No expenses"
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
  header: { padding: Spacing.md, paddingBottom: 0 },
  list: { padding: Spacing.md },
})
