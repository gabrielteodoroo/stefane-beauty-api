import { Either, left, right } from '@/core/errors/either/either'
import Jewel from '../entities/jewel'
import { JewelRepository } from '../repositories/jewel-repository'
import { NotAllowedError } from '@/core/errors/custom-errors/not-allowed-error'

export type Request = {
  name: string
  price: number
  stock: number
  category: string
  material: string
  imageUrl: string
  description?: string
}

export type Response = Either<Error, Jewel>

export class CreateJewelUseCase {
  constructor(private jewelRepository: JewelRepository) {}

  async handle(request: Request): Promise<Response> {
    const nameAlreadyExists = await this.jewelRepository.findByName(
      request.name,
    )

    if (nameAlreadyExists) {
      return left(new NotAllowedError('Jóia já cadastrada no sistema'))
    }

    const jewel = Jewel.create(request)

    await this.jewelRepository.create(jewel)

    return right(jewel)
  }
}
