import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Body Piercing API')
    .setDescription(
      '## 🚀 API Body Piercing\n\n' +
        'API RESTful para gerenciamento completo de joias e serviços de body piercing.\n\n' +
        '### 📋 Funcionalidades\n' +
        '- **Joias**: Cadastro, listagem, busca, edição e remoção de joias\n' +
        '- **Serviços**: Cadastro, listagem, busca, edição e remoção de serviços de piercing\n' +
        '- **Usuários**: Cadastro e autenticação de usuários\n' +
        '- **Upload de Imagens**: Suporte para upload de imagens das joias\n\n' +
        '### 🔐 Autenticação\n' +
        'A API utiliza autenticação JWT. Para acessar endpoints protegidos:\n' +
        '1. Faça login em /login para obter um token\n' +
        '2. Use o token no header Authorization: Bearer <token>\n\n' +
        '### 📝 Como usar\n' +
        '1. Teste os endpoints diretamente nesta interface\n' +
        '2. Use os exemplos fornecidos como base\n' +
        '3. Configure o token JWT no botão "Authorize" acima',
    )
    .setVersion('1.0')
    .addTag('auth', 'Autenticação de usuários')
    .addTag('jewels', 'Gerenciamento de joias')
    .addTag('services', 'Gerenciamento de serviços')
    .addTag('users', 'Gerenciamento de usuários')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Digite o token JWT obtido no login',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer('http://localhost:3000', 'Servidor de Desenvolvimento')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
