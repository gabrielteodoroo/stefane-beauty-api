import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { UserRepository } from '@/domain/user/repositories/user-repository'
import { UserPrismaRepository } from './repositories/user-prisma-repository'
import { JewelRepository } from '@/domain/jewel/repositories/jewel-repository'
import { JewelPrismaRepository } from './repositories/jewel-prisma-repository'
import { ServiceRepository } from '@/domain/service/repositories/service-repository'
import { ServicePrismaRepository } from './repositories/service-prisma-repository'

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: UserPrismaRepository },
    { provide: JewelRepository, useClass: JewelPrismaRepository },
    { provide: ServiceRepository, useClass: ServicePrismaRepository },
  ],
  exports: [PrismaService, UserRepository, JewelRepository, ServiceRepository],
})
export class PrismaModule {}
