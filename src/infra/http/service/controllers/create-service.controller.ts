import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CreateServiceDTO } from '../dtos/create-service.dto'
import { CreateServiceUseCase } from '@/domain/service/use-cases/create-service'
import { ServicePresenter } from '@/infra/presenters/service-presenter'
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'
import { ServiceResponseDTO } from '../dtos/service-response.dto'

@ApiTags('services')
@Controller('/services')
export class CreateServiceController {
  constructor(private readonly createServiceUseCase: CreateServiceUseCase) {}

  @ApiOperation({
    summary: 'Cadastrar novo serviço',
    description: 'Cria um novo serviço de piercing ou tatuagem no sistema.',
  })
  @ApiBody({
    type: CreateServiceDTO,
    description: 'Dados do serviço a ser criado',
  })
  @ApiResponse({
    status: 201,
    description: 'Serviço criado com sucesso',
    type: ServiceResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou campos obrigatórios não preenchidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - Token JWT inválido',
  })
  @Post()
  async handle(@Body() body: CreateServiceDTO) {
    const { name, description, price, category } = body

    const response = await this.createServiceUseCase.handle({
      name,
      description,
      price,
      category,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }

    return ServicePresenter.toHTTP(response.value)
  }
}
