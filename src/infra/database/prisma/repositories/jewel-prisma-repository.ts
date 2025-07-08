import { Injectable } from '@nestjs/common'
import { JewelRepository } from '@/domain/jewel/repositories/jewel-repository'
import { PrismaService } from '../prisma.service'
import { JewelPrismaMapper } from '../mappers/jewel-prisma-mapper'
import Jewel from '@/domain/jewel/entities/jewel'

@Injectable()
export class JewelPrismaRepository implements JewelRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(): Promise<Jewel[]> {
    const jewels = await this.prismaService.jewel.findMany()

    return jewels.map(JewelPrismaMapper.toDomain)
  }

  async findById(id: string): Promise<Jewel | null> {
    const jewel = await this.prismaService.jewel.findUnique({ where: { id } })

    return jewel ? JewelPrismaMapper.toDomain(jewel) : null
  }

  async findByName(name: string): Promise<Jewel | null> {
    const jewel = await this.prismaService.jewel.findFirst({ where: { name } })

    return jewel ? JewelPrismaMapper.toDomain(jewel) : null
  }

  async create(jewel: Jewel): Promise<Jewel> {
    const data = JewelPrismaMapper.toPersistence(jewel)

    const createdJewel = await this.prismaService.jewel.create({ data })

    return JewelPrismaMapper.toDomain(createdJewel)
  }

  async save(jewel: Jewel): Promise<void> {
    const data = JewelPrismaMapper.toPersistence(jewel)

    await this.prismaService.jewel.update({
      where: { id: jewel.id.toString() },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.jewel.delete({ where: { id } })
  }
}
