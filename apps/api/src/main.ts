import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  )

  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.setGlobalPrefix('api')

  const host = process.env.HOST ?? '0.0.0.0'
  const rawPort = process.env.PORT ?? '3001'
  const port = Number(rawPort)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT value "${rawPort}". Use an integer between 1 and 65535.`)
  }

  await app.listen(port, host)
  const displayHost = host === '0.0.0.0' ? 'localhost' : host
  console.log(`Finance Tracker API running on http://${displayHost}:${port}/api`)
}

bootstrap()
