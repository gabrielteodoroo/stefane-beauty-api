import { Either, left, right } from '@/core/errors/either/either'
import { ServiceRepository } from '../repositories/service-repository'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'

type Request = {
  id: string
}

type Response = Either<NotFoundError, true>

export class DeleteServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async handle({ id }: Request): Promise<Response> {
    const service = await this.serviceRepository.findById(id)

    if (!service) {
      return left(new NotFoundError())
    }

    await this.serviceRepository.delete(id)

    return right(true)
  }
}
