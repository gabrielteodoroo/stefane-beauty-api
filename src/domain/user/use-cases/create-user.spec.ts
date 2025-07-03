import Email from '@/domain/shared/email'
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import User from '../entities/user'
import { CreateUserUseCase } from './create-user'
import { HashSimulator } from '../../../../test/services/hash-simulator'

let userRepository: InMemoryUserRepository
let useCase: CreateUserUseCase
let hashRepository: HashSimulator

describe('Create User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    hashRepository = new HashSimulator()
    useCase = new CreateUserUseCase(userRepository, hashRepository)
  })

  test('Should create a user', async () => {
    const user = await useCase.handle({
      name: 'Gabriel Teodoro',
      email: 'gabriel@email.com',
      password: '123456',
    })

    expect(user.isRight()).toBe(true)
    expect(userRepository.items[0].name).toBe('Gabriel Teodoro')
    expect(userRepository.items[0].email.value).toBe('gabriel@email.com')
  })

  test('Should not create a user with an invalid email', async () => {
    const user = await useCase.handle({
      name: 'Gabriel Teodoro',
      email: 'gabriel@',
      password: '123456',
    })

    expect(user.isLeft()).toBe(true)
  })

  test('Should not create a user with an email that already exists', async () => {
    const user = User.create({
      name: 'Gabriel Teodoro',
      email: Email.create('gabriel@email.com'),
      password: '123456',
    })

    userRepository.items.push(user)

    const response = await useCase.handle({
      name: 'Gabriel Teodoro',
      email: 'gabriel@email.com',
      password: '123456',
    })

    expect(response.isLeft()).toBe(true)
  })

  test('Should not create a second user when one already exists', async () => {
    const firstUser = await useCase.handle({
      name: 'Gabriel Teodoro',
      email: 'gabriel@email.com',
      password: '123456',
    })

    expect(firstUser.isRight()).toBe(true)

    const secondUser = await useCase.handle({
      name: 'João Silva',
      email: 'joao@email.com',
      password: '123456',
    })

    expect(secondUser.isLeft()).toBe(true)
    expect(userRepository.items).toHaveLength(1)
  })
})
