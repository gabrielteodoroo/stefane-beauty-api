import { INestApplication, ValidationPipe } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import * as request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import { hash } from 'bcrypt'

describe('GetJewelController', () => {
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

    await app.init()

    prisma = moduleFixture.get(PrismaService)
    jwt = moduleFixture.get(JwtService)

    user = {
      id: randomUUID(),
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await hash('estefane123', 10),
    }
  })

  test('/jewels/:id (GET)', async () => {
    const jewel = await prisma.jewel.create({
      data: {
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
      .get(`/jewels/${jewel.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
  })
})
