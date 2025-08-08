import { GetJewelUseCase } from '@/domain/jewel/use-cases/get-jewel'
import { JewelPresenter } from '@/infra/presenters/jewel-presenter'
import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { JewelResponseDTO } from '../dtos/jewel-response.dto'

@ApiTags('jewels')
@Controller('/jewels/:id')
export class GetJewelController {
  constructor(private readonly getJewelUseCase: GetJewelUseCase) {}

  @ApiOperation({
    summary: 'Buscar joia por ID',
    description:
      'Retorna uma joia específica pelo ID. Endpoint público, não requer autenticação.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único da joia',
    example: '1',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Joia encontrada com sucesso',
    type: JewelResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Joia não encontrada',
  })
  @Get()
  async handle(@Param('id') id: string) {
    const response = await this.getJewelUseCase.handle({ id })

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message)
    }
    return JewelPresenter.toHTTP(response.value)
  }
}
