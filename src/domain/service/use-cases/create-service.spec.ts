import { CreateServiceUseCase } from './create-service'
import { InMemoryServiceRepository } from '../../../../test/repositories/in-memory-service-repository'

let serviceRepository: InMemoryServiceRepository
let useCase: CreateServiceUseCase

describe('CreateServiceUseCase', () => {
  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    useCase = new CreateServiceUseCase(serviceRepository)
  })

  test('should create a service', async () => {
    const service = await useCase.handle({
      name: 'Piercing de Orelha',
      description: 'Piercing simples na orelha',
      price: 50.0,
      category: 'Piercing',
    })

    expect(service.isRight()).toBe(true)
    expect(serviceRepository.items[0].name).toBe('Piercing de Orelha')
    expect(serviceRepository.items[0].description).toBe(
      'Piercing simples na orelha',
    )
    expect(serviceRepository.items[0].price).toBe(50.0)
    expect(serviceRepository.items[0].category).toBe('Piercing')
  })
})
