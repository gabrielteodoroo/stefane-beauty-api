import { Jewel as JewelDatabase, Prisma } from '@prisma/client'
import Jewel from '@/domain/jewel/entities/jewel'
import Identity from '@/core/entities/identity'

export class JewelPrismaMapper {
  static toDomain(entity: JewelDatabase): Jewel {
    return Jewel.create(
      {
        name: entity.name,
        description: entity.description ?? undefined,
        price: Number(entity.price),
        stock: entity.stock,
        category: entity.category,
        material: entity.material,
        imageUrl: entity.imageUrl,
      },
      new Identity(entity.id),
    )
  }

  static toPersistence(entity: Jewel): JewelDatabase {
    return {
      id: entity.id.toString(),
      name: entity.name,
      description: entity.description ?? null,
      price: new Prisma.Decimal(entity.price),
      stock: entity.stock,
      category: entity.category,
      material: entity.material,
      imageUrl: entity.imageUrl,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}
