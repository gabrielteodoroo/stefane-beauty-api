import { GetJewelUseCase } from './get-jewel'
import { InMemoryJewelRepository } from '../../../../test/repositories/in-memory-jewel-repository'
import Jewel from '../entities/jewel'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'

let jewelRepository: InMemoryJewelRepository
let useCase: GetJewelUseCase

describe('GetJewelUseCase', () => {
  beforeEach(() => {
    jewelRepository = new InMemoryJewelRepository()
    useCase = new GetJewelUseCase(jewelRepository)
  })

  test('should get a jewel', async () => {
    const jewel = Jewel.create({
      name: 'Piercing de Ouro',
      price: 199.99,
      stock: 10,
      category: 'Piercing',
      material: 'Ouro 18k',
      imageUrl: 'http://example.com/image.jpg',
      description: 'Piercing de ouro 18k com design exclusivo',
    })

    jewelRepository.items.push(jewel)

    const response = await useCase.handle({
      id: jewel.id.toString(),
    })

    expect(response.isRight()).toBe(true)
    expect(response.value).toEqual(jewel)
  })

  test('should not get a jewel if it does not exist', async () => {
    const response = await useCase.handle({
      id: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
