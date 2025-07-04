import { EditJewelUseCase } from './edit-jewel'
import { InMemoryJewelRepository } from '../../../../test/repositories/in-memory-jewel-repository'
import Jewel from '../entities/jewel'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { NotAllowedError } from '@/core/errors/custom-errors/not-allowed-error'

let jewelRepository: InMemoryJewelRepository
let useCase: EditJewelUseCase

describe('EditJewelUseCase', () => {
  beforeEach(() => {
    jewelRepository = new InMemoryJewelRepository()
    useCase = new EditJewelUseCase(jewelRepository)
  })

  test('should edit a jewel', async () => {
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

    const editedJewel = await useCase.handle({
      id: jewel.id.toString(),
      name: 'Piercing de Prata',
      price: 149.99,
      stock: 5,
      category: 'Piercing',
      material: 'Prata 925',
      imageUrl: 'http://example.com/image2.jpg',
      description: 'Piercing de prata 925 com novo design',
    })

    expect(editedJewel.isRight()).toBe(true)
    expect(jewelRepository.items[0]).toEqual(editedJewel.value)
  })

  test('should not edit a jewel if it does not exist', async () => {
    const response = await useCase.handle({
      id: '1',
      name: 'Piercing de Prata',
      price: 149.99,
      stock: 5,
      category: 'Piercing',
      material: 'Prata 925',
      imageUrl: 'http://example.com/image2.jpg',
      description: 'Piercing de prata 925 com novo design',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  test('should not edit a jewel if the name already exists', async () => {
    const jewel = Jewel.create({
      name: 'Piercing de Ouro',
      price: 199.99,
      stock: 10,
      category: 'Piercing',
      material: 'Ouro 18k',
      imageUrl: 'http://example.com/image.jpg',
      description: 'Piercing de ouro 18k com design exclusivo',
    })

    const jewel2 = Jewel.create({
      name: 'Piercing de Prata',
      price: 149.99,
      stock: 5,
      category: 'Piercing',
      material: 'Prata 925',
      imageUrl: 'http://example.com/image2.jpg',
      description: 'Piercing de prata 925 com novo design',
    })

    jewelRepository.items.push(jewel2)
    jewelRepository.items.push(jewel)

    const response = await useCase.handle({
      id: jewel.id.toString(),
      name: 'Piercing de Prata',
      price: 149.99,
      stock: 5,
      category: 'Piercing',
      material: 'Prata 925',
      imageUrl: 'http://example.com/image2.jpg',
      description: 'Piercing de prata 925 com novo design',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })
})
