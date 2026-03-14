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

  const port = parseInt(process.env.PORT ?? '3001', 10)
  await app.listen(port, '0.0.0.0')
  console.log(`Finance Tracker API running on http://localhost:${port}`)
}

bootstrap()
