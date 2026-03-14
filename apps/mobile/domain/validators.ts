import type { PaymentType } from './types'

export type ExpenseInput = {
  amount: string
  category: string
  paymentType: PaymentType
  bank?: string
  date: string
  note?: string
}

export type ValidationResult =
  | { valid: true }
  | { valid: false; errors: Record<string, string> }

export function validateExpenseInput(input: ExpenseInput): ValidationResult {
  const errors: Record<string, string> = {}

  const amount = parseFloat(input.amount)
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'Amount must be a positive number'
  }
  if (!input.category) {
    errors.category = 'Category is required'
  }
  if (!input.paymentType) {
    errors.paymentType = 'Payment type is required'
  }
  if (input.paymentType === 'online' && !input.bank) {
    errors.bank = 'Bank is required for online payments'
  }
  if (input.paymentType === 'cash' && input.bank) {
    errors.bank = 'Cash payments cannot have a bank'
  }
  if (!input.date) {
    errors.date = 'Date is required'
  }

  return Object.keys(errors).length === 0
    ? { valid: true }
    : { valid: false, errors }
}
