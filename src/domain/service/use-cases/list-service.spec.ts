import { InMemoryServiceRepository } from '../../../../test/repositories/in-memory-service-repository'
import { ListServiceUseCase } from './list-service'
import Service from '../entities/service'

let serviceRepository: InMemoryServiceRepository
let useCase: ListServiceUseCase

describe('List services', () => {
  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    useCase = new ListServiceUseCase(serviceRepository)
  })

  test('should be able to list services', async () => {
    const service = Service.create({
      name: 'Piercing de Orelha',
      description: 'Piercing simples na orelha',
      price: 50.0,
      category: 'Piercing',
    })

    serviceRepository.items.push(service)

    const response = await useCase.handle()

    expect(response.isRight()).toBe(true)
    expect(response.value).toHaveLength(1)
  })

  test('should not be able to list services if there are no services', async () => {
    const response = await useCase.handle()

    expect(response.isRight()).toBe(true)
    expect(response.value).toHaveLength(0)
  })
})
