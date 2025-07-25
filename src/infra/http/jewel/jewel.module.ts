import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { UploadModule } from '@/infra/upload/upload.module'
import { CreateJewelUseCase } from '@/domain/jewel/use-cases/create-jewel'
import { JewelRepository } from '@/domain/jewel/repositories/jewel-repository'
import { CreateJewelController } from './controllers/create-jewel.controller'
import { GetJewelUseCase } from '@/domain/jewel/use-cases/get-jewel'
import { GetJewelController } from './controllers/get-jewel.controller'
import { ListJewelUseCase } from '@/domain/jewel/use-cases/list-jewel'
import { ListJewelController } from './controllers/list-jewel.controller'
import { DeleteJewelController } from './controllers/delete-jewel.controller'
import { DeleteJewelUseCase } from '@/domain/jewel/use-cases/delete-jewel'
import { EditJewelUseCase } from '@/domain/jewel/use-cases/edit-jewel'
import { EditJewelController } from './controllers/edit-jewel.controller'

@Module({
  imports: [DatabaseModule, UploadModule],
  providers: [
    {
      provide: CreateJewelUseCase,
      useFactory: (jewelRepository: JewelRepository) => {
        return new CreateJewelUseCase(jewelRepository)
      },
      inject: [JewelRepository],
    },
    {
      provide: GetJewelUseCase,
      useFactory: (jewelRepository: JewelRepository) => {
        return new GetJewelUseCase(jewelRepository)
      },
      inject: [JewelRepository],
    },
    {
      provide: ListJewelUseCase,
      useFactory: (jewelRepository: JewelRepository) => {
        return new ListJewelUseCase(jewelRepository)
      },
      inject: [JewelRepository],
    },
    {
      provide: DeleteJewelUseCase,
      useFactory: (jewelRepository: JewelRepository) => {
        return new DeleteJewelUseCase(jewelRepository)
      },
      inject: [JewelRepository],
    },
    {
      provide: EditJewelUseCase,
      useFactory: (jewelRepository: JewelRepository) => {
        return new EditJewelUseCase(jewelRepository)
      },
      inject: [JewelRepository],
    },
  ],
  controllers: [
    CreateJewelController,
    GetJewelController,
    ListJewelController,
    DeleteJewelController,
    EditJewelController,
  ],
})
export class JewelModule {}
