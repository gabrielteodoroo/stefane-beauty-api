import { EditServiceUseCase } from './edit-service'
import { InMemoryServiceRepository } from '../../../../test/repositories/in-memory-service-repository'
import Service from '../entities/service'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { NotAllowedError } from '@/core/errors/custom-errors/not-allowed-error'

let serviceRepository: InMemoryServiceRepository
let useCase: EditServiceUseCase

describe('EditServiceUseCase', () => {
  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    useCase = new EditServiceUseCase(serviceRepository)
  })

  test('should edit a service', async () => {
    const service = Service.create({
      name: 'Piercing de Orelha',
      description: 'Piercing simples na orelha',
      price: 50.0,
      category: 'Piercing',
    })

    serviceRepository.items.push(service)

    const editedService = await useCase.handle({
      id: service.id.toString(),
      name: 'Piercing de Nariz',
      description: 'Piercing no nariz',
      price: 80.0,
      category: 'Piercing',
    })

    expect(editedService.isRight()).toBe(true)
    expect(serviceRepository.items[0]).toEqual(editedService.value)
  })

  test('should not edit a service if it does not exist', async () => {
    const response = await useCase.handle({
      id: '1',
      name: 'Piercing de Nariz',
      description: 'Piercing no nariz',
      price: 80.0,
      category: 'Piercing',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  test('should not edit a service if the name already exists', async () => {
    const service = Service.create({
      name: 'Piercing de Orelha',
      description: 'Piercing simples na orelha',
      price: 50.0,
      category: 'Piercing',
    })

    const service2 = Service.create({
      name: 'Piercing de Nariz',
      description: 'Piercing no nariz',
      price: 80.0,
      category: 'Piercing',
    })

    serviceRepository.items.push(service2)
    serviceRepository.items.push(service)

    const response = await useCase.handle({
      id: service.id.toString(),
      name: 'Piercing de Nariz',
      description: 'Piercing no nariz',
      price: 80.0,
      category: 'Piercing',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })
})
