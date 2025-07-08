import { DeleteServiceUseCase } from '@/domain/service/use-cases/delete-service'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/services/:id')
export class DeleteServiceController {
  constructor(private deleteServiceUseCase: DeleteServiceUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const response = await this.deleteServiceUseCase.handle({
      id,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }
  }
}
