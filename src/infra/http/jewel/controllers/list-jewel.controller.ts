import { ListJewelUseCase } from '@/domain/jewel/use-cases/list-jewel'
import { Public } from '@/infra/auth/public'
import { JewelPresenter } from '@/infra/presenters/jewel-presenter'
import { Controller, Get } from '@nestjs/common'

@Controller('/jewels')
@Public()
export class ListJewelController {
  constructor(private readonly listJewelUseCase: ListJewelUseCase) {}

  @Get()
  async handle() {
    const response = await this.listJewelUseCase.handle()

    return response.value?.map(JewelPresenter.toHTTP)
  }
}
