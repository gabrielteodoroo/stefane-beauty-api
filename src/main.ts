import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  console.log('JWT_TOKEN:', process.env.JWT_TOKEN) // Debug: ver se a variável está sendo lida
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
