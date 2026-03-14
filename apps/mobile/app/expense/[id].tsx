import { ScrollView, StyleSheet, Text, Pressable, View, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Controller } from 'react-hook-form'
import { useExpenseForm } from '@/hooks/use-expense-form'
import { useExpenseStore } from '@/store/expense-store'
import { useThemeColor } from '@/hooks/use-theme-color'
import { AmountInput } from '@/components/amount-input'
import { CategoryGrid } from '@/components/category-grid'
import { PaymentTypeToggle } from '@/components/payment-type-toggle'
import { BankPicker } from '@/components/bank-picker'
import { DateField } from '@/components/date-field'
import { NoteInput } from '@/components/note-input'
import { MD3Colors, Spacing, BorderRadius } from '@/constants/theme'

export default function EditExpenseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const bg = useThemeColor({}, 'background')
  const router = useRouter()
  const deleteExpense = useExpenseStore((s) => s.deleteExpense)
  const { form, submit } = useExpenseForm(id)
  const { control, watch, formState: { errors } } = form
  const paymentType = watch('paymentType')

  const handleSave = async () => {
    await submit()
    router.back()
  }

  const handleDelete = () => {
    Alert.alert('Delete Expense', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteExpense(id)
          router.back()
        },
      },
    ])
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Controller
          control={control}
          name="amount"
          rules={{ required: 'Amount is required', validate: (v) => parseFloat(v) > 0 || 'Must be > 0' }}
          render={({ field: { value, onChange } }) => (
            <AmountInput value={value} onChange={onChange} error={errors.amount?.message} />
          )}
        />
        <Controller
          control={control}
          name="category"
          render={({ field: { value, onChange } }) => (
            <CategoryGrid value={value} onChange={onChange} />
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange } }) => (
            <DateField value={value} onChange={onChange} />
          )}
        />
        <Controller
          control={control}
          name="paymentType"
          render={({ field: { value, onChange } }) => (
            <PaymentTypeToggle value={value} onChange={onChange} />
          )}
        />
        {paymentType === 'online' && (
          <Controller
            control={control}
            name="bank"
            rules={{ required: 'Select a bank' }}
            render={({ field: { value, onChange } }) => (
              <BankPicker value={value} onChange={onChange} error={errors.bank?.message} />
            )}
          />
        )}
        <Controller
          control={control}
          name="note"
          render={({ field: { value, onChange } }) => (
            <NoteInput value={value} onChange={onChange} />
          )}
        />

        <View style={styles.actions}>
          <Pressable style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </Pressable>
          <Pressable style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteBtnText}>Delete Expense</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: { padding: Spacing.md, paddingBottom: Spacing.xl },
  actions: { gap: Spacing.sm, marginTop: Spacing.md },
  saveBtn: { backgroundColor: MD3Colors.primary, padding: Spacing.md, borderRadius: BorderRadius.md, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  deleteBtn: { backgroundColor: 'transparent', padding: Spacing.md, borderRadius: BorderRadius.md, alignItems: 'center', borderWidth: 1, borderColor: MD3Colors.error },
  deleteBtnText: { color: MD3Colors.error, fontSize: 16, fontWeight: '600' },
})
