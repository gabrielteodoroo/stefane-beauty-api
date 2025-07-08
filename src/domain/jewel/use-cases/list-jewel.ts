import { Either, right } from '@/core/errors/either/either'
import { JewelRepository } from '@/domain/jewel/repositories/jewel-repository'
import Jewel from '../entities/jewel'

type Response = Either<null, Jewel[]>

export class ListJewelUseCase {
  constructor(private readonly jewelRepository: JewelRepository) {}

  async handle(): Promise<Response> {
    const jewels = await this.jewelRepository.findMany()

    return right(jewels)
  }
}
