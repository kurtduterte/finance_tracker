import type { ExpenseCategory, BankProvider, PaymentType } from './types'

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  general: 'General',
  food: 'Food',
  transportation: 'Transportation',
  bills: 'Bills',
  subscriptions: 'Subscriptions',
  shopping: 'Shopping',
  entertainment: 'Entertainment',
}

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  general: 'label',
  food: 'restaurant',
  transportation: 'directions-transit',
  bills: 'receipt',
  subscriptions: 'subscriptions',
  shopping: 'shopping-bag',
  entertainment: 'movie',
}

export const BANK_LABELS: Record<BankProvider, string> = {
  gcash: 'GCash',
  maya: 'Maya',
  maribank: 'MariBank',
}

export const BANK_COLORS: Record<BankProvider, string> = {
  gcash: '#007AFF',
  maya: '#00B14F',
  maribank: '#6750A4',
}

export const PAYMENT_TYPE_LABELS: Record<PaymentType, string> = {
  cash: 'Cash',
  online: 'Online',
}

export const ALL_CATEGORIES: ExpenseCategory[] = [
  'general', 'food', 'transportation', 'bills',
  'subscriptions', 'shopping', 'entertainment',
]

export const ALL_BANKS: BankProvider[] = ['gcash', 'maya', 'maribank']

export const ALL_PAYMENT_TYPES: PaymentType[] = ['cash', 'online']
