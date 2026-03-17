import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ExpensesService } from '../services/expenses.service'
import { SyncExpensesDto } from '../dto/sync-expenses.dto'
import { SupabaseAuthGuard, AuthenticatedRequest } from '../guards/supabase-auth.guard'

@UseGuards(SupabaseAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly service: ExpensesService) {}

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const data = await this.service.listByUser(req.user.id)
    return { success: true, data }
  }

  @Post('sync')
  @HttpCode(HttpStatus.OK)
  async sync(@Body() dto: SyncExpensesDto, @Req() req: AuthenticatedRequest) {
    await this.service.sync(dto, req.user.id)
    return { success: true, synced: dto.expenses.length }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    await this.service.delete(id, req.user.id)
    return { success: true }
  }
}
