import { Injectable } from '@nestjs/common'
import { ExpensesRepository } from '../repositories/expenses.repository'
import type { SyncExpensesDto } from '../dto/sync-expenses.dto'

@Injectable()
export class ExpensesService {
  constructor(private readonly repo: ExpensesRepository) {}

  listByUser(userId: string) {
    return this.repo.findAllByUser(userId)
  }

  sync(dto: SyncExpensesDto, userId: string) {
    const records = dto.expenses.map((e) => ({
      id: e.id,
      amount: String(e.amount),
      category: e.category,
      paymentType: e.paymentType,
      bank: e.bank ?? null,
      date: e.date,
      note: e.note ?? null,
      userId,
      createdAt: new Date(e.createdAt),
      updatedAt: new Date(e.updatedAt),
    }))
    return this.repo.upsertMany(records)
  }

  delete(id: string, userId: string) {
    return this.repo.deleteByIdAndUser(id, userId)
  }
}
