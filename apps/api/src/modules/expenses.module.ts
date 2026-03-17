import { Module } from '@nestjs/common'
import { ExpensesController } from '../controllers/expenses.controller'
import { ExpensesService } from '../services/expenses.service'
import { ExpensesRepository } from '../repositories/expenses.repository'
import { SupabaseAuthGuard } from '../guards/supabase-auth.guard'

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, ExpensesRepository, SupabaseAuthGuard],
})
export class ExpensesModule {}
