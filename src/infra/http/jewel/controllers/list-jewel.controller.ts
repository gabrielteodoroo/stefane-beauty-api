import { ListJewelUseCase } from '@/domain/jewel/use-cases/list-jewel'
import { Public } from '@/infra/auth/public'
import { JewelPresenter } from '@/infra/presenters/jewel-presenter'
import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { JewelResponseDTO } from '../dtos/jewel-response.dto'

@ApiTags('jewels')
@Controller('/jewels')
@Public()
export class ListJewelController {
  constructor(private readonly listJewelUseCase: ListJewelUseCase) {}

  @ApiOperation({
    summary: 'Listar joias',
    description:
      'Retorna todas as joias cadastradas no sistema. Endpoint público, não requer autenticação.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de joias retornada com sucesso',
    type: [JewelResponseDTO],
  })
  @ApiResponse({
    status: 204,
    description: 'Nenhuma joia encontrada',
  })
  @Get()
  async handle() {
    const response = await this.listJewelUseCase.handle()

    return response.value?.map(JewelPresenter.toHTTP)
  }
}
