import { Either, left, right } from '@/core/errors/either/either'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { JewelRepository } from '../repositories/jewel-repository'
import Jewel from '../entities/jewel'
import { NotAllowedError } from '@/core/errors/custom-errors/not-allowed-error'

export type Request = {
  id: string
  name: string
  price: number
  stock: number
  category: string
  material: string
  imageUrl: string
  description?: string
}

export type Response = Either<NotFoundError, Jewel>

export class EditJewelUseCase {
  constructor(private jewelRepository: JewelRepository) {}

  async handle({ id, ...data }: Request): Promise<Response> {
    if (!id) {
      return left(new NotAllowedError('ID da jóia não informado'))
    }

    const jewel = await this.jewelRepository.findById(id)
    if (!jewel) {
      return left(new NotFoundError())
    }

    const nameAlreadyExists = await this.jewelRepository.findByName(data.name)
    if (nameAlreadyExists && nameAlreadyExists.id.toString() !== id) {
      return left(new NotAllowedError('Jóia com este nome já existe'))
    }

    jewel.name = data.name
    jewel.price = data.price
    jewel.stock = data.stock
    jewel.category = data.category
    jewel.material = data.material
    jewel.imageUrl = data.imageUrl
    jewel.description = data.description

    await this.jewelRepository.save(jewel)

    return right(jewel)
  }
}
