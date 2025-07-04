import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import Jewel from '../entities/jewel'
import { JewelRepository } from '../repositories/jewel-repository'
import { Either, left, right } from '@/core/errors/either/either'

type Request = {
  id: string
}

type Response = Either<NotFoundError, Jewel>

export class GetJewelUseCase {
  constructor(private jewelRepository: JewelRepository) {}

  async handle({ id }: Request): Promise<Response> {
    const jewel = await this.jewelRepository.findById(id)

    if (!jewel) {
      return left(new NotFoundError())
    }

    return right(jewel)
  }
}
