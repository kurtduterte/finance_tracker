import {
  pgTable,
  uuid,
  numeric,
  text,
  date,
  timestamp,
  check,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const expenseCategoryEnum = [
  'general',
  'food',
  'transportation',
  'bills',
  'subscriptions',
  'shopping',
  'entertainment',
] as const

export type ExpenseCategory = (typeof expenseCategoryEnum)[number]

export const paymentTypeEnum = ['cash', 'online'] as const
export type PaymentType = (typeof paymentTypeEnum)[number]

export const bankProviderEnum = ['gcash', 'maya', 'maribank', 'shopeepay', 'grabpay', 'unionbank'] as const
export type BankProvider = (typeof bankProviderEnum)[number]

export const expenses = pgTable(
  'expenses',
  {
    id: uuid('id').primaryKey(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    category: text('category').notNull(),
    paymentType: text('payment_type').notNull(),
    bank: text('bank'),
    date: date('date').notNull(),
    note: text('note'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    userId: uuid('user_id').notNull(),
  },
  (t) => [
    check(
      'category_check',
      sql`${t.category} in ('general','food','transportation','bills','subscriptions','shopping','entertainment')`
    ),
    check('payment_type_check', sql`${t.paymentType} in ('cash','online')`),
    check('bank_check', sql`${t.bank} in ('gcash','maya','maribank','shopeepay','grabpay','unionbank') or ${t.bank} is null`),
    check(
      'bank_required_for_online',
      sql`(${t.paymentType} = 'online' and ${t.bank} is not null) or (${t.paymentType} = 'cash' and ${t.bank} is null)`
    ),
    check('amount_positive', sql`${t.amount} > 0`),
  ]
)

export type Expense = typeof expenses.$inferSelect
export type NewExpense = typeof expenses.$inferInsert
