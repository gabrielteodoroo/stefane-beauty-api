import { Either, left, right } from '@/core/errors/either/either'
import Service from '../entities/service'
import { ServiceRepository } from '../repositories/service-repository'
import { NotAllowedError } from '@/core/errors/custom-errors/not-allowed-error'

export type Request = {
  name: string
  description: string
  price: number
  category: string
}

export type Response = Either<Error, Service>

export class CreateServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async handle(request: Request): Promise<Response> {
    const nameAlreadyExists = await this.serviceRepository.findByName(
      request.name,
    )

    if (nameAlreadyExists) {
      return left(new NotAllowedError('Serviço já cadastrado no sistema'))
    }

    const service = Service.create(request)

    await this.serviceRepository.create(service)

    return right(service)
  }
}
