import { DeleteServiceUseCase } from './delete-service'
import { InMemoryServiceRepository } from '../../../../test/repositories/in-memory-service-repository'
import Service from '../entities/service'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'

let serviceRepository: InMemoryServiceRepository
let useCase: DeleteServiceUseCase

describe('DeleteServiceUseCase', () => {
  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    useCase = new DeleteServiceUseCase(serviceRepository)
  })

  test('should delete a service', async () => {
    const service = Service.create({
      name: 'Piercing de Orelha',
      description: 'Piercing simples na orelha',
      price: 50.0,
      category: 'Piercing',
    })

    serviceRepository.items.push(service)

    const response = await useCase.handle({
      id: service.id.toString(),
    })

    expect(response.isRight()).toBe(true)
    expect(response.value).toEqual(true)
  })

  test('should not delete a service if it does not exist', async () => {
    const response = await useCase.handle({
      id: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
