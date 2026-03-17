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
  transportation: 'directions_transit',
  bills: 'receipt',
  subscriptions: 'subscriptions',
  shopping: 'shopping_bag',
  entertainment: 'movie',
}

export const CATEGORY_COLORS: Record<ExpenseCategory, { bg: string; icon: string }> = {
  general: { bg: '#F3F4F6', icon: '#6B7280' },
  food: { bg: '#FEF3C7', icon: '#D97706' },
  transportation: { bg: '#DBEAFE', icon: '#2563EB' },
  bills: { bg: '#FCE7F3', icon: '#DB2777' },
  subscriptions: { bg: '#EDE9FE', icon: '#7C3AED' },
  shopping: { bg: '#D1FAE5', icon: '#059669' },
  entertainment: { bg: '#FEE2E2', icon: '#DC2626' },
}

export const BANK_LABELS: Record<BankProvider, string> = {
  gcash: 'GCash',
  maya: 'Maya',
  maribank: 'MariBank',
  shopeepay: 'ShopeePay',
  grabpay: 'GrabPay',
  unionbank: 'UnionBank',
}

export const BANK_COLORS: Record<BankProvider, string> = {
  gcash: '#007AFF',
  maya: '#00B14F',
  maribank: '#6750A4',
  shopeepay: '#EE4D2D',
  grabpay: '#00AEEF',
  unionbank: '#D4232E',
}

export const PAYMENT_TYPE_LABELS: Record<PaymentType, string> = {
  cash: 'Cash',
  online: 'Online',
}

export const ALL_CATEGORIES: ExpenseCategory[] = [
  'general', 'food', 'transportation', 'bills',
  'subscriptions', 'shopping', 'entertainment',
]

export const ALL_BANKS: BankProvider[] = ['gcash', 'maya', 'maribank', 'shopeepay', 'grabpay', 'unionbank']

export const ALL_PAYMENT_TYPES: PaymentType[] = ['cash', 'online']
