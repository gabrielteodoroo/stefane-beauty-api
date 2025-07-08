import { Injectable } from '@nestjs/common'
import { ServiceRepository } from '@/domain/service/repositories/service-repository'
import { PrismaService } from '../prisma.service'
import { ServicePrismaMapper } from '../mappers/service-prisma-mapper'
import Service from '@/domain/service/entities/service'

@Injectable()
export class ServicePrismaRepository implements ServiceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(): Promise<Service[]> {
    const services = await this.prismaService.service.findMany()

    return services.map(ServicePrismaMapper.toDomain)
  }

  async findById(id: string): Promise<Service | null> {
    const service = await this.prismaService.service.findUnique({
      where: { id },
    })

    return service ? ServicePrismaMapper.toDomain(service) : null
  }

  async findByName(name: string): Promise<Service | null> {
    const service = await this.prismaService.service.findFirst({
      where: { name },
    })

    return service ? ServicePrismaMapper.toDomain(service) : null
  }

  async create(service: Service): Promise<Service> {
    const data = ServicePrismaMapper.toPersistence(service)

    const createdService = await this.prismaService.service.create({ data })

    return ServicePrismaMapper.toDomain(createdService)
  }

  async save(service: Service): Promise<void> {
    const data = ServicePrismaMapper.toPersistence(service)

    await this.prismaService.service.update({
      where: { id: service.id.toString() },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.service.delete({ where: { id } })
  }
}
