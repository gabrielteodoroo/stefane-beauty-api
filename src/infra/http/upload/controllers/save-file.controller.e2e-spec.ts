import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import { hash } from 'bcrypt'
import { Jewel, User } from '@prisma/client'

describe('SavefileController', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  let jewel: Jewel
  let user: User

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
      name: 'Estefane',
      email: 'estefane@email.com',
      password: await hash('estefane123', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await prisma.user.create({
      data: user,
    })

    jewel = {
      id: randomUUID(),
      name: 'Joia 1',
      price: 100,
      stock: 10,
      category: 'Nariz',
      material: 'Ouro',
      imageUrl: 'https://www.google.com',
      description: 'Joia de ouro para o nariz',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await prisma.jewel.create({
      data: jewel,
    })
  })

  test('/upload (POST)', async () => {
    const token = jwt.sign(user)
    /* eslint-disable */
    const response = await request(app.getHttpServer())
      .post('/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', __dirname + '/fotojoia.jpg')

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('path')
  })
})
