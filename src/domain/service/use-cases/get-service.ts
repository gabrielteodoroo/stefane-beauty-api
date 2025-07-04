import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import Service from '../entities/service'
import { ServiceRepository } from '../repositories/service-repository'
import { Either, left, right } from '@/core/errors/either/either'

type Request = {
  id: string
}

type Response = Either<NotFoundError, Service>

export class GetServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async handle({ id }: Request): Promise<Response> {
    const service = await this.serviceRepository.findById(id)

    if (!service) {
      return left(new NotFoundError())
    }

    return right(service)
  }
}
