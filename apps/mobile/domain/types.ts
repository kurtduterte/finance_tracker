export type ExpenseCategory =
  | 'general'
  | 'food'
  | 'transportation'
  | 'bills'
  | 'subscriptions'
  | 'shopping'
  | 'entertainment'

export type PaymentType = 'cash' | 'online'

export type BankProvider = 'gcash' | 'maya' | 'maribank'

export type SyncStatus = 'pending' | 'synced' | 'failed'

export type Expense = {
  id: string
  amount: number
  category: ExpenseCategory
  paymentType: PaymentType
  bank?: BankProvider
  date: string        // YYYY-MM-DD
  note?: string
  syncStatus: SyncStatus
  createdAt: string   // ISO 8601
  updatedAt: string   // ISO 8601
}

export type ExpenseFilters = {
  dateFrom?: string
  dateTo?: string
  category?: ExpenseCategory
  paymentType?: PaymentType
  bank?: BankProvider
}

export type BankTotals = Record<BankProvider, number>

export type CategoryTotals = Record<ExpenseCategory, number>

export type FinancialSummary = {
  grandTotal: number
  bankTotals: BankTotals
  categoryTotals: CategoryTotals
  cashTotal: number
  onlineTotal: number
}
