import { Injectable } from '@nestjs/common'
import { UserRepository } from '@/domain/user/repositories/user-repository'
import { PrismaService } from '../prisma.service'
import User from '@/domain/user/entities/user'
import { UserPrismaMapper } from '../mappers/user-prisma-mapper'

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(): Promise<User[]> {
    const users = await this.prismaService.user.findMany()

    return users.map(UserPrismaMapper.toDomain)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { id } })

    return user ? UserPrismaMapper.toDomain(user) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { email } })

    return user ? UserPrismaMapper.toDomain(user) : null
  }

  async save(user: User): Promise<void> {
    const data = UserPrismaMapper.toPersistence(user)

    await this.prismaService.user.update({
      where: { id: user.id.toString() },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } })
  }

  async hasAnyUser(): Promise<boolean> {
    const count = await this.prismaService.user.count()

    return count > 0
  }

  async create(user: User): Promise<User> {
    const data = UserPrismaMapper.toPersistence(user)

    const newUser = await this.prismaService.user.create({ data })

    return UserPrismaMapper.toDomain(newUser)
  }
}
