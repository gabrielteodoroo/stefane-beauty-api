import { ListServiceUseCase } from '@/domain/service/use-cases/list-service'
import { ServicePresenter } from '@/infra/presenters/service-presenter'
import { Controller, Get } from '@nestjs/common'

@Controller('/services')
export class ListServiceController {
  constructor(private readonly listServiceUseCase: ListServiceUseCase) {}

  @Get()
  async handle() {
    const response = await this.listServiceUseCase.handle()

    return response.value?.map(ServicePresenter.toHTTP)
  }
}
