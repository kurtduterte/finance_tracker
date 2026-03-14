import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { ExpensesService } from '../services/expenses.service'
import { SyncExpensesDto } from '../dto/sync-expenses.dto'

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly service: ExpensesService) {}

  private getUserId(userId?: string): string {
    if (!userId) throw new UnauthorizedException('Missing x-user-id header')
    return userId
  }

  @Get()
  async findAll(@Headers('x-user-id') userId?: string) {
    const uid = this.getUserId(userId)
    const data = await this.service.listByUser(uid)
    return { success: true, data }
  }

  @Post('sync')
  @HttpCode(HttpStatus.OK)
  async sync(
    @Body() dto: SyncExpensesDto,
    @Headers('x-user-id') userId?: string,
  ) {
    const uid = this.getUserId(userId)
    await this.service.sync(dto, uid)
    return { success: true, synced: dto.expenses.length }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('x-user-id') userId?: string,
  ) {
    const uid = this.getUserId(userId)
    await this.service.delete(id, uid)
    return { success: true }
  }
}
