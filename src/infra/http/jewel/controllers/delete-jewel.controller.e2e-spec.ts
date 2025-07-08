import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import { hash } from 'bcrypt'
import * as request from 'supertest'

describe('DeleteJewelController', () => {
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

  test('/jewels/:id (DELETE)', async () => {
    const jewelId = randomUUID()
    await prisma.jewel.create({
      data: {
        id: jewelId,
        name: 'Brincos de prata',
        price: 100,
        stock: 10,
        category: 'Brincos',
        material: 'Prata',
        imageUrl: 'https://i.imgur.com/65ifEZQ.jpeg',
        description: 'Brincos de prata',
      },
    })

    const token = jwt.sign(user)

    const response = await request(app.getHttpServer())
      .delete(`/jewels/${jewelId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(204)
  })
})
