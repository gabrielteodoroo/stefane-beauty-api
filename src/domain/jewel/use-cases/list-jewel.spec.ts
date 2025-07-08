import { InMemoryJewelRepository } from '../../../../test/repositories/in-memory-jewel-repository'
import { ListJewelUseCase } from './list-jewel'
import Jewel from '../entities/jewel'

let jewelRepository: InMemoryJewelRepository
let useCase: ListJewelUseCase

describe('List jewels', () => {
  beforeEach(() => {
    jewelRepository = new InMemoryJewelRepository()
    useCase = new ListJewelUseCase(jewelRepository)
  })

  test('should be able to list jewels', async () => {
    const jewel = Jewel.create({
      name: 'Brincos de prata',
      price: 100,
      stock: 10,
      category: 'Brincos',
      material: 'Prata',
      imageUrl: 'https://i.imgur.com/65ifEZQ.jpeg',
      description: 'Brincos de prata',
    })

    jewelRepository.items.push(jewel)

    const response = await useCase.handle()

    expect(response.isRight()).toBe(true)
    expect(response.value).toHaveLength(1)
  })

  test('should not be able to list jewels if there are no jewels', async () => {
    const response = await useCase.handle()

    expect(response.isRight()).toBe(true)
    expect(response.value).toHaveLength(0)
  })
})
