import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { EditServiceUseCase } from '@/domain/service/use-cases/edit-service'
import { EditServiceDTO } from '../dtos/edit-service.dto'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { ServicePresenter } from '@/infra/presenters/service-presenter'

@Controller('/services/:id')
export class EditServiceController {
  constructor(private readonly editServiceUseCase: EditServiceUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(@Param('id') id: string, @Body() body: EditServiceDTO) {
    const { name, description, price, category } = body

    const response = await this.editServiceUseCase.handle({
      id,
      name,
      description,
      price,
      category,
    })

    if (response.isLeft()) {
      if (response.value.constructor === NotFoundError) {
        throw new NotFoundException(response.value.message)
      }

      throw new BadRequestException(response.value.message)
    }

    return ServicePresenter.toHTTP(response.value)
  }
}
