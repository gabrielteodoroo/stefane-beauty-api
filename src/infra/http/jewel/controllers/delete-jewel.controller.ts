import { DeleteJewelUseCase } from '@/domain/jewel/use-cases/delete-jewel'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/jewels/:id')
export class DeleteJewelController {
  constructor(private deleteJewelUseCase: DeleteJewelUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const response = await this.deleteJewelUseCase.handle({
      id,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }
  }
}
