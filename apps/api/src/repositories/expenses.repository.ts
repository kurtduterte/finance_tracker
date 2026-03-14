import { Inject, Injectable } from '@nestjs/common'
import { eq, and, desc } from 'drizzle-orm'
import { DRIZZLE, type DrizzleDB } from '../db/drizzle.module'
import { expenses, type NewExpense } from '../db/schema'

@Injectable()
export class ExpensesRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  findAllByUser(userId: string) {
    return this.db
      .select()
      .from(expenses)
      .where(eq(expenses.userId, userId))
      .orderBy(desc(expenses.date))
  }

  async upsertMany(records: NewExpense[]) {
    return this.db
      .insert(expenses)
      .values(records)
      .onConflictDoUpdate({
        target: expenses.id,
        set: {
          amount: expenses.amount,
          category: expenses.category,
          paymentType: expenses.paymentType,
          bank: expenses.bank,
          date: expenses.date,
          note: expenses.note,
          updatedAt: expenses.updatedAt,
        },
      })
  }

  deleteByIdAndUser(id: string, userId: string) {
    return this.db
      .delete(expenses)
      .where(and(eq(expenses.id, id), eq(expenses.userId, userId)))
  }
}
