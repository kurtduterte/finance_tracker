import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import type {
  Expense,
  ExpenseFilters,
  ExpenseCategory,
  PaymentType,
  BankProvider,
} from '@/domain/types'

type ExpenseInput = {
  amount: number
  category: ExpenseCategory
  paymentType: PaymentType
  bank?: BankProvider
  date: string
  note?: string
}

type ExpenseStore = {
  expenses: Expense[]
  filters: ExpenseFilters
  addExpense: (input: ExpenseInput) => string
  updateExpense: (id: string, input: Partial<ExpenseInput>) => void
  deleteExpense: (id: string) => void
  markSynced: (id: string) => void
  markFailed: (id: string) => void
  setFilters: (filters: Partial<ExpenseFilters>) => void
  clearFilters: () => void
  getPendingExpenses: () => Expense[]
  getFilteredExpenses: () => Expense[]
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [],
      filters: {},

      addExpense: (input) => {
        const id = uuidv4()
        const now = dayjs().toISOString()
        const expense: Expense = {
          id,
          ...input,
          syncStatus: 'pending',
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({ expenses: [expense, ...state.expenses] }))
        return id
      },

      updateExpense: (id, input) => {
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id
              ? { ...e, ...input, syncStatus: 'pending', updatedAt: dayjs().toISOString() }
              : e
          ),
        }))
      },

      deleteExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        }))
      },

      markSynced: (id) => {
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, syncStatus: 'synced' as const } : e
          ),
        }))
      },

      markFailed: (id) => {
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, syncStatus: 'failed' as const } : e
          ),
        }))
      },

      setFilters: (filters) => {
        set((state) => ({ filters: { ...state.filters, ...filters } }))
      },

      clearFilters: () => set({ filters: {} }),

      getPendingExpenses: () =>
        get().expenses.filter(
          (e) => e.syncStatus === 'pending' || e.syncStatus === 'failed'
        ),

      getFilteredExpenses: () => {
        const { expenses, filters } = get()
        return expenses.filter((e) => {
          if (filters.dateFrom && e.date < filters.dateFrom) return false
          if (filters.dateTo && e.date > filters.dateTo) return false
          if (filters.category && e.category !== filters.category) return false
          if (filters.paymentType && e.paymentType !== filters.paymentType) return false
          if (filters.bank && e.bank !== filters.bank) return false
          return true
        })
      },
    }),
    {
      name: 'expense-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
