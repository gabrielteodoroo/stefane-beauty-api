import { INestApplication, ValidationPipe } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { DatabaseModule } from '@/infra/database/database.module'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import { hash } from 'bcrypt'

describe('CreateJewelController', () => {
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

  test('/jewels (POST)', async () => {
    const token = jwt.sign(user)

    /* eslint-disable */
    const response = await request(app.getHttpServer())
      .post('/jewels')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Brincos de prata')
      .field('price', 100)
      .field('stock', 10)
      .field('category', 'Brincos')
      .field('material', 'Prata')
      .field('description', 'Brincos de prata')
      .attach('image', __dirname + '/fotojoia.jpg')

    expect(response.statusCode).toBe(201)
  })
})
