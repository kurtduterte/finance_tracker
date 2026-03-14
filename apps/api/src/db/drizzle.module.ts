import { Module, Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

export const DRIZZLE = Symbol('DRIZZLE')

export type DrizzleDB = ReturnType<typeof drizzle<typeof schema>>

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.getOrThrow<string>('DATABASE_URL')
        const client = postgres(url)
        return drizzle(client, { schema })
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
