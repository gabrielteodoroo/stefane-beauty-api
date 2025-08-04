# 🚀 API Body Piercing

API RESTful para gerenciamento de joias e serviços de body piercing, construída com NestJS, TypeScript e Prisma.

## 📋 Descrição

Esta API permite o gerenciamento completo de:
- **Joias**: Cadastro, listagem, busca, edição e remoção de joias com upload de imagens
- **Serviços**: Cadastro, listagem, busca, edição e remoção de serviços de piercing
- **Usuários**: Cadastro e autenticação de usuários
- **Upload de Imagens**: Suporte para upload de imagens das joias via AWS S3

### 🏛️ Arquitetura Limpa (Clean Architecture)

Este projeto foi desenvolvido seguindo os princípios da Clean Architecture, separando claramente as camadas de domínio, aplicação e infraestrutura. Isso garante maior organização, testabilidade, facilidade de manutenção e evolução do sistema. Cada camada possui responsabilidades bem definidas, promovendo baixo acoplamento e alta coesão entre os módulos.

### 📚 Documentação Interativa

A API possui documentação completa e interativa através do Swagger UI, disponível em `/api` quando a aplicação estiver rodando.

## 🛠️ Tecnologias

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas
- **Jest** - Testes unitários e e2e
- **class-validator** - Validação de dados
- **@nestjs/swagger** - Documentação da API
- **AWS SDK** - Upload de imagens para S3
- **Multer** - Upload de arquivos
- **Husky + lint-staged** - Garantia de padrão de commits e verificação automática dos arquivos staged

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- PostgreSQL
- Git

### 1. Clone o repositório

```bash
git clone git@github.com:gabrielteodoroo/stefane-beauty-api.git
cd stefane-beauty-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no arquivo `env.example`:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stefane"

# JWT Authentication
JWT_TOKEN="sua-chave-secreta-jwt"

# AWS S3 Configuration (para upload de imagens)
S3_BUCKET_NAME="seu-bucket-s3"
S3_REGION="us-east-1"
S3_KEY_ID="sua-access-key-id"
S3_ACCESS_KEY="sua-secret-access-key"
S3_ENDPOINT="https://s3.amazonaws.com"
```

**Nota:** As configurações do S3 são necessárias para o upload de imagens das joias. Se você não estiver usando AWS S3, pode configurar com valores de exemplo ou usar um serviço de storage local.

### 4. Configure o banco de dados

```bash
# Execute as migrações do Prisma
npx prisma migrate dev

# (Opcional) Visualize o banco com Prisma Studio
npx prisma studio
```

### 5. Execute o projeto

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod
```

A API estará disponível em `http://localhost:3000`

### 6. Acesse a documentação

A documentação interativa da API estará disponível em `http://localhost:3000/api`

## 🧪 Testes

> **Atenção:** Eu valorizo muito a qualidade do código e acredito que testes são fundamentais para garantir confiança, robustez e evolução segura do sistema. Por isso, este projeto possui testes unitários e de integração, buscando sempre alta cobertura e cenários reais!

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📚 Endpoints da API

> **💡 Dica:** Para uma experiência melhor, acesse a documentação interativa em `http://localhost:3000/api` onde você pode testar todos os endpoints diretamente.

### Autenticação

#### Cadastrar usuário
```http
POST /users
Content-Type: application/json

{
  "name": "João Silva Santos",
  "email": "joao.silva@email.com",
  "password": "senha123"
}
```

#### Fazer login
```http
POST /login
Content-Type: application/json

{
  "email": "joao.silva@email.com",
  "password": "senha123"
}
```

**Resposta do login:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "name": "João Silva Santos",
    "email": "joao.silva@email.com"
  }
}
```

### Joias (Jewels)

#### Listar joias
```http
GET /jewels
```

**Endpoint público - não requer autenticação**

#### Buscar joia por ID
```http
GET /jewels/:id
```

**Endpoint público - não requer autenticação**

#### Cadastrar joia

```http
POST /jewels
Authorization: Bearer <token>
Content-Type: multipart/form-data

(image: arquivo da imagem, obrigatório)
name: Brincos de Prata 925
price: 89.9
stock: 15
category: Brincos
material: Prata 925
description: Brincos elegantes de prata 925 com pedras naturais
```

#### Editar joia

```http
PUT /jewels/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

