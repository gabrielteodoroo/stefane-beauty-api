import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import { hash } from 'bcrypt'

describe('Edit jewel controller', () => {
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

  test('/jewels/:id (PUT)', async () => {
    const jewel = await prisma.jewel.create({
      data: {
        name: 'Brinco de Prata',
        price: 100,
        stock: 10,
        category: 'Brincos',
        material: 'Prata',
        imageUrl: 'https://i.imgur.com/65ifEZQ.jpeg',
        description: 'Brinco de prata',
      },
    })

    const token = jwt.sign(user)

    /* eslint-disable */
    const response = await request(app.getHttpServer())
      .put(`/jewels/${jewel.id}`)
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Brinco de Ouro')
      .field('price', 150)
      .field('stock', 5)
      .field('category', 'Brincos')
      .field('material', 'Ouro')
      .field('description', 'Brinco de ouro')
      .attach('image', __dirname + '/fotojoia.jpg')

    expect(response.statusCode).toBe(204)
  })
})
