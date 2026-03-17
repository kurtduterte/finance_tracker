import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import dayjs from 'dayjs'
import { useFinancialSummary } from '@/hooks/use-financial-summary'
import { useGroupedExpenses } from '@/hooks/use-grouped-expenses'
import { CATEGORY_LABELS } from '@/domain/constants'
import { CategoryColors, MD3Colors, Spacing, BorderRadius, Shadow } from '@/constants/theme'

// Generate last 6 months for the bar chart
function getLast6Months() {
  return Array.from({ length: 6 }, (_, i) => {
    const m = dayjs().subtract(5 - i, 'month')
    return { key: m.format('YYYY-MM'), label: m.format('MMM') }
  })
}

type BarChartProps = {
  months: { key: string; label: string }[]
  expenseByMonth: Record<string, number>
  maxValue: number
}

function BarChart({ months, expenseByMonth, maxValue }: BarChartProps) {
  const chartHeight = 140
  return (
    <View style={bc.container}>
      {months.map((m) => {
        const val = expenseByMonth[m.key] ?? 0
        const heightPct = maxValue > 0 ? val / maxValue : 0
        const barH = Math.max(4, heightPct * chartHeight)
        return (
          <View key={m.key} style={bc.col}>
            <View style={bc.barTrack}>
              <View
                style={[
                  bc.bar,
                  { height: barH, backgroundColor: MD3Colors.primary },
                ]}
              />
            </View>
            <Text style={bc.label}>{m.label}</Text>
          </View>
        )
      })}
    </View>
  )
}

const bc = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 8 },
  col: { flex: 1, alignItems: 'center', gap: 6 },
  barTrack: { height: 140, justifyContent: 'flex-end', width: '60%' },
  bar: { borderRadius: 6, width: '100%' },
  label: { fontSize: 11, color: MD3Colors.textSecondary, fontWeight: '600' },
})

export default function AnalyticsScreen() {
  const { grandTotal, categoryTotals, cashTotal, onlineTotal } = useFinancialSummary()
  const sections = useGroupedExpenses()

  const months = getLast6Months()

  // Build expense totals per month from grouped expenses
  const expenseByMonth: Record<string, number> = {}
  sections.forEach((section) => {
    const monthKey = dayjs(section.date).format('YYYY-MM')
    const dayTotal = section.data.reduce((s, e) => s + e.amount, 0)
    expenseByMonth[monthKey] = (expenseByMonth[monthKey] ?? 0) + dayTotal
  })

  const maxValue = Math.max(...months.map((m) => expenseByMonth[m.key] ?? 0), 1)

  // Top categories
  const topCategories = Object.entries(categoryTotals)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  // Recent 3 grouped sections for history
  const recentSections = sections.slice(0, 3)

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>Analytics</Text>

        {/* Bar chart card */}
        <View style={[styles.card, Shadow.card]}>
          <View style={styles.chartHeader}>
            <View style={styles.monthBadge}>
              <Text style={styles.monthBadgeText}>Monthly</Text>
              <MaterialIcons name="keyboard-arrow-down" size={16} color={MD3Colors.textSecondary} />
            </View>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: MD3Colors.primary }]} />
                <Text style={styles.legendText}>Expense</Text>
              </View>
            </View>
          </View>

          <BarChart
            months={months}
            expenseByMonth={expenseByMonth}
            maxValue={maxValue}
          />
        </View>

        {/* Summary row */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, Shadow.card]}>
            <View style={[styles.summaryIcon, { backgroundColor: '#E8EAF6' }]}>
              <MaterialIcons name="savings" size={20} color="#3949AB" />
            </View>
            <View>
              <Text style={styles.summaryAmount}>
                ₱{cashTotal.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
              </Text>
              <Text style={styles.summaryLabel}>Cash</Text>
            </View>
          </View>
          <View style={[styles.summaryCard, Shadow.card]}>
            <View style={[styles.summaryIcon, { backgroundColor: '#E8F5E9' }]}>
              <MaterialIcons name="phone-android" size={20} color="#43A047" />
            </View>
            <View>
              <Text style={styles.summaryAmount}>
                ₱{onlineTotal.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
              </Text>
              <Text style={styles.summaryLabel}>Online</Text>
            </View>
          </View>
        </View>

        {/* Top categories */}
        {topCategories.length > 0 && (
          <View style={[styles.card, Shadow.card]}>
            <Text style={styles.sectionTitle}>By Category</Text>
            {topCategories.map(([cat, amount]) => {
              const colors = CategoryColors[cat] ?? CategoryColors.general
              const pct = grandTotal > 0 ? amount / grandTotal : 0
              return (
                <View key={cat} style={styles.catRow}>
                  <View style={[styles.catDot, { backgroundColor: colors.bg }]}>
                    <View style={[styles.catDotInner, { backgroundColor: colors.icon }]} />
                  </View>
                  <Text style={styles.catName}>{CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS]}</Text>
                  <View style={styles.catBar}>
                    <View style={[styles.catBarFill, { flex: pct, backgroundColor: colors.icon }]} />
                    <View style={{ flex: 1 - pct }} />
                  </View>
                  <Text style={styles.catAmt}>
                    ₱{amount.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                  </Text>
                </View>
              )
            })}
          </View>
        )}

        {/* History */}
        {recentSections.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>History</Text>
            {recentSections.map((section) => (
              <View key={section.date} style={[styles.historyCard, Shadow.card]}>
                <Text style={styles.historyDateLabel}>Date</Text>
                <Text style={styles.historyDate}>{dayjs(section.date).format('D MMMM YYYY')}</Text>
                {section.data.slice(0, 2).map((e) => (
                  <Text key={e.id} style={styles.historyAmt}>
                    - ₱{e.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: MD3Colors.background },
  content: { padding: Spacing.md, paddingBottom: Spacing.xl },

  title: { fontSize: 22, fontWeight: '800', color: MD3Colors.textPrimary, marginBottom: Spacing.md },

  card: {
    backgroundColor: '#fff',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },

  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  monthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MD3Colors.surfaceVariant,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  monthBadgeText: { fontSize: 13, fontWeight: '600', color: MD3Colors.textPrimary },
  legend: { flexDirection: 'row', gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: MD3Colors.textSecondary },

  summaryRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.sm },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryAmount: { fontSize: 16, fontWeight: '800', color: MD3Colors.textPrimary },
  summaryLabel: { fontSize: 12, color: MD3Colors.textSecondary, marginTop: 2 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: MD3Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 10,
  },
  catDot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  catDotInner: { width: 10, height: 10, borderRadius: 5 },
  catName: { fontSize: 13, fontWeight: '600', color: MD3Colors.textPrimary, width: 100 },
  catBar: { flex: 1, height: 6, borderRadius: 3, backgroundColor: MD3Colors.surfaceVariant, flexDirection: 'row', overflow: 'hidden' },
  catBarFill: { borderRadius: 3 },
  catAmt: { fontSize: 12, fontWeight: '700', color: MD3Colors.textPrimary, width: 64, textAlign: 'right' },

  historyCard: {
    backgroundColor: '#fff',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  historyDateLabel: { fontSize: 11, color: MD3Colors.textSecondary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  historyDate: { fontSize: 14, fontWeight: '700', color: MD3Colors.textPrimary, marginBottom: 4 },
  historyAmt: { fontSize: 13, color: '#F44336', fontWeight: '600' },
})
