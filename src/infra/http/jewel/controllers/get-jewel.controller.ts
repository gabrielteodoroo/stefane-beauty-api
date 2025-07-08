import { GetJewelUseCase } from '@/domain/jewel/use-cases/get-jewel'
import { JewelPresenter } from '@/infra/presenters/jewel-presenter'
import { Controller, Get, NotFoundException, Param } from '@nestjs/common'

@Controller('/jewels/:id')
export class GetJewelController {
  constructor(private readonly getJewelUseCase: GetJewelUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const response = await this.getJewelUseCase.handle({ id })

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message)
    }

    return JewelPresenter.toHTTP(response.value)
  }
}
