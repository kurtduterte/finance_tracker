import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColor } from '@/hooks/use-theme-color'
import { TotalCard } from '@/components/total-card'
import { BankTotalsRow } from '@/components/bank-totals-row'
import { CategoryBreakdown } from '@/components/category-breakdown'
import { RecentExpensesList } from '@/components/recent-expenses-list'
import { SectionHeader } from '@/components/section-header'
import { Spacing } from '@/constants/theme'

export default function DashboardScreen() {
  const bg = useThemeColor({}, 'background')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <TotalCard />
        <BankTotalsRow />
        <SectionHeader title="By Category" />
        <CategoryBreakdown />
        <RecentExpensesList />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: { padding: Spacing.md, paddingBottom: Spacing.xl },
})
