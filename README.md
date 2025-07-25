# 🚀 API Body Piercing

API RESTful para gerenciamento de joias e serviços de body piercing, construída com NestJS, TypeScript e Prisma.

## 📋 Descrição

Esta API permite o gerenciamento completo de:
- **Joias**: Cadastro, listagem, busca, edição e remoção de joias
- **Serviços**: Cadastro, listagem, busca, edição e remoção de serviços de piercing
- **Usuários**: Cadastro e autenticação de usuários

### 🏛️ Arquitetura Limpa (Clean Architecture)

Este projeto foi desenvolvido seguindo os princípios da Clean Architecture, separando claramente as camadas de domínio, aplicação e infraestrutura. Isso garante maior organização, testabilidade, facilidade de manutenção e evolução do sistema. Cada camada possui responsabilidades bem definidas, promovendo baixo acoplamento e alta coesão entre os módulos.

## 🛠️ Tecnologias

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas
- **Jest** - Testes unitários e e2e
- **class-validator** - Validação de dados
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

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stefane"
JWT_SECRET="sua-chave-secreta-jwt"
```

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

### Autenticação

#### Cadastrar usuário
```http
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Fazer login
```http
POST /login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
```

### Joias (Jewels)

#### Listar joias
```http
GET /jewels
Authorization: Bearer <token>
```

#### Buscar joia por ID
```http
GET /jewels/:id
Authorization: Bearer <token>
```

#### Cadastrar joia


```http
POST /jewels
Authorization: Bearer <token>
Content-Type: multipart/form-data

(image: arquivo da imagem, obrigatório)
name: Brincos de Prata
price: 100
stock: 10
category: Brincos
material: Prata
description: Brincos de prata
```

#### Editar joia

```http
PUT /jewels/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

(image: arquivo da imagem, opcional)
name: Brincos de Ouro
price: 150
stock: 5
category: Brincos
material: Ouro
description: Brincos de ouro
imageUrl: URL da imagem
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
Authorization: Bearer <token>
```

#### Buscar serviço por ID
```http
GET /services/:id
Authorization: Bearer <token>
```

#### Cadastrar serviço
```http
POST /services
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Piercing de Orelha",
  "description": "Piercing simples na orelha",
  "price": 50.0,
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
  "description": "Piercing no nariz",
  "price": 80.0,
  "category": "Piercing"
}
```

#### Deletar serviço
```http
DELETE /services/:id
Authorization: Bearer <token>
```

## 📁 Estrutura do Projeto

```
src/
├── app.module.ts                 # Módulo principal
├── main.ts                      # Arquivo de inicialização
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
│   │   ├── service/         # Controllers de serviços
│   │   └── user/            # Controllers de usuários
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
```

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NomeDaFeature`)
3. Commit suas mudanças (`git commit -m 'Minha feature'`)
4. Push para a branch (`git push origin feature/NomeDaFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, abra uma issue no GitHub.