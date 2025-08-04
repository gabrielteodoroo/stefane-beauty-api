import { ListServiceUseCase } from '@/domain/service/use-cases/list-service'
import { Public } from '@/infra/auth/public'
import { ServicePresenter } from '@/infra/presenters/service-presenter'
import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ServiceResponseDTO } from '../dtos/service-response.dto'

@ApiTags('services')
@Controller('/services')
@Public()
export class ListServiceController {
  constructor(private readonly listServiceUseCase: ListServiceUseCase) {}

  @ApiOperation({
    summary: 'Listar serviços',
    description:
      'Retorna todos os serviços cadastrados no sistema. Endpoint público, não requer autenticação.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de serviços retornada com sucesso',
    type: [ServiceResponseDTO],
  })
  @ApiResponse({
    status: 204,
    description: 'Nenhum serviço encontrado',
  })
  @Get()
  async handle() {
    const response = await this.listServiceUseCase.handle()

    return response.value?.map(ServicePresenter.toHTTP)
  }
}
