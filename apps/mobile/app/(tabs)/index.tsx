import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import dayjs from 'dayjs'
import { useFinancialSummary } from '@/hooks/use-financial-summary'
import { RecentExpensesList } from '@/components/recent-expenses-list'
import { MD3Colors, Spacing, BorderRadius, Shadow } from '@/constants/theme'

export default function HomeScreen() {
  const router = useRouter()
  const { grandTotal, cashTotal, onlineTotal } = useFinancialSummary()
  const today = dayjs().format('ddd, D MMM')

  const walletTotal = cashTotal + onlineTotal

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* Top bar */}
        <View style={styles.topBar}>
          <Pressable style={styles.iconBtn} onPress={() => router.push('/(tabs)/account')}>
            <MaterialIcons name="settings" size={22} color={MD3Colors.textSecondary} />
          </Pressable>
          <View style={styles.dateChip}>
            <MaterialIcons name="calendar-today" size={14} color={MD3Colors.textSecondary} />
            <Text style={styles.dateText}>{today}</Text>
          </View>
          <Pressable style={styles.iconBtn}>
            <MaterialIcons name="notifications-none" size={22} color={MD3Colors.textSecondary} />
          </Pressable>
        </View>

        {/* Spend header */}
        <View style={styles.spendHeader}>
          <Text style={styles.spendLabel}>This Month Spend</Text>
          <Text style={styles.spendAmount}>
            ₱{grandTotal.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
          <View style={styles.trendRow}>
            <MaterialIcons name="trending-down" size={16} color="#4CAF50" />
            <Text style={styles.trendText}>Track your expenses below</Text>
          </View>
        </View>

        {/* Wallet card */}
        <View style={[styles.walletCard, Shadow.card]}>
          <View style={styles.walletLeft}>
            <View style={styles.walletIcon}>
              <MaterialIcons name="account-balance-wallet" size={20} color={MD3Colors.primary} />
            </View>
            <View>
              <Text style={styles.walletLabel}>Spending Wallet</Text>
              <Text style={styles.walletSub}>Cash + Online</Text>
            </View>
          </View>
          <View style={styles.walletRight}>
            <Text style={styles.walletAmount}>
              ₱{walletTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
            </Text>
            <MaterialIcons name="chevron-right" size={20} color={MD3Colors.textSecondary} />
          </View>
        </View>

        {/* Recent Transactions */}
        <RecentExpensesList />

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: MD3Colors.background },
  content: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    ...Shadow.card,
  },
  dateText: { fontSize: 13, fontWeight: '600', color: MD3Colors.textPrimary },

  spendHeader: { alignItems: 'center', paddingVertical: Spacing.lg },
  spendLabel: { fontSize: 14, color: MD3Colors.textSecondary, fontWeight: '500', marginBottom: Spacing.xs },
  spendAmount: { fontSize: 40, fontWeight: '800', color: MD3Colors.textPrimary, letterSpacing: -1 },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  trendText: { fontSize: 13, color: MD3Colors.textSecondary },

  walletCard: {
    backgroundColor: '#fff',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  walletLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  walletIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: MD3Colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletLabel: { fontSize: 14, fontWeight: '700', color: MD3Colors.textPrimary },
  walletSub: { fontSize: 12, color: MD3Colors.textSecondary, marginTop: 2 },
  walletRight: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  walletAmount: { fontSize: 15, fontWeight: '700', color: MD3Colors.textPrimary },
})
