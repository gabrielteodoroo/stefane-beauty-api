import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { CreateServiceUseCase } from '@/domain/service/use-cases/create-service'
import { ServiceRepository } from '@/domain/service/repositories/service-repository'
import { CreateServiceController } from './controllers/create-service.controller'
import { GetServiceUseCase } from '@/domain/service/use-cases/get-service'
import { GetServiceController } from './controllers/get-service.controller'
import { ListServiceUseCase } from '@/domain/service/use-cases/list-service'
import { ListServiceController } from './controllers/list-service.controller'
import { DeleteServiceController } from './controllers/delete-service.controller'
import { DeleteServiceUseCase } from '@/domain/service/use-cases/delete-service'
import { EditServiceController } from './controllers/edit-service.controller'
import { EditServiceUseCase } from '@/domain/service/use-cases/edit-service'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: CreateServiceUseCase,
      useFactory: (serviceRepository: ServiceRepository) => {
        return new CreateServiceUseCase(serviceRepository)
      },
      inject: [ServiceRepository],
    },
    {
      provide: GetServiceUseCase,
      useFactory: (serviceRepository: ServiceRepository) => {
        return new GetServiceUseCase(serviceRepository)
      },
      inject: [ServiceRepository],
    },
    {
      provide: ListServiceUseCase,
      useFactory: (serviceRepository: ServiceRepository) => {
        return new ListServiceUseCase(serviceRepository)
      },
      inject: [ServiceRepository],
    },
    {
      provide: DeleteServiceUseCase,
      useFactory: (serviceRepository: ServiceRepository) => {
        return new DeleteServiceUseCase(serviceRepository)
      },
      inject: [ServiceRepository],
    },
    {
      provide: EditServiceUseCase,
      useFactory: (serviceRepository: ServiceRepository) => {
        return new EditServiceUseCase(serviceRepository)
      },
      inject: [ServiceRepository],
    },
  ],
  controllers: [
    CreateServiceController,
    GetServiceController,
    ListServiceController,
    DeleteServiceController,
    EditServiceController,
  ],
})
export class ServiceModule {}
