import { GetServiceUseCase } from '@/domain/service/use-cases/get-service'
import { ServicePresenter } from '@/infra/presenters/service-presenter'
import { Controller, Get, NotFoundException, Param } from '@nestjs/common'

@Controller('/services/:id')
export class GetServiceController {
  constructor(private readonly getServiceUseCase: GetServiceUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const response = await this.getServiceUseCase.handle({ id })

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message)
    }

    return ServicePresenter.toHTTP(response.value)
  }
}