(image: arquivo da imagem, opcional)
name: Brincos de Ouro 18k
price: 150.0
stock: 5
category: Brincos
material: Ouro 18k
description: Brincos de ouro 18k com pedras preciosas
imageUrl: URL da imagem (opcional)
```

#### Deletar joia
```http
DELETE /jewels/:id
Authorization: Bearer <token>
```

### Serviços (Services)

#### Listar serviços
```http
GET /services
```

**Endpoint público - não requer autenticação**

#### Buscar serviço por ID
```http
GET /services/:id
```

**Endpoint público - não requer autenticação**

#### Cadastrar serviço
```http
POST /services
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Piercing de Orelha",
  "description": "Piercing simples na orelha com joia de aço cirúrgico. Inclui limpeza e cuidados pós-procedimento.",
  "price": 120.0,
  "category": "Piercing"
}
```

#### Editar serviço
```http
PUT /services/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Piercing de Nariz",
  "description": "Piercing no nariz com joia de titânio. Inclui consulta e cuidados pós-procedimento.",
  "price": 150.0,
  "category": "Piercing"
}
```

#### Deletar serviço
```http
DELETE /services/:id
Authorization: Bearer <token>
```

## 📖 Documentação Interativa

A API possui documentação completa e interativa através do Swagger UI. Para acessar:

1. **Inicie a aplicação:** `npm run start:dev`
2. **Acesse:** `http://localhost:3000/api`
3. **Teste os endpoints** diretamente na interface
4. **Configure a autenticação** usando o botão "Authorize" com seu token JWT

### 🎯 Funcionalidades da Documentação

- **Interface interativa** - Teste endpoints diretamente
- **Exemplos automáticos** - Baseados nos DTOs
- **Validação visual** - Mostra erros de validação
- **Autenticação integrada** - Configure seu token JWT
- **Schemas completos** - Documentação detalhada de todos os campos
- **Códigos de resposta** - Todos os status HTTP documentados

## 📁 Estrutura do Projeto

```
src/
├── app.module.ts                 # Módulo principal
├── main.ts                      # Arquivo de inicialização (com Swagger)
├── core/                        # Camada de domínio compartilhado
│   ├── entities/                # Entidades base
│   └── errors/                  # Tratamento de erros
├── domain/                      # Camada de domínio
│   ├── jewel/                   # Domínio de joias
│   │   ├── entities/           # Entidades
│   │   ├── repositories/       # Interfaces de repositório
│   │   └── use-cases/         # Casos de uso
│   ├── service/                # Domínio de serviços
│   │   ├── entities/          # Entidades
│   │   ├── repositories/      # Interfaces de repositório
│   │   └── use-cases/        # Casos de uso
│   └── user/                  # Domínio de usuários
│       ├── entities/          # Entidades
│       ├── repositories/      # Interfaces de repositório
│       └── use-cases/        # Casos de uso
├── infra/                      # Camada de infraestrutura
│   ├── auth/                  # Autenticação
│   ├── crypto/                # Criptografia
│   ├── database/              # Banco de dados
│   │   └── prisma/           # Implementação Prisma
│   ├── http/                 # Controllers HTTP
│   │   ├── jewel/           # Controllers de joias
│   │   │   ├── controllers/ # Controllers
│   │   │   └── dtos/        # DTOs (incluindo Swagger)
│   │   ├── service/         # Controllers de serviços
│   │   │   ├── controllers/ # Controllers
│   │   │   └── dtos/        # DTOs (incluindo Swagger)
│   │   └── user/            # Controllers de usuários
│   │       ├── controllers/ # Controllers
│   │       └── dtos/        # DTOs (incluindo Swagger)
│   ├── upload/               # Upload de arquivos (S3)
│   └── presenters/           # Conversores para HTTP
└── test/                     # Testes
    ├── repositories/         # Repositórios em memória
    └── services/            # Serviços de teste
```

## 🔧 Comandos Úteis

```bash
# Gerar nova migração
npx prisma migrate dev --name nome-da-migracao

# Resetar banco de dados
npx prisma migrate reset

# Visualizar banco de dados
npx prisma studio

# Gerar cliente Prisma
npx prisma generate

# Executar testes em modo watch
npm run test:watch

# Executar testes e2e em modo watch
npm run test:e2e:watch

# Formatar código
npm run format

# Lint do código
npm run lint
```

## 📁 Arquivos de Configuração

- **`.env`** - Variáveis de ambiente (criar baseado em `env.example`)
- **`env.example`** - Exemplo das variáveis de ambiente necessárias
- **`docker-compose.yml`** - Configuração do Docker para PostgreSQL
- **`vercel.json`** - Configuração para deploy na Vercel
- **`routes.http`** - Exemplos de requisições HTTP para testar a API

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NomeDaFeature`)
3. Commit suas mudanças (`git commit -m 'Minha feature'`)
4. Push para a branch (`git push origin feature/NomeDaFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, abra uma issue no GitHub.