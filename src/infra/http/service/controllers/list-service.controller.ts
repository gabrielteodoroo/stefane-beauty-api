import { ListServiceUseCase } from '@/domain/service/use-cases/list-service'
import { Public } from '@/infra/auth/public'
import { ServicePresenter } from '@/infra/presenters/service-presenter'
import { Controller, Get } from '@nestjs/common'

@Controller('/services')
@Public()
export class ListServiceController {
  constructor(private readonly listServiceUseCase: ListServiceUseCase) {}

  @Get()
  async handle() {
    const response = await this.listServiceUseCase.handle()

    return response.value?.map(ServicePresenter.toHTTP)
  }
}
