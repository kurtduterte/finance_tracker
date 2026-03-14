import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DrizzleModule } from './db/drizzle.module'
import { ExpensesModule } from './modules/expenses.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    ExpensesModule,
  ],
})
export class AppModule {}
