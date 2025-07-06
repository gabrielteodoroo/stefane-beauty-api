import Identity from '@/core/entities/identity'
import Email from '@/domain/shared/email'
import User from '@/domain/user/entities/user'
import { User as UserDatabase } from '@prisma/client'

export class UserPrismaMapper {
  static toDomain(entity: UserDatabase): User {
    return User.create(
      {
        name: entity.name,
        email: Email.create(entity.email),
        password: entity.password,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
      new Identity(entity.id),
    )
  }

  static toPersistence(entity: User): UserDatabase {
    return {
      id: entity.id.toString(),
      name: entity.name,
      email: entity.email.value,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}
