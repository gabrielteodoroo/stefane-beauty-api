import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CreateServiceDTO } from '../dtos/create-service.dto'
import { CreateServiceUseCase } from '@/domain/service/use-cases/create-service'
import { ServicePresenter } from '@/infra/presenters/service-presenter'

@Controller('/services')
export class CreateServiceController {
  constructor(private readonly createServiceUseCase: CreateServiceUseCase) {}

  @Post()
  async handle(@Body() body: CreateServiceDTO) {
    const { name, description, price, category } = body

    const response = await this.createServiceUseCase.handle({
      name,
      description,
      price,
      category,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }

    return ServicePresenter.toHTTP(response.value)
  }
}
