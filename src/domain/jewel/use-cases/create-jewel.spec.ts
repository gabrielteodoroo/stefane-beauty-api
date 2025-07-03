import { CreateJewelUseCase } from './create-jewel'
import { InMemoryJewelRepository } from '../../../../test/repositories/in-memory-jewel-repository'

let jewelRepository: InMemoryJewelRepository
let useCase: CreateJewelUseCase

describe('CreateJewelUseCase', () => {
  beforeEach(() => {
    jewelRepository = new InMemoryJewelRepository()
    useCase = new CreateJewelUseCase(jewelRepository)
  })

  test('should create a jewel', async () => {
    const jewel = await useCase.handle({
      name: 'Piercing de Ouro',
      price: 199.99,
      stock: 10,
      category: 'Piercing',
      material: 'Ouro 18k',
      imageUrl: 'http://example.com/image.jpg',
      description: 'Piercing de ouro 18k com design exclusivo',
    })

    expect(jewel.isRight()).toBe(true)
    expect(jewelRepository.items[0].name).toBe('Piercing de Ouro')
    expect(jewelRepository.items[0].price).toBe(199.99)
    expect(jewelRepository.items[0].stock).toBe(10)
    expect(jewelRepository.items[0].category).toBe('Piercing')
    expect(jewelRepository.items[0].material).toBe('Ouro 18k')
    expect(jewelRepository.items[0].imageUrl).toBe(
      'http://example.com/image.jpg',
    )
    expect(jewelRepository.items[0].description).toBe(
      'Piercing de ouro 18k com design exclusivo',
    )
  })
})
