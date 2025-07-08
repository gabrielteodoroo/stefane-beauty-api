import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CreateJewelDTO } from '../dtos/create-jewel.dto'
import { CreateJewelUseCase } from '@/domain/jewel/use-cases/create-jewel'
import { JewelPresenter } from '@/infra/presenters/jewel-presenter'

@Controller('/jewels')
export class CreateJewelController {
  constructor(private readonly createJewelUseCase: CreateJewelUseCase) {}

  @Post()
  async handle(@Body() body: CreateJewelDTO) {
    const { name, price, stock, category, material, imageUrl, description } =
      body

    const response = await this.createJewelUseCase.handle({
      name,
      price,
      stock,
      category,
      material,
      imageUrl,
      description,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }

    return JewelPresenter.toHTTP(response.value)
  }
}
