import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { EditJewelUseCase } from '@/domain/jewel/use-cases/edit-jewel'
import { EditJewelDTO } from '../dtos/edit-jewel.dto'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { JewelPresenter } from '@/infra/presenters/jewel-presenter'

@Controller('/jewels/:id')
export class EditJewelController {
  constructor(private readonly editJewelUseCase: EditJewelUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(@Param('id') id: string, @Body() body: EditJewelDTO) {
    const { name, price, stock, category, material, imageUrl, description } =
      body

    const response = await this.editJewelUseCase.handle({
      id,
      name,
      price,
      stock,
      category,
      material,
      imageUrl,
      description,
    })

    if (response.isLeft()) {
      if (response.value.constructor === NotFoundError) {
        throw new NotFoundException(response.value.message)
      }

      throw new BadRequestException(response.value.message)
    }

    return JewelPresenter.toHTTP(response.value)
  }
}
