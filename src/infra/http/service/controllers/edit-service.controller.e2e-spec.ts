import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import { hash } from 'bcrypt'

describe('Edit service controller', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  let user: {
    id: string
    name: string
    email: string
    password: string
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    prisma = moduleFixture.get(PrismaService)
    jwt = moduleFixture.get(JwtService)

    await app.init()

    user = {
      id: randomUUID(),
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await hash('estefane123', 10),
    }

    await prisma.user.create({
      data: user,
    })
  })

  test('/services/:id (PUT)', async () => {
    const service = await prisma.service.create({
      data: {
        name: 'Piercing de Orelha',
        description: 'Piercing simples na orelha',
        price: 50.0,
        category: 'Piercing',
      },
    })

    const token = jwt.sign(user)

    const response = await request(app.getHttpServer())
      .put(`/services/${service.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Piercing de Nariz',
        description: 'Piercing no nariz',
        price: 80.0,
        category: 'Piercing',
      })

    expect(response.statusCode).toBe(204)
  })
})
