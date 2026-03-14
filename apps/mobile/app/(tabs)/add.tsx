import { ScrollView, StyleSheet, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Controller } from 'react-hook-form'
import { useExpenseForm } from '@/hooks/use-expense-form'
import { useThemeColor } from '@/hooks/use-theme-color'
import { AmountInput } from '@/components/amount-input'
import { CategoryGrid } from '@/components/category-grid'
import { PaymentTypeToggle } from '@/components/payment-type-toggle'
import { BankPicker } from '@/components/bank-picker'
import { DateField } from '@/components/date-field'
import { NoteInput } from '@/components/note-input'
import { SectionHeader } from '@/components/section-header'
import { MD3Colors, Spacing, BorderRadius } from '@/constants/theme'

export default function AddExpenseScreen() {
  const bg = useThemeColor({}, 'background')
  const router = useRouter()
  const { form, submit } = useExpenseForm()
  const { control, watch, formState: { errors } } = form
  const paymentType = watch('paymentType')

  const handleSubmit = async () => {
    await submit()
    router.replace('/(tabs)/')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <SectionHeader title="New Expense" />

        <Controller
          control={control}
          name="amount"
          rules={{ required: 'Amount is required', validate: (v) => parseFloat(v) > 0 || 'Must be > 0' }}
          render={({ field: { value, onChange } }) => (
            <AmountInput value={value} onChange={onChange} error={errors.amount?.message} />
          )}
        />

        <Text style={styles.fieldLabel}>Category</Text>
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
            <Text style={styles.fieldLabel}>Bank</Text>
            <Controller
              control={control}
              name="bank"
              rules={{ required: paymentType === 'online' ? 'Select a bank' : false }}
              render={({ field: { value, onChange } }) => (
                <BankPicker value={value} onChange={onChange} error={errors.bank?.message} />
              )}
            />
          </>
        )}

        <Text style={styles.fieldLabel}>Note</Text>
        <Controller
          control={control}
          name="note"
          render={({ field: { value, onChange } }) => (
            <NoteInput value={value} onChange={onChange} />
          )}
        />

        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Save Expense</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: { padding: Spacing.md, paddingBottom: Spacing.xl },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: MD3Colors.cash, marginBottom: Spacing.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  submitBtn: { backgroundColor: MD3Colors.primary, padding: Spacing.md, borderRadius: BorderRadius.md, alignItems: 'center', marginTop: Spacing.md },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
})
