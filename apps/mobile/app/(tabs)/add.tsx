import { ScrollView, StyleSheet, Text, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Controller } from 'react-hook-form'
import { useExpenseForm } from '@/hooks/use-expense-form'
import { AmountInput } from '@/components/amount-input'
import { CategoryGrid } from '@/components/category-grid'
import { PaymentTypeToggle } from '@/components/payment-type-toggle'
import { BankPicker } from '@/components/bank-picker'
import { DateField } from '@/components/date-field'
import { NoteInput } from '@/components/note-input'
import { MD3Colors, Spacing, BorderRadius, Shadow } from '@/constants/theme'

export default function AddExpenseScreen() {
  const router = useRouter()
  const { form, submit } = useExpenseForm()
  const { control, watch, formState: { errors } } = form
  const paymentType = watch('paymentType')

  const handleSubmit = async () => {
    await submit()
    router.replace('/(tabs)')
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>New Expense</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

        <Text style={styles.fieldLabel}>Expense Amount</Text>
        <Controller
          control={control}
          name="amount"
          rules={{ required: 'Amount is required', validate: (v) => parseFloat(v) > 0 || 'Must be > 0' }}
          render={({ field: { value, onChange } }) => (
            <AmountInput value={value} onChange={onChange} error={errors.amount?.message} />
          )}
        />

        <Text style={styles.fieldLabel}>Select Category</Text>
        <Controller
          control={control}
          name="category"
          render={({ field: { value, onChange } }) => (
            <CategoryGrid value={value} onChange={onChange} />
          )}
        />

        <Text style={styles.fieldLabel}>Date</Text>
        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange } }) => (
            <DateField value={value} onChange={onChange} />
          )}
        />

        <Text style={styles.fieldLabel}>Payment Method</Text>
        <Controller
          control={control}
          name="paymentType"
          render={({ field: { value, onChange } }) => (
            <PaymentTypeToggle value={value} onChange={onChange} />
          )}
        />

        {paymentType === 'online' && (
          <>
            <Text style={styles.fieldLabel}>Online Payment Method</Text>
            <Controller
              control={control}
              name="bank"
              rules={{ required: paymentType === 'online' ? 'Select a payment method' : false }}
              render={({ field: { value, onChange } }) => (
                <BankPicker value={value} onChange={onChange} error={errors.bank?.message} />
              )}
            />
          </>
        )}

        <Text style={styles.fieldLabel}>Expense</Text>
        <Controller
          control={control}
          name="note"
          render={({ field: { value, onChange } }) => (
            <NoteInput value={value} onChange={onChange} />
          )}
        />

        <Pressable style={[styles.submitBtn, Shadow.fab]} onPress={handleSubmit}>
          <Text style={styles.submitText}>Save Expense</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: MD3Colors.background },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  title: { fontSize: 22, fontWeight: '800', color: MD3Colors.textPrimary },
  content: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: MD3Colors.textSecondary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  submitBtn: {
    backgroundColor: MD3Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
})
