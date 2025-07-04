import { Either, left, right } from '@/core/errors/either/either'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { ServiceRepository } from '../repositories/service-repository'
import Service from '../entities/service'
import { NotAllowedError } from '@/core/errors/custom-errors/not-allowed-error'

export type Request = {
  id: string
  name: string
  description: string
  price: number
  category: string
}

export type Response = Either<NotFoundError, Service>

export class EditServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async handle({ id, ...data }: Request): Promise<Response> {
    if (!id) {
      return left(new NotAllowedError('ID do serviço não informado'))
    }

    const service = await this.serviceRepository.findById(id)
    if (!service) {
      return left(new NotFoundError())
    }

    const nameAlreadyExists = await this.serviceRepository.findByName(data.name)
    if (nameAlreadyExists && nameAlreadyExists.id.toString() !== id) {
      return left(new NotAllowedError('Serviço com este nome já existe'))
    }

    service.name = data.name
    service.description = data.description
    service.price = data.price
    service.category = data.category

    await this.serviceRepository.save(service)

    return right(service)
  }
}
