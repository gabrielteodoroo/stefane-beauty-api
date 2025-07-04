import { Either, left, right } from '@/core/errors/either/either'
import { JewelRepository } from '../repositories/jewel-repository'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'

type Request = {
  id: string
}

type Response = Either<NotFoundError, true>

export class DeleteJewelUseCase {
  constructor(private jewelRepository: JewelRepository) {}

  async handle({ id }: Request): Promise<Response> {
    const jewel = await this.jewelRepository.findById(id)

    if (!jewel) {
      return left(new NotFoundError())
    }

    await this.jewelRepository.delete(id)

    return right(true)
  }
}
