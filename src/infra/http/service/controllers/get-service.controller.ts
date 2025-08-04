import { GetServiceUseCase } from '@/domain/service/use-cases/get-service'
import { ServicePresenter } from '@/infra/presenters/service-presenter'
import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { ServiceResponseDTO } from '../dtos/service-response.dto'

@ApiTags('services')
@Controller('/services/:id')
export class GetServiceController {
  constructor(private readonly getServiceUseCase: GetServiceUseCase) {}

  @ApiOperation({
    summary: 'Buscar serviço por ID',
    description:
      'Retorna um serviço específico pelo ID. Endpoint público, não requer autenticação.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do serviço',
    example: '1',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Serviço encontrado com sucesso',
    type: ServiceResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Serviço não encontrado',
  })
  @Get()
  async handle(@Param('id') id: string) {
    const response = await this.getServiceUseCase.handle({ id })

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message)
    }

    return ServicePresenter.toHTTP(response.value)
  }
}
