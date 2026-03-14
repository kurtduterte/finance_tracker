import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useExpenseStore } from "@/store/expense-store";
import { ExpenseCard } from "./expense-card";
import { SectionHeader } from "./section-header";
import { EmptyState } from "./empty-state";

export function RecentExpensesList() {
  const expenses = useExpenseStore((s) => s.expenses.slice(0, 5));
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Recent"
        actionLabel={expenses.length > 0 ? "View All" : undefined}
        onAction={() => router.push("/(tabs)/history")}
      />
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
