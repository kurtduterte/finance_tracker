import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

const CATEGORIES = ['general','food','transportation','bills','subscriptions','shopping','entertainment'] as const
const PAYMENT_TYPES = ['cash','online'] as const
const BANKS = ['gcash','maya','maribank'] as const

export class ExpenseDto {
  @IsUUID()
  id!: string

  @IsNumber()
  @IsPositive()
  amount!: number

  @IsIn(CATEGORIES)
  category!: string

  @IsIn(PAYMENT_TYPES)
  paymentType!: string

  @IsOptional()
  @IsIn(BANKS)
  bank?: string

  @IsString()
  @IsNotEmpty()
  date!: string

  @IsOptional()
  @IsString()
  note?: string

  @IsString()
  @IsNotEmpty()
  createdAt!: string

  @IsString()
  @IsNotEmpty()
  updatedAt!: string
}

export class SyncExpensesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExpenseDto)
  expenses!: ExpenseDto[]
}
