import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

export async function createNestServer() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.init()
  return app.getHttpAdapter().getInstance()
}

if (require.main === module) {
  createNestServer().then((server) => {
    server.listen(process.env.PORT ?? 3000)
  })
}
