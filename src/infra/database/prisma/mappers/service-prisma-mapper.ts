import { Service as ServiceDatabase } from '@prisma/client'
import Service from '@/domain/service/entities/service'
import Identity from '@/core/entities/identity'

export class ServicePrismaMapper {
  static toDomain(entity: ServiceDatabase): Service {
    return Service.create(
      {
        name: entity.name,
        description: entity.description,
        price: entity.price,
        category: entity.category,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
      new Identity(entity.id),
    )
  }

  static toPersistence(entity: Service): ServiceDatabase {
    return {
      id: entity.id.toString(),
      name: entity.name,
      description: entity.description,
      price: entity.price,
      category: entity.category,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}
