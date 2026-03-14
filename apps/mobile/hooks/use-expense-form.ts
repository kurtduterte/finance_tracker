import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import type { ExpenseCategory, PaymentType, BankProvider } from '@/domain/types'
import { useExpenseStore } from '@/store/expense-store'

export type ExpenseFormValues = {
  amount: string
  category: ExpenseCategory
  paymentType: PaymentType
  bank?: BankProvider
  date: string
  note?: string
}

export function useExpenseForm(expenseId?: string) {
  const addExpense = useExpenseStore((s) => s.addExpense)
  const updateExpense = useExpenseStore((s) => s.updateExpense)
  const expenses = useExpenseStore((s) => s.expenses)
  const existing = expenseId ? expenses.find((e) => e.id === expenseId) : undefined

  const form = useForm<ExpenseFormValues>({
    defaultValues: existing
      ? {
          amount: String(existing.amount),
          category: existing.category,
          paymentType: existing.paymentType,
          bank: existing.bank,
          date: existing.date,
          note: existing.note,
        }
      : {
          amount: '',
          category: 'general',
          paymentType: 'cash',
          date: dayjs().format('YYYY-MM-DD'),
        },
  })

  const submit = useCallback(
    form.handleSubmit((values) => {
      const parsed = {
        amount: parseFloat(values.amount),
        category: values.category,
        paymentType: values.paymentType,
        bank: values.paymentType === 'cash' ? undefined : values.bank,
        date: values.date,
        note: values.note,
      }
      if (expenseId) {
        updateExpense(expenseId, parsed)
      } else {
        addExpense(parsed)
      }
    }),
    [expenseId, form, addExpense, updateExpense]
  )

  return { form, submit }
}
